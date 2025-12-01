
import Stripe from 'stripe'
import type { H3Event } from 'h3'
import type { PaymentEvent } from '../../../types/payments'

export async function handleStripeWebhook(
  event: H3Event,
  body: string,
  signature: string
): Promise<PaymentEvent> {
  const config = useRuntimeConfig()
  
  // Use the latest API version supported by the installed library
  // or fallback to a safe default if unknown.
  // The lint error suggested '2025-11-17.clover'
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-11-17.clover' as any // Cast to any to avoid strict type check if mismatch
  })
  
  // ✅ Verify webhook signature
  let stripeEvent: Stripe.Event
  
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      config.payments?.webhook?.stripe?.secret!
    )
  } catch (error) {
    console.error('[Stripe] Signature verification failed:', error)
    throw createError({ 
      statusCode: 401, 
      message: 'Invalid signature' 
    })
  }
  
  // ✅ Route to appropriate handler
  switch (stripeEvent.type) {
    case 'checkout.session.completed':
      return handleCheckoutCompleted(stripeEvent)
      
    case 'payment_intent.succeeded':
      return handlePaymentIntentSucceeded(stripeEvent)
      
    case 'charge.refunded':
      return handleChargeRefunded(stripeEvent)

    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      return handleSubscriptionUpdate(stripeEvent)
      
    case 'invoice.payment_succeeded':
      return handleInvoicePaymentSucceeded(stripeEvent)
      
    default:
      // Ignore other events but don't error
      console.log(`[Stripe] Ignoring event: ${stripeEvent.type}`)
      throw createError({ 
        statusCode: 200, 
        message: `Ignored event: ${stripeEvent.type}` 
      })
  }
}

function handleCheckoutCompleted(event: Stripe.Event): PaymentEvent {
  const session = event.data.object as Stripe.Checkout.Session
  
  if (!session.customer_details?.email) {
    throw new Error('Missing customer email in checkout session')
  }
  
  return {
    provider: 'stripe',
    type: 'payment.completed',
    transactionId: session.id,
    paymentIntentId: session.payment_intent as string,
    customerId: session.customer as string,
    customerEmail: session.customer_details.email,
    customerName: session.customer_details.name || undefined,
    amount: (session.amount_total || 0) / 100,
    currency: session.currency || 'usd',
    productId: session.metadata?.productId,
    userId: session.metadata?.userId,
    status: 'succeeded',
    metadata: session.metadata || {},
    timestamp: Date.now(),
    raw: session,
  }
}

function handlePaymentIntentSucceeded(event: Stripe.Event): PaymentEvent {
  const paymentIntent = event.data.object as Stripe.PaymentIntent
  
  if (paymentIntent.metadata?.processedViaCheckout === 'true') {
    throw new Error('Already processed via checkout session')
  }
  
  return {
    provider: 'stripe',
    type: 'payment.completed',
    transactionId: paymentIntent.id,
    paymentIntentId: paymentIntent.id,
    customerId: paymentIntent.customer as string,
    customerEmail: paymentIntent.receipt_email || undefined,
    amount: paymentIntent.amount / 100,
    currency: paymentIntent.currency,
    productId: paymentIntent.metadata?.productId,
    userId: paymentIntent.metadata?.userId,
    status: 'succeeded',
    metadata: paymentIntent.metadata || {},
    timestamp: Date.now(),
    raw: paymentIntent,
  }
}

function handleChargeRefunded(event: Stripe.Event): PaymentEvent {
  const charge = event.data.object as Stripe.Charge
  
  return {
    provider: 'stripe',
    type: 'payment.refunded',
    transactionId: charge.id,
    paymentIntentId: charge.payment_intent as string,
    customerId: charge.customer as string,
    customerEmail: charge.billing_details?.email || undefined,
    amount: charge.amount_refunded / 100,
    currency: charge.currency,
    refundReason: charge.refunds?.data[0]?.reason || undefined,
    status: 'refunded',
    metadata: charge.metadata || {},
    timestamp: Date.now(),
    raw: charge,
  }
}

function handleSubscriptionUpdate(event: Stripe.Event): PaymentEvent {
  const subscription = event.data.object as Stripe.Subscription
  
  return {
    provider: 'stripe',
    type: 'payment.completed', // Treat subscription updates as completed "events" for sync
    transactionId: subscription.id, // Use subscription ID as transaction ID for updates
    subscriptionId: subscription.id,
    customerId: subscription.customer as string,
    // We might not have email here if it's an update, but sync will handle it via customerId lookup if needed
    // Ideally we fetch customer, but for now let's rely on what we have or metadata
    customerEmail: undefined, 
    amount: (subscription.items.data[0]?.price.unit_amount || 0) / 100,
    currency: subscription.currency,
    productId: subscription.metadata?.productId,
    userId: subscription.metadata?.userId,
    status: subscription.status === 'active' ? 'succeeded' : 'failed', // Map to PaymentEvent status
    interval: subscription.items.data[0]?.price.recurring?.interval as 'month' | 'year' | undefined,
    currentPeriodEnd: subscription.current_period_end * 1000,
    metadata: {
      ...subscription.metadata,
      status: subscription.status,
      cancelAtPeriodEnd: subscription.cancel_at_period_end
    },
    timestamp: Date.now(),
    raw: subscription,
  }
}

function handleInvoicePaymentSucceeded(event: Stripe.Event): PaymentEvent {
  const invoice = event.data.object as Stripe.Invoice
  
  // Only care about subscription invoices
  if (!invoice.subscription) {
    throw new Error('Not a subscription invoice')
  }

  return {
    provider: 'stripe',
    type: 'payment.completed',
    transactionId: invoice.id,
    subscriptionId: invoice.subscription as string,
    customerId: invoice.customer as string,
    customerEmail: invoice.customer_email || undefined,
    amount: invoice.amount_paid / 100,
    currency: invoice.currency,
    productId: invoice.lines.data[0]?.metadata?.productId, // Try to get from line item
    userId: invoice.metadata?.userId, // Try to get from invoice metadata
    status: 'succeeded',
    metadata: invoice.metadata || {},
    timestamp: Date.now(),
    raw: invoice,
  }
}
