// app/composables/useI18nText.ts - Simple text resolution utility
/**
 * Simple text resolution utility for multi-language text objects
 */
export function useI18nText(textMap: Record<string, string>, fallback = 'en') {
  const { locale } = useI18n()

  return computed(() =>
    textMap[locale.value] || textMap[fallback] || Object.values(textMap)[0] || '',
  )
}
