<script setup lang="ts">
import { findPageChildren, findPageBreadcrumb } from '@nuxt/content/utils';
import { mapContentNavigation } from '@nuxt/ui/utils/content';
import { CONVERSION } from '~~/shared/config/navigation';

const ROOT_PATH = '/magnet';

const route = useRoute();
const { hasAccess, email, isVerified, verifyAccess, isVerifying } =
  useGatedAccess();
const offer = useFlowOffer(CONVERSION.primary);

const {
  isContentAccessible,
  getContentLabel,
  getContentIcon,
  getContentIconColor,
} = useContentAccess();

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

console.log('Stages:', { stages: stages, navigation: navigation });

const breadcrumb = computed(() =>
  mapContentNavigation(
    findPageBreadcrumb(navigation?.value, route.fullPath, {
      current: true,
      indexAsChild: false,
    }),
    { deep: 0 },
  ).map(({ icon, ...link }) => link),
);
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
        <!-- Collapsed navigation with icons -->
        <div v-if="isCollapsed" class="flex flex-col gap-2">
          <UTooltip v-for="stage in stages" :key="stage.path" placement="right">
            <template #text>
              <span>{{ stage.title }}</span>
              <span
                v-if="!isContentAccessible(stage)"
                class="text-xs opacity-75"
              >
                ({{ getContentLabel(stage) }})
              </span>
            </template>

            <!-- Button with status badge -->
            <div class="relative inline-flex">
              <UButton
                :icon="stage.icon"
                :to="isContentAccessible(stage) ? stage.path : undefined"
                :disabled="!isContentAccessible(stage)"
                color="neutral"
                variant="ghost"
                square
                size="md"
                :class="{
                  'bg-primary/10 text-primary': route.path.startsWith(
                    stage.path,
                  ),
                  'opacity-50 cursor-not-allowed': !isContentAccessible(stage),
                }"
              />

              <!-- Status badge icon -->
              <UIcon
                v-if="!isContentAccessible(stage) && getContentIcon(stage)"
                :name="getContentIcon(stage)!"
                class="absolute -top-1 -right-1 size-3 bg-background rounded-full"
                :class="getContentIconColor(stage)"
              />
            </div>
          </UTooltip>
        </div>

        <!-- Expanded navigation with proper slots -->
        <UContentNavigation
          v-else
          :navigation="stages"
          type="single"
          default-open
          collapsible
          highlight
          highlight-color="primary"
          color="primary"
        >
          <!-- ✅ Use link-trailing slot (correct slot name from docs) -->
          <template #link-trailing="{ link }">
            <!-- Only show status for inaccessible content -->
            <div
              v-if="!isContentAccessible(link)"
              class="flex items-center gap-1.5"
            >
              <UIcon
                v-if="getContentIcon(link)"
                :name="getContentIcon(link)!"
                class="size-3.5"
                :class="getContentIconColor(link)"
              />
            </div>
          </template>
        </UContentNavigation>
      </template>
    </UDashboardSidebar>

    <!-- Main Panel -->
    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar>
          <template #title>
            <UDashboardSidebarCollapse />
            <UBreadcrumb :items="breadcrumb" />
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
