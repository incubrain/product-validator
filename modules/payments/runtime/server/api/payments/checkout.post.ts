
import { defineEventHandler, readBody, createError } from 'h3'
import { z } from 'zod'
import { getProviderRegistry } from '../../utils/payments/provider-registry'

/**
 * Validate that URL is relative (starts with /) or matches site URL
 * Prevents open redirect vulnerabilities
 */
function isValidRedirectUrl(url: string | undefined, siteUrl: string): boolean {
  if (!url) return true // Optional URLs are fine
  
  // Must be relative path
  if (url.startsWith('/')) return true
  
  // Or must start with our site URL
  if (url.startsWith(siteUrl)) return true
  
  return false
}

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
  
  // 2. Validate redirect URLs
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || ''
  
  if (!isValidRedirectUrl(successUrl, siteUrl)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid successUrl - must be relative or match site domain'
    })
  }
  
  if (!isValidRedirectUrl(cancelUrl, siteUrl)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid cancelUrl - must be relative or match site domain'
    })
  }
  
  // 3. Get User Context (Better-Auth)
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
  
  const product = config.public.payments?.products?.[productId]
  
  if (!product) {
    throw createError({
      statusCode: 404,
      message: 'Product not found'
    })
  }
  
  // 3. Get provider from registry
  const provider = getProviderRegistry().get(product.provider)
  
  if (!provider) {
    throw createError({
      statusCode: 400,
      message: `Provider "${product.provider}" not available. Please contact support.`
    })
  }
  
  // 4. Create checkout session via provider
  const checkoutUrl = await provider.createCheckout({
    product,
    productId,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    },
    successUrl,
    cancelUrl,
    mode: product.interval ? 'subscription' : 'payment'
  })
  
  return { url: checkoutUrl } 
})
