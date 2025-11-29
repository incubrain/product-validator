import { betterAuth } from "better-auth";
import { magicLink, emailOTP } from "better-auth/plugins";
import { createAuthMiddleware } from "better-auth/api";
import { sendMagicLinkEmail, sendOTPEmail } from "./email";

/**
 * Better Auth instance (Stateless mode)
 * No database required - uses JWE encrypted cookies
 */
export const auth = betterAuth({
  /**
   * Base URL - dynamic based on environment
   */
  baseURL: process.env.BETTER_AUTH_URL || 
           process.env.NUXT_PUBLIC_SITE_URL || 
           "http://localhost:3000",

  /**
   * Secret for signing/encrypting cookies
   */
  secret: process.env.BETTER_AUTH_SECRET || 
          (() => {
            if (process.env.NODE_ENV === "production") {
              throw new Error("BETTER_AUTH_SECRET must be set in production");
            }
            console.warn("⚠️  Using default secret - set BETTER_AUTH_SECRET in production");
            return "dev-secret-change-in-production-use-openssl-rand-base64-32";
          })(),

  /**
   * Stateless session configuration
   * Explicitly enabled for database-less operation
   */
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      strategy: "jwe",
      refreshCache: true, // Enable stateless refresh
    },
  },

  /**
   * Account storage for stateless mode
   * Stores account data in cookie after auth
   */
  account: {
    storeStateStrategy: "cookie",
    storeAccountCookie: true,
  },

  /**
   * Disable email/password (we want frictionless only)
   */
  emailAndPassword: {
    enabled: false,
  },

  /**
   * Plugins
   */
  plugins: [
    /**
     * ✅ Magic Link (passwordless email)
     */
    magicLink({
      sendMagicLink: async ({ email, url, token }) => {
        await sendMagicLinkEmail(email, url);
      },
      expiresIn: 60 * 15, // 15 minutes
    }),

    /**
     * ✅ Email OTP (6-digit code)
     */
    emailOTP({
      sendVerificationOTP: async ({ email, otp, type }) => {
        await sendOTPEmail(email, otp);
      },
      expiresIn: 60 * 10, // 10 minutes
      otpLength: 6,
    }),
  ],

  /**
   * Advanced Configuration
   */
  advanced: {
    /**
     * Cookie Prefix
     * Matches the application's storage prefix (e.g., "founder-funnel")
     */
    cookiePrefix: process.env.NUXT_PUBLIC_CONFIG_SOURCE,
  },

  /**
   * Hooks for syncing to storage
   */
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      // Check if a new session was created (sign-up, sign-in, etc.)
      const newSession = ctx.context.newSession;
      
      if (newSession) {
        await syncUserToStorage(newSession.user);
      }
    }),
  },
});

/**
 * Sync user to your existing storage system
 * TODO: Implement proper storage integration
 */
async function syncUserToStorage(user: any) {
  try {
    console.log('[Auth] 🔄 User authentication successful:', {
      email: user.email,
      name: user.name,
      id: user.id,
      provider: 'better-auth',
      timestamp: new Date().toISOString()
    });
    
    console.log('[Auth] ⚠️  Storage sync not yet implemented - user data logged only');
    
    // TODO: Implement storage sync
    // const config = useRuntimeConfig();
    // const { storeData } = await import("#shared/utils/storage-handler");
    // await storeData(config.public.storageProvider || 'kv', {
    //   data: {
    //     email: user.email,
    //     formId: "better-auth-signup",
    //     customerStage: "email_captured",
    //     metadata: {
    //       name: user.name,
    //       image: user.image,
    //       provider: user.accounts?.[0]?.providerId || "unknown",
    //       authenticatedAt: Date.now(),
    //     },
    //   },
    // });

  } catch (error) {
    console.error("[Auth] Failed to log user data:", error);
  }
}
