# 🎯 COMPREHENSIVE PAYMENTS MODULE IMPLEMENTATION PLAN

## **EXECUTIVE SUMMARY**

Building a minimal, event-driven payments module for Nuxt 4 that:
- Provides route-based payment requirements with regex pattern matching
- Tracks customer payment status (active subscriptions, one-time purchases)
- Emits lifecycle hooks for external integration (checkout, success, failure, refunds)
- Zero opinions on payment providers (user implements via hooks)
- Works standalone or integrates with auth module via events

---

## **MODULE STRUCTURE**

```
modules/payments/
├── runtime/
│   ├── composables/
│   │   └── usePayments.ts       # Core payment state & logic
│   ├── plugins/
│   │   └── payments.client.ts   # Initialization & event setup
│   └── components/
│       ├── PaymentGate.vue      # Protection wrapper (requires payment)
│       └── CheckoutButton.vue   # Trigger checkout flow
├── types.ts                      # Type definitions & hook declarations
├── index.ts                      # Module definition
└── README.md                     # Usage documentation
```

---

## **PHASE 1: TYPE DEFINITIONS**

### **File: `modules/payments/types.ts`**

```typescript
// Type definitions for the payments module

export interface CustomerPayment {
  id: string
  customerId: string
  priceId: string
  amount: number
  currency: string
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'incomplete'
  type: 'subscription' | 'one_time'
  createdAt: number
  expiresAt?: number
  metadata?: Record<string, any>
}

export interface PaymentSession {
  id: string
  url: string
  status: 'open' | 'complete' | 'expired'
  priceId: string
  amount: number
  currency: string
}

export interface PaymentRouteConfig {
  pattern: string | RegExp
  require?: boolean              // Default: true
  priceId: string                // Required price for access
  mode?: 'payment' | 'subscription'
  redirect?: string              // Where to redirect after payment
  metadata?: Record<string, any> // Pass to hooks
}

export interface PaymentsModuleOptions {
  /**
   * Enable/disable the module
   * @default false
   */
  enabled: boolean
  
  /**
   * Route payment requirements
   * @default []
   */
  routes: PaymentRouteConfig[]
  
  /**
   * Storage configuration
   */
  storage: {
    /**
     * Storage driver
     * @default 'localStorage'
     */
    driver: 'cookie' | 'localStorage'
    
    /**
     * Storage key name
     * @default 'payments:customer'
     */
    key?: string
    
    /**
     * Max age in seconds
     * @default 2592000 (30 days)
     */
    maxAge?: number
  }
  
  /**
   * Default checkout options
   */
  checkout?: {
    /**
     * Success redirect URL
     * @default '/checkout/success'
     */
    successUrl?: string
    
    /**
     * Cancel redirect URL
     * @default '/checkout/cancel'
     */
    cancelUrl?: string
    
    /**
     * Default currency
     * @default 'usd'
     */
    currency?: string
  }
}

// Runtime config type augmentation
declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    payments?: PaymentsModuleOptions
  }
}

// Hook type augmentation
declare module '#app' {
  interface RuntimeNuxtHooks {
    /**
     * Emitted when checkout needs to be created
     * Handler should create checkout session and return session object
     */
    'payments:create-checkout': (payload: {
      priceId: string
      mode: 'payment' | 'subscription'
      successUrl: string
      cancelUrl: string
      metadata?: Record<string, any>
    }) => Promise<PaymentSession> | PaymentSession
    
    /**
     * Emitted when payment verification is needed
     * Handler should verify payment and return customer payment data
     */
    'payments:verify': (payload: {
      sessionId: string
      timestamp: number
    }) => Promise<{
      payment: CustomerPayment
      customer: { id: string, email: string }
    } | null> | {
      payment: CustomerPayment
      customer: { id: string, email: string }
    } | null
    
    /**
     * Emitted when payment history needs to be loaded
     * Handler should return array of customer payments
     */
    'payments:load-history': (payload: {
      customerId?: string
      email?: string
      timestamp: number
    }) => Promise<CustomerPayment[]> | CustomerPayment[]
    
    /**
     * Emitted after successful payment
     */
    'payments:success': (payload: {
      payment: CustomerPayment
      customer: { id: string, email: string }
      timestamp: number
    }) => void | Promise<void>
    
    /**
     * Emitted after failed payment
     */
    'payments:failed': (payload: {
      error: string
      priceId: string
      timestamp: number
    }) => void | Promise<void>
    
    /**
     * Emitted after payment refund
     */
    'payments:refunded': (payload: {
      paymentId: string
      amount: number
      timestamp: number
    }) => void | Promise<void>
  }
}

export {}
```

**Critical decisions:**
- `enabled: false` by default → Opt-in module
- `routes` array for declarative payment requirements → Clean config
- Payment status tracking → Support both subscriptions and one-time
- Hook payload structure → Consistent interface for integrations
- Metadata field → Pass route-specific data to hooks
- Customer vs Payment separation → Clear ownership model

---

## **PHASE 2: CORE COMPOSABLE**

### **File: `modules/payments/runtime/composables/usePayments.ts`**

