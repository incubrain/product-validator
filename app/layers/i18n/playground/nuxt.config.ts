// playground/nuxt.config.ts

import { createResolver } from '@nuxt/kit'

const resolver = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: ['../'],
  modules: ['@nuxt/ui', '@nuxtjs/seo', '@nuxt/content'],

  devtools: { enabled: true },

  css: [
    resolver.resolve('./assets/main.css'),
  ],

  compatibilityDate: '2025-08-09',

  i18n: {
    restructureDir: '.',
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        file: 'english.json',
        name: 'English',
        language: 'en-US',
        iso: 'en-US',
      },
      {
        code: 'mr',
        file: 'marathi.json',
        name: 'मराठी',
        language: 'mr-IN',
        iso: 'mr-IN',
      },
    ],
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
    },
    skipSettingLocaleOnNavigate: false,
    debug: true,
    baseUrl: 'http://localhost:3000',
  },
})
