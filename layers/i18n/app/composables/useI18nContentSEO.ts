interface I18nContentSEOOptions { content: Ref<any> }

export function useI18nContentSEO({ content }: I18nContentSEOOptions) {
  const i18nHead = useLocaleHead({ seo: true, lang: true, dir: true })

  useHead(() => {
    const lang = i18nHead.value.htmlAttrs?.lang
    const dir = i18nHead.value.htmlAttrs?.dir
    const i18nLinks = i18nHead.value.link || []
    const i18nMeta = i18nHead.value.meta || []
    const extraMeta = content.value
      ? [
          { name: 'description', content: content.value.description || content.value.excerpt },
          { property: 'og:title', content: content.value.title },
        ]
      : []

    return {
      htmlAttrs: { lang, dir },
      link: [...i18nLinks],
      meta: [...i18nMeta, ...extraMeta],
    }
  })

  return { initialized: computed(() => !!content.value) }
}
