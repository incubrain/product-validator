
import { defineEventHandler, readBody, createError } from 'h3'
import { z } from 'zod'

const checkoutSchema = z.object({
  productId: z.string(),
  successUrl: z.string().optional(),
  cancelUrl: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  // 1. Validate Body
  const body = await readBody(event)
  const validation = checkoutSchema.safeParse(body)
  
  if (!validation.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid request body',
      data: validation.error.issues
    })
  }
  
  const { productId, successUrl, cancelUrl } = validation.data
  
  // 2. Get User Context (Better-Auth)
  const session = await auth.api.getSession({
    headers: event.headers
  })
  
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }
  
  const user = session.user
  
  const config = useRuntimeConfig()
  const product = config.public.payments?.products?.[productId]
  
  if (!product) {
    throw createError({
      statusCode: 404,
      message: 'Product not found'
    })
  }
  
  // 3. Create Checkout Session
  let checkoutUrl: string
  
  if (product.provider === 'stripe') {
  // Create checkout session
  const sessionUrl = await createStripeCheckout({
    product,
    productId: body.productId,
    user,
    successUrl: body.successUrl,
    cancelUrl: body.cancelUrl,
    mode: product.interval ? 'subscription' : 'payment'
  })
  checkoutUrl = sessionUrl
  } else if (product.provider === 'lemonsqueezy') {
    // checkoutUrl = await createLemonSqueezyCheckout(...)
    throw createError({
      statusCode: 501,
      message: 'LemonSqueezy provider not yet implemented'
    })
  } else {
    throw createError({
      statusCode: 400,
      message: 'Invalid provider'
    })
  }
  
  return { url: checkoutUrl } 
})
