<!-- app/components/ib/ContentFetcher.vue - PURE DATA FETCHING -->
<script setup lang="ts">
import type { Collections } from '@nuxt/content'

interface Props {
  collection: string
  autoI18nParams?: boolean
  autoSEO?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoI18nParams: true,
  autoSEO: true,
})

defineSlots<{
  content(props: {
    content: any
    pending: boolean
    error: any
    refresh: () => void
  }): any
  loading?(): any
  error?(props: { error: any, refresh: () => void }): any
  empty?(): any
}>()

const route = useRoute()
const slug = computed(() => route.params.slug ?? null)
const category = computed(() => route.params.category ?? null)

const { locale } = useI18n()

// ✅ i18n params setup
const setI18nParams = useSetI18nParams({
  canonicalQueries: [],
})

// ✅ Collection resolution
const collection = computed(() => `${props.collection}_${locale.value}` as keyof Collections)

// ✅ Data fetching only
const { data: content, pending, error, refresh } = useLazyAsyncData(
  `content-${collection.value}-${slug.value}`,
  async () => {
    if (!slug.value) {
      console.warn('No Slug Found: This component has to be used inside a [slug].vue page')
      return null
    }

    try {
      const result = await queryCollection(collection.value)
        .where('slugs', 'LIKE', `%"${locale.value}":"${slug.value}"%`)
        .first()

      return result
    } catch (err) {
      console.error(`Failed to fetch from collection ${collection.value}:`, err)
      return null
    }
  },
  {
    watch: [locale, collection],
  },
)

// ✅ Set i18n params for language switching
watch([content, locale], () => {
  if (props.autoI18nParams && content.value?.slugs) {
    const params: Record<string, any> = {}

    Object.entries(content.value.slugs).forEach(([lang, slug]) => {
      params[lang] = { slug: slug as string }
      if (category.value) {
        params[lang].category = category.value
      }
    })

    setI18nParams(params)
    console.log('🔗 Set i18n params for language switching:', params)
  }
}, { immediate: true })

// ✅ SEO handling
if (props.autoSEO) {
  const i18nHead = useLocaleHead({
    seo: true,
    lang: true,
    dir: true,
  })

  useHead(() => ({
    htmlAttrs: {
      lang: i18nHead.value.htmlAttrs?.lang,
      dir: i18nHead.value.htmlAttrs?.dir,
    },
    link: [...(i18nHead.value.link || [])],
    meta: [
      ...(i18nHead.value.meta || []),
      ...(content.value
        ? [
            { name: 'description', content: content.value.description || content.value.excerpt },
            { property: 'og:title', content: content.value.title },
          ]
        : []),
    ],
  }))
}

// ✅ Expose data to parent
defineExpose({
  content: readonly(content),
  pending: readonly(pending),
  error: readonly(error),
  refresh,
})
</script>

<template>
  <!-- Loading State -->
  <div v-if="pending">
    <slot name="loading">
      <div class="animate-pulse space-y-3">
        <div class="h-8 bg-gray-200 rounded" />
        <div class="h-4 bg-gray-200 rounded w-3/4" />
        <div class="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </slot>
  </div>

  <!-- Error State -->
  <div v-else-if="error">
    <slot
      name="error"
      :error="error"
      :refresh="refresh"
    >
      <div class="p-4 border border-red-200 rounded bg-red-50">
        <h3 class="text-red-800 font-medium">
          Content Load Error
        </h3>
        <p class="text-red-600 text-sm">
          {{ error.message || 'Failed to load content' }}
        </p>
        <p class="text-xs text-red-500 mt-1">
          Collection: {{ collection }}, Slug: {{ slug }}
        </p>
        <button
          class="mt-2 px-3 py-1 text-sm bg-red-100 hover:bg-red-200 rounded"
          @click="refresh()"
        >
          Retry
        </button>
      </div>
    </slot>
  </div>

  <!-- Empty State -->
  <div v-else-if="!content">
    <slot name="empty">
      <div class="p-6 text-center">
        <h3 class="text-gray-700 font-medium">
          Content Not Found
        </h3>
        <p class="text-gray-500 text-sm">
          The requested content is not available in {{ locale.toUpperCase() }}.
        </p>
        <p class="text-xs text-gray-400 mt-1">
          Looking for: slug="{{ slug }}" in {{ collection }}
        </p>
      </div>
    </slot>
  </div>

  <!-- Default Slot with Data -->
  <div v-else>
    <slot
      name="content"
      :content="content"
      :pending="pending"
      :error="error"
      :refresh="refresh"
    >
      <!-- Fallback: Just show raw data -->
      <pre class="text-xs bg-gray-100 p-4 rounded overflow-auto">{{ JSON.stringify(content, null, 2) }}</pre>
    </slot>
  </div>
</template>
