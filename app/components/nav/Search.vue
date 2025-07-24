<!-- components/blog/BlogSearch.vue - USING HOOK DATA DIRECTLY -->
<script setup lang="ts">
interface Props {
  placeholder?: string
  variant?: 'input' | 'button'
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Search blog posts and pages...',
  variant: 'input',
  size: 'md',
})

const isOpen = ref(false)
const searchTerm = ref('')

// UPDATED: Use hook-injected searchSections directly
const { data: searchData } = await useAsyncData('global-search-direct', async () => {
  const [blogSections, blogPosts, pages] = await Promise.all([
    queryCollectionSearchSections('blog'),
    queryCollection('blog').select('path', 'title', 'description').all(),
    // GET pages with hook-injected searchSections
    queryCollection('pages')
      .select('path', 'title', 'description', 'searchSections', 'searchContent')
      .all(),
  ])

  // TRANSFORM hook-injected searchSections into search format
  const pageSections = pages.flatMap((page) =>
    (page.searchSections || []).map((section) => ({
      id: `${page.path}#${section.id}`,
      title: section.title,
      content: section.content,
      path: page.path,
      pageTitle: page.title,
    })),
  )

  console.log('🔍 DIRECT SEARCH DEBUG:')
  console.log('  Pages found:', pages.length)
  console.log(
    '  Pages with searchSections:',
    pages.filter((p) => p.searchSections?.length > 0),
  )
  console.log('  Total page sections generated:', pageSections.length)
  console.log('  Sample page sections:', pageSections.slice(0, 3))

  return { blogSections, pageSections, blogPosts, pages }
})

// Create lookup maps for titles
const titleMaps = computed(() => {
  const blogMap = new Map()
  const pagesMap = new Map()

  searchData.value?.blogPosts?.forEach((post) => {
    blogMap.set(post.path, {
      title: post.title,
      description: post.description,
      type: 'blog',
    })
  })

  searchData.value?.pages?.forEach((page) => {
    pagesMap.set(page.path, {
      title: page.title,
      description: page.description,
      type: 'page',
    })
  })

  return { blog: blogMap, pages: pagesMap }
})

// Enhanced search groups using direct searchSections
const searchGroups = computed(() => {
  if (!searchData.value || !searchTerm.value.trim()) {
    return []
  }

  const searchLower = searchTerm.value.toLowerCase()
  const groups = []

  // BLOG SECTIONS GROUP (unchanged)
  const blogSections
    = searchData.value.blogSections?.filter((section) => {
      return (
        section.title?.toLowerCase().includes(searchLower)
        || section.content?.toLowerCase().includes(searchLower)
        || section.titles?.join(' ').toLowerCase().includes(searchLower)
      )
    }) || []

  if (blogSections.length > 0) {
    const blogItems = blogSections.slice(0, 8).map((section) => {
      const postPath = section.id.split('#')[0]
      const postInfo = titleMaps.value.blog.get(postPath)

      return {
        id: section.id,
        label: section.title || 'Section',
        suffix: `${postInfo?.title || 'Blog Post'} • ${(section.content || '').slice(0, 60)}...`,
        icon: 'i-lucide-file-text',
        to: section.id,
        onSelect() {
          isOpen.value = false
          searchTerm.value = ''
        },
      }
    })

    groups.push({
      id: 'blog',
      label: `Blog Posts (${blogItems.length})`,
      items: blogItems,
    })
  }

  // PAGES SECTIONS GROUP - Using hook-injected searchSections
  const pageSections
    = searchData.value.pageSections?.filter((section) => {
      return (
        section.title?.toLowerCase().includes(searchLower)
        || section.content?.toLowerCase().includes(searchLower)
      )
    }) || []

  if (pageSections.length > 0) {
    const pageItems = pageSections.slice(0, 8).map((section) => {
      return {
        id: section.id,
        label: section.title || 'Section',
        suffix: `${section.pageTitle || 'Page'} • ${(section.content || '').slice(0, 60)}...`,
        icon: 'i-lucide-layout',
        to: section.id,
        onSelect() {
          isOpen.value = false
          searchTerm.value = ''
        },
      }
    })

    groups.push({
      id: 'pages',
      label: `Page Sections (${pageItems.length})`,
      items: pageItems,
    })
  }

  return groups
})

