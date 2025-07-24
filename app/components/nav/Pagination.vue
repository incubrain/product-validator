<!-- components/layout/NavPagination.vue -->
<script setup lang="ts">
import { useOffsetPagination } from '@vueuse/core'
import { PAGINATION_DEFAULTS, CONTENT_TYPE_LABELS } from '#shared/utils/pagination'
import type { ContentType } from '#shared/utils/pagination'

interface Props {
  contentType: ContentType
  category?: string
}

const props = defineProps<Props>()

const route = useRoute()
const router = useRouter()

// Configuration
const itemsPerPage = PAGINATION_DEFAULTS[props.contentType as keyof typeof PAGINATION_DEFAULTS] || 12
const stateKey = `${props.contentType}${props.category ? `-${props.category}` : ''}-page`

// Get initial page - CRITICAL: Handle edge cases
const getInitialPage = () => {
  const urlPage = route.query.page ? Number(route.query.page) : null
  const storedPage = import.meta.client ? Number(localStorage.getItem(stateKey)) : null

  // Validate page numbers
  if (urlPage && urlPage > 0) return urlPage
  if (storedPage && storedPage > 0) return storedPage
  return 1
}

// Fetch all data from API
const { data: contentData, pending, error } = useLazyAsyncData(
  `content-${props.contentType}-${props.category || 'all'}`,
  () => $fetch('/api/content/metadata', {
    query: {
      collection: props.contentType,
      category: props.category || 'all',
    },
  }),
)

// Data with error handling
const allItems = computed(() => contentData.value?.items || [])
const totalItems = computed(() => allItems.value.length)
const hasData = computed(() => !pending.value && !error.value && totalItems.value > 0)
const isEmpty = computed(() => !pending.value && !error.value && totalItems.value === 0)

// VueUse pagination with FULL API utilization
const {
  currentPage,
  currentPageSize,
  pageCount,
  isFirstPage,
  isLastPage,
  prev,
  next,
} = useOffsetPagination({
  total: totalItems,
  pageSize: itemsPerPage,
  page: getInitialPage(),

  // CRITICAL: Handle page changes with routing + persistence + validation
  onPageChange: async ({ currentPage: newPage, pageCount: totalPages }) => {
    // Validate page bounds - redirect if invalid
    if (newPage > totalPages && totalPages > 0) {
      await router.replace({
        query: { ...route.query, page: totalPages > 1 ? totalPages : undefined },
      })
      return
    }

    // Update URL with query params (SEO friendly)
    await router.push({
      query: {
        ...route.query,
        page: newPage > 1 ? newPage : undefined,
      },
    })

    // Persist state
    if (import.meta.client) {
      if (newPage === 1) {
        localStorage.removeItem(stateKey)
      } else {
        localStorage.setItem(stateKey, newPage.toString())
      }
    }
  },

  // Handle page size changes (if needed in future)
  onPageSizeChange: ({ currentPage: newPage, currentPageSize: newSize }) => {
    console.log(`Page size changed to ${newSize}, adjusting to page ${newPage}`)
  },

  // Handle total page count changes
  onPageCountChange: ({ currentPage: newPage, pageCount: newCount }) => {
    // If current page exceeds new page count, redirect to last page
    if (newPage > newCount && newCount > 0) {
      router.replace({
        query: { ...route.query, page: newCount > 1 ? newCount : undefined },
      })
    }
  },
})

// Client-side pagination with bounds checking
const paginatedItems = computed(() => {
  if (!hasData.value) return []

  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage

  // Ensure we don't exceed array bounds
  return allItems.value.slice(start, Math.min(end, allItems.value.length))
})

// UI state management
const showPagination = computed(() => hasData.value && totalItems.value > itemsPerPage)
const showContent = computed(() => hasData.value && paginatedItems.value.length > 0)

