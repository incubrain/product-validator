import { addComponent, addImports, addPlugin, addServerScanDir, addServerHandler, addTypeTemplate, createResolver, defineNuxtModule, useLogger, addRouteMiddleware } from '@nuxt/kit'
import type { AuthModuleOptions } from './types'

export default defineNuxtModule<AuthModuleOptions>({
  meta: {
    name: 'auth',
    configKey: 'auth',
    compatibility: {
      nuxt: '>=4.0.0'
    }
  },
  
  defaults: {
    enabled: false,
    routes: []
  },
  
  setup(options, nuxt) {
    const logger = useLogger('auth')
    const resolver = createResolver(import.meta.url)
    
    // Skip setup if disabled
    if (!options.enabled) {
      logger.info('Module disabled')
      return
    }
    
    logger.info('Setting up auth module')
    
    // ========================================
    // RUNTIME CONFIG
    // ========================================
    
    nuxt.options.runtimeConfig.public.auth = options
    
    // Add email config to private runtime config
    nuxt.options.runtimeConfig.email = {
      from: process.env.EMAIL_FROM || "noreply@example.com",
      smtpHost: process.env.SMTP_HOST || "smtp.resend.com",
      smtpPort: parseInt(process.env.SMTP_PORT || "587"),
      smtpUser: process.env.SMTP_USER,
      smtpPass: process.env.SMTP_PASS,
      ...(nuxt.options.runtimeConfig.email || {})
    }
    
    // ========================================
    // COMPOSABLES
    // ========================================
    
    addImports({
      name: 'useAuth',
      from: resolver.resolve('./runtime/composables/useAuth')
    })
    
    // ========================================
    // COMPONENTS
    // ========================================
    
    addComponent({
      name: 'AuthGate',
      filePath: resolver.resolve('./runtime/components/AuthGate.vue')
    })
    
    addComponent({
      name: 'AuthModal',
      filePath: resolver.resolve('./runtime/components/AuthModal.vue')
    })
    
    // ========================================
    // PLUGINS
    // ========================================
    
    addPlugin({
      src: resolver.resolve('./runtime/plugins/auth-client'),
      mode: 'client'
    })
    
    addImports({
      name: 'useAuthClient',
      from: resolver.resolve('./runtime/composables/useAuthClient')
    })
    
    // ========================================
    // SERVER HANDLERS (API endpoints)
    // ========================================
    
    addServerScanDir(resolver.resolve('./runtime/server'))

    addRouteMiddleware({
      name: 'auth',
      path: resolver.resolve('./runtime/middleware/auth.global.ts'),
      global: true
    })
  }
})

export type { AuthModuleOptions, AuthRouteConfig } from './types'
