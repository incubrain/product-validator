// app/composables/useI18nContentSEO.ts - Refactored with proper types

import type { I18nContentSEOOptions, I18nSEOReturn } from '~~/i18n-content'

/**
 * Automatic SEO metadata integration for i18n content
 * - Applies locale-specific head attributes
 * - Generates meta tags from content
 * - Integrates with @nuxtjs/seo module
 */
export function useI18nContentSEO({ content }: I18nContentSEOOptions): I18nSEOReturn {
  const i18nHead = useLocaleHead({ seo: true, lang: true, dir: true })

  useHead(() => {
    const lang = i18nHead.value.htmlAttrs?.lang
    const dir = i18nHead.value.htmlAttrs?.dir
    const i18nLinks = i18nHead.value.link || []
    const i18nMeta = i18nHead.value.meta || []

    // Generate content-specific meta tags
    const extraMeta = content.value
      ? [
          {
            name: 'description',
            content: content.value.description || content.value.excerpt,
          },
          {
            property: 'og:title',
            content: content.value.title,
          },
          ...(content.value.description
            ? [{
                property: 'og:description',
                content: content.value.description,
              }]
            : []),
        ]
      : []

    return {
      htmlAttrs: { lang, dir },
      link: [...i18nLinks],
      meta: [...i18nMeta, ...extraMeta],
    }
  })

  return {
    initialized: computed(() => !!content.value),
  }
}
