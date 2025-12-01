// Type definitions for the payments module

export interface PaymentProduct {
  name: string
  provider: 'stripe' | 'lemonsqueezy'
  priceId: string
  amount: number
  currency: string
  description?: string
  image?: string
  /**
   * Subscription interval (if recurring)
   */
  interval?: 'month' | 'year'
  /**
   * Interval count (e.g. 3 for every 3 months)
   */
  intervalCount?: number
}

export interface PaymentsModuleOptions {
  enabled: boolean
  
  // Provider configs
  stripe?: {
    enabled: boolean
    publicKey?: string
    secret?: string // Private config
  }
  lemonsqueezy?: {
    enabled: boolean
    storeId?: string
    secret?: string // Private config
  }
  
  // Product definitions
  products?: Record<string, PaymentProduct>
  
  // Webhook config
  webhook?: {
    endpoint: string
    stripe?: {
      secret?: string
    }
    lemonsqueezy?: {
      secret?: string
    }
  }
}

export interface PaymentEvent {
  // Provider info
  provider: 'stripe' | 'lemonsqueezy'
  type: 'payment.completed' | 'payment.refunded'
  
  // Transaction details
  transactionId: string
  paymentIntentId?: string
  subscriptionId?: string // For subscriptions
  customerId?: string
  
  // Product details
  productId?: string
  productName?: string
  
  // Customer info
  userId?: string // From Better-Auth
  customerEmail?: string
  customerName?: string
  
  // Payment details
  amount: number
  currency: string
  status: 'succeeded' | 'pending' | 'failed' | 'refunded'
  
  // Subscription details
  interval?: 'month' | 'year'
  currentPeriodEnd?: number
  
  // Refund specific
  refundReason?: string
  
  // Metadata
  metadata: Record<string, any>
  timestamp: number
  
  // Raw event (for debugging)
  raw?: any
}

export interface CustomerPayment {
  id: string
  customerId: string
  priceId: string
  amount: number
  currency: string
  status: 'succeeded' | 'pending' | 'failed' | 'refunded' | 'active' | 'canceled' | 'past_due' | 'unpaid' | 'incomplete' | 'paid'
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
  require?: boolean
  priceId: string
  mode?: 'payment' | 'subscription'
  redirect?: string
  metadata?: Record<string, any>
}

// Runtime config type augmentation
declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    payments?: PaymentsModuleOptions
  }
  
  interface RuntimeConfig {
    payments?: {
      webhook?: PaymentsModuleOptions['webhook']
    }
  }
}

// Hook type augmentation
declare module '#app' {
  interface RuntimeNuxtHooks {
    'payment:completed': (event: PaymentEvent) => void | Promise<void>
    'payment:refunded': (event: PaymentEvent) => void | Promise<void>
  }
}

export {}
