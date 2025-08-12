// app/composables/useI18nContentParams.ts - SIMPLIFIED & ROBUST
interface I18nContentParamsOptions {
  content: Ref<any>
  translations: Ref<Record<string, any>>
}

interface I18nContentParamsOptions {
  content: Ref<any>
  translations: Ref<Record<string, any>>
}

export function useI18nContentParams({ content, translations }: I18nContentParamsOptions) {
  const { locale } = useI18n()
  const setI18nParams = useSetI18nParams({ canonicalQueries: [] })

  const params = ref<Record<string, { slug: string }>>({})

  watch([content, locale], () => {
    const slug = content.value?.slug as string | undefined
    if (!slug) return
    params.value = { ...params.value, [locale.value]: { slug } }
    setI18nParams({ ...params.value })
  }, { immediate: true })

  watch(translations, (t) => {
    if (!t) return
    const merged = { ...params.value }
    for (const [code, doc] of Object.entries(t)) {
      if (doc?.slug) merged[code] = { slug: doc.slug }
    }
    params.value = merged
    setI18nParams({ ...params.value })
  }, { immediate: true })

  return {
    allKnownParams: computed(() => params.value),
  }
}
