import type { PaymentEvent } from '../../../types/payments'

/**
 * Sync payment to storage (idempotent)
 * 
 * IMPORTANT: Storage is not configured by default.
 * You must implement a storage adapter to persist payments.
 * 
 * Options:
 * 1. Use your existing KV/database utilities
 * 2. Implement a custom storage adapter
 * 3. Use a third-party service
 */
export async function syncPaymentToStorage(payment: PaymentEvent) {
  // For now, just log the payment
  // TODO: Implement actual storage integration
  console.warn('[Payments] ⚠️  Payment storage not implemented - payment data will not be persisted')
  console.log('[Payments] Payment event:', {
    provider: payment.provider,
    type: payment.type,
    transactionId: payment.transactionId,
    customerEmail: payment.customerEmail,
    amount: payment.amount,
    currency: payment.currency,
    status: payment.status
  })
  
  // Uncomment this when you're ready to enforce storage:
  // throw new Error(
  //   '[Payments] Storage not configured. ' +
  //   'Please implement syncPaymentToStorage() in modules/payments/runtime/server/utils/payments/payment-sync.ts ' +
  //   'to persist payment data to your database or KV store.'
  // )
}

/**
 * Update payment status (for refunds)
 */
export async function updatePaymentStatus(
  transactionId: string,
  status: 'refunded' | 'failed'
) {
  // TODO: Implement actual storage update
  console.warn('[Payments] ⚠️  Payment storage not implemented - status update will not be persisted')
  console.log(`[Payments] Would update payment ${transactionId} to status: ${status}`)
  
  // Uncomment this when you're ready to enforce storage:
  // throw new Error(
  //   '[Payments] Storage not configured. ' +
  //   'Please implement updatePaymentStatus() in modules/payments/runtime/server/utils/payments/payment-sync.ts ' +
  //   'to update payment status in your database or KV store.'
  // )
}