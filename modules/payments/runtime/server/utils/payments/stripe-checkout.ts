
import Stripe from 'stripe'
import type { PaymentProduct } from '../../../types/payments'

export async function createStripeCheckout(options: {
  product: PaymentProduct
  productId: string
  user: any
  successUrl?: string
  cancelUrl?: string
  mode?: 'payment' | 'subscription'
}) {
  const config = useRuntimeConfig()
  const stripeSecret = config.payments?.webhook?.stripe?.secret // Wait, this is webhook secret. I need API key.
  // The plan said:
  // stripe: {
  //   enabled: true,
  //   publicKey: process.env.STRIPE_PUBLIC_KEY,
  // But where is the secret key? Usually it's in a private config or env var.
  // I should check how I defined the config in nuxt.config.ts.
  // I defined public key in public config.
  // I should probably access process.env.STRIPE_SECRET_KEY directly or add it to private runtime config.
  
  // Use the latest API version supported by the installed library
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-11-17.clover' as any
  })
  
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
  
  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    line_items: line_items,
    mode: mode,
    success_url: successUrl ? `${config.public.siteUrl}${successUrl}` : `${config.public.siteUrl}/checkout/success`,
    cancel_url: cancelUrl ? `${config.public.siteUrl}${cancelUrl}` : `${config.public.siteUrl}/checkout/cancel`,
    metadata: {
      userId: user.id,
      userName: user.name,
      authProvider: 'better-auth',
      productId: product.priceId // or product name/key
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
