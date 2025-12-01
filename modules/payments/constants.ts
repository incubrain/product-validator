/**
 * Payment module constants
 */

// Stripe cents per dollar
export const CENTS_PER_DOLLAR = 100

// Default currencies
export const DEFAULT_CURRENCY = 'usd'

// Idempotency key TTL (24 hours in seconds)
export const IDEMPOTENCY_KEY_TTL = 86400

// Provider signature headers
export const PROVIDER_SIGNATURE_HEADERS = {
  stripe: 'stripe-signature',
  lemonsqueezy: 'x-signature'
} as const

// Logging prefixes
export const LOG_PREFIX = {
  payments: '[Payments]',
  stripe: '[Payments:Stripe]',
  lemonsqueezy: '[Payments:LemonSqueezy]',
  webhook: '[Payments:Webhook]',
  checkout: '[Payments:Checkout]'
} as const

// Event types
export const PAYMENT_EVENT_TYPES = {
  completed: 'payment.completed',
  refunded: 'payment.refunded'
} as const

// Payment statuses
export const PAYMENT_STATUSES = {
  succeeded: 'succeeded',
  pending: 'pending',
  failed: 'failed',
  refunded: 'refunded'
} as const