```typescript
import { computed, readonly, ref } from 'vue'
import type { CustomerPayment, PaymentsModuleOptions, PaymentRouteConfig, PaymentSession } from '../../types'

/**
 * Core payment state and methods
 * Event-driven: emits hooks, no provider logic
 */
export const usePayments = () => {
  const nuxtApp = useNuxtApp()
  const route = useRoute()
  const config = useRuntimeConfig().public.payments as PaymentsModuleOptions
  
  // ========================================
  // STATE
  // ========================================
  
  const payments = useState<CustomerPayment[]>('payments:list', () => [])
  const isProcessing = useState<boolean>('payments:processing', () => false)
  const customerId = useState<string | null>('payments:customer-id', () => null)
  
  // ========================================
  // STORAGE
  // ========================================
  
  const storageKey = config.storage?.key || 'payments:customer'
  const storageDriver = config.storage?.driver || 'localStorage'
  
  /**
   * Save customer data to storage
   */
  const saveCustomerData = (data: { id: string, payments: CustomerPayment[] }) => {
    if (import.meta.server) return
    
    try {
      if (storageDriver === 'localStorage') {
        localStorage.setItem(storageKey, JSON.stringify(data))
      } else if (storageDriver === 'cookie') {
        const cookie = useCookie(storageKey, {
          maxAge: config.storage?.maxAge || 60 * 60 * 24 * 30, // 30 days
          sameSite: 'lax',
          secure: import.meta.env.PROD
        })
        cookie.value = data as any
      }
    } catch (error) {
      console.error('[Payments] Failed to save customer data:', error)
    }
  }
  
  /**
   * Load customer data from storage
   */
  const loadCustomerData = (): { id: string, payments: CustomerPayment[] } | null => {
    if (import.meta.server) return null
    
    try {
      if (storageDriver === 'localStorage') {
        const stored = localStorage.getItem(storageKey)
        return stored ? JSON.parse(stored) : null
      } else if (storageDriver === 'cookie') {
        const cookie = useCookie<{ id: string, payments: CustomerPayment[] }>(storageKey)
        return cookie.value || null
      }
    } catch (error) {
      console.error('[Payments] Failed to load customer data:', error)
    }
    
    return null
  }
  
  /**
   * Clear customer data from storage
   */
  const clearCustomerData = () => {
    if (import.meta.server) return
    
    try {
      if (storageDriver === 'localStorage') {
        localStorage.removeItem(storageKey)
      } else if (storageDriver === 'cookie') {
        const cookie = useCookie(storageKey)
        cookie.value = null
      }
    } catch (error) {
      console.error('[Payments] Failed to clear customer data:', error)
    }
  }
  
  // ========================================
  // ROUTE MATCHING
  // ========================================
  
  /**
   * Get route payment config for a given path
   */
  const getRouteConfig = (path?: string): PaymentRouteConfig | null => {
    const checkPath = path || route.path
    
    for (const routeConfig of config.routes || []) {
      let pattern: RegExp
      
      if (typeof routeConfig.pattern === 'string') {
        // Convert glob-style pattern to regex
        const regexStr = routeConfig.pattern
          .replace(/\*\*/g, '.*')
          .replace(/\*/g, '[^/]*')
        pattern = new RegExp(`^${regexStr}$`)
      } else {
        pattern = routeConfig.pattern
      }
      
      if (pattern.test(checkPath)) {
        return routeConfig
      }
    }
    
    return null
  }
  
  /**
   * Check if route requires payment
   */
  const routeRequiresPayment = (path?: string): {
    required: boolean
    priceId?: string
    mode?: 'payment' | 'subscription'
  } => {
    const routeConfig = getRouteConfig(path)
    
    if (!routeConfig) {
      return { required: false }
    }
    
    return {
      required: routeConfig.require !== false,
      priceId: routeConfig.priceId,
      mode: routeConfig.mode || 'payment'
    }
  }
  
  // ========================================
  // PAYMENT STATUS CHECKS
  // ========================================
  
  /**
   * Check if user has paid for specific price
   */
  const hasPaid = (priceId: string): boolean => {
    return payments.value.some(p => 
      p.priceId === priceId && 
      p.status === 'active'
    )
  }
  
  /**
   * Check if user has active subscription
   */
  const hasActiveSubscription = (priceId?: string): boolean => {
    return payments.value.some(p => 
      p.type === 'subscription' &&
      p.status === 'active' &&
      (!priceId || p.priceId === priceId)
    )
  }
  
  /**
   * Get payment by price ID
   */
  const getPayment = (priceId: string): CustomerPayment | undefined => {
    return payments.value.find(p => p.priceId === priceId)
  }
  
  // ========================================
  // PUBLIC API (Event Emitters)
  // ========================================
  
  /**
   * Create checkout session
   * Emits hook for external checkout creation
   */
  const checkout = async (priceId: string, options?: {
    mode?: 'payment' | 'subscription'
    successUrl?: string
    cancelUrl?: string
    metadata?: Record<string, any>
  }): Promise<PaymentSession | null> => {
    isProcessing.value = true
    
    try {
      const checkoutPayload = {
        priceId,
        mode: options?.mode || 'payment',
        successUrl: options?.successUrl || config.checkout?.successUrl || '/checkout/success',
        cancelUrl: options?.cancelUrl || config.checkout?.cancelUrl || '/checkout/cancel',
        metadata: options?.metadata || {}
      }
      
      // Emit hook - handler must return session object
      const session = await nuxtApp.callHook('payments:create-checkout', checkoutPayload)
      
      if (session && session.url) {
        // Navigate to checkout URL
        await navigateTo(session.url, { external: true })
        return session
      }
      
      return null
    } catch (error) {
      console.error('[Payments] Checkout failed:', error)
      
      await nuxtApp.callHook('payments:failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        priceId,
        timestamp: Date.now()
      })
      
      return null
    } finally {
      isProcessing.value = false
    }
  }
  
  /**
   * Verify payment after redirect
   * Emits hook for external verification
   */
  const verify = async (sessionId: string): Promise<boolean> => {
    isProcessing.value = true
    
    try {
      // Emit hook - handler must return payment data
      const result = await nuxtApp.callHook('payments:verify', {
        sessionId,
        timestamp: Date.now()
      })
      
      if (result && result.payment) {
        // Update local state
        customerId.value = result.customer.id
        
        // Add or update payment in list
        const existingIndex = payments.value.findIndex(p => p.id === result.payment.id)
        if (existingIndex >= 0) {
          payments.value[existingIndex] = result.payment
        } else {
          payments.value.push(result.payment)
        }
        
        // Save to storage
        saveCustomerData({
          id: result.customer.id,
          payments: payments.value
        })
        
        // Emit success hook
        await nuxtApp.callHook('payments:success', {
          payment: result.payment,
          customer: result.customer,
          timestamp: Date.now()
        })
        
        return true
      }
      
      return false
    } catch (error) {
      console.error('[Payments] Verification failed:', error)
      return false
    } finally {
      isProcessing.value = false
    }
  }
  
  /**
   * Load customer payment history
   * Emits hook for external data loading
   */
  const loadPayments = async (options?: {
    customerId?: string
    email?: string
  }): Promise<void> => {
    try {
      // Emit hook - handler must return payment array
      const history = await nuxtApp.callHook('payments:load-history', {
        customerId: options?.customerId || customerId.value || undefined,
        email: options?.email,
        timestamp: Date.now()
      })
      
      if (history && Array.isArray(history)) {
        payments.value = history
        
        // Save to storage
        if (customerId.value || options?.customerId) {
          saveCustomerData({
            id: customerId.value || options!.customerId!,
            payments: history
          })
        }
      }
    } catch (error) {
      console.error('[Payments] Failed to load payment history:', error)
    }
  }
  
  /**
   * Clear all payment data
   */
  const clear = () => {
    payments.value = []
    customerId.value = null
    clearCustomerData()
  }
  
  /**
   * Initialize from storage
   */
  const initialize = () => {
    const stored = loadCustomerData()
    if (stored) {
      customerId.value = stored.id
      payments.value = stored.payments
    }
  }
  
  return {
    // State (readonly to prevent external mutation)
    payments: readonly(payments),
    customerId: readonly(customerId),
    isProcessing,
    
    // Route helpers
    getRouteConfig,
    routeRequiresPayment,
    
    // Payment checks
    hasPaid,
    hasActiveSubscription,
    getPayment,
    
    // Actions
    checkout,
    verify,
    loadPayments,
    clear,
    initialize
  }
}
```

