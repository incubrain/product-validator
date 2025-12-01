// modules/payments/runtime/server/api/payments/webhook.post.ts
import type { H3Event } from 'h3'
import type { PaymentEvent } from '../../../types/payments'
import { handleStripeWebhook } from '../../utils/payments/stripe-handler'
import { handleLemonSqueezyWebhook } from '../../utils/payments/lemonsqueezy-handler'
import { syncPaymentToStorage, updatePaymentStatus } from '../../utils/payments/payment-sync'

export default defineEventHandler(async (event) => {
  // Read raw body (required for signature verification)
  const body = await readRawBody(event)
  if (!body) {
    throw createError({ 
      statusCode: 400, 
      message: 'Missing request body' 
    })
  }
  
  // Detect provider by signature header
  const stripeSignature = getHeader(event, 'stripe-signature')
  const lemonSqueezySignature = getHeader(event, 'x-signature')
  
  let normalizedEvent: PaymentEvent
  
  try {
    if (stripeSignature) {
      console.log('[Payments] 📥 Stripe webhook received')
      normalizedEvent = await handleStripeWebhook(event, body, stripeSignature)
    } else if (lemonSqueezySignature) {
      console.log('[Payments] 📥 LemonSqueezy webhook received')
      normalizedEvent = await handleLemonSqueezyWebhook(event, body, lemonSqueezySignature)
    } else {
      throw createError({ 
        statusCode: 400, 
        message: 'Unknown webhook provider - missing signature header' 
      })
    }
    
    console.log(`[Payments] ✅ Webhook verified: ${normalizedEvent.type}`)
    
    // Process event based on type
    await processPaymentEvent(normalizedEvent, event)
    
    return { received: true }
    
  } catch (error) {
    console.error('[Payments] ❌ Webhook processing error:', error)
    
    // Only return error for signature verification failures
    if (error instanceof Error && error.message.includes('signature')) {
      throw createError({ 
        statusCode: 401, 
        message: 'Invalid signature' 
      })
    }
    
    // Return success for other errors to prevent endless retries
    return { 
      received: true, 
      error: error instanceof Error ? error.message : 'Unknown error' 
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