// app/composables/useI18nContentDebug.ts
import type { LocaleInfo } from '@nuxtjs/i18n'

interface DebugData {
  content: Ref<any>
  translations: Ref<Record<string, any>>
  pending: Ref<boolean>
  error: Ref<any>
  pageKey: string
  collection?: string
  paramMap?: any
  autoSEO?: boolean
  autoI18nParams?: boolean
  selectFields?: string[]
}

interface ProcessedDebugInfo {
  content: {
    stem: string | null
    collection: string
    locale: string
    cacheKey: string
    fields: string[]
    status: {
      found: boolean
      published: boolean
      hasTranslations: boolean
    }
  }
  translations: {
    found: string[]
    missing: string[]
    total: number
  }
  params: {
    current: Record<string, string>
    route: Record<string, any>
  }
  seo: {
    title?: string
    description?: string
    autoSEO: boolean
    autoI18nParams: boolean
    generated: {
      ogImage?: any
      sitemap?: any
      robots?: any
      schemaOrg?: any
    }
  }
  performance: {
    timestamp: number
    pageKey: string
    routePath: string
  }
  meta: {
    collection: string
    locale: string
    route: string
  }
}

// Global debug registry
const debugRegistry = ref<Map<string, ProcessedDebugInfo>>(new Map())
const currentPageKey = ref<string>('')

/**
 * Global debug registry for i18n content system
 * Tracks debug information across all pages when debug mode is enabled
 */
export function useI18nContentDebug(data: DebugData) {
  const { locale, locales } = useI18n()
  const route = useRoute()

  // Helper to extract STEM from content ID
  const getFileStem = (content: any, collection: string) => {
    const id = content?.id as string | undefined
    if (!id) return null

    const pA = `${locale.value}_${collection}/`
    const pB = `${locale.value}/${collection}/`
    const stripped = id.startsWith(pA)
      ? id.slice(pA.length)
      : id.startsWith(pB)
        ? id.slice(pB.length)
        : id.split('/').pop() || id
    return stripped
  }

  // Process debug information
  const debugInfo = computed<ProcessedDebugInfo>(() => {
    const content = data.content.value
    const translations = data.translations.value
    const stem = getFileStem(content, data.collection || 'unknown')

    // Translation analysis - simplified
    const foundTranslations = Object.keys(translations)
    const allLocales = locales.value.map((l: any) => l.code)
    const missingTranslations = allLocales.filter((l) => l !== locale.value && !foundTranslations.includes(l))

    // Current route params
    const routeParams = { ...route.params }
    const queryParams = { ...route.query }

    return {
      content: {
        stem,
        collection: data.collection || 'unknown',
        locale: locale.value,
        cacheKey: `i18n:${data.collection}:${locale.value}:${route.params.slug || '∅'}`,
        fields: data.selectFields || [],
        status: {
          found: !!content,
          published: content?.status === 'published',
          hasTranslations: foundTranslations.length > 0,
        },
      },
      translations: {
        found: foundTranslations,
        missing: missingTranslations,
        total: allLocales.length,
      },
      params: {
        current: routeParams,
        route: { ...routeParams, ...queryParams },
      },
      seo: {
        title: content?.title,
        description: content?.description || content?.excerpt,
        autoSEO: data.autoSEO ?? false,
        autoI18nParams: data.autoI18nParams ?? false,
        generated: {
          ogImage: content?.ogImage,
          sitemap: content?.sitemap,
          robots: content?.robots,
          schemaOrg: content?.schemaOrg,
        },
      },
      performance: {
        timestamp: Date.now(),
        pageKey: data.pageKey,
        routePath: route.path,
      },
      meta: {
        collection: data.collection || 'unknown',
        locale: locale.value,
        route: route.path,
      },
    }
  })

  // Register this page's debug info
  watchEffect(() => {
    debugRegistry.value.set(data.pageKey, debugInfo.value)
    currentPageKey.value = data.pageKey
  })

  // Cleanup when component unmounts
  onUnmounted(() => {
    debugRegistry.value.delete(data.pageKey)
  })

  return {
    debugInfo: readonly(debugInfo),
  }
}

/**
 * Access the global debug registry
 */
export function useGlobalDebugRegistry() {
  const getCurrentPageDebugInfo = () => {
    return computed(() => {
      const current = currentPageKey.value
      return current ? debugRegistry.value.get(current) : null
    })
  }

  const getAllDebugInfo = () => readonly(debugRegistry)

  const getDebugInfoForPage = (pageKey: string) => {
    return computed(() => debugRegistry.value.get(pageKey))
  }

  return {
    getCurrentPageDebugInfo,
    getAllDebugInfo,
    getDebugInfoForPage,
    currentPageKey: readonly(currentPageKey),
  }
}

/**
 * Debug modal wrapper composable
 * Handles overlay logic and keyboard shortcuts for debug modal
 */
export function useDebugModal() {
  const env = useRuntimeConfig().public
  const { locale, locales, setLocale } = useI18n()
  const isDebugMode = computed(() => env.i18n.debug)

  // Import the modal component lazily
  const LazyIDebugModal = defineAsyncComponent(() => import('../components/DebugModal.vue'))

  const overlay = useOverlay()
  const debugModal = overlay.create(LazyIDebugModal)
  const isDebugModalOpen = ref(false)

  const openDebugModal = () => {
    if (!isDebugMode.value) return
    isDebugModalOpen.value = true
    debugModal.open()
  }

  const closeDebugModal = () => {
    isDebugModalOpen.value = false
    debugModal.close()
  }

  const toggleDebugModal = () => {
    if (!isDebugMode.value) return

    if (isDebugModalOpen.value) {
      closeDebugModal()
    } else {
      openDebugModal()
    }
  }

  const switchLanguage = () => {
    const currentIndex = locales.value.findIndex((l: any) => l.code === locale.value)
    const nextIndex = (currentIndex + 1) % locales.value.length
    const nextLocale = locales.value[nextIndex]
    setLocale(nextLocale.code)
  }

  // Auto-setup keyboard shortcuts if called in a component context
  if (getCurrentInstance()) {
    defineShortcuts({
      meta_shift_d: toggleDebugModal,
      meta_shift_l: switchLanguage,
      escape: {
        usingInput: false,
        handler: () => {
          if (isDebugModalOpen.value) {
            closeDebugModal()
          }
        },
      },
    })
  }

  return {
    isDebugMode: readonly(isDebugMode),
    isDebugModalOpen: readonly(isDebugModalOpen),
    openDebugModal,
    closeDebugModal,
    toggleDebugModal,
    switchLanguage,
  }
}
