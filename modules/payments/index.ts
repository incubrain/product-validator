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
    // RUNTIME CONFIG
    // ========================================
    
    nuxt.options.runtimeConfig.public.payments = options
    // Private config for webhooks
    nuxt.options.runtimeConfig.payments = {
      webhook: options.webhook
    }
    
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
export type { PaymentsModuleOptions, CustomerPayment, PaymentSession, PaymentRouteConfig } from './types'
