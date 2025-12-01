/**
 * Composable for managing payment operations
 * 
 * @returns Payment methods for checkout, history, and portal access
 * 
 * @example
 * ```vue
 * <script setup>
 * const { createCheckout } = usePayments()
 * 
 * async function handlePurchase() {
 *   const url = await createCheckout({
 *     productId: 'my-product',
 *     successUrl: '/success',
 *     cancelUrl: '/pricing'
 *   })
 *   if (url) window.location.href = url
 * }
 * </script>
 * ```
 */
export const usePayments = () => {
  const { user } = useAuth()
  
  /**
   * Create a payment checkout session
   * 
   * @param options - Checkout configuration
   * @param options.productId - ID of the product to purchase (must match config)
   * @param options.successUrl - Relative URL to redirect after successful payment (default: /checkout/success)
   * @param options.cancelUrl - Relative URL to redirect if user cancels (default: /checkout/cancel)
   * @returns Promise resolving to the checkout URL to redirect the user to
   * @throws {Error} If checkout creation fails or product not found
   * 
   * @example
   * ```typescript
   * const url = await createCheckout({
   *   productId: 'premium-plan',
   *   successUrl: '/dashboard',
   *   cancelUrl: '/pricing'
   * })
   * ```
   */
  const createCheckout = async (options: {
    productId: string
    successUrl?: string
    cancelUrl?: string
  }) => {
    const { data, error } = await useFetch('/api/payments/checkout', {
      method: 'POST',
      body: {
        productId: options.productId,
        successUrl: options.successUrl,
        cancelUrl: options.cancelUrl,
      }
    })
    
    if (error.value) {
      throw new Error(error.value.message || 'Checkout failed')
    }
    
    return data.value?.url
  }
  
  /**
   * Get payment history for the current authenticated user
   * 
   * @returns Promise resolving to array of payment records
   * @returns Empty array if user not authenticated
   * 
   * @example
   * ```typescript
   * const payments = await getPaymentHistory()
   * console.log(`You have ${payments.length} payments`)
   * ```
   */
  const getPaymentHistory = async () => {
    if (!user.value) return []
    
    const { data } = await useFetch('/api/payments/history', {
      query: { email: user.value.email }
    })
    
    return data.value || []
  }
  
  /**
   * Create a customer portal session for managing subscriptions
   * 
   * Allows customers to:
   * - Update payment methods
   * - Cancel subscriptions
   * - View invoices
   * - Update billing information
   * 
   * @param returnUrl - Relative URL to return to after portal session (optional)
   * @returns Promise resolving to the portal URL
   * @throws {Error} If portal creation fails
   * 
   * @example
   * ```typescript
   * const portalUrl = await createPortalSession('/dashboard')
   * window.location.href = portalUrl
   * ```
   */
  const createPortalSession = async (returnUrl?: string) => {
    const { data, error } = await useFetch('/api/payments/portal', {
      method: 'POST',
      body: { returnUrl }
    })
    
    if (error.value) {
      throw new Error(error.value.message || 'Failed to create portal session')
    }
    
    return data.value?.url
  }
  
  return {
    createCheckout,
    getPaymentHistory,
    createPortalSession,
  }
}