// Results text with edge case handling
const startItem = computed(() => {
  if (!hasData.value || paginatedItems.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage + 1
})

const endItem = computed(() => {
  if (!hasData.value) return 0
  return startItem.value + paginatedItems.value.length - 1
})

const resultsText = computed(() => {
  if (pending.value) return 'Loading...'
  if (error.value) return 'Error loading content'
  if (isEmpty.value) return 'No items found'

  const itemName = CONTENT_TYPE_LABELS[props.contentType as keyof typeof CONTENT_TYPE_LABELS] || 'items'
  const singular = itemName.slice(0, -1)
  const label = totalItems.value === 1 ? singular : itemName

  return `Showing ${startItem.value}-${endItem.value} of ${totalItems.value} ${label}`
})

// Navigation helpers using VueUse functions
const canGoPrev = computed(() => !isFirstPage.value && hasData.value)
const canGoNext = computed(() => !isLastPage.value && hasData.value)

// Enhanced routing for UPagination
const generateTo = (page: number) => {
  // Validate page bounds before generating route
  if (page < 1 || (pageCount.value > 0 && page > pageCount.value)) return undefined

  return {
    query: {
      ...route.query,
      page: page > 1 ? page : undefined,
    },
  }
}

// Keyboard navigation
defineShortcuts({
  arrowleft: () => canGoPrev.value && prev(),
  arrowright: () => canGoNext.value && next(),
})

// SEO: Watch for direct page access and validate
watchEffect(() => {
  // If user directly accessed invalid page, redirect
  if (route.query.page && hasData.value && pageCount.value > 0) {
    const requestedPage = Number(route.query.page)
    if (requestedPage > pageCount.value) {
      router.replace({
        query: { ...route.query, page: pageCount.value > 1 ? pageCount.value : undefined },
      })
    }
  }
})
</script>

<template>
  <div class="space-y-component">
    <!-- Content Slot with comprehensive data -->
    <slot
      :items="paginatedItems"
      :loading="pending"
      :error="error"
      :has-data="hasData"
      :is-empty="isEmpty"
      :total-items="totalItems"
      :current-page="currentPage"
      :page-count="pageCount"
      :can-go-prev="canGoPrev"
      :can-go-next="canGoNext"
      :prev="prev"
      :next="next"
    />

    <!-- Error State -->
    <div
      v-if="error"
      class="text-center py-section"
    >
      <UIcon
        name="i-lucide-alert-circle"
        class="size-12 text-error mx-auto mb-component"
      />
      <h3 class="text-lg font-medium text-error mb-2">
        Failed to Load Content
      </h3>
      <p class="text-muted">
        {{ error.message || 'Please try again later' }}
      </p>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="isEmpty"
      class="text-center py-section"
    >
      <UIcon
        name="i-lucide-file-text"
        class="size-12 text-dimmed mx-auto mb-component"
      />
      <h3 class="text-lg font-medium text-highlighted mb-2">
        No {{ CONTENT_TYPE_LABELS[contentType] || 'items' }} found
      </h3>
      <p class="text-muted">
        Check back soon for new content!
      </p>
    </div>

    <!-- Pagination UI with keyboard navigation -->
    <div
      v-else-if="showPagination"
      class="flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div
        class="text-sm text-muted"
        role="status"
        aria-live="polite"
      >
        {{ resultsText }}
      </div>

      <div class="flex items-center gap-2">
        <!-- Quick navigation buttons using VueUse functions -->
        <UButton
          variant="outline"
          size="sm"
          icon="i-lucide-chevron-left"
          :disabled="isFirstPage"
          aria-label="Previous page"
          @click="prev"
        />

        <!-- Main pagination -->
        <UPagination
          :page="currentPage"
          :total="totalItems"
          :items-per-page="itemsPerPage"
          :to="generateTo"
          :sibling-count="2"
          show-edges
          @update:page="(page) => currentPage = page"
        />

        <!-- Quick navigation buttons -->
        <UButton
          variant="outline"
          size="sm"
          icon="i-lucide-chevron-right"
          :disabled="isLastPage"
          aria-label="Next page"
          @click="next"
        />
      </div>
    </div>

    <!-- Page info for keyboard users -->
    <div
      v-if="showPagination"
      class="sr-only"
      aria-live="polite"
    >
      Page {{ currentPage }} of {{ pageCount }}.
      Use left and right arrow keys to navigate.
    </div>
  </div>
</template>
