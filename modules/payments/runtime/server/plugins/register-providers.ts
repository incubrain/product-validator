import { getProviderRegistry } from '../utils/payments/provider-registry'
import { StripeProvider } from '../utils/payments/providers/stripe'
import { LemonSqueezyProvider } from '../utils/payments/providers/lemonsqueezy'

export default defineNitroPlugin((nitroApp) => {
  const config = useRuntimeConfig()
  const registry = getProviderRegistry()
  
  // Register Stripe provider if enabled
  if (config.public.payments?.stripe?.enabled) {
    try {
      const stripeProvider = new StripeProvider()
      registry.register(stripeProvider)
    } catch (error) {
      console.error('[Payments] Failed to initialize Stripe provider:', error)
    }
  }
  
  //Register LemonSqueezy provider if enabled
  if (config.public.payments?.lemonsqueezy?.enabled) {
    try {
      const lemonSqueezyProvider = new LemonSqueezyProvider()
      registry.register(lemonSqueezyProvider)
    } catch (error) {
      console.error('[Payments] Failed to initialize LemonSqueezy provider:', error)
    }
  }
  
  console.log(`[Payments] Registered ${registry.getAll().length} payment provider(s)`)
})
