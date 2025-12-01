
<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: [] // Allow access without auth to see the "login required" state
})

const config = useRuntimeConfig()
const { user, isAuthenticated } = useAuth()
const { getPaymentHistory, createPortalSession } = usePayments()

// Get products from config
const products = computed(() => {
  return config.public.payments?.products || {}
})

// Fetch history
const { data: history, refresh: refreshHistory, status } = await useAsyncData('payment-history', async () => {
  if (!isAuthenticated.value) return []
  return await getPaymentHistory()
}, {
  watch: [isAuthenticated]
})

// Mock refreshing history (since we are using mock data, it won't change, but good to test the flow)
const handleRefresh = async () => {
  await refreshHistory()
}

const handleManageSubscription = async () => {
  try {
    const url = await createPortalSession(window.location.href)
    if (url) window.location.href = url
  } catch (e) {
    alert(e instanceof Error ? e.message : 'Failed to open portal')
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-8">
    <div class="max-w-4xl mx-auto space-y-8">
      
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">Payments Module Test</h1>
          <p class="text-neutral-500 dark:text-neutral-400">Verify payment flows, subscriptions, and history</p>
        </div>
        <div class="flex gap-2">
           <UButton 
            v-if="isAuthenticated"
            label="Manage Subscription"
            color="neutral"
            variant="solid"
            icon="i-heroicons-credit-card"
            @click="handleManageSubscription"
          />
           <UButton 
            to="/"
            color="neutral"
            variant="ghost"
            icon="i-heroicons-arrow-left"
            label="Back to Home"
          />
        </div>
      </div>

      <!-- Documentation -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-book-open" class="w-5 h-5" />
            <h3 class="text-lg font-semibold">Module Documentation</h3>
          </div>
        </template>
        
        <div class="space-y-4 text-sm">
          <div>
            <h4 class="font-medium mb-1">Enabled Features</h4>
            <ul class="list-disc list-inside space-y-1 text-neutral-600 dark:text-neutral-400">
              <li><strong>Single Payments:</strong> One-time purchases (e.g., Consultations).</li>
              <li><strong>Better-Auth Integration:</strong> Payments linked to authenticated users.</li>
              <li><strong>Unified Webhooks:</strong> Single endpoint <code>/api/payments/webhook</code> for Stripe & LemonSqueezy.</li>
              <li><strong>Storage Sync:</strong> Idempotent event syncing to KV/Storage.</li>
            </ul>
          </div>

          <UDivider />

          <div>
            <h4 class="font-medium mb-1">How to Test</h4>
            <div class="space-y-3">
              <div>
                <p class="font-medium text-xs uppercase text-neutral-500">1. Stripe Webhooks</p>
                <div class="bg-neutral-100 dark:bg-neutral-900 p-2 rounded mt-1 font-mono text-xs">
                  stripe listen --forward-to localhost:3000/api/payments/webhook
                </div>
              </div>
              
              <div>
                <p class="font-medium text-xs uppercase text-neutral-500">2. Trigger Events</p>
                <div class="bg-neutral-100 dark:bg-neutral-900 p-2 rounded mt-1 font-mono text-xs">
                  stripe trigger checkout.session.completed
                </div>
              </div>

              <div>
                <p class="font-medium text-xs uppercase text-neutral-500">3. Mock Data</p>
                <p class="text-neutral-600 dark:text-neutral-400">
                  Payment history is currently mocked in <code>server/api/payments/history.get.ts</code>. 
                  Uncomment the mock data in that file to see records below.
                </p>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Auth Status -->
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">1. Authentication Status</h3>
            <UBadge :color="isAuthenticated ? 'success' : 'warning'">
              {{ isAuthenticated ? 'Authenticated' : 'Guest' }}
            </UBadge>
          </div>
        </template>
        
        <div v-if="isAuthenticated" class="space-y-2">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-neutral-500">User ID:</span>
              <code class="ml-2 bg-neutral-100 dark:bg-neutral-800 px-1 rounded">{{ user?.id }}</code>
            </div>
            <div>
              <span class="text-neutral-500">Email:</span>
              <code class="ml-2 bg-neutral-100 dark:bg-neutral-800 px-1 rounded">{{ user?.email }}</code>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-4">
          <p class="text-neutral-500 mb-4">You must be logged in to test payments.</p>
          <AuthModal />
          <UButton label="Open Login Modal" @click="useState('auth-modal-open').value = true" />
        </div>
      </UCard>

      <!-- Products -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">2. Available Products</h3>
        </template>
        
        <div class="grid gap-4 md:grid-cols-2">
          <div 
            v-for="(product, key) in products" 
            :key="key"
            class="border dark:border-neutral-800 rounded-lg p-4 flex flex-col gap-4"
          >
            <div>
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-medium text-lg">{{ product.name }}</h4>
                <UBadge color="neutral" variant="soft">{{ product.provider }}</UBadge>
              </div>
              <p class="text-2xl font-bold">
                {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: product.currency }).format(product.amount) }}
              </p>
              <p class="text-xs text-neutral-500 mt-1">ID: {{ key }}</p>
            </div>
            
            <div class="mt-auto">
              <PaymentButton 
                :product-id="String(key)"
                block
                :label="`Buy ${product.name}`"
              />
            </div>
          </div>
          
          <!-- Empty State -->
          <div v-if="Object.keys(products).length === 0" class="col-span-2 text-center py-8 text-neutral-500">
            No products configured in nuxt.config.ts
          </div>
        </div>
      </UCard>

      <!-- Payment History -->
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">3. Payment History</h3>
            <UButton 
              icon="i-heroicons-arrow-path" 
              color="neutral" 
              variant="ghost" 
              size="xs"
              :loading="status === 'pending'"
              @click="handleRefresh"
            />
          </div>
        </template>
        
        <div v-if="!isAuthenticated">
          <p class="text-neutral-500 text-sm">Log in to view payment history.</p>
        </div>
        
        <div v-else-if="history && history.length > 0" class="space-y-4">
          <div 
            v-for="payment in history" 
            :key="payment.id"
            class="flex justify-between items-center border-b dark:border-neutral-800 pb-4 last:border-0 last:pb-0"
          >
            <div>
              <p class="font-medium">{{ payment.metadata?.productName || payment.priceId }}</p>
              <p class="text-xs text-neutral-500">
                {{ new Date(payment.createdAt).toLocaleDateString() }} • {{ payment.id }}
              </p>
            </div>
            <div class="text-right">
              <p class="font-bold">
                {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: payment.currency }).format(payment.amount) }}
              </p>
              <UBadge :color="payment.status === 'succeeded' ? 'success' : 'neutral'" size="xs">
                {{ payment.status }}
              </UBadge>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-8 text-neutral-500">
          <div class="i-heroicons-receipt-refund text-4xl mx-auto mb-2 opacity-50" />
          <p>No payment history found.</p>
          <p class="text-xs mt-1">(Using mock data? Check history.get.ts)</p>
        </div>
      </UCard>

    </div>
  </div>
</template>
