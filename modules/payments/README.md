# Payments Module

Self-contained, provider-agnostic payment system with checkout, webhooks, and subscription management.

## Features

✅ **Provider Abstraction** - Easily add new payment providers  
✅ **Auto-Discovery** - Webhooks automatically route to the correct provider  
✅ **Type-Safe** - Comprehensive TypeScript types and error classes  
✅ **Retry Logic** - Intelligent webhook retry with retryability detection  
✅ **Configuration Validation** - Fails fast with clear error messages  
✅ **Better-Auth Integration** - Automatic user context in checkouts  

**Supported Providers**:
- ✅ Stripe (Full support: checkout + webhooks + portal)
- ✅ LemonSqueezy (Webhooks only, manual checkout via dashboard)

---

## Quick Start

### 1. Install Dependencies

```bash
pnpm add stripe  # For Stripe support
```

### 2. Configure Module

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  payments: {
    enabled: true,
    
    stripe: {
      enabled: true,
      publicKey: process.env.STRIPE_PUBLIC_KEY,
      secretKey: process.env.STRIPE_SECRET_KEY,
      apiVersion: '2025-11-17.clover', // Optional
    },
    
    products: {
      'premium': {
        name: 'Premium Plan',
        provider: 'stripe',
        priceId: 'price_xxx',
        amount: 2900,
        currency: 'usd',
        interval: 'month'
      }
    },
    
    webhook: {
      endpoint: '/api/payments/webhook',
      stripe: { secret: process.env.STRIPE_WEBHOOK_SECRET }
    }
  }
})
```

### 3. Use in Components

```vue
<script setup>
const { createCheckout } = usePayments()

async function buyPremium() {
  const url = await createCheckout({
    productId: 'premium',
    successUrl: '/dashboard',
    cancelUrl: '/pricing'
  })
  
  if (url) window.location.href = url
}
</script>

<template>
  <button @click="buyPremium">Buy Premium - $29/mo</button>
</template>
```

## Adding a New Provider

1. Implement `PaymentProvider` interface
2. Register in `register-providers.ts` plugin
3. Done! No other code changes needed

See README for full documentation and examples.
