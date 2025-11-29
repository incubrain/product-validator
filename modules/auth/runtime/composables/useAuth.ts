import type { AuthRouteConfig } from '../../types'
import { useAuthClient } from './useAuthClient'

/**
 * Simplified auth composable using Better-Auth
 */
export const useAuth = () => {
  const client = useAuthClient()
  const config = useRuntimeConfig().public.auth
  
  // ========================================
  // STATE (from Better-Auth client)
  // ========================================
  
  // ✅ CORRECT - useSession returns Ref<{ data, isPending, isRefetching, error }>
  const sessionRef = client.useSession()
  
  const user = computed(() => sessionRef.value.data?.user || null)
  const session = computed(() => sessionRef.value.data?.session || null)
  const isAuthenticated = computed(() => !!user.value)
  const isPending = computed(() => sessionRef.value.isPending)
  const isRefetching = computed(() => sessionRef.value.isRefetching)
  const error = computed(() => sessionRef.value.error)
  
  // ========================================
  // ROUTE PROTECTION
  // ========================================
  
  /**
   * Get route config for a given path
   */
  const getRouteConfig = (path?: string): AuthRouteConfig | null => {
    let checkPath = path
    
    // If no path provided, try to get from useRoute()
    if (!checkPath) {
      try {
        checkPath = useRoute().path
      } catch (e) {
        console.warn('[useAuth] Could not get current route')
        return null
      }
    }
    
    for (const routeConfig of (config as any).routes || []) {
      let pattern: RegExp
      
      if (typeof routeConfig.pattern === 'string') {
        // Convert glob-style pattern to regex
        const regexStr = routeConfig.pattern
          .replace(/\*\*/g, '.*')
          .replace(/\*/g, '[^/]*')
        pattern = new RegExp(`^${regexStr}$`)
      } else {
        pattern = routeConfig.pattern
      }
      
      if (pattern.test(checkPath)) {
        return routeConfig
      }
    }
    
    return null
  }
  
  /**
   * Check if route requires authentication
   */
  const routeRequiresAuth = (path?: string): boolean => {
    const routeConfig = getRouteConfig(path)
    return routeConfig?.require !== false
  }
  
  // ========================================
  // AUTH ACTIONS (via Better-Auth client)
  // ========================================
  
  /**
   * Sign in with magic link
   */
  const signInWithMagicLink = async (email: string) => {
    const result = await client.signIn.magicLink({
      email,
      callbackURL: '/dashboard',
    });
    return result;
  }
  
  /**
   * Send email OTP
   */
  const sendEmailOTP = async (email: string) => {
    const result = await client.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });
    return result;
  }
  
  /**
   * Verify email OTP
   */
  const verifyEmailOTP = async (email: string, otp: string) => {
    const result = await client.signIn.emailOtp({
      email,
      otp,
    });
    return result;
  }
  
  /**
   * Sign out
   */
  const signOut = async () => {
    await client.signOut()
  }
  
  return {
    // State
    user,
    session,
    isAuthenticated,
    isPending,
    isRefetching,
    error,
    
    // Route helpers
    getRouteConfig,
    routeRequiresAuth,
    
    // Auth actions
    signInWithMagicLink,
    sendEmailOTP,
    verifyEmailOTP,
    signOut,
  }
}