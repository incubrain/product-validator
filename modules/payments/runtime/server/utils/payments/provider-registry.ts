import type { PaymentProvider, ProviderRegistry } from '../../../../types'

/**
 * Singleton registry for payment providers
 */
class PaymentProviderRegistry implements ProviderRegistry {
  private providers = new Map<string, PaymentProvider>()
  
  register(provider: PaymentProvider): void {
    if (this.providers.has(provider.name)) {
      console.warn(`[Payments] Provider "${provider.name}" already registered, overwriting`)
    }
    this.providers.set(provider.name, provider)
    console.log(`[Payments] ✅ Registered provider: ${provider.name}`)
  }
  
  get(name: string): PaymentProvider | undefined {
    return this.providers.get(name)
  }
  
  getAll(): PaymentProvider[] {
    return Array.from(this.providers.values())
  }
  
  has(name: string): boolean {
    return this.providers.has(name)
  }
}

// Singleton instance
let registryInstance: PaymentProviderRegistry | null = null

/**
 * Get the global provider registry instance
 */
export function getProviderRegistry(): PaymentProviderRegistry {
  if (!registryInstance) {
    registryInstance = new PaymentProviderRegistry()
  }
  return registryInstance
}

// Re-export types
export type { PaymentProvider, ProviderRegistry, CheckoutOptions } from '../../../../types'