**Critical decisions:**
- Shared state via `useState` → SSR-safe singleton
- Storage abstraction → Supports cookie/localStorage
- Pattern matching → Glob-style strings OR regex (same as auth)
- No provider logic → Only emits events
- Readonly exports → Prevents external state mutation
- Separate customer ID tracking → Support multi-customer scenarios
- Payment list management → Track all purchases/subscriptions

---

## **PHASE 3: CLIENT PLUGIN**

### **File: `modules/payments/runtime/plugins/payments.client.ts`**

```typescript
/**
 * Payments module initialization
 * Runs on client-side only
 * Handles payment history loading and middleware registration
 */
export default defineNuxtPlugin({
  name: 'payments',
  enforce: 'pre', // Run before other plugins
  
  async setup(nuxtApp) {
    const config = useRuntimeConfig().public.payments
    
    // Skip if module disabled
    if (!config?.enabled) return
    
    const { initialize, routeRequiresPayment, hasPaid, getRouteConfig } = usePayments()
    
    // Initialize from storage
    initialize()
    
    // Register route middleware dynamically
    addRouteMiddleware('payment-guard', async (to) => {
      const paymentReq = routeRequiresPayment(to.path)
      
      // Route doesn't require payment
      if (!paymentReq.required) {
        return
      }
      
      // Must have auth first (if auth module enabled)
      const authConfig = useRuntimeConfig().public.auth
      if (authConfig?.enabled) {
        const { isAuthenticated } = useAuth()
        if (!isAuthenticated.value) {
          // Let auth middleware handle
          return
        }
      }
      
      // Check if user has paid
      if (paymentReq.priceId && !hasPaid(paymentReq.priceId)) {
        const routeConfig = getRouteConfig(to.path)
        const redirectTo = routeConfig?.redirect || '/pricing'
        
        return navigateTo(redirectTo)
      }
    }, { global: true })
  }
})
```

**Critical decisions:**
- `enforce: 'pre'` → Runs before user plugins
- Client-only → Payments are client-side concern
- Dynamic middleware → Avoids file in middleware directory
- Initialize on mount → Load stored payment data immediately
- Global middleware → Checks all routes automatically
- Auth integration → Checks auth state if auth module present
- No tight coupling → Uses optional chaining for auth check

---

## **PHASE 4: PAYMENT GATE COMPONENT**

### **File: `modules/payments/runtime/components/PaymentGate.vue`**

