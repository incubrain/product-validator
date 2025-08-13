// app/composables/useI18nContentParams.ts - Refactored with helper utilities

import type { Collections } from '@nuxt/content'
import type { I18nContentParamsOptions, I18nContentParamsReturn, ParamMapEntry } from '~~/i18n-content'

/**
 * Parameter resolution for cross-locale routing
 * Handles dynamic route parameters that need locale-specific values
 * Now uses helper utilities for cleaner, more maintainable code
 */
export function useI18nContentParams(options: I18nContentParamsOptions): I18nContentParamsReturn {
  const paramMapRef = isRef(options.paramMap) ? options.paramMap : ref(options.paramMap)
  const { content, translations, canonicalize = true } = options
  const { locale } = useI18n()
  const route = useRoute()
  const localePath = useLocalePath()
  const setI18nParams = useSetI18nParams({ canonicalQueries: [] })

  // Use helper utilities
  const {
    buildCollectionName,
    buildSelectFields,
    LOCALE_SELECT,
  } = useI18nContentHelpers()

  const currentParams = computed(() => paramsByLocale.value[locale.value] || {})
  const getParamsForLocale = (code: string) => paramsByLocale.value[code] || {}

  // { en: { slug:'...', category:'...' }, mr: { ... } }
  const paramsByLocale = ref<Record<string, Record<string, string>>>({})

  /**
   * Resolve parameter value for a specific locale and document
   * Uses helper utilities for collection naming and field selection
   */
  async function resolveValueForLocale(
    localeCode: string,
    doc: any,
    entry: ParamMapEntry,
  ): Promise<string | undefined> {
    if (!doc) return undefined

    // Simple case: read a field from the current doc
    if (typeof entry === 'string') {
      const v = doc?.[entry]
      return typeof v === 'string' && v.length > 0 ? v : undefined
    }

    // Collection-backed case: the doc field is a STEM for another collection
    const fieldName = entry.field
    const targetCollection = entry.collection
    const targetField = entry.targetField || 'slug'

    const stem = doc?.[fieldName]
    if (!stem || typeof stem !== 'string') return undefined
    if (!targetCollection) {
      // If collection is missing, we can only return the raw field value
      return stem
    }

    try {
      // Use helper to build select fields and generate collection name
      const selectFields = buildSelectFields(LOCALE_SELECT, undefined, [targetField])
      const collectionName = buildCollectionName(localeCode, targetCollection)

      const target = await queryCollection(collectionName as keyof Collections)
        .where('stem', '=', stem)
        .where('status', '=', 'published')
        .select(...selectFields)
        .first()

      const value = target?.[targetField]
      return typeof value === 'string' && value.length > 0 ? value : undefined
    } catch (err) {
      const collectionName = buildCollectionName(localeCode, targetCollection)
      console.error(`useI18nContentParams: failed resolving ${collectionName} by stem='${stem}':`, err)
      return undefined
    }
  }

  /**
   * Apply parameter resolution for a specific locale
   */
  async function applyParamsForLocale(localeCode: string, doc: any | undefined) {
    if (!doc) return

    const mapping = paramMapRef.value
    const next: Record<string, string> = {}

    for (const [paramName, entry] of Object.entries(mapping)) {
      const value = await resolveValueForLocale(localeCode, doc, entry)
      if (typeof value === 'string' && value.length > 0) {
        next[paramName] = value
      }
    }

    if (Object.keys(next).length > 0) {
      paramsByLocale.value = { ...paramsByLocale.value, [localeCode]: next }
      setI18nParams({ ...paramsByLocale.value })
    }
  }

  // Current-locale document → params for current locale
  watch([content, locale, paramMapRef], async () => {
    if (!content.value) return
    await applyParamsForLocale(locale.value, content.value)
  }, { immediate: true })

  // Auto-canonicalization after params are resolved
  watch([currentParams, locale], async () => {
    if (!canonicalize || !content.value || !currentParams.value) return

    // Build canonical path using resolved parameters
    const canonicalPath = localePath({
      name: route.name,
      params: currentParams.value,
    })

    // Compare with current path
    if (route.path !== canonicalPath) {
      console.log(`Canonicalizing: ${route.path} → ${canonicalPath}`)
      await navigateTo(canonicalPath)
    }
  }, { immediate: true })

  // Other-locale documents (background translations) → params for those locales
  watch([translations, paramMapRef], async () => {
    const map = translations.value || {}
    await Promise.all(
      Object.entries(map).map(([code, doc]) => applyParamsForLocale(code, doc)),
    )
  }, { immediate: true })

  return {
    allKnownParams: computed(() => paramsByLocale.value),
    currentParams,
    getParamsForLocale,
  }
}
