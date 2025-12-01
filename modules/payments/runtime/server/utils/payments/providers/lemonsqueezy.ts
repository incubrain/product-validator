import crypto from 'crypto'
import type { H3Event } from 'h3'
import type { PaymentProvider, CheckoutOptions, PaymentEvent } from '../../../../../types'

/**
 * LemonSqueezy payment provider implementation
 */
export class LemonSqueezyProvider implements PaymentProvider {
  name = 'lemonsqueezy' as const
  
  // ============================================
  // CHECKOUT
  // ============================================
  
  async createCheckout(options: CheckoutOptions): Promise<string> {
    // TODO: Implement LemonSqueezy checkout when needed
    // For now, we assume checkouts are created manually via LemonSqueezy dashboard
    // and only webhooks are handled
    throw createError({
      statusCode: 501,
      message: 'LemonSqueezy checkout not implemented. Create checkout manually via LemonSqueezy dashboard and configure webhooks.'
    })
  }
  
  // ============================================
  // WEBHOOK
  // ============================================
  
  detectWebhook(event: H3Event): boolean {
    return !!getHeader(event, 'x-signature')
  }
  
  async handleWebhook(event: H3Event, body: string, signature: string): Promise<PaymentEvent> {
    const config = useRuntimeConfig()
    
    // Verify signature
    const secret = config.payments?.webhook?.lemonsqueezy?.secret
    if (!secret) {
      throw createError({
        statusCode: 500,
        message: 'LemonSqueezy webhook secret not configured'
      })
    }

    const hmac = crypto.createHmac('sha256', secret)
    const digest = hmac.update(body).digest('hex')
    
    if (digest !== signature) {
      console.error('[LemonSqueezy] Signature mismatch')
      throw createError({ 
        statusCode: 401, 
        message: 'Invalid signature' 
      })
    }
    
    const payload = JSON.parse(body)
    const { meta, data } = payload
    
    // Route to appropriate handler
    switch (meta.event_name) {
      case 'order_created':
        return this.handleOrderCreated(payload)
        
      case 'order_refunded':
        return this.handleOrderRefunded(payload)

      case 'subscription_created':
      case 'subscription_updated':
      case 'subscription_cancelled':
      case 'subscription_expired':
      case 'subscription_resumed':
        return this.handleSubscriptionUpdate(payload)
        
      case 'subscription_payment_success':
        return this.handleSubscriptionPaymentSuccess(payload)
        
      default:
        console.log(`[LemonSqueezy] Ignoring event: ${meta.event_name}`)
        throw createError({ 
          statusCode: 200, 
          message: `Ignored event: ${meta.event_name}` 
        })
    }
  }
  
  // ============================================
  // WEBHOOK EVENT HANDLERS
  // ============================================
  
  private handleOrderCreated(payload: any): PaymentEvent {
    const { data } = payload
    
    if (!data.attributes.user_email) {
      throw new Error('Missing user email in order')
    }
    
    return {
      provider: 'lemonsqueezy',
      type: 'payment.completed',
      transactionId: data.id,
      customerId: data.attributes.customer_id?.toString(),
      customerEmail: data.attributes.user_email,
      customerName: data.attributes.user_name || undefined,
      amount: parseFloat(data.attributes.total),
      currency: data.attributes.currency?.toLowerCase() || 'usd',
      productId: data.attributes.first_order_item?.product_id?.toString(),
      productName: data.attributes.first_order_item?.product_name,
      userId: data.attributes.meta?.userId,
      status: 'succeeded',
      metadata: data.attributes.meta || {},
      timestamp: Date.now(),
      raw: data,
    }
  }
  
  private handleOrderRefunded(payload: any): PaymentEvent {
    const { data } = payload
    
    return {
      provider: 'lemonsqueezy',
      type: 'payment.refunded',
      transactionId: data.id,
      customerId: data.attributes.customer_id?.toString(),
      customerEmail: data.attributes.user_email,
      amount: parseFloat(data.attributes.refunded_amount || data.attributes.total),
      currency: data.attributes.currency?.toLowerCase() || 'usd',
      productId: data.attributes.first_order_item?.product_id?.toString(),
      status: 'refunded',
      metadata: data.attributes.meta || {},
      timestamp: Date.now(),
      raw: data,
    }
  }
  
  private handleSubscriptionUpdate(payload: any): PaymentEvent {
    const { data } = payload
    const attrs = data.attributes

    return {
      provider: 'lemonsqueezy',
      type: 'payment.completed',
      transactionId: data.id,
      subscriptionId: data.id,
      customerId: attrs.customer_id?.toString(),
      customerEmail: attrs.user_email,
      customerName: attrs.user_name,
      amount: parseFloat(attrs.total || '0'), 
      currency: attrs.currency?.toLowerCase() || 'usd',
      productId: attrs.product_id?.toString(),
      productName: attrs.product_name,
      userId: attrs.test_mode ? undefined : attrs.urls?.update_payment_method?.split('?')[1],
      status: attrs.status === 'active' ? 'succeeded' : 'failed',
      interval: attrs.variant_name?.toLowerCase().includes('year') ? 'year' : 'month',
      currentPeriodEnd: new Date(attrs.renews_at).getTime(),
      metadata: {
        status: attrs.status,
        renewsAt: attrs.renews_at
      },
      timestamp: Date.now(),
      raw: data
    }
  }
  
  private handleSubscriptionPaymentSuccess(payload: any): PaymentEvent {
    const { data } = payload
    const attrs = data.attributes

    return {
      provider: 'lemonsqueezy',
      type: 'payment.completed',
      transactionId: data.id,
      subscriptionId: attrs.subscription_id?.toString(),
      customerId: attrs.customer_id?.toString(),
      customerEmail: attrs.user_email,
      amount: parseFloat(attrs.total),
      currency: attrs.currency?.toLowerCase() || 'usd',
      productId: attrs.product_id?.toString(),
      status: 'succeeded',
      timestamp: Date.now(),
      raw: data,
      metadata: {}
    }
  }
  
  // ============================================
  // CUSTOMER PORTAL
  // ============================================
  
  async createPortalSession(customerId: string, returnUrl?: string): Promise<string> {
    // LemonSqueezy uses direct links to customer portal
    // The customer portal URL can be constructed from the customer ID
    throw createError({
      statusCode: 501,
      message: 'LemonSqueezy portal session not implemented. Use direct customer portal link.'
    })
  }
}