```vue
<script setup lang="ts">
/**
 * Protection wrapper for premium content
 * Alternative to route-based payment requirements
 */
const props = defineProps<{
  /**
   * Price ID required for access
   */
  priceId: string
  
  /**
   * Payment mode
   * @default 'payment'
   */
  mode?: 'payment' | 'subscription'
  
  /**
   * Override route-based requirement
   */
  require?: boolean
  
  /**
   * Custom metadata for payment hook
   */
  metadata?: Record<string, any>
  
  /**
   * Show fallback slot instead of nothing
   */
  fallback?: boolean
}>()

const { hasPaid, routeRequiresPayment } = usePayments()

// Check auth if auth module present
const authConfig = useRuntimeConfig().public.auth
const isAuthenticated = authConfig?.enabled 
  ? useAuth().isAuthenticated 
  : ref(true)

const shouldGate = computed(() => {
  // Explicit override
  if (props.require === false) return false
  
  // Must be authenticated first
  if (!isAuthenticated.value) return false
  
  // Check if payment is required
  const paymentReq = routeRequiresPayment()
  const requiresPayment = props.require !== undefined 
    ? props.require 
    : paymentReq.required
  
  if (!requiresPayment) return false
  
  // Check if user has paid
  return !hasPaid(props.priceId)
})
</script>

<template>
  <div>
    <!-- Show content if paid or not gated -->
    <slot v-if="!shouldGate" />
    
    <!-- Fallback slot if payment required -->
    <div v-else-if="fallback">
      <slot name="fallback">
        <div class="flex items-center justify-center min-h-screen">
          <div class="text-center space-y-4">
            <h2 class="text-2xl font-bold">
              Premium Content
            </h2>
            <p class="text-muted-foreground">
              This content requires payment to access
            </p>
            <!-- CheckoutButton component will trigger checkout -->
            <slot name="checkout-button">
              <CheckoutButton 
                :price-id="priceId" 
                :mode="mode"
              />
            </slot>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
```

**Critical decisions:**
- Requires `priceId` prop → Explicit payment requirement
- Optional `mode` prop → Support subscriptions & one-time
- Auth integration → Checks auth if auth module present
- Fallback slot → Custom "payment required" UI
- Checkout button slot → Allow custom button component

---

## **PHASE 5: CHECKOUT BUTTON COMPONENT**

### **File: `modules/payments/runtime/components/CheckoutButton.vue`**

```vue
<script setup lang="ts">
/**
 * Trigger checkout flow
 * Emits payment hooks for external checkout creation
 */
const props = defineProps<{
  /**
   * Price ID for checkout
   */
  priceId: string
  
  /**
   * Payment mode
   * @default 'payment'
   */
  mode?: 'payment' | 'subscription'
  
  /**
   * Custom success URL
   */
  successUrl?: string
  
  /**
   * Custom cancel URL
   */
  cancelUrl?: string
  
  /**
   * Custom metadata
   */
  metadata?: Record<string, any>
  
  /**
   * Button label
   */
  label?: string
  
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * Button color
   */
  color?: string
  
  /**
   * Button variant
   */
  variant?: 'solid' | 'outline' | 'soft' | 'ghost'
}>()

const { checkout, isProcessing } = usePayments()

const handleCheckout = async () => {
  await checkout(props.priceId, {
    mode: props.mode,
    successUrl: props.successUrl,
    cancelUrl: props.cancelUrl,
    metadata: props.metadata
  })
}
</script>

<template>
  <UButton
    :label="label || 'Purchase Now'"
    :size="size || 'lg'"
    :color="color || 'primary'"
    :variant="variant || 'solid'"
    :loading="isProcessing"
    :disabled="isProcessing"
    @click="handleCheckout"
  />
</template>
```

**Critical decisions:**
- Simple button wrapper → Delegates to `checkout()`
- Customizable appearance → Size, color, variant props
- Loading state → Shows spinner during processing
- Disabled during processing → Prevents double-clicks

---

## **PHASE 6: MODULE DEFINITION**

### **File: `modules/payments/index.ts`**

```typescript
import { addComponent, addImports, addPlugin, addTypeTemplate, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit'
import type { PaymentsModuleOptions } from './types'

export default defineNuxtModule<PaymentsModuleOptions>({
  meta: {
    name: 'payments',
    configKey: 'payments',
    compatibility: {
      nuxt: '>=4.0.0'
    }
  },
  
  defaults: {
    enabled: false,
    routes: [],
    storage: {
      driver: 'localStorage',
      key: 'payments:customer',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    },
    checkout: {
      successUrl: '/checkout/success',
      cancelUrl: '/checkout/cancel',
      currency: 'usd'
    }
  },
  
  setup(options, nuxt) {
    const logger = useLogger('payments')
    const resolver = createResolver(import.meta.url)
    
    // Skip setup if disabled
    if (!options.enabled) {
      logger.info('Module disabled')
      return
    }
    
    logger.info('Setting up payments module')
    
    // ========================================
    // RUNTIME CONFIG
    // ========================================
    
    nuxt.options.runtimeConfig.public.payments = options
    
    // ========================================
    // COMPOSABLES
    // ========================================
    
    addImports({
      name: 'usePayments',
      from: resolver.resolve('./runtime/composables/usePayments')
    })
    
    // ========================================
    // COMPONENTS
    // ========================================
    
    addComponent({
      name: 'PaymentGate',
      filePath: resolver.resolve('./runtime/components/PaymentGate.vue')
    })
    
    addComponent({
      name: 'CheckoutButton',
      filePath: resolver.resolve('./runtime/components/CheckoutButton.vue')
    })
    
    // ========================================
    // PLUGINS
    // ========================================
    
    addPlugin({
      src: resolver.resolve('./runtime/plugins/payments.client'),
      mode: 'client'
    })
    
    // ========================================
    // TYPE AUGMENTATION
    // ========================================
    
    addTypeTemplate({
      filename: 'types/payments.d.ts',
      getContents: () => `
