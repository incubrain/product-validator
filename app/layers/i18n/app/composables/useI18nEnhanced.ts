// app/composables/useI18nEnhanced.ts - BACK TO BASICS
export function useI18nEnhanced() {
  const { t, te, strategy, defaultLocale, locale } = useI18n()
  const localePath = useLocalePath()
  const switchLocalePath = useSwitchLocalePath()

  // ✅ Simple locale switching with basic logging
  const switchLocaleWithAnalytics = async (newLocale: string) => {
    const oldLocale = locale.value

    if (oldLocale === newLocale) {
      console.log(`⏭️ Same locale requested: ${newLocale}`)
      return
    }

    // ✅ Simple console logging (no complex analytics)
    console.log(`🌐 Language switch: ${oldLocale} → ${newLocale}`)

    try {
      const targetPath = switchLocalePath(newLocale)
      if (targetPath && targetPath !== useRouter().currentRoute.value.fullPath) {
        await navigateTo(targetPath)
        console.log(`✅ Navigation completed: ${targetPath}`)
      }
    } catch (error) {
      console.error('❌ Navigation failed:', error)
      throw error
    }
  }

  // ✅ Simple formatters (no dynamic config)
  const formatters = computed(() => {
    const currentLocale = locale.value

    return {
      currency: (amount: number, currency = 'USD') =>
        new Intl.NumberFormat(currentLocale, {
          style: 'currency',
          currency,
        }).format(amount),

      date: (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
        const d = typeof date === 'string' ? new Date(date) : date
        return new Intl.DateTimeFormat(currentLocale, options).format(d)
      },

      number: (num: number) =>
        new Intl.NumberFormat(currentLocale).format(num),

      relativeTime: (value: number, unit: Intl.RelativeTimeFormatUnit) =>
        new Intl.RelativeTimeFormat(currentLocale, {
          numeric: 'auto',
        }).format(value, unit),

      list: (items: string[], options?: Intl.ListFormatOptions) =>
        new Intl.ListFormat(currentLocale, options).format(items),
    }
  })

  return {
    // Core API
    t,
    te,
    locale,
    defaultLocale,
    strategy,

    // Routing
    localePath,
    switchLocalePath,

    // Enhanced functionality
    switchLocaleWithAnalytics,

    // Utilities
    formatters,
  }
}
