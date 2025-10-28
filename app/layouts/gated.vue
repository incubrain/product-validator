<!-- layouts/gated.vue - SIMPLIFIED -->
<script setup lang="ts">
import { CONVERSION } from '~~/shared/config/navigation';

const route = useRoute();
const { hasAccess, email, isVerified, verifyAccess, isVerifying } =
  useGatedAccess();
const offer = useFlowOffer(CONVERSION.primary);

// ✅ Verify on mount if email exists
onMounted(async () => {
  console.log('[Layout] onMounted:', {
    email: email.value,
    isVerified: isVerified.value,
  });

  // Email is already loaded from localStorage by useStorage
  if (email.value && !isVerified.value) {
    console.log('[Layout] Found email, verifying...');
    await verifyAccess();
  }
});

// ✅ Watch for access changes
watch(
  [email, isVerified],
  async ([newEmail, newIsVerified]) => {
    console.log('[Layout] Access state changed:', {
      email: newEmail,
      isVerified: newIsVerified,
      hasAccess: hasAccess.value,
    });

    // When email is set but not verified (after grantAccess), verify it
    if (newEmail && !newIsVerified) {
      console.log('[Layout] Email set but not verified, verifying...');
      await verifyAccess();
    }
  },
  { immediate: false },
);

// Control modal state
const isModalOpen = ref(false);

// Show modal when no access and not verifying
watchEffect(() => {
  const shouldShow =
    route.path.startsWith('/magnet') && !hasAccess.value && !isVerifying.value;

  console.log('[Layout] Modal state:', {
    shouldShow,
    hasAccess: hasAccess.value,
    isVerifying: isVerifying.value,
  });

  isModalOpen.value = shouldShow;
});

// Prevent modal from closing unless we have access
const handleModalClose = (open: boolean) => {
  console.log('[Layout] Modal close requested:', {
    open,
    hasAccess: hasAccess.value,
  });

  if (!open && !hasAccess.value) {
    console.log('[Layout] ❌ Prevented modal close - no access');
    return;
  }

  console.log('[Layout] ✅ Allowing modal close');
  isModalOpen.value = open;
};
</script>

<template>
  <UDashboardGroup>
    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar>
          <template #title>
            <NuxtLink to="/magnet">
              <ILogo size="md" />
            </NuxtLink>
          </template>
          <template #right>
            <div v-if="hasAccess" class="flex items-center gap-3">
              <span class="text-sm text-muted hidden sm:inline">
                {{ email }}
              </span>
              <UButton
                label="Logout"
                color="neutral"
                variant="subtle"
                to="/"
                size="sm"
              />
            </div>
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <div>
          <slot />
        </div>
      </template>
    </UDashboardPanel>

    <UModal
      :open="isModalOpen"
      :dismissible="false"
      :ui="{
        overlay: 'bg-background/95 backdrop-blur-md',
        content: 'sm:max-w-md',
      }"
      @update:open="handleModalClose"
    >
      <template #header>
        <div class="space-y-2">
          <h2 class="text-2xl font-bold">Access Required</h2>
          <p class="text-sm text-muted">
            Enter your email to access your content
          </p>
        </div>
      </template>

      <template #body>
        <IFormMagnet location="access-gate" :offer />
      </template>

      <template #footer>
        <div class="flex flex-col items-center gap-3">
          <p class="text-xs text-dimmed text-center">Not sure what this is?</p>
          <UButton
            to="/"
            label="Learn About This Offer"
            color="neutral"
            variant="ghost"
            size="sm"
            icon="i-lucide-arrow-left"
          />
        </div>
      </template>
    </UModal>
  </UDashboardGroup>
</template>