import type { CustomerPayment, PaymentSession } from '${resolver.resolve('./types')}'

declare module '#app' {
  interface RuntimeNuxtHooks {
    'payments:create-checkout': (payload: {
      priceId: string
      mode: 'payment' | 'subscription'
      successUrl: string
      cancelUrl: string
      metadata?: Record<string, any>
    }) => Promise<PaymentSession> | PaymentSession
    
    'payments:verify': (payload: {
      sessionId: string
      timestamp: number
    }) => Promise<{
      payment: CustomerPayment
      customer: { id: string, email: string }
    } | null> | {
      payment: CustomerPayment
      customer: { id: string, email: string }
    } | null
    
    'payments:load-history': (payload: {
      customerId?: string
      email?: string
      timestamp: number
    }) => Promise<CustomerPayment[]> | CustomerPayment[]
    
    'payments:success': (payload: {
      payment: CustomerPayment
      customer: { id: string, email: string }
      timestamp: number
    }) => void | Promise<void>
    
    'payments:failed': (payload: {
      error: string
      priceId: string
      timestamp: number
    }) => void | Promise<void>
    
    'payments:refunded': (payload: {
      paymentId: string
      amount: number
      timestamp: number
    }) => void | Promise<void>
  }
}

export {}
      `
    })
    
    logger.success('Payments module configured')
  }
})

// Export types for external use
export type { PaymentsModuleOptions, CustomerPayment, PaymentSession, PaymentRouteConfig } from './types'
```

**Critical decisions:**
- Auto-discovery compatible → Create in `modules/payments/`
- Defaults → Sensible starting point (30-day storage, USD)
- Logger integration → Standard Nuxt logging
- Type template → Automatic hook type augmentation
- Export types → Allow users to import for typing
- Two components → Gate + Button for different use cases

---

## **PHASE 7: INTEGRATION PATTERNS**

### **Pattern A: Auth-First → Payment Gates Content**

User authenticates, then payment unlocks premium features:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  auth: {
    enabled: true,
    routes: [
      {
        pattern: '/dashboard/**',
        require: true,
        redirect: '/login'
      }
    ]
  },
  
  payments: {
    enabled: true,
    routes: [
      {
        pattern: '/dashboard/premium/**',
        require: true,
        priceId: 'price_premium_monthly',
        mode: 'subscription',
        redirect: '/pricing'
      }
    ]
  },
  
  hooks: {
    // Payment success → Update auth user metadata
    'payments:success': async ({ payment, customer }) => {
      const { user, setUser } = useAuth()
      
      if (user.value) {
        await setUser({
          ...user.value,
          metadata: {
            ...user.value.metadata,
            subscriptionId: payment.id,
            priceId: payment.priceId,
            subscribedAt: payment.createdAt
          }
        })
      }
    }
  }
})
```

### **Pattern B: Payment-First → Grants Authentication**

Payment automatically authenticates user:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  auth: {
    enabled: true,
    routes: [
      {
        pattern: '/course/**',
        require: true,
        redirect: '/'
      }
    ]
  },
  
  payments: {
    enabled: true,
    routes: [
      {
        pattern: '/course/**',
        require: true,
        priceId: 'price_course_lifetime',
        mode: 'payment'
      }
    ]
  },
  
  hooks: {
    // Payment success → Grant auth automatically
    'payments:success': async ({ payment, customer }) => {
      await useAuth().setUser({
        id: customer.id,
        email: customer.email,
        metadata: {
          paymentId: payment.id,
          priceId: payment.priceId,
          purchasedAt: payment.createdAt
        }
      })
    }
  }
})
```

