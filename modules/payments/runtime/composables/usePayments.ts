
export const usePayments = () => {
  const { user } = useAuth()
  
  /**
   * Create checkout session
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
   * Get payment history for current user
   */
  const getPaymentHistory = async () => {
    if (!user.value) return []
    
    const { data } = await useFetch('/api/payments/history', {
      query: { email: user.value.email }
    })
    
    return data.value || []
  }
  
  /**
   * Create customer portal session
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
