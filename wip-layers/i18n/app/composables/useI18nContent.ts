// app/composables/useI18nContent.ts - Refactored with helper utilities

import type { Collections } from '@nuxt/content'
import type { LocaleInfo } from '@nuxtjs/i18n'
import type { I18nContentOptions, I18nContentReturn, ParamMap } from '~~/i18n-content'
import { useI18nContentParams } from './useI18nContentParams'

/**
 * i18n-aware content loader with background translation hydration.
 * - URL params declared via paramMap
 * - Fetches only required fields
 * - Wires i18n params + SEO
 * - Uses helper utilities for cleaner, more maintainable code
 */
export function useI18nContent(options: I18nContentOptions): I18nContentReturn {
  const {
    collection,
    autoI18nParams = true,
    autoSEO = true,
    key,
    paramMap,
    selectFields,
  } = options

  const route = useRoute()
  const env = useRuntimeConfig().public
  const { locale, locales } = useI18n()

  // Use helper utilities
  const {
    buildCollectionName,
    extractRouteParam,
    buildCacheKey,
    buildSelectFields,
    extractContentMetadata,
    resolveTranslations,
    buildPageKey,
    LOCALE_SELECT,
  } = useI18nContentHelpers()

  // Always include slug. If user omitted paramMap, we'll start with { slug: 'slug' }
  const resolvedParamMap = ref<ParamMap>({ slug: 'slug', ...(paramMap || {}) })

  // Extract route slug using helper
  const routeSlug = computed<string | null>(() => {
    return extractRouteParam(route.params, 'slug')
  })

  // Generate cache key using helper
  const contentKey = () =>
    key || buildCacheKey(collection, locale.value, routeSlug.value || '')

  // Main content query
  const { data: content, pending, error, refresh } = useAsyncData(
    contentKey,
    async () => {
      if (!routeSlug.value) return null

      try {
        const collectionName = buildCollectionName(locale.value, collection)
        return await queryCollection(collectionName as keyof Collections)
          .where('slug', '=', routeSlug.value)
          .where('status', '=', 'published')
          .first()
      } catch (err) {
        const collectionName = buildCollectionName(locale.value, collection)
        console.error(`useI18nContent: query failed ${collectionName}:`, err)
        return null
      }
    },
    { watch: [locale, routeSlug] },
  )

  // Auto-detect route parameters if not provided
  watch(content, (doc) => {
    if (!doc || paramMap) return

    const current = { ...resolvedParamMap.value }
    for (const [paramName] of Object.entries(route.params)) {
      if (paramName === 'slug') continue
      const candidates = [String(paramName), `${paramName}Id`, `${paramName}Stem`]
      const match = candidates.find((f) => f in doc)
      if (match) current[paramName] = match
    }
    resolvedParamMap.value = current
  }, { immediate: true })

  // Build select fields using helper
  const resolvedSelect = computed<string[]>(() => {
    return buildSelectFields(LOCALE_SELECT, resolvedParamMap.value, selectFields)
  })

  // Translation storage
  const translations = ref<Record<string, any>>({})

  // Extract content metadata using helper
  const contentMetadata = computed(() => {
    return content.value ? extractContentMetadata(content.value, collection) : null
  })

  // Background translation fetching using helper
  watchEffect(async () => {
    const metadata = contentMetadata.value
    if (!metadata?.stem) {
      translations.value = {}
      return
    }

    try {
      const translationData = await resolveTranslations(
        collection,
        metadata.stem,
        resolvedSelect.value,
        true, // exclude current locale
      )

      translations.value = translationData
    } catch (err) {
      console.error('useI18nContent: batch translation fetch failed:', err)
      translations.value = {}
    }
  })

  // Wire i18n route params + SEO
  if (autoI18nParams) {
    useI18nContentParams({
      content,
      translations,
      paramMap: resolvedParamMap,
    })
  }

  if (autoSEO) {
    useI18nContentSEO({ content })
  }

  // Debug integration
  if (env.i18n?.debug || route.query.debug !== undefined) {
    const pageKey = buildPageKey(String(route.name), route.path)

    useI18nContentDebug({
      content,
      translations,
      pending,
      error,
      pageKey,
      collection,
      paramMap: resolvedParamMap.value,
      autoSEO,
      autoI18nParams,
      selectFields: resolvedSelect.value,
    })
  }

  // Helper functions for external use
  const hasTranslation = (code: string) => Boolean(translations.value[code])

  const getTranslationParam = (code: string, paramName: string) => {
    const entry = resolvedParamMap.value[paramName]
    const doc = translations.value[code]
    if (!doc || !entry) return undefined

    if (typeof entry === 'string') return doc?.[entry]
    // For collection-backed params, this getter does not resolve external collections.
    // (params are already applied by useI18nContentParams)
    return undefined
  }

  const getTranslationSlug = (code: string) => getTranslationParam(code, 'slug')

  const missingTranslations = computed(() => {
    const availableTranslations = Object.keys(translations.value)
    return locales.value
      .filter((l) => l.code !== locale.value && !availableTranslations.includes(l.code))
      .map((l) => l.code)
  })

  return {
    content: readonly(content),
    translations: readonly(translations),
    pending: readonly(pending),
    error: readonly(error),
    refresh,
    hasTranslation,
    getTranslationParam,
    getTranslationSlug,
    missingTranslations,
  }
}
