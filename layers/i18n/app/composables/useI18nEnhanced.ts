// app/composables/useI18nEnhanced.ts - BACK TO BASICS
export function useI18nEnhanced() {
  const { locale } = useI18n()
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

  return {
    switchLocaleWithAnalytics,
  }
}
