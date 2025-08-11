// app/composables/useI18nContent.ts - PURE DATA FETCHING
import type { Collections } from '@nuxt/content'

interface I18nContentOptions {
  collection: string
  autoI18nParams?: boolean
  autoSEO?: boolean
  key?: string
}

interface I18nContentReturn {
  content: Ref<any>
  pending: Ref<boolean>
  error: Ref<any>
  refresh: () => Promise<void>
}

/**
 * Pure data fetching composable for i18n content
 * Follows your composable patterns - no rendering logic
 */
export function useI18nContent(options: I18nContentOptions): I18nContentReturn {
  const {
    collection,
    autoI18nParams = true,
    autoSEO = true,
    key,
  } = options

  const route = useRoute()
  const { locale } = useI18n()

  const slug = computed(() => route.params.slug as string ?? null)
  const category = computed(() => route.params.category as string ?? null)

  // ✅ Simple collection naming - no complex resolution
  const collectionName = computed(() =>
    `${collection}_${locale.value}` as keyof Collections,
  )

  // ✅ Data fetching with cross-language support (restored from original)
  const {
    data: content,
    pending,
    error,
    refresh,
  } = useLazyAsyncData(
    key || `i18n-content-${collectionName.value}-${slug.value}`,
    async () => {
      if (!slug.value) {
        console.warn('useI18nContent: No slug found - use inside [slug].vue page')
        return null
      }

      try {
        // ✅ Try cross-language lookup first (original behavior)
        const crossLangResult = await queryCollection(collectionName.value)
          .where('slugs', 'LIKE', `%"${locale.value}":"${slug.value}"%`)
          .first()

        if (crossLangResult) {
          return crossLangResult
        }

        // ✅ Fallback to simple slug match (new behavior)
        const simpleResult = await queryCollection(collectionName.value)
          .where('slug', '=', slug.value)
          .first()

        return simpleResult
      } catch (err) {
        console.error(`useI18nContent: Failed to fetch ${collectionName.value}:`, err)
        return null
      }
    },
    {
      watch: [locale, collectionName, slug],
    },
  )

  // ✅ Optional i18n params setup (only if content has cross-language refs)
  if (autoI18nParams) {
    const setI18nParams = useSetI18nParams({
      canonicalQueries: [],
    })

    watch([content, locale], () => {
      if (content.value?.slugs) {
        const params: Record<string, any> = {}

        Object.entries(content.value.slugs).forEach(([lang, slug]) => {
          params[lang] = { slug: slug as string }
          if (category.value) {
            params[lang].category = category.value
          }
        })

        setI18nParams(params)
      }
    }, { immediate: true })
  }

  // ✅ Optional SEO handling (your pattern)
  if (autoSEO) {
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
              {
                name: 'description',
                content: content.value.description || content.value.excerpt,
              },
              {
                property: 'og:title',
                content: content.value.title,
              },
            ]
          : []),
      ],
    }))
  }

  return {
    content: readonly(content),
    pending: readonly(pending),
    error: readonly(error),
    refresh,
  }
}

/**
 * Simple text resolution utility - follows your utility pattern
 */
export function useI18nText(textMap: Record<string, string>, fallback = 'en') {
  const { locale } = useI18n()

  return computed(() =>
    textMap[locale.value] || textMap[fallback] || Object.values(textMap)[0] || '',
  )
}

/**
 * Format utilities that match your formatter patterns
 */
export function useI18nFormatters() {
  const { locale } = useI18n()

  return computed(() => ({
    currency: (amount: number, currency = 'USD') =>
      new Intl.NumberFormat(locale.value, {
        style: 'currency',
        currency,
      }).format(amount),

    date: (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
      const d = typeof date === 'string' ? new Date(date) : date
      return new Intl.DateTimeFormat(locale.value, options).format(d)
    },

    number: (num: number) =>
      new Intl.NumberFormat(locale.value).format(num),

    relativeTime: (value: number, unit: Intl.RelativeTimeFormatUnit) =>
      new Intl.RelativeTimeFormat(locale.value, {
        numeric: 'auto',
      }).format(value, unit),

    list: (items: string[], options?: Intl.ListFormatOptions) =>
      new Intl.ListFormat(locale.value, options).format(items),
  }))
}