// Keyboard shortcuts
defineShortcuts({
  '/': () => {
    if (!isOpen.value) {
      isOpen.value = true
    }
  },
  'meta_k': () => {
    isOpen.value = !isOpen.value
  },
  'escape': {
    usingInput: false,
    handler: () => {
      if (isOpen.value) {
        closeSearch()
      }
    },
  },
})

const openSearch = () => {
  isOpen.value = true
}

const closeSearch = () => {
  isOpen.value = false
  searchTerm.value = ''
}
</script>

<template>
  <div>
    <!-- Trigger Button/Input -->
    <div v-if="variant === 'button'">
      <UButton
        variant="ghost"
        color="neutral"
        :size="size"
        icon="i-lucide-search"
        @click="openSearch"
      >
        <span v-if="placeholder && size !== 'sm'">{{ placeholder }}</span>
        <template #trailing>
          <UKbd value="/" />
        </template>
      </UButton>
    </div>

    <div v-else>
      <UInput
        :placeholder="placeholder"
        icon="i-lucide-search"
        :size="size"
        readonly
        class="cursor-pointer"
        @click="openSearch"
      >
        <template #trailing>
          <UKbd value="/" />
        </template>
      </UInput>
    </div>

    <!-- Enhanced Modal -->
    <UModal
      v-model:open="isOpen"
      title="Search Website"
      :ui="{
        content: 'w-full max-w-3xl',
        body: 'p-0',
        header: 'p-0',
      }"
    >
      <!-- Header -->
      <template #header>
        <div class="p-4 flex items-center space-x-3">
          <UIcon
            name="i-lucide-search"
            class="size-5 text-muted"
          />
          <UInput
            v-model="searchTerm"
            :placeholder="placeholder"
            variant="none"
            class="flex-1 border-0 focus:ring-0 w-full"
            autofocus
          />
        </div>
      </template>

      <template #body>
        <div class="h-96 overflow-y-auto">
          <UCommandPalette
            v-model:search-term="searchTerm"
            :groups="searchGroups"
            :close="false"
            :fuse="{
              fuseOptions: {
                includeMatches: true,
                threshold: 0.3,
                keys: ['label', 'suffix'],
              },
              resultLimit: 20,
            }"
            class="border-0 h-full"
            :ui="{
              input: 'hidden',
              close: 'hidden',
              content: 'h-full',
              viewport: 'h-full p-2',
              group: {
                label: 'px-3 py-2 text-xs font-semibold text-primary bg-elevated/50',
              },
            }"
          >
            <template #empty>
              <div class="py-8 text-center">
                <UIcon
                  name="i-lucide-search-x"
                  class="size-8 text-muted mx-auto mb-3"
                />
                <p class="text-muted">
                  {{
                    searchTerm
                      ? `No content found for "${searchTerm}"`
                      : 'Start typing to search through blog posts and pages...'
                  }}
                </p>
              </div>
            </template>

            <template #item-leading="{ item }">
              <UIcon
                :name="item.icon"
                class="size-4"
                :class="item.icon === 'i-lucide-file-text' ? 'text-primary' : 'text-secondary'"
              />
            </template>

            <template #item-label="{ item }">
              <div class="min-w-0 flex-1">
                <div class="font-medium text-highlighted truncate">
                  {{ item.label }}
                </div>
                <div class="text-xs text-muted truncate mt-0.5">
                  {{ item.suffix }}
                </div>
              </div>
            </template>
          </UCommandPalette>
        </div>
      </template>

      <!-- Footer -->
      <template #footer>
        <div class="flex items-center justify-center text-xs text-muted p-4 space-x-4">
          <div class="flex items-center space-x-2">
            <UIcon
              name="i-lucide-lightbulb"
              class="size-3"
            />
            <span>Searches blog posts and pages</span>
          </div>
          <div class="flex items-center space-x-1">
            <UKbd value="↑" />
            <UKbd value="↓" />
            <span class="mx-1">navigate</span>
            <UKbd value="↵" />
            <span>select</span>
            <UKbd value="esc" />
            <span>close</span>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
