// modules/payments/runtime/server/api/payments/history.get.ts

import type { CustomerPayment } from '../../../../types'

export default defineEventHandler(async (event) => {
  const { email } = getQuery(event)
  
  if (!email || typeof email !== 'string') {
    throw createError({
      statusCode: 400,
      message: 'Email parameter is required'
    })
  }
  
  console.log('[Payments] 📜 Fetching payment history for:', email)
  
  // ✅ MOCK: Return empty array for now
  // TODO: Implement real payment history retrieval
  
  const mockPayments: CustomerPayment[] = []
  
  // Uncomment to test with mock data:
  // const mockPayments: CustomerPayment[] = [
  //   {
  //     id: 'cs_test_mock123',
  //     customerId: 'cus_mock123',
  //     priceId: 'price_mock123',
  //     amount: 250,
  //     currency: 'usd',
  //     status: 'succeeded',
  //     type: 'one_time',
  //     createdAt: Date.now() - 86400000, // 1 day ago
  //     metadata: {
  //       productId: 'direct-hire',
  //       provider: 'stripe'
  //     }
  //   }
  // ]
  
  console.log('[Payments] ✅ Returned', mockPayments.length, 'payments')
  
  return mockPayments
  
  // TODO: Real implementation
  // const { getData } = await import('#shared/utils/storage-handler')
  // const records = await getData(config.public.storageProvider || 'kv', { email })
  // return records.filter(r => r.formId?.startsWith('payment-')).map(...)
})