import { addComponent, addImports, addPlugin, addServerHandler, addServerScanDir, addTypeTemplate, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit'
import type { PaymentsModuleOptions } from './types'

export default defineNuxtModule<PaymentsModuleOptions>({
  meta: {
    name: 'payments',
    configKey: 'payments',
    compatibility: {
      nuxt: '>=4.0.0'
    }
  },
  
  defaults: {
    enabled: false,
  },
  
  setup(options, nuxt) {
    const logger = useLogger('payments')
    const resolver = createResolver(import.meta.url)
    
    // Skip setup if disabled
    if (!options.enabled) {
      logger.info('Module disabled')
      return
    }
    
    logger.info('Setting up payments module')
    
    // ========================================
    // CONFIGURATION VALIDATION
    // ========================================
    
    // Validate enabled providers have required configuration
    if (options.stripe?.enabled) {
      if (!options.stripe?.secretKey) {
        throw new Error('[Payments Module] Stripe enabled but secretKey not provided')
      }
      if (!options.webhook?.stripe?.secret) {
        logger.warn('[Payments] Stripe webhook secret not configured - webhooks will fail')
      }
      logger.info('[Payments] Stripe provider configured')
    }
    
    if (options.lemonsqueezy?.enabled) {
      if (!options.lemonsqueezy?.secretKey) {
        logger.warn('[Payments] LemonSqueezy enabled but secret key not provided - may be needed for API calls')
      }
      if (!options.webhook?.lemonsqueezy?.secret) {
        logger.warn('[Payments] LemonSqueezy webhook secret not configured - webhooks will fail')
      }
      logger.info('[Payments] LemonSqueezy provider configured')
    }
    
    // Validate products reference enabled providers
    if (options.products) {
      for (const [productId, product] of Object.entries(options.products)) {
        const providerConfig = options[product.provider]
        if (!providerConfig?.enabled) {
          throw new Error(
            `[Payments Module] Product "${productId}" uses provider "${product.provider}" but it's not enabled. ` +
            `Enable it in payments.${product.provider}.enabled`
          )
        }
      }
    }
    
    // ========================================
    // RUNTIME CONFIG
    // ========================================
    
    nuxt.options.runtimeConfig.public.payments = options
    
    // Private config for secrets
    nuxt.options.runtimeConfig.payments = {
      webhook: options.webhook,
      stripe: options.stripe ? {
        secretKey: options.stripe.secretKey,
        apiVersion: options.stripe.apiVersion
      } : undefined,
      lemonsqueezy: options.lemonsqueezy ? {
        secretKey: options.lemonsqueezy.secretKey
      } : undefined
    }
    
    // ========================================
    // PROVIDER REGISTRATION
    // ========================================
    
    // Register providers via Nitro plugin
    addServerHandler({
      handler: resolver.resolve('./runtime/server/plugins/register-providers'),
    })
    
    // ========================================
    // COMPOSABLES
    // ========================================
    
    addImports({
      name: 'usePayments',
      from: resolver.resolve('./runtime/composables/usePayments')
    })
    
    // ========================================
    // COMPONENTS
    // ========================================
    
    addComponent({
      name: 'PaymentButton',
      filePath: resolver.resolve('./runtime/components/PaymentButton.vue')
    })
    
    // ========================================
    // SERVER HANDLERS (API endpoints)
    // ========================================
    
    addServerScanDir(resolver.resolve('./runtime/server'))
    
    addServerHandler({
      route: '/api/payments/checkout',
      handler: resolver.resolve('./runtime/server/api/payments/checkout.post.ts')
    })
    
    addServerHandler({
      route: '/api/payments/webhook',
      handler: resolver.resolve('./runtime/server/api/payments/webhook.post.ts')
    })

    addServerHandler({
        route: '/api/payments/history',
        handler: resolver.resolve('./runtime/server/api/payments/history.get.ts')
    })
    
    logger.success('Payments module configured')
  }
})

// Export types for external use
export type { PaymentsModuleOptions, CustomerPayment, PaymentSession, PaymentRouteConfig, PaymentProvider, CheckoutOptions } from './types'

// Export error classes for external use
export {
  PaymentError,
  CheckoutError,
  WebhookError,
  SignatureVerificationError,
  ProviderNotFoundError,
  ProductNotFoundError,
  UnauthorizedError,
  StorageError,
  ConfigurationError,
  toH3Error,
  isRetryableError
} from './errors'