### **Pattern C: Stripe Integration Example**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  payments: {
    enabled: true,
    routes: [
      {
        pattern: '/premium/**',
        require: true,
        priceId: 'price_premium',
        redirect: '/pricing'
      }
    ]
  },
  
  hooks: {
    // Create Stripe checkout session
    'payments:create-checkout': async ({ priceId, mode, successUrl, cancelUrl }) => {
      const { data } = await $fetch('/api/stripe/checkout', {
        method: 'POST',
        body: {
          priceId,
          mode,
          successUrl,
          cancelUrl
        }
      })
      
      return {
        id: data.sessionId,
        url: data.url,
        status: 'open',
        priceId,
        amount: data.amount,
        currency: data.currency
      }
    },
    
    // Verify Stripe payment
    'payments:verify': async ({ sessionId }) => {
      const { data } = await $fetch('/api/stripe/verify', {
        method: 'POST',
        body: { sessionId }
      })
      
      if (!data) return null
      
      return {
        payment: {
          id: data.paymentId,
          customerId: data.customerId,
          priceId: data.priceId,
          amount: data.amount,
          currency: data.currency,
          status: 'active',
          type: data.mode === 'subscription' ? 'subscription' : 'one_time',
          createdAt: Date.now()
        },
        customer: {
          id: data.customerId,
          email: data.customerEmail
        }
      }
    },
    
    // Load Stripe payment history
    'payments:load-history': async ({ customerId, email }) => {
      const { data } = await $fetch('/api/stripe/payments', {
        query: { customerId, email }
      })
      
      return data.map(p => ({
        id: p.id,
        customerId: p.customerId,
        priceId: p.priceId,
        amount: p.amount,
        currency: p.currency,
        status: p.status,
        type: p.type,
        createdAt: p.createdAt,
        expiresAt: p.expiresAt
      }))
    }
  }
})
```

```typescript
// server/api/stripe/checkout.post.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default defineEventHandler(async (event) => {
  const { priceId, mode, successUrl, cancelUrl } = await readBody(event)
  
  const session = await stripe.checkout.sessions.create({
    mode: mode === 'subscription' ? 'subscription' : 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${getRequestURL(event).origin}${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${getRequestURL(event).origin}${cancelUrl}`
  })
  
  return {
    sessionId: session.id,
    url: session.url,
    amount: session.amount_total,
    currency: session.currency
  }
})
```

```typescript
// server/api/stripe/verify.post.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default defineEventHandler(async (event) => {
  const { sessionId } = await readBody(event)
  
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['customer', 'subscription', 'payment_intent']
  })
  
  if (session.payment_status !== 'paid') {
    return null
  }
  
  return {
    paymentId: session.payment_intent?.id || session.subscription?.id,
    customerId: session.customer.id,
    customerEmail: session.customer_email,
    priceId: session.line_items.data[0].price.id,
    amount: session.amount_total,
    currency: session.currency,
    mode: session.mode
  }
})
```

### **Pattern D: LemonSqueezy Integration Example**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  payments: {
    enabled: true
  },
  
  hooks: {
    'payments:create-checkout': async ({ priceId, successUrl, cancelUrl }) => {
      const { data } = await $fetch('/api/lemonsqueezy/checkout', {
        method: 'POST',
        body: { priceId, successUrl, cancelUrl }
      })
      
      return {
        id: data.checkoutId,
        url: data.checkoutUrl,
        status: 'open',
        priceId,
        amount: data.amount,
        currency: 'usd'
      }
    }
  }
})
```

---

## **PHASE 8: USAGE EXAMPLES**

### **Example 1: Simple Premium Content**

```vue
<!-- pages/premium/index.vue -->
<template>
  <PaymentGate price-id="price_premium" fallback>
    <template #fallback>
      <div class="max-w-2xl mx-auto text-center space-y-6">
        <h1 class="text-4xl font-bold">Premium Content</h1>
        <p class="text-xl text-muted-foreground">
          Get access to exclusive premium content for $9.99
        </p>
        <CheckoutButton 
          price-id="price_premium" 
          label="Unlock Premium Content"
          size="xl"
        />
      </div>
    </template>
    
    <!-- Your premium content here -->
    <div>
      <h1>Welcome to Premium!</h1>
      <p>This is your exclusive content.</p>
    </div>
  </PaymentGate>
</template>
```

### **Example 2: Subscription-Based Access**

```vue
<!-- pages/app/index.vue -->
<template>
  <AuthGate>
    <PaymentGate 
      price-id="price_monthly_subscription" 
      mode="subscription"
      fallback
    >
      <template #fallback>
        <div class="text-center space-y-4">
          <h2>Subscribe to Continue</h2>
          <p>Access all features with a monthly subscription</p>
          <CheckoutButton 
            price-id="price_monthly_subscription"
            mode="subscription"
            label="Subscribe for $19/month"
          />
        </div>
      </template>
      
      <!-- SaaS app content -->
      <YourSaaSApp />
    </PaymentGate>
  </AuthGate>
</template>
```

### **Example 3: Multiple Payment Tiers**

```vue
<!-- pages/pricing.vue -->
<template>
  <div class="grid md:grid-cols-3 gap-6">
    <div class="border rounded-lg p-6 space-y-4">
      <h3 class="text-2xl font-bold">Basic</h3>
      <p class="text-3xl font-bold">$9<span class="text-sm">/mo</span></p>
      <CheckoutButton 
        price-id="price_basic_monthly"
        mode="subscription"
        label="Subscribe"
      />
    </div>
    
    <div class="border rounded-lg p-6 space-y-4 border-primary">
      <h3 class="text-2xl font-bold">Pro</h3>
      <p class="text-3xl font-bold">$29<span class="text-sm">/mo</span></p>
      <CheckoutButton 
        price-id="price_pro_monthly"
        mode="subscription"
        label="Subscribe"
        color="primary"
      />
    </div>
    
    <div class="border rounded-lg p-6 space-y-4">
      <h3 class="text-2xl font-bold">Enterprise</h3>
      <p class="text-3xl font-bold">$99<span class="text-sm">/mo</span></p>
      <CheckoutButton 
        price-id="price_enterprise_monthly"
        mode="subscription"
        label="Subscribe"
      />
    </div>
  </div>
</template>
```

### **Example 4: Checkout Success Page**

```vue
<!-- pages/checkout/success.vue -->
<script setup>
const route = useRoute()
const { verify } = usePayments()

const isVerifying = ref(true)
const verificationSuccess = ref(false)

