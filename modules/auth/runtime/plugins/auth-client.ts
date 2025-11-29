import { authClient } from '../composables/useAuthClient'

/**
 * Expose Better-Auth client to NuxtApp
 * Makes it accessible via $authClient in pages/components
 */
export default defineNuxtPlugin(() => {
  return {
    provide: {
      authClient
    }
  }
})
