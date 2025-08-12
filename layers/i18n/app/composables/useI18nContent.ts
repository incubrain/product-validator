// app/composables/useI18nContent.ts - FINAL OPTIMIZED VERSION
import type { Collections } from '@nuxt/content'
import { useI18nContentParams } from './useI18nContentParams'

interface I18nContentOptions {
  collection: string
  autoI18nParams?: boolean
  autoSEO?: boolean
  key?: string
}

interface I18nContentReturn {
  content: Ref<any>
  translations: Ref<Record<string, any>>
  pending: Ref<boolean>
  error: Ref<any>
  refresh: () => Promise<void>
  hasTranslation: (locale: string) => boolean
  getTranslationSlug: (locale: string) => string | undefined
  missingTranslations: ComputedRef<string[]>
}

/**
 * Optimized i18n content composable using built-in Nuxt Content ID fields
 * Uses background translation caching for instant language switching
 * Automatically manages i18n params and SEO when enabled
 */
export function useI18nContent(options: I18nContentOptions): I18nContentReturn {
  const { collection, autoI18nParams = true, autoSEO = true, key } = options

  const route = useRoute()
  const { locale, locales } = useI18n()

  const slug = computed<string | null>(() => {
    const raw = route.params.slug as string | string[] | undefined
    if (!raw) return null
    return Array.isArray(raw) ? raw.join('/') : raw
  })

  const contentKey = () =>
    key || `i18n:${collection}:${locale.value}:${slug.value ?? '∅'}`

  const { data: content, pending, error, refresh } = useAsyncData(
    contentKey,
    async () => {
      if (!slug.value) return null
      try {
        // Fetch the current-locale post by slug; must be public
        return await queryCollection(`${collection}_${locale.value}` as keyof Collections)
          .where('slug', '=', slug.value)
          .where('isPublic', '=', true)
          .first()
      } catch (err) {
        console.error(`useI18nContent: query failed ${collection}_${locale.value}:`, err)
        return null
      }
    },
    { watch: [locale, slug] },
  )

  // ---- Background translations (public only) ----
  type TransMeta = { slug: string, title?: string, id: string, isPublic?: boolean }

  const translations = ref<Record<string, TransMeta>>({})

  const fileStem = computed(() => {
    const id = content.value?.id as string | undefined
    if (!id) return null
    const pA = `${collection}_${locale.value}/`
    const pB = `${collection}/${locale.value}/`
    const stripped = id.startsWith(pA)
      ? id.slice(pA.length)
      : id.startsWith(pB)
        ? id.slice(pB.length)
        : id.split('/').pop() || id
    return stripped // e.g. "ai-revolution.md"
  })

  watchEffect(async () => {
    if (!fileStem.value) {
      translations.value = {}
      return
    }

    const settled = await Promise.allSettled(
      locales.value
        .filter((l) => l.code !== locale.value)
        .map(async (l) => {
          const targetId = `${collection}_${l.code}/${fileStem.value}`
          try {
            const doc = await queryCollection(`${collection}_${l.code}` as keyof Collections)
              .where('id', '=', targetId)
              .where('isPublic', '=', true)
              .select('slug', 'title', 'id')
              .first()
            return [l.code, doc] as const
          } catch (err) {
            console.error(`useI18nContent: query failed ${targetId}:`, err)
          }
          return null
        }),
    )

    const entries = settled
      .map((r) => (r.status === 'fulfilled' ? r.value : null))
      .filter(Boolean) as ReadonlyArray<readonly [string, TransMeta]>

    translations.value = Object.fromEntries(entries)
  })

  if (autoI18nParams) useI18nContentParams({ content, translations })
  if (autoSEO) useI18nContentSEO({ content })

  const hasTranslation = (code: string) => Boolean(translations.value[code])
  const getTranslationSlug = (code: string) => translations.value[code]?.slug

  const missingTranslations = computed(() =>
    locales.value
      .filter((l) => l.code !== locale.value && !hasTranslation(l.code))
      .map((l) => l.code),
  )

  return {
    content: readonly(content),
    translations: readonly(translations),
    pending: readonly(pending),
    error: readonly(error),
    refresh,
    hasTranslation,
    getTranslationSlug,
    missingTranslations,
  }
}