onMounted(async () => {
  const sessionId = route.query.session_id
  
  if (sessionId) {
    verificationSuccess.value = await verify(sessionId as string)
  }
  
  isVerifying.value = false
  
  // Redirect after 3 seconds
  if (verificationSuccess.value) {
    setTimeout(() => {
      navigateTo('/dashboard')
    }, 3000)
  }
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center space-y-4">
      <template v-if="isVerifying">
        <UIcon name="i-lucide-loader-2" class="animate-spin size-12 mx-auto" />
        <p>Verifying your payment...</p>
      </template>
      
      <template v-else-if="verificationSuccess">
        <UIcon name="i-lucide-check-circle" class="size-12 mx-auto text-success" />
        <h1 class="text-2xl font-bold">Payment Successful!</h1>
        <p>Redirecting you to your content...</p>
      </template>
      
      <template v-else>
        <UIcon name="i-lucide-x-circle" class="size-12 mx-auto text-error" />
        <h1 class="text-2xl font-bold">Payment Failed</h1>
        <p>Please try again or contact support.</p>
      </template>
    </div>
  </div>
</template>
```

---

## **PHASE 9: TESTING CHECKLIST**

### **Module Registration**
- ✅ Module auto-discovered in `modules/payments/`
- ✅ Module skips setup when `enabled: false`
- ✅ Runtime config properly exposed

### **Route Protection**
- ✅ Routes without payment requirements accessible
- ✅ Routes with payment requirements block unpaid users
- ✅ Glob patterns match correctly (`/premium/**`)
- ✅ Regex patterns match correctly (`/^\/paid\/.*/`)
- ✅ Redirect works to pricing page

### **Payment Flow**
- ✅ Checkout button triggers `payments:create-checkout` hook
- ✅ External checkout URL navigation works
- ✅ Success page verification works
- ✅ `payments:verify` hook returns correct data
- ✅ Payment status persists in storage

### **Status Management**
- ✅ `hasPaid()` returns correct status
- ✅ `hasActiveSubscription()` works
- ✅ Payment history loads correctly
- ✅ Storage persistence works (localStorage/cookie)

### **Event System**
- ✅ `payments:create-checkout` fires with correct payload
- ✅ `payments:verify` fires on success page
- ✅ `payments:success` fires after verification
- ✅ `payments:failed` fires on error
- ✅ `payments:load-history` fires when needed

### **Integration**
- ✅ Works with auth module (auth-first pattern)
- ✅ Payment grants auth (payment-first pattern)
- ✅ Stripe integration works
- ✅ LemonSqueezy integration works
- ✅ Custom provider implementation works

### **Components**
- ✅ `<PaymentGate>` shows/hides content correctly
- ✅ `<CheckoutButton>` triggers checkout
- ✅ Loading states work
- ✅ Fallback slots render correctly

---

## **PHASE 10: DOCUMENTATION**

### **File: `modules/payments/README.md`**

```markdown
# Payments Module

Event-driven payments system for Nuxt 4.

## Features

- Route-based payment requirements (glob patterns & regex)
- Payment status tracking (subscriptions, one-time purchases)
- Event-driven integration (zero coupling to providers)
- SSR-safe state management
- TypeScript support

## Installation

Module auto-discovers from `modules/payments/`.

## Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  payments: {
    enabled: true,
    
    routes: [
      {
        pattern: '/premium/**',
        require: true,
        priceId: 'price_premium',
        mode: 'subscription',
        redirect: '/pricing'
      }
    ],
    
    storage: {
      driver: 'localStorage', // or 'cookie'
      key: 'payments:customer',
      maxAge: 2592000 // 30 days
    },
    
    checkout: {
      successUrl: '/checkout/success',
      cancelUrl: '/checkout/cancel',
      currency: 'usd'
    }
  }
})
```

## Components

### PaymentGate

```vue
<PaymentGate price-id="price_premium" fallback>
  <template #fallback>
    <p>Payment required</p>
    <CheckoutButton price-id="price_premium" />
  </template>
  
  <YourPremiumContent />
</PaymentGate>
```

### CheckoutButton

```vue
<CheckoutButton 
  price-id="price_premium"
  mode="subscription"
  label="Subscribe Now"
  size="xl"
/>
```

## Composable

```typescript
const { 
  payments,           // List of customer payments
  customerId,         // Customer ID
  isProcessing,       // Loading state
  hasPaid,            // Check if paid for price
  checkout,           // Trigger checkout
  verify,             // Verify payment
  loadPayments        // Load payment history
} = usePayments()

// Check payment status
if (hasPaid('price_premium')) {
  // User has paid
}

// Trigger checkout
await checkout('price_premium', {
  mode: 'subscription',
  successUrl: '/success',
  cancelUrl: '/cancel'
})

