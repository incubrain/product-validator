<script setup lang="ts">
import { findPageChildren } from '@nuxt/content/utils';
import { CONVERSION } from '~~/shared/config/navigation';

const ROOT_PATH = '/magnet';

const route = useRoute();
const { hasAccess, email, isVerified, verifyAccess, isVerifying } =
  useGatedAccess();
const offer = useFlowOffer(CONVERSION.primary);

// Fetch navigation for sidebar
const { data: navigation } = await useAsyncData('magnet-navigation', () => {
  return queryCollectionNavigation('magnet', [
    'description',
    'navigation',
    'duration',
    'metrics',
    'step',
  ]);
});

// ✅ Verify on mount if email exists
onMounted(async () => {
  console.log('[Layout] onMounted:', {
    email: email.value,
    isVerified: isVerified.value,
  });

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

    if (newEmail && !newIsVerified) {
      console.log('[Layout] Email set but not verified, verifying...');
      await verifyAccess();
    }
  },
  { immediate: false },
);

// Control modal state
const isModalOpen = ref(false);

watchEffect(() => {
  const shouldShow =
    route.path.startsWith(ROOT_PATH) && !hasAccess.value && !isVerifying.value;

  console.log('[Layout] Modal state:', {
    shouldShow,
    hasAccess: hasAccess.value,
    isVerifying: isVerifying.value,
  });

  isModalOpen.value = shouldShow;
});

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

const collapsed = ref(false);
console.log('NAV', navigation.value);
</script>

<template>
  <UDashboardGroup>
    <!-- Sidebar -->
    <UDashboardSidebar
      v-model:collapsed="collapsed"
      collapsible
      :ui="{
        header: 'justify-between',
        footer: 'border-t border-default',
      }"
    >
      <template #header>
        <ILogo
          v-if="!collapsed"
          :show-text="false"
          size="md"
          class="h-5 w-auto shrink-0"
        />
        <UDashboardSidebarCollapse />
      </template>

      <template #default>
        <div v-if="collapsed" class="space-y-2">
          <UButton
            v-for="stage in findPageChildren(navigation, '/magnet')"
            :key="stage.path"
            :icon="stage.icon"
            :to="stage.path"
            color="neutral"
            variant="ghost"
            square
            size="lg"
          />
        </div>

        <!-- Show full navigation when expanded -->
        <UContentNavigation
          v-else
          :navigation="findPageChildren(navigation, '/magnet')"
          type="single"
          collapsible
          highlight
          highlight-color="primary"
          color="primary"
        />
      </template>

      <template #footer>
        <div v-if="hasAccess" class="w-full">
          <UButton
            v-if="!collapsed"
            :label="email || 'User'"
            icon="i-lucide-user"
            color="neutral"
            variant="ghost"
            block
            truncate
          />
          <UButton
            v-else
            icon="i-lucide-user"
            color="neutral"
            variant="ghost"
            square
          />
        </div>
      </template>
    </UDashboardSidebar>

    <!-- Main Panel -->
    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar>
          <template #title>
            <NuxtLink :to="ROOT_PATH">
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
        <div class="p-6">
          <slot />
        </div>
      </template>
    </UDashboardPanel>

    <!-- Access Modal -->
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
