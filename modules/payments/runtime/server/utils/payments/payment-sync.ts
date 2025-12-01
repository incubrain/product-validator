
import type { PaymentEvent } from '../../../types/payments'

/**
 * Mock storage functions (to be replaced with real implementation)
 * 
 * TODO: Replace these with actual storage implementation once the module
 * structure is finalized. For now, these serve as placeholders that log
 * what would be stored/retrieved.
 */
const mockStoreData = async (data: any) => {
  console.log('[Payments] 🔧 MOCK: Would store payment data:', data)
}

const mockGetData = async (filter: any): Promise<any[]> => {
  console.log('[Payments] 🔧 MOCK: Would get data with filter:', filter)
  return [] // Return empty array to indicate no existing records
}

const mockUpdateData = async (options: any) => {
  console.log('[Payments] 🔧 MOCK: Would update data:', options)
}

/**
 * Sync payment to storage (idempotent)
 */
export async function syncPaymentToStorage(payment: PaymentEvent) {
  try {
    console.warn('[Payments] ⚠️ Using mock storage - payments will not be persisted')
    
    // Use mock functions instead of importing storage-handler
    const storeData = mockStoreData
    const getData = mockGetData

    // ✅ Check if already processed (idempotency)
    // For subscriptions, we might want to allow updates (e.g. renewals), so we check transactionId
    // If it's a subscription update, the transactionId might be the subscriptionId or invoiceId
    const existing = await getData({ email: payment.customerEmail })
    
    const alreadyProcessed = existing?.some(
      (record: any) => 
        record.metadata?.transactionId === payment.transactionId &&
        record.metadata?.provider === payment.provider &&
        record.metadata?.status === payment.status // Allow updates if status changed
    )
    
    if (alreadyProcessed) {
      console.log(`[Payments] ⚠️ Payment ${payment.transactionId} already processed - skipping`)
      return
    }

    // Determine customer stage
    let customerStage = 'paid'
    if (payment.subscriptionId) {
      customerStage = 'subscriber'
    } else if (payment.status === 'refunded') {
      customerStage = 'refunded'
    }

    // ✅ Store payment
    await storeData({
      email: payment.customerEmail!,
      formId: `payment-${payment.provider}`,
      customerStage: customerStage,
      metadata: {
        provider: payment.provider,
        transactionId: payment.transactionId,
        subscriptionId: payment.subscriptionId,
        paymentIntentId: payment.paymentIntentId,
        productId: payment.productId,
        productName: payment.productName,
        userId: payment.userId,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        interval: payment.interval,
        currentPeriodEnd: payment.currentPeriodEnd,
        refundReason: payment.refundReason,
        paidAt: payment.timestamp,
        ...payment.metadata
      },
    })

    console.log(`[Payments] ✅ Payment/Subscription ${payment.transactionId} synced to storage (MOCK)`)
  } catch (error) {
    console.error('[Payments] Failed to sync payment:', error)
    // Don't throw - payment succeeded even if storage fails
  }
}

/**
 * Update payment status (for refunds)
 */
export async function updatePaymentStatus(
  transactionId: string,
  status: 'refunded' | 'failed'
) {
  try {
    console.warn('[Payments] ⚠️ Using mock storage - update will not be persisted')
    
    // Use mock function instead of importing storage-handler
    const updateData = mockUpdateData

    await updateData({
      filter: {
        'metadata.transactionId': transactionId
      },
      update: {
        customerStage: status,
        'metadata.status': status,
        'metadata.refundedAt': Date.now()
      }
    })

    console.log(`[Payments] ✅ Payment ${transactionId} updated to: ${status} (MOCK)`)
  } catch (error) {
    console.error('[Payments] Failed to update payment status:', error)
  }
}