// Verify after redirect
await verify(sessionId)
```

## Hooks

### `payments:create-checkout`

Create checkout session (required).

```typescript
export default defineNuxtConfig({
  hooks: {
    'payments:create-checkout': async ({ priceId, mode, successUrl, cancelUrl }) => {
      // Create Stripe session
      const session = await stripe.checkout.sessions.create({
        mode,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: successUrl,
        cancel_url: cancelUrl
      })
      
      return {
        id: session.id,
        url: session.url,
        status: 'open',
        priceId,
        amount: session.amount_total,
        currency: session.currency
      }
    }
  }
})
```

### `payments:verify`

Verify payment after checkout (required).

```typescript
export default defineNuxtConfig({
  hooks: {
    'payments:verify': async ({ sessionId }) => {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      
      if (session.payment_status !== 'paid') return null
      
      return {
        payment: {
          id: session.payment_intent.id,
          customerId: session.customer,
          priceId: session.line_items.data[0].price.id,
          amount: session.amount_total,
          currency: session.currency,
          status: 'active',
          type: 'subscription',
          createdAt: Date.now()
        },
        customer: {
          id: session.customer,
          email: session.customer_email
        }
      }
    }
  }
})
```

### `payments:load-history`

Load customer payment history (optional).

```typescript
export default defineNuxtConfig({
  hooks: {
    'payments:load-history': async ({ customerId, email }) => {
      const payments = await stripe.paymentIntents.list({
        customer: customerId
      })
      
      return payments.data.map(p => ({
        id: p.id,
        customerId,
        priceId: p.metadata.priceId,
        amount: p.amount,
        currency: p.currency,
        status: 'active',
        type: 'one_time',
        createdAt: p.created * 1000
      }))
    }
  }
})
```

### `payments:success`

Emitted after successful payment.

```typescript
export default defineNuxtConfig({
  hooks: {
    'payments:success': async ({ payment, customer }) => {
      // Update auth user, send email, etc.
      await useAuth().setUser({
        ...useAuth().user.value,
        metadata: { subscriptionId: payment.id }
      })
    }
  }
})
```

### `payments:failed`

Emitted after failed payment.

```typescript
export default defineNuxtConfig({
  hooks: {
    'payments:failed': async ({ error, priceId }) => {
      console.error('Payment failed:', error)
    }
  }
})
```

## Integration Examples

See examples/ directory for:
- Stripe integration
- LemonSqueezy integration
- Auth + Payments integration
- Subscription management
```

---

## **IMPLEMENTATION ORDER**

### **Step 1: Create Structure**
```bash
mkdir -p modules/payments/runtime/{composables,plugins,components}
touch modules/payments/{index.ts,types.ts,README.md}
touch modules/payments/runtime/composables/usePayments.ts
touch modules/payments/runtime/plugins/payments.client.ts
touch modules/payments/runtime/components/{PaymentGate,CheckoutButton}.vue
```

### **Step 2: Implement Types**
- Create `types.ts` with interfaces and declarations
- Focus on hook definitions first
- Define `CustomerPayment` and `PaymentSession` structures

### **Step 3: Implement Composable**
- Create `usePayments.ts` with core logic
- Test storage works (localStorage/cookie)
- Test route matching works
- Test payment status checks

### **Step 4: Implement Plugin**
- Create `payments.client.ts` with initialization
- Register middleware dynamically
- Test route protection works
- Test auth integration (if auth module present)

### **Step 5: Implement Components**
- Create `PaymentGate.vue` wrapper
- Create `CheckoutButton.vue` trigger
- Test with protected content
- Test checkout flow

### **Step 6: Implement Module**
- Create `index.ts` module definition
- Register all pieces
- Test auto-discovery works
- Test with auth module

### **Step 7: Test Integration**
- Test Stripe integration
- Test LemonSqueezy integration
- Verify events fire correctly
- Confirm payments persist

### **Step 8: Document**
- Complete README with examples
- Add inline code comments
- Document hook payloads
- Create integration examples

---

## **CRITICAL SUCCESS CRITERIA**

✅ **Module loads when `enabled: true`**  
✅ **Module skips setup when `enabled: false`**  
✅ **Routes with payment requirements block unpaid users**  
✅ **Free routes remain accessible**  
✅ **Checkout button triggers checkout flow**  
✅ **Success page verifies payment**  
✅ **Payment status persists across reloads**  
✅ **Hooks fire with correct payloads**  
✅ **Zero coupling to payment providers**  
✅ **Works with auth module**  
✅ **TypeScript types fully inferred**  
✅ **Documentation complete with examples**

---

## **INTEGRATION WITH AUTH MODULE**

### **Event Flow: Auth → Payments**

```
1. User visits /premium (requires payment)
2. Auth middleware checks authentication
3. If not authenticated → 'auth:authentication-required'
4. User authenticates
5. Payments middleware checks payment
6. If not paid → redirect to /pricing
7. User clicks checkout button
8. 'payments:create-checkout' hook creates session
9. User completes payment
10. Success page calls verify()
11. 'payments:verify' hook confirms payment
12. 'payments:success' hook fires
13. User now has access to /premium
```

### **Event Flow: Payments → Auth**

```
1. User visits /course (requires payment)
2. User not authenticated (no auth required yet)
3. User clicks "Buy Course"
4. 'payments:create-checkout' creates session
5. User completes payment
6. 'payments:success' fires
7. Hook listener calls useAuth().setUser()
8. 'auth:login' fires
9. User now authenticated AND paid
10. Access to /course granted
```

**Key insight:** Modules communicate ONLY via events. No imports, no tight coupling.

---

## **FINAL NOTES FOR AI AGENT**

1. **Start with types** → They define the contract
2. **Test incrementally** → Each file testable in isolation
3. **Use logger liberally** → `useLogger('payments')` for significant events
4. **Follow Nuxt conventions** → Standard patterns throughout
5. **No shortcuts** → Implement exactly as specified
6. **Document as you go** → Inline comments + README
7. **Test route patterns** → Both glob and regex
8. **Verify SSR safety** → All refs via `useState`
9. **Check module registration** → Auto-discover from `modules/payments/`
10. **Validate hook emissions** → All hooks fire with correct payloads
11. **Test auth integration** → Works with auth module via events only
12. **Verify storage persistence** → Payments survive page reload

**Time estimate:** 5-7 hours for full implementation + testing

**Dependencies:** Can be built independently of auth module, but test integration after both complete.