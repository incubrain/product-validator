<script setup lang="ts">
import { findPageChildren, findPageBreadcrumb } from '@nuxt/content/utils';
import { mapContentNavigation } from '@nuxt/ui/utils/content';

const ROOT_PATH = '/gated';

const route = useRoute();
const { hasAccess, email, isVerified, verifyAccess, isVerifying } =
  useGatedAccess();

// Fetch primary offer from collection
const { getPrimaryOffer } = useContentCache();
const { data: offer } = await getPrimaryOffer();

const { getCompletedCount, initialize, isAccessible, isComplete, flatSteps } = useContentProgress();

// Fetch navigation for sidebar
const { data: navigation } = useAsyncData('gated-navigation', () => {
  return queryCollectionNavigation('gated', ['status', 'disabled']);
});

// ✅ Verify on mount if email exists
onMounted(async () => {
  if (email.value && !isVerified.value) {
    await verifyAccess();
  }
});

// ✅ Watch for access changes
watch(
  [email, isVerified],
  async ([newEmail, newIsVerified]) => {
    if (newEmail && !newIsVerified) {
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
  isModalOpen.value = shouldShow;
});

const handleModalClose = (open: boolean) => {
  if (!open && !hasAccess.value) {
    return;
  }
  isModalOpen.value = open;
};

const isCollapsed = ref(false);
const stages = computed(() =>
  findPageChildren(navigation.value, ROOT_PATH, {
    indexAsChild: false,
  }),
);

// Count total steps (all leaf nodes in navigation)
const totalSteps = computed(() => {
  return flatSteps.value.length;
});

// ✅ Watch for navigation changes to initialize progress
watch(navigation, (newNav) => {
  if (newNav) {
    initialize(newNav);
  }
}, { immediate: true });

// Get current step number based on route
const currentStepNumber = computed(() => {
  if (!navigation.value) return 0;
  return getCompletedCount() + 1; // Current is completed + 1
});

const breadcrumb = computed(() =>
  mapContentNavigation(
    findPageBreadcrumb(navigation?.value, route.fullPath, {
      current: true,
      indexAsChild: false,
    }),
    { deep: 0 },
  ).map(({ icon, ...link }) => link),
);

// Map to UNavigationMenu items
const mapToNavigationMenu = (items: any[]): any[] => {
  return items.map(item => {
    const hasChildren = item.children && item.children.length > 0;
    
    // Check content status
    const status = item.status || 'published';
    const isRestrictedStatus = status !== 'published' && status !== 'beta';
    
    // Accessibility logic
    const unlocked = isAccessible(item.path);
    const accessible = hasChildren ? true : (unlocked && !isRestrictedStatus);
    const complete = hasChildren ? false : isComplete(item.path);

    return {
      label: item.title,
      icon: item.icon,
      to: (accessible && !hasChildren) ? item.path : undefined,
      slot: hasChildren ? undefined : 'gated-link',
      disabled: !accessible && !hasChildren,
      isComplete: complete,
      isRestricted: isRestrictedStatus && !hasChildren,
      defaultOpen: hasChildren,
      children: hasChildren ? mapToNavigationMenu(item.children) : undefined,
    };
  });
};

const menuItems = computed(() => mapToNavigationMenu(stages.value));

// Handle logout
const handleLogout = () => {
  // Clear access and redirect
  navigateTo('/');
};
</script>

<template>
  <UDashboardGroup>
    <!-- Sidebar -->
    <UDashboardSidebar
      v-model:collapsed="isCollapsed"
      collapsible
      :min-size="22"
      :default-size="22"
      :max-size="22"
      :ui="{
        header: 'justify-between',
        body: 'pt-4',
        footer: 'border-t border-default pt-4',
      }"
    >
      <template #header>
        <NuxtLink :to="ROOT_PATH">
          <ILogo
            :show-text="!isCollapsed"
            size="md"
            class="h-5 w-auto shrink-0"
          />
        </NuxtLink>
      </template>

      <template #default>
        <UNavigationMenu 
          :items="menuItems" 
          type="single"
          orientation="vertical" 
          :collapsed="isCollapsed"
          collapsible
          class="w-full px-2 py-2"
          :ui="{
            link: 'disabled:opacity-100', 
            linkLeadingIcon: 'text-muted-foreground',
            label: 'text-foreground',
          }"
          tooltip
        >
          <template #gated-link-trailing="{ item }">
            <div class="flex items-center gap-2">
              <UIcon 
                v-if="item.isRestricted" 
                name="i-lucide-construction" 
                class="size-4 text-warning" 
              />
              <UIcon 
                v-else-if="item.disabled" 
                name="i-lucide-lock" 
                class="size-4 text-muted-foreground/50" 
              />
              <UIcon 
                v-else-if="item.isComplete" 
                name="i-lucide-square-check" 
                class="size-4 text-primary" 
              />
              <UIcon 
                v-else 
                name="i-lucide-square" 
                class="size-4 text-muted-foreground/30" 
              />
            </div>
          </template>
        </UNavigationMenu>
      </template>

      <template #footer>
  <div class="space-y-3">
    <!-- User info (only when expanded and has access) -->
    <div v-if="hasAccess && !isCollapsed" class="space-y-2">
      <!-- Email display -->
      <div class="flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-900/50">
        <UIcon name="i-lucide-user" class="size-4 text-muted shrink-0" />
        <span class="text-xs text-muted truncate flex-1">{{ email }}</span>
      </div>
      
      <!-- Logout button -->
      <UButton
        label="Logout"
        icon="i-lucide-log-out"
        color="neutral"
        variant="subtle"
        size="sm"
        block
        @click="handleLogout"
      />
    </div>
    
    <!-- Collapsed state: just logout icon button -->
    <div v-if="hasAccess && isCollapsed" class="flex flex-col items-center gap-2">
      <UButton
        icon="i-lucide-log-out"
        color="neutral"
        variant="subtle"
        size="sm"
        square
        @click="handleLogout"
      />
    </div>
    
    <!-- Collapse toggle (always at bottom, centered when collapsed) -->
    <div :class="isCollapsed ? 'flex justify-center' : 'flex justify-end'">
      <UDashboardSidebarCollapse />
    </div>
  </div>
</template>
    </UDashboardSidebar>

    <!-- Main Panel -->
    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar :ui="{ right: 'flex items-center gap-4 flex-1 justify-end' }">
          <template #right>
            <GatedProgressIndicator
              :current-step="currentStepNumber"
              :total-steps="totalSteps"
              class="flex-1 max-w-md"
            />
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <div 
          class="px-6 py-6 max-w-4xl mx-auto"
          data-dashboard-panel-body
          data-testid="dashboard-content-area"
        >
          <slot />
        </div>
      </template>
    </UDashboardPanel>

    <!-- Access Modal -->
    <UModal
      :open="isModalOpen"
      :dismissible="false"
      :ui="{
        overlay: 'bg-default/95 backdrop-blur-md',
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
        <IFormValidation location="access-gate" :offer />
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