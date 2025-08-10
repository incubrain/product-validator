// app/plugins/i18n-enhancements.client.ts - MINIMAL LOGGING
export default defineNuxtPlugin((nuxtApp) => {
  // ✅ Simple hooks with console logging only

  nuxtApp.hook('i18n:beforeLocaleSwitch', (switchInfo) => {
    const { oldLocale, newLocale, initialSetup } = switchInfo

    if (initialSetup) return

    // ✅ Simple console logging
    console.log(`🌐 Language switching: ${oldLocale} → ${newLocale}`)

    // ✅ Simple loading state
    if (import.meta.client) {
      document.body.classList.add('language-switching')
    }
  })

  nuxtApp.hook('i18n:localeSwitched', (switchInfo) => {
    const { oldLocale, newLocale } = switchInfo

    // ✅ Cleanup
    if (import.meta.client) {
      document.body.classList.remove('language-switching')
    }

    console.log(`✅ Language switched to: ${newLocale}`)
  })
})
