// app/composables/useI18nFormatters.ts - Locale-aware formatting utilities
/**
 * Locale-aware formatting utilities using Intl API
 * Automatically adapts to current language
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
