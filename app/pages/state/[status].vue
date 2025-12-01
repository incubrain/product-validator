<script setup lang="ts">
/**
 * Generic state page for success/cancel/error
 * Reusable for auth, payments, or any async operation
 */
const route = useRoute();
const status = route.params.status as string;

// Configuration by status type
const statusConfig = {
  success: {
    icon: 'i-lucide-check-circle',
    iconColor: 'text-green-500',
    title: 'Success!',
    message: 'Your operation completed successfully.',
    redirectPath: '/dashboard',
    redirectDelay: 3000
  },
  cancel: {
    icon: 'i-lucide-x-circle',
    iconColor: 'text-yellow-500',
    title: 'Canceled',
    message: 'The operation was canceled.',
    redirectPath: '/',
    redirectDelay: 5000
  },
  error: {
    icon: 'i-lucide-alert-circle',
    iconColor: 'text-red-500',
    title: 'Error',
    message: 'Something went wrong.',
    redirectPath: '/',
    redirectDelay: 5000
  }
};

const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.error;

// Handle verification for payments
const isVerifying = ref(false);
const verificationSuccess = ref(false);
const errorMessage = ref<string | null>(null);

onMounted(async () => {
  const sessionId = route.query.session_id as string;
  const operation = route.query.operation as string;

  // If this is a payment success with session_id
  if (status === 'success' && sessionId && operation === 'payment') {
    isVerifying.value = true;

    try {
      // Use composable which handles event emission and state update via event chain
      // @ts-ignore - usePayments is auto-imported
      const { verify } = usePayments();
      const success = await verify(sessionId);

      if (success) {
        verificationSuccess.value = true;
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error) {
      console.error('[State Page] Verification error:', error);
      errorMessage.value = error instanceof Error ? error.message : 'Verification failed';
      // Override config to show error state
      Object.assign(config, statusConfig.error);
    } finally {
      isVerifying.value = false;
    }
  }

  // Auto-redirect
  if (config.redirectDelay) {
    setTimeout(() => {
      navigateTo(config.redirectPath);
    }, config.redirectDelay);
  }
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-background">
    <div class="max-w-md w-full mx-auto p-8">
      <div class="text-center space-y-6">
        <!-- Verifying state (payment only) -->
        <template v-if="isVerifying">
          <UIcon 
            name="i-lucide-loader-2" 
            class="size-16 mx-auto animate-spin text-primary" 
          />
          <div class="space-y-2">
            <h1 class="text-2xl font-bold">Verifying...</h1>
            <p class="text-muted-foreground">
              Please wait while we confirm your payment
            </p>
          </div>
        </template>

        <!-- Success/Cancel/Error state -->
        <template v-else>
          <UIcon 
            :name="config.icon" 
            :class="['size-16 mx-auto', config.iconColor]" 
          />
          
          <div class="space-y-2">
            <h1 class="text-2xl font-bold">
              {{ config.title }}
            </h1>
            <p class="text-muted-foreground">
              {{ errorMessage || config.message }}
            </p>
            <p v-if="config.redirectDelay" class="text-sm text-muted-foreground">
              Redirecting in {{ Math.ceil(config.redirectDelay / 1000) }} seconds...
            </p>
          </div>

          <div class="pt-4 space-y-3">
            <UButton 
              :label="`Go to ${config.redirectPath === '/' ? 'Home' : 'Dashboard'}`"
              color="primary"
              size="lg"
              block
              @click="navigateTo(config.redirectPath)"
            />
            
            <UButton 
              v-if="status !== 'success'"
              label="Contact Support" 
              color="neutral"
              variant="outline"
              size="lg"
              block
              @click="navigateTo('/support')"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
