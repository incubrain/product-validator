import Stripe from 'stripe'
import type { H3Event } from 'h3'
import type { PaymentProvider, CheckoutOptions, PaymentEvent } from '../../../../../types'

/**
 * Stripe payment provider implementation
 */
export class StripeProvider implements PaymentProvider {
  name = 'stripe' as const
  private stripe: Stripe
  
  constructor() {
    const config = useRuntimeConfig()
    
    const secretKey = config.payments?.stripe?.secretKey
    if (!secretKey) {
      throw new Error('[Stripe] Secret key not configured in runtime config')
    }
    
    const apiVersion = config.payments?.stripe?.apiVersion || '2025-11-17.clover'
    
    this.stripe = new Stripe(secretKey, {
      apiVersion: apiVersion as any
    })
  }
  
  // ============================================
  // CHECKOUT
  // ============================================
  
  async createCheckout(options: CheckoutOptions): Promise<string> {
    const config = useRuntimeConfig()
    const { product, user, successUrl, cancelUrl, mode = 'payment' } = options
    
    // Prepare line items
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []
    
    if (product.priceId) {
      // Use existing price ID (recommended for subscriptions)
      line_items.push({
        price: product.priceId,
        quantity: 1,
      })
    } else {
      // Create price on the fly
      const priceData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData = {
        currency: product.currency,
        product_data: {
          name: product.name,
          description: product.description,
          images: product.image ? [product.image] : undefined,
        },
        unit_amount: Math.round(product.amount * 100), // Stripe expects cents
      }

      // Add recurring field if subscription
      if (mode === 'subscription' && product.interval) {
        priceData.recurring = {
          interval: product.interval,
          interval_count: product.intervalCount || 1
        }
      }

      line_items.push({
        price_data: priceData,
        quantity: 1,
      })
    }
    
    const session = await this.stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: line_items,
      mode: mode,
      success_url: successUrl ? `${config.public.siteUrl}${successUrl}` : `${config.public.siteUrl}/checkout/success`,
      cancel_url: cancelUrl ? `${config.public.siteUrl}${cancelUrl}` : `${config.public.siteUrl}/checkout/cancel`,
      metadata: {
        userId: user.id,
        userName: user.name || '',
        authProvider: 'better-auth',
        productId: options.productId
      },
    })

    if (!session.url) {
      throw createError({
        statusCode: 500,
        message: 'Failed to create Stripe checkout session'
      })
    }

    return session.url
  }
  
  // ============================================
  // WEBHOOK
  // ============================================
  
  detectWebhook(event: H3Event): boolean {
    return !!getHeader(event, 'stripe-signature')
  }
  
  async handleWebhook(event: H3Event, body: string, signature: string): Promise<PaymentEvent> {
    const config = useRuntimeConfig()
    
    // Verify webhook signature
    let stripeEvent: Stripe.Event
    
    try {
      stripeEvent = this.stripe.webhooks.constructEvent(
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
    
    // Route to appropriate handler
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        return this.handleCheckoutCompleted(stripeEvent)
        
      case 'payment_intent.succeeded':
        return this.handlePaymentIntentSucceeded(stripeEvent)
        
      case 'charge.refunded':
        return this.handleChargeRefunded(stripeEvent)

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        return this.handleSubscriptionUpdate(stripeEvent)
        
      case 'invoice.payment_succeeded':
        return this.handleInvoicePaymentSucceeded(stripeEvent)
        
      default:
        // Ignore other events but don't error
        console.log(`[Stripe] Ignoring event: ${stripeEvent.type}`)
        throw createError({ 
          statusCode: 200, 
          message: `Ignored event: ${stripeEvent.type}` 
        })
    }
  }
  
  // ============================================
  // WEBHOOK EVENT HANDLERS
  // ============================================
  
  private handleCheckoutCompleted(event: Stripe.Event): PaymentEvent {
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
  
  private handlePaymentIntentSucceeded(event: Stripe.Event): PaymentEvent {
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
  
  private handleChargeRefunded(event: Stripe.Event): PaymentEvent {
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
  
  private handleSubscriptionUpdate(event: Stripe.Event): PaymentEvent {
    const subscription = event.data.object as Stripe.Subscription
    
    return {
      provider: 'stripe',
      type: 'payment.completed',
      transactionId: subscription.id,
      subscriptionId: subscription.id,
      customerId: subscription.customer as string,
      customerEmail: undefined,
      amount: (subscription.items.data[0]?.price.unit_amount || 0) / 100,
      currency: subscription.currency,
      productId: subscription.metadata?.productId,
      userId: subscription.metadata?.userId,
      status: subscription.status === 'active' ? 'succeeded' : 'failed',
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
  
  private handleInvoicePaymentSucceeded(event: Stripe.Event): PaymentEvent {
    const invoice = event.data.object as Stripe.Invoice
    
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
      productId: invoice.lines.data[0]?.metadata?.productId,
      userId: invoice.metadata?.userId,
      status: 'succeeded',
      metadata: invoice.metadata || {},
      timestamp: Date.now(),
      raw: invoice,
    }
  }
  
  // ============================================
  // CUSTOMER PORTAL
  // ============================================
  
  async createPortalSession(customerId: string, returnUrl?: string): Promise<string> {
    const config = useRuntimeConfig()
    
    const session = await this.stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl || config.public.siteUrl,
    })
    
    return session.url
  }
}
