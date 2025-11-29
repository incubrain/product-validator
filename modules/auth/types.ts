/**
 * Better-Auth type definitions
 * Simplified for Better-Auth integration
 */

/**
 * Route protection configuration
 */
export interface AuthRouteConfig {
  pattern: string | RegExp
  require?: boolean              // Default: true
  redirect?: string              // Where to redirect if not authed
  metadata?: Record<string, any> // Pass to middleware
}

/**
 * Auth module options (Better-Auth)
 */
export interface AuthModuleOptions {
  /**
   * Enable/disable the module
   * @default false
   */
  enabled: boolean
  
  /**
   * Route protection rules
   * @default []
   */
  routes: AuthRouteConfig[]
}

// Runtime config type augmentation
declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    auth?: AuthModuleOptions
  }
}

export {}
