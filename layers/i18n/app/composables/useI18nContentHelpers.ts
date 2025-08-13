// app/composables/useI18nContentHelpers.ts - Reusable helper logic for i18n content system

import type { Collections } from '@nuxt/content'
import type { LocaleInfo } from '@nuxtjs/i18n'
import type {
  ContentMetadata,
  TranslationLookupConfig,
  CollectionNamingConvention,
  ParamMapEntry,
} from '~~/i18n-content'

interface CollectionLoadOptions {
  fields?: string[]
  published?: boolean
  includeDebugInfo?: boolean
}

interface CollectionLoadResult<T = any> {
  stems: Record<string, Record<string, T>>
  debugInfo?: {
    totalQueries: number
    queriedCollections: string[]
    processedItems: number
    loadTime: number
  }
}

/** Fields we always want when resolving translations. */
export const LOCALE_SELECT = ['slug', 'title', 'id', 'status', 'stem'] as const

/**
 * Collection of reusable helper utilities for i18n content management
 */
export function useI18nContentHelpers() {
  const { locale, locales } = useI18n()

  const loadCollectionStems = async <T = any>(
    collection: string,
    options: CollectionLoadOptions = {},
  ): Promise<CollectionLoadResult<T>> => {
    const startTime = Date.now()
    const {
      fields = [...LOCALE_SELECT, 'title'],
      published = true,
      includeDebugInfo = false,
    } = options

    const allLocales = getAvailableLocales()
    const selectFields = buildSelectFields(fields)
    const stems: Record<string, Record<string, T>> = {}

    const debugInfo = includeDebugInfo
      ? {
          totalQueries: 0,
          queriedCollections: [] as string[],
          processedItems: 0,
          loadTime: 0,
        }
      : undefined

    try {
      await Promise.all(
        allLocales.map(async (localeCode) => {
          const collectionName = buildCollectionName(localeCode, collection)

          if (debugInfo) {
            debugInfo.queriedCollections.push(collectionName)
            debugInfo.totalQueries++
          }

          let query = queryCollection(collectionName as keyof Collections)
            .select(...selectFields)

          if (published) {
            query = query.where('status', '=', 'published')
          }

          const items = await query.all<T>()

          for (const item of items) {
            const metadata = extractContentMetadata(item, collection)
            const stem = metadata.stem || 'unknown'

            if (!stems[stem]) stems[stem] = {}

            // Handle title normalization for i18n objects
            const processedItem = {
              ...item,
              title: typeof (item as any)?.title === 'object'
                ? (item as any).title?.[localeCode] ?? (item as any).title?.en
                : (item as any)?.title,
            }

            stems[stem][localeCode] = processedItem

            if (debugInfo) {
              debugInfo.processedItems++
            }
          }
        }),
      )

      if (debugInfo) {
        debugInfo.loadTime = Date.now() - startTime
      }

      return { stems, debugInfo }
    } catch (error) {
      console.error(`Failed to batch load collection: ${collection}`, error)
      throw error
    }
  }

  const loadCollectionData = async <T = any>(
    collection: string,
    includeUnpublished = false,
  ): Promise<Record<string, Record<string, T>>> => {
    const result = await loadCollectionData<T>(collection, {
      published: !includeUnpublished,
    })
    return result.stems
  }

  const getCollectionCoverage = (
    stems: Record<string, Record<string, any>>,
  ): {
    total: number
    coverage: Record<string, number>
    missing: Record<string, string[]>
    complete: string[]
  } => {
    const allLocales = getAvailableLocales()
    const total = Object.keys(stems).length
    const coverage: Record<string, number> = {}
    const missing: Record<string, string[]> = {}
    const complete: string[] = []

    // Calculate per-locale coverage
    allLocales.forEach((locale) => {
      const available = Object.keys(stems).filter((stem) => stems[stem][locale])
      coverage[locale] = available.length
    })

    // Find missing translations per STEM
    Object.keys(stems).forEach((stem) => {
      const available = Object.keys(stems[stem])
      const missingForStem = allLocales.filter((locale) => !available.includes(locale))

      if (missingForStem.length === 0) {
        complete.push(stem)
      } else {
        missing[stem] = missingForStem
      }
    })

    return { total, coverage, missing, complete }
  }

  /**
   * Extract content metadata from a content document
   */
  const extractContentMetadata = (
    content: any,
    collection: string,
    convention: CollectionNamingConvention = 'locale_collection',
  ): ContentMetadata => {
    const id = content?.id as string | undefined

    if (!id) {
      return {
        stem: null,
        id: null,
        collection,
        locale: locale.value,
        filename: null,
      }
    }

    // Handle different naming conventions
    const separator = convention === 'locale_collection' ? '_' : '_'
    const pA = convention === 'locale_collection'
      ? `${locale.value}_${collection}/`
      : `${collection}_${locale.value}/`
    const pB = `${locale.value}/${collection}/` // Fallback for directory structure

    const stripped = id.startsWith(pA)
      ? id.slice(pA.length)
      : id.startsWith(pB)
        ? id.slice(pB.length)
        : id.split('/').pop() || id

    return {
      stem: stripped.replace(/\.[^/.]+$/, ''), // Remove extension
      id,
      collection,
      locale: locale.value,
      filename: stripped,
    }
  }

  /**
   * Generate collection name based on locale and collection
   */
  const buildCollectionName = (
    targetLocale: string,
    collection: string,
    convention: CollectionNamingConvention = 'locale_collection',
  ): string => {
    return convention === 'locale_collection'
      ? `${targetLocale}_${collection}`
      : `${collection}_${targetLocale}`
  }

  /**
   * Resolve translation for a specific locale and STEM
   */
  const resolveTranslation = async (config: TranslationLookupConfig): Promise<any> => {
    const { collection, locale: targetLocale, stem, fields, published = true } = config
    const collectionName = buildCollectionName(targetLocale, collection)

    try {
      const query = queryCollection(collectionName as keyof Collections)
        .where('stem', '=', stem)
        .select(...fields)

      if (published) {
        query.where('status', '=', 'published')
      }

      return await query.first()
    } catch (err) {
      console.error(`Failed to resolve translation: ${collectionName}[${stem}]`, err)
      return null
    }
  }

  /**
   * Batch resolve translations for multiple locales
   */
  const resolveTranslations = async (
    collection: string,
    stem: string,
    fields: string[] = [...LOCALE_SELECT],
    excludeCurrentLocale = true,
  ): Promise<Record<string, any>> => {
    const targetLocales = locales.value
      .filter((loc: LocaleInfo) => excludeCurrentLocale ? loc.code !== locale.value : true)
      .map((loc: LocaleInfo) => loc.code)

    const lookups = targetLocales.map(async (targetLocale) => {
      const doc = await resolveTranslation({
        collection,
        locale: targetLocale,
        stem,
        fields,
      })
      return [targetLocale, doc] as const
    })

    const settled = await Promise.allSettled(lookups)
    const entries = settled
      .map((r) => (r.status === 'fulfilled' ? r.value : null))
      .filter(Boolean) as ReadonlyArray<readonly [string, any]>

    return Object.fromEntries(entries)
  }

  /**
   * Validate content structure for i18n compatibility
   */
  const validateContentStructure = (content: any): {
    isValid: boolean
    errors: string[]
    warnings: string[]
  } => {
    const errors: string[] = []
    const warnings: string[] = []

    // Required fields check
    if (!content?.slug) errors.push('Missing required field: slug')
    if (!content?.title) errors.push('Missing required field: title')
    if (!content?.status) errors.push('Missing required field: status')

    // Status validation
    if (content?.status && !['published', 'draft'].includes(content.status)) {
      warnings.push(`Unusual status value: ${content.status}`)
    }

    // Slug validation (should be ASCII, kebab-case)
    if (content?.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(content.slug)) {
      warnings.push('Slug should be lowercase, alphanumeric, kebab-case')
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    }
  }

  /**
   * Generate cache key for content queries
   */
  const buildCacheKey = (
    collection: string,
    locale: string,
    identifier: string,
    prefix = 'i18n',
  ): string => {
    return `${prefix}:${collection}:${locale}:${identifier || '∅'}`
  }

  /**
   * Extract route parameters safely
   */
  const extractRouteParam = (
    params: Record<string, string | string[]>,
    key: string,
    joinArrays = true,
  ): string | null => {
    const raw = params[key]
    if (!raw) return null

    if (Array.isArray(raw)) {
      return joinArrays ? raw.join('/') : raw[0] || null
    }

    return raw
  }

  /**
   * Build select fields list for queries
   */
  const buildSelectFields = (
    baseFields: readonly string[],
    paramMap?: Record<string, ParamMapEntry>,
    extraFields?: string[],
  ): string[] => {
    const fields = new Set<string>([...baseFields])

    // Add fields from param map
    if (paramMap) {
      for (const entry of Object.values(paramMap)) {
        if (typeof entry === 'string') {
          fields.add(entry)
        } else if (entry?.field) {
          fields.add(entry.field)
        }
      }
    }

    // Add extra fields
    if (extraFields) {
      extraFields.forEach((field) => fields.add(field))
    }

    return Array.from(fields)
  }

  /**
   * Get all available locales as string array
   */
  const getAvailableLocales = (): string[] => {
    return locales.value.map((loc: LocaleInfo) => loc.code)
  }

  /**
   * Check if a locale is available
   */
  const isLocaleAvailable = (localeCode: string): boolean => {
    return getAvailableLocales().includes(localeCode)
  }

  /**
   * Get missing translations for a set of available translations
   */
  const getMissingTranslations = (
    availableTranslations: string[],
    excludeCurrentLocale = true,
  ): string[] => {
    const allLocales = getAvailableLocales()
    return allLocales.filter((localeCode) => {
      if (excludeCurrentLocale && localeCode === locale.value) return false
      return !availableTranslations.includes(localeCode)
    })
  }

  /**
   * Format content ID for debugging
   */
  const formatContentId = (id: string | undefined): string => {
    if (!id) return 'Unknown ID'

    // Truncate long IDs for readability
    if (id.length > 50) {
      return `${id.substring(0, 20)}...${id.substring(id.length - 20)}`
    }

    return id
  }

  /**
   * Generate debug-friendly page key
   */
  const buildPageKey = (routeName: string, routePath: string): string => {
    return `${routeName || 'unknown'}-${routePath}`
  }

  /**
   * Safe JSON stringify for debugging
   */
  const safeStringify = (obj: any, maxDepth = 3): string => {
    const seen = new WeakSet()

    const replacer = (key: string, value: any, depth = 0): any => {
      if (depth > maxDepth) return '[Max Depth Reached]'

      if (value !== null && typeof value === 'object') {
        if (seen.has(value)) return '[Circular Reference]'
        seen.add(value)
      }

      return value
    }

    try {
      return JSON.stringify(obj, (key, value) => replacer(key, value), 2)
    } catch (err) {
      return `[Stringify Error: ${err}]`
    }
  }

  return {
    // 🔄 Collection Operations
    loadCollectionStems,
    loadCollectionData,

    // 📊 Analysis Operations
    getCollectionCoverage,
    getMissingTranslations,

    // 🔍 Single Content Operations
    resolveTranslation,
    resolveTranslations, // renamed from batchResolveTranslations

    // 🛠️ Utility Operations
    extractContentMetadata,
    buildCollectionName, // renamed from getCollectionName
    buildSelectFields,
    buildCacheKey, // renamed from generateCacheKey
    buildPageKey, // renamed from generatePageKey

    // 🌐 Locale Operations
    getAvailableLocales,
    isLocaleAvailable,

    // 🔧 Parsing Operations
    extractRouteParam,

    // ✅ Validation Operations
    validateContentStructure,

    // 🐛 Debug Operations
    formatContentId,
    safeStringify,

    // Constants
    LOCALE_SELECT,
  }
}
