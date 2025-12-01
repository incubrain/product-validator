// modules/payments/runtime/server/api/payments/webhook.post.ts
import type { H3Event } from 'h3'
import type { PaymentEvent } from '../../../types/payments'
import { getProviderRegistry } from '../../utils/payments/provider-registry'
import { syncPaymentToStorage, updatePaymentStatus } from '../../utils/payments/payment-sync'
import { WebhookError, isRetryableError, toH3Error } from '../../../../errors'

export default defineEventHandler(async (event) => {
  // Read raw body (required for signature verification)
  const body = await readRawBody(event)
  if (!body) {
    throw createError({ 
      statusCode: 400, 
      message: 'Missing request body' 
    })
  }
  
  // Auto-detect provider via registry
  const registry = getProviderRegistry()
  let normalizedEvent: PaymentEvent | null = null
  let detectedProvider: string | null = null
  
  try {
    // Try each registered provider
    for (const provider of registry.getAll()) {
      if (provider.detectWebhook(event)) {
        detectedProvider = provider.name
        console.log(`[Payments] 📥 ${provider.name} webhook detected`)
        
        // Get signature based on provider
        const signature = getHeader(event, provider.name === 'stripe' ? 'stripe-signature' : 'x-signature')
        if (!signature) {
          throw new WebhookError('Missing signature header', provider.name, false)
        }
        
        normalizedEvent = await provider.handleWebhook(event, body, signature)
        break
      }
    }
    
    if (!normalizedEvent) {
      throw new WebhookError(
        'Unknown webhook provider - no registered provider detected',
        undefined,
        false  // Not retryable - we don't recognize this webhook
      )
    }
    
    console.log(`[Payments] ✅ Webhook verified: ${normalizedEvent.type} from ${detectedProvider}`)
    
    // Process event based on type
    await processPaymentEvent(normalizedEvent, event)
    
    return { received: true }
    
  } catch (error) {
    console.error('[Payments] ❌ Webhook processing error:', error)
    
    // Check if error is retryable
    if (isRetryableError(error)) {
      // Return 500 to trigger provider retry
      throw toH3Error(new WebhookError(
        error instanceof Error ? error.message : 'Temporary webhook processing failure',
        detectedProvider || undefined,
        true  // Retryable
      ))
    }
    
    // For non-retryable errors, log and return success to prevent retries
    console.log('[Payments] ⚠️  Non-retryable error - acknowledging webhook to prevent retries')
    return { 
      received: true, 
      error: error instanceof Error ? error.message : 'Unknown error',
      code: 'acknowledged_with_errors'
    }
  }
})

/**
 * Process normalized payment event
 */
async function processPaymentEvent(paymentEvent: PaymentEvent, event: H3Event) {
  switch (paymentEvent.type) {
    case 'payment.completed':
      await handlePaymentCompleted(paymentEvent, event)
      break
      
    case 'payment.refunded':
      await handlePaymentRefunded(paymentEvent, event)
      break
      
    default:
      console.log(`[Payments] ⚠️ Unhandled event type: ${paymentEvent.type}`)
  }
}

/**
 * Handle successful payment
 */
async function handlePaymentCompleted(paymentEvent: PaymentEvent, event: H3Event) {
  console.log(`[Payments] 💰 Processing completed payment: ${paymentEvent.transactionId}`)
  
  // ✅ Emit event hook (for future plugin integration)
  await event.context.nuxt?.callHook('payment:completed', paymentEvent)
  
  // ✅ Mock storage sync
  await syncPaymentToStorage(paymentEvent)
  
  // TODO: Send confirmation email
  // TODO: Track analytics
  
  console.log(`[Payments] ✅ Payment processing complete`)
}

/**
 * Handle refund
 */
async function handlePaymentRefunded(paymentEvent: PaymentEvent, event: H3Event) {
  console.log(`[Payments] 💸 Processing refund: ${paymentEvent.transactionId}`)
  
  // ✅ Emit event hook
  await event.context.nuxt?.callHook('payment:refunded', paymentEvent)
  
  // ✅ Mock status update
  await updatePaymentStatus(paymentEvent.transactionId, 'refunded')
  
  // TODO: Send refund confirmation email
  console.log(`[Payments] ✅ Refund processing complete`)
}