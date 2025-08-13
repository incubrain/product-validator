// types/index.ts - Shared i18n types for better type safety and reusability

import type { Ref, ComputedRef } from 'vue'
import type { LocaleInfo } from '@nuxtjs/i18n'

/**
 * Core parameter mapping types for cross-locale resolution
 */
export type ParamMapEntry
  = | string
    | {
    /** field on current doc that holds the immutable STEM */
      field: string
      /** when provided, resolve from this collection by STEM for each locale */
      collection?: string
      /** field on the resolved target doc to use for the URL param (default: 'slug') */
      targetField?: string
    }

export type ParamMap = Record<string, ParamMapEntry>

/**
 * Content status and translation information
 */
export interface ContentStatus {
  found: boolean
  published: boolean
  hasTranslations: boolean
}

export interface TranslationDetails {
  status: 'found' | 'missing' | 'unknown' | 'error'
  hasData: boolean
  id?: string
  fields?: string[]
  error?: string
}

/**
 * Core i18n content options interface
 */
export interface I18nContentOptions {
  collection: string
  autoI18nParams?: boolean
  autoSEO?: boolean
  key?: string
  /**
   * Map route param names -> field or { field, collection?, targetField? }
   * Examples:
   *   { slug: 'slug' }
   *   { category: { field: 'categoryStem', collection: 'categories', targetField: 'slug' } }
   */
  paramMap?: ParamMap
  /** Extra fields to fetch for the translation lookups (merged with required). */
  selectFields?: string[]
}

/**
 * Standard return interface for i18n content composables
 */
export interface I18nContentReturn {
  content: Ref<any>
  translations: Ref<Record<string, any>>
  pending: Ref<boolean>
  error: Ref<any>
  refresh: () => Promise<void>
  hasTranslation: (localeCode: string) => boolean
  getTranslationParam: (localeCode: string, paramName: string) => string | undefined
  getTranslationSlug: (localeCode: string) => string | undefined
  missingTranslations: ComputedRef<string[]>
}

/**
 * SEO-related interfaces
 */
export interface I18nContentSEOOptions {
  content: Ref<any>
}

export interface I18nSEOReturn {
  initialized: ComputedRef<boolean>
}

/**
 * Debug-related types
 */
export interface DebugData {
  content: Ref<any>
  translations: Ref<Record<string, any>>
  pending: Ref<boolean>
  error: Ref<any>
  pageKey: string
  collection?: string
  paramMap?: ParamMap
  autoSEO?: boolean
  autoI18nParams?: boolean
  selectFields?: string[]
}

export interface ProcessedDebugInfo {
  content: {
    stem: string | null
    collection: string
    locale: string
    cacheKey: string
    fields: string[]
    status: ContentStatus
  }
  translations: {
    found: string[]
    missing: string[]
    total: number
    details: Record<string, TranslationDetails>
  }
  params: {
    current: Record<string, string>
    route: Record<string, any>
    detected: string[]
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

/**
 * Parameter resolution interfaces
 */
export interface I18nContentParamsOptions {
  content: Ref<any>
  translations: Ref<Record<string, any>>
  canonicalize?: boolean
  /** route-param-name -> mapping entry (string or { field, collection?, targetField? }) */
  paramMap: Ref<ParamMap> | ParamMap
}

export interface I18nContentParamsReturn {
  allKnownParams: ComputedRef<Record<string, Record<string, string>>>
  currentParams: ComputedRef<Record<string, string>>
  getParamsForLocale: (code: string) => Record<string, string>
}

/**
 * Text and formatting utility types
 */
export type I18nTextMap = Record<string, string>

export interface I18nFormatterOptions {
  currency?: {
    amount: number
    currency?: string
  }
  date?: {
    date: Date | string
    options?: Intl.DateTimeFormatOptions
  }
  number?: {
    num: number
  }
  relativeTime?: {
    value: number
    unit: Intl.RelativeTimeFormatUnit
  }
  list?: {
    items: string[]
    options?: Intl.ListFormatOptions
  }
}

/**
 * Collection naming utilities
 */
export type CollectionNamingConvention = 'locale_collection' | 'collection_locale'

/**
 * Content metadata extraction utilities
 */
export interface ContentMetadata {
  stem: string | null
  id: string | null
  collection: string
  locale: string
  filename: string | null
}

/**
 * Translation lookup configuration
 */
export interface TranslationLookupConfig {
  collection: string
  locale: string
  stem: string
  fields: string[]
  published?: boolean
}
