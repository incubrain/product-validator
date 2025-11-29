/**
 * Global auth middleware
 * Protects routes based on Better-Auth session
 * Client-only to avoid SSR hydration issues
 */
export default defineNuxtRouteMiddleware(async (to) => {
  // ✅ Only run on client (after hydration)
  if (import.meta.server) {
    return
  }
  
  const { getRouteConfig, isAuthenticated, isPending } = useAuth()
  const config = useRuntimeConfig().public.auth
  
  // Skip if auth module disabled
  if (!(config as any)?.enabled) {
    return
  }
  
  // Get route config
  const routeConfig = getRouteConfig(to.path)
  
  // Skip if route doesn't require auth
  if (!routeConfig || routeConfig.require === false) {
    return
  }
  
  // ✅ Wait for session to finish loading
  if (isPending.value) {
    console.log('[AuthMiddleware] ⏳ Waiting for session to load...')
    
    await new Promise<void>((resolve) => {
      const timeout = setTimeout(() => {
        console.warn('[AuthMiddleware] ⚠️ Session load timeout')
        resolve()
      }, 3000) // 3 second timeout
      
      const unwatch = watch(isPending, (pending) => {
        if (!pending) {
          clearTimeout(timeout)
          unwatch()
          resolve()
        }
      }, { immediate: true })
    })
  }
  
  console.log('[AuthMiddleware] 🔍 Auth check - Authenticated:', isAuthenticated.value)
  
  // Check authentication
  if (!isAuthenticated.value) {
    if (routeConfig.redirect && routeConfig.redirect !== to.path) {
      console.log('[AuthMiddleware] ↪️ Redirecting to:', routeConfig.redirect)
      return navigateTo(routeConfig.redirect)
    }
    
    // Show modal
    console.log('[AuthMiddleware] 🔓 Opening auth modal')
    useState('auth-modal-open').value = true
  }
})