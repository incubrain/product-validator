import { createAuthClient } from "better-auth/vue";
import { magicLinkClient } from "better-auth/client/plugins";
import { emailOTPClient } from "better-auth/client/plugins";

/**
 * Better Auth client for Vue/Nuxt
 * Wraps Better-Auth client with Vue reactivity and plugins
 */
export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  
  // ✅ Add client plugins for magic link and OTP
  plugins: [
    magicLinkClient(),
    emailOTPClient(),
  ],
});

/**
 * Composable for accessing Better Auth client
 * Provides type-safe access to auth methods
 */
export const useAuthClient = () => {
  return authClient;
};
