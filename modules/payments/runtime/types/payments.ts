
export interface PaymentProduct {
  name: string
  provider: 'stripe' | 'lemonsqueezy'
  priceId: string
  amount: number
  currency: string
  description?: string
  image?: string
  /**
   * Subscription interval (if recurring)
   */
  interval?: 'month' | 'year'
  /**
   * Interval count (e.g. 3 for every 3 months)
   */
  intervalCount?: number
}

export interface PaymentsModuleOptions {
  enabled: boolean
  stripe?: {
    enabled: boolean
    publicKey?: string
  }
  lemonsqueezy?: {
    enabled: boolean
    storeId?: string
  }
  products?: Record<string, PaymentProduct>
  webhook?: {
    endpoint: string
    stripe?: {
      secret?: string
    }
    lemonsqueezy?: {
      secret?: string
    }
  }
}

export interface PaymentEvent {
  // Provider info
  provider: 'stripe' | 'lemonsqueezy'
  type: 'payment.completed' | 'payment.refunded'
  
  // Transaction details
  transactionId: string
  paymentIntentId?: string
  subscriptionId?: string // For subscriptions
  customerId?: string
  
  // Product details
  productId?: string
  productName?: string
  
  // Customer info
  userId?: string // From Better-Auth
  customerEmail?: string
  customerName?: string
  
  // Payment details
  amount: number
  currency: string
  status: 'succeeded' | 'pending' | 'failed' | 'refunded'
  
  // Subscription details
  interval?: 'month' | 'year'
  currentPeriodEnd?: number
  
  // Refund specific
  refundReason?: string
  
  // Metadata
  metadata: Record<string, any>
  timestamp: number
  
  // Raw event (for debugging)
  raw?: any
}
