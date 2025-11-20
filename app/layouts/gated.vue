<script setup lang="ts">
import { findPageChildren, findPageBreadcrumb } from '@nuxt/content/utils';
import { mapContentNavigation } from '@nuxt/ui/utils/content';


const ROOT_PATH = '/magnet';

const route = useRoute();
const { hasAccess, email, isVerified, verifyAccess, isVerifying } =
  useGatedAccess();

// Fetch primary offer from collection
// Fetch primary offer from collection
const { getPrimaryOffer } = useContentCache();
const { data: offer } = await getPrimaryOffer();

const { getCompletedCount, initialize, isAccessible, isComplete, flatSteps } = useMagnetProgress();


// Fetch navigation for sidebar
const { data: navigation } = useAsyncData('magnet-navigation', () => {
  return queryCollectionNavigation('magnet', ['status', 'disabled']);
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


// Get current step number based on route
const currentStepNumber = computed(() => {
  if (!navigation.value) return 0;
  
  // Initialize the progress logic with our navigation structure
  // Note: initialize is idempotent and safe to call, but ideally called once.
  // We call it here to ensure it's ready when navigation loads.
  if (navigation.value && flatSteps.value.length === 0) {
    initialize(navigation.value);
  }
  
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
    const status = item.status || 'published'; // Default to published if not set
    const isRestrictedStatus = status !== 'published' && status !== 'beta';
    
    // Accessibility logic
    // A page is accessible if:
    // 1. It's unlocked via progress (isAccessible)
    // 2. AND it's not in a restricted status (draft, archived, etc.)
    const unlocked = isAccessible(item.path);
    const accessible = hasChildren ? true : (unlocked && !isRestrictedStatus);
    const complete = hasChildren ? false : isComplete(item.path);

    return {
      label: item.title,
      icon: item.icon,
      // Only set 'to' if it's a page and accessible
      to: (accessible && !hasChildren) ? item.path : undefined,
      // Use 'magnet-link' slot for leaf nodes to show custom icons
      slot: hasChildren ? undefined : 'magnet-link',
      disabled: !accessible && !hasChildren,
      isComplete: complete, // Custom prop for the slot
      isRestricted: isRestrictedStatus && !hasChildren, // Custom prop for the slot
      defaultOpen: hasChildren, // Auto-open folders
      children: hasChildren ? mapToNavigationMenu(item.children) : undefined,
    };
  });
};

const menuItems = computed(() => mapToNavigationMenu(stages.value));

// Debugging
watchEffect(() => {
  console.log('Flat Steps:', flatSteps.value);
  console.log('Menu Items:', menuItems.value);
});
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
        footer: 'border-t border-default',
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
          orientation="vertical" 
          :collapsed="isCollapsed"
          class="w-full px-2 py-2"
          :ui="{
            link: 'disabled:opacity-100', 
            linkLeadingIcon: 'text-muted-foreground',
            label: 'text-foreground',
          }"
          tooltip
        >
          <template #magnet-link-trailing="{ item }">
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
        <UDashboardSidebarCollapse />
      </template>
    </UDashboardSidebar>

    <!-- Main Panel -->
    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar>
          <template #title>
            <!-- UDashboardSidebarCollapse was here, but moved to sidebar footer -->
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

        <UDashboardToolbar>
          <IMagnetProgressIndicator
            :current-step="currentStepNumber"
            :total-steps="totalSteps"
            class="w-full"
          />
        </UDashboardToolbar>
      </template>

      <template #body>
        <!-- Breadcrumb -->
        
        
        <div class="px-6 py-6 max-w-4xl mx-auto ">
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
