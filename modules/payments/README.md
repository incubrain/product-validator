# Payments Module

Self-contained payment system with checkout and verification.

## What's Included

- ✅ State management (composables)
- ✅ Route protection (middleware)
- ✅ Payment persistence (localStorage/cookie)
- ✅ Checkout integration (Stripe/LemonSqueezy)
- ✅ Event emission for cross-module communication

## Quick Start

1. **Enable in `nuxt.config.ts`:**

```typescript
export default defineNuxtConfig({
  payments: {
    enabled: true,
    provider: 'stripe',
    routes: [
      {
        pattern: '/premium/**',
        priceId: 'price_xxx',
        redirect: '/pricing'
      }
    ]
  }
})
```

2. **Use in components:**

```vue
<script setup>
const { checkout } = usePayments()

const handleCheckout = async () => {
  await checkout('price_xxx', {
    mode: 'subscription',
    successUrl: '/success',
    cancelUrl: '/pricing'
  })
}
</script>

<template>
  <button @click="handleCheckout">
    Subscribe Now
  </button>
</template>
```

3. **Verify payments on success page:**

```typescript
// pages/success.vue
const route = useRoute()
const { verify } = usePayments()

onMounted(async () => {
  const sessionId = route.query.session_id
  if (sessionId) {
    await verify(sessionId)
  }
})
```

## Usage

```typescript
const { 
  hasPaid, 
  payments, 
  checkout, 
  verify 
} = usePayments()

// Check if user has paid
if (hasPaid('price_xxx')) {
  console.log('User has access')
}

// Get all payments
console.log(payments.value)

// Create checkout
await checkout('price_xxx')

// Verify payment
await verify(sessionId)
```

## Customization

Since modules live in the same repo, you can edit files directly:

- `modules/payments/runtime/plugins/payments.client.ts` - Customize behavior
- `modules/payments/runtime/composables/usePayments.ts` - Extend functionality
- `modules/payments/runtime/components/` - Add custom components

## Events

The module emits these events for cross-module communication:

- `payment:checkout` - Emitted when creating checkout session
- `payment:verify` - Emitted when verifying payment
- `payment:success` - Emitted after successful payment
- `payment:failed` - Emitted after failed payment
- `payment:refunded` - Emitted after refund

Other modules can listen to these events (e.g., auth module updates user metadata on `payment:success`).

## Configuration Options

```typescript
{
  payments: {
    enabled: boolean              // Enable/disable module
    provider: 'stripe' | 'lemonsqueezy'  // Payment provider
    storage: {
      driver: 'localStorage' | 'cookie'  // Storage method
      key: string                 // Storage key (default: 'payments:customer')
    }
    routes: PaymentRouteConfig[]  // Protected routes
    checkout: {
      successUrl: string          // Default success redirect
      cancelUrl: string           // Default cancel redirect
    }
  }
}
```

## Architecture

**Self-Contained Design:**
- Plugin handles all event listeners
- Composable provides state and methods
- Module updates its own state
- Integrates with auth module via events

**Event Flow:**
```
User clicks checkout button
  → Component calls checkout()
  → Composable emits payment:checkout
  → Plugin creates session & redirects to Stripe
  → User completes payment
  → Stripe redirects to success page
  → Page calls verify()
  → Plugin emits payment:verify
  → API verifies payment
  → Plugin emits payment:success
  → State updated & user granted access
```

## Integration with Auth

The payments module automatically updates auth user metadata on successful payment:

```typescript
// After payment:success event
user.metadata = {
  ...user.metadata,
  paymentId: payment.id,
  priceId: payment.priceId,
  subscribedAt: payment.createdAt
}
```
