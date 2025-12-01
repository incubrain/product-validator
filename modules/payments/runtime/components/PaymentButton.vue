
<script setup lang="ts">
const props = defineProps<{
  productId: string
  label?: string
  successUrl?: string
  cancelUrl?: string
  block?: boolean
  size?: string
  color?: string
  variant?: string
}>()

const { isAuthenticated } = useAuth()
const { createCheckout } = usePayments()
const isLoading = ref(false)

const handlePurchase = async () => {
  // Require auth first
  if (!isAuthenticated.value) {
    // Assuming we have a global state or method to open auth modal
    // The user's plan mentioned: useState('auth-modal-open').value = true
    const authModalOpen = useState('auth-modal-open')
    authModalOpen.value = true
    return
  }
  
  isLoading.value = true
  
  try {
    const url = await createCheckout({
      productId: props.productId,
      successUrl: props.successUrl,
      cancelUrl: props.cancelUrl
    })
    
    if (url) {
      window.location.href = url
    }
  } catch (error) {
    console.error('Checkout error:', error)
    // TODO: Show toast error
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UButton
    :label="label || 'Purchase'"
    :loading="isLoading"
    :block="block"
    :size="size"
    :color="color"
    :variant="variant"
    @click="handlePurchase"
  />
</template>
