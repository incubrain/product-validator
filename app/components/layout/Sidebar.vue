<!-- components/layout/Sidebar.vue -->
<script setup lang="ts">
interface SidebarItem {
  key: string
  label: string
  path: string
  count?: number
  icon?: string
}

interface Props {
  /** Content type/collection to query */
  contentType: string
  /** Base path for navigation (e.g., '/blog', '/products') */
  basePath: string
  /** Current category filter */
  category?: string
  /** Custom navigation items to add */
  customItems?: SidebarItem[]
  /** Search placeholder text */
  searchPlaceholder?: string
  /** Show search component */
  showSearch?: boolean
  /** Sidebar title */
  title?: string
  /** Sticky positioning */
  sticky?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  searchPlaceholder: 'Search...',
  showSearch: true,
  sticky: true,
    title: 'Navigation',
    category: 'all',
    customItems: () => [],

})

const route = useRoute()

// Use existing metadata API
const { data: contentData, pending, error, refresh } = useLazyAsyncData(
  `sidebar-${props.contentType}-${props.category || 'all'}`,
  () => $fetch('/api/content/metadata', {
    query: {
      collection: props.contentType,
      category: props.category || 'all'
    }
  })
)

// Generate navigation items from metadata
const navigationItems = computed(() => {
  if (!contentData.value?.categories) return props.customItems || []

  const items: SidebarItem[] = []
  const categories = contentData.value.categories

  // Add "All" item
  items.push({
    key: 'all',
    label: 'All Items',
    path: props.basePath,
    count: categories.all || 0,
    icon: 'i-lucide-grid-3x3'
  })

  // Add category items (exclude 'all' from iteration)
  Object.entries(categories)
    .filter(([key]) => key !== 'all')
    .forEach(([category, count]) => {
      items.push({
        key: category,
        label: formatLabel(category),
        path: `${props.basePath}/${category}`,
        count: count as number,
        icon: getGroupIcon(category)
      })
    })

  // Add custom items
  if (props.customItems) {
    items.push(...props.customItems)
  }

  return items
})

const isActive = (path: string) => route.path === path
const isLoading = computed(() => pending.value)

// Helper functions
function formatLabel(key: string): string {
  return key
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function getGroupIcon(group: string): string {
  const iconMap: Record<string, string> = {
    'ai-automation': 'i-lucide-bot',
    'business-automation': 'i-lucide-briefcase',
    'space-tech': 'i-lucide-rocket',
    'future-ai': 'i-lucide-brain',
    'company-culture': 'i-lucide-users',
    'product': 'i-lucide-package',
    'service': 'i-lucide-wrench',
    'tutorial': 'i-lucide-book-open',
    'guide': 'i-lucide-map',
    'news': 'i-lucide-newspaper',
    'showcase': 'i-lucide-eye',
    'template': 'i-lucide-layout-template'
  }
  return iconMap[group] || 'i-lucide-folder'
}
</script>

<template>
  <aside class="h-full">
    <!-- Loading State -->
    <UCard
      v-if="isLoading"
      variant="outline"
      class="bg-elevated/50 border-default"
      :class="{ 'sticky top-24': sticky }"
    >
      <template v-if="showSearch" #header>
        <USkeleton class="h-10 w-full" />
      </template>
      <div class="space-y-2">
        <USkeleton class="h-8 w-full" />
        <USkeleton class="h-8 w-3/4" />
        <USkeleton class="h-8 w-2/3" />
        <USkeleton class="h-8 w-1/2" />
      </div>
    </UCard>

    <!-- Error State -->
    <UCard
      v-else-if="error"
      variant="outline"
      class="bg-elevated/50 border-default"
      :class="{ 'sticky top-24': sticky }"
    >
      <div class="text-center p-4">
        <UIcon name="i-lucide-alert-circle" class="size-8 text-red-500 mx-auto mb-2" />
        <p class="text-sm text-red-600 dark:text-red-400 mb-2">Failed to load navigation</p>
        <UButton
          variant="ghost"
          size="sm"
          @click="() => refresh()"
        >
          Retry
        </UButton>
      </div>
    </UCard>

    <!-- Main Sidebar -->
    <UCard
      v-else
      variant="outline"
      class="bg-elevated/50 border-default"
      :class="{ 'sticky top-24': sticky }"
    >
      <!-- Search Slot -->
      <template v-if="showSearch" #header>
        <slot name="search" :placeholder="searchPlaceholder">
          <div class="relative">
            <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
            <input
              type="text"
              :placeholder="searchPlaceholder"
              class="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
          </div>
        </slot>
      </template>

      <div class="space-y-6">
        <!-- Custom Header Slot -->
        <slot name="header" />

        <!-- Navigation Section -->
        <div class="space-y-3">
          <h4 
            v-if="title" 
            class="text-sm font-medium text-muted uppercase tracking-wide"
          >
            {{ title }}
          </h4>

          <div class="space-y-1">
            <!-- Before Items Slot -->
            <slot name="before-items" />

            <!-- Navigation Items -->
            <ULink
              v-for="item in navigationItems"
              :key="item.key"
              :to="item.path"
              class="flex items-center justify-between p-3 rounded-lg transition-colors group"
              :class="
                isActive(item.path)
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'hover:bg-muted text-dimmed hover:text-toned'
              "
            >
              <div class="flex items-center gap-2">
                <UIcon 
                  v-if="item.icon" 
                  :name="item.icon" 
                  class="size-4 shrink-0" 
                />
                <span
                  class="text-sm truncate"
                  :class="item.key === 'all' ? 'font-medium' : ''"
                >
                  {{ item.label }}
                </span>
              </div>
              
              <div 
                v-if="typeof item.count === 'number'"
                class="text-xs flex rounded-full justify-center items-center relative w-6 h-5 shrink-0"
              >
                <span class="text-xs font-medium text-muted">
                  {{ item.count }}
                </span>
              </div>
            </ULink>

            <!-- After Items Slot -->
            <slot name="after-items" />
          </div>
        </div>

        <!-- Custom Footer Slot -->
        <slot name="footer" />
      </div>
    </UCard>
  </aside>
</template>