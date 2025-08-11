// playground/nuxt.config.ts

import { createResolver } from '@nuxt/kit'
import { fileURLToPath } from 'node:url'

const resolver = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: ['../'],
  modules: ['@nuxt/ui', '@nuxtjs/seo', '@nuxt/content'],

  devtools: { enabled: true },

  css: [
    resolver.resolve('./assets/main.css'),
  ],

  alias: {
    '#shared': fileURLToPath(new URL('../../../shared', import.meta.url)),
    '#theme': fileURLToPath(new URL('../../../theme', import.meta.url)),
  },

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
        icon: 'i-circle-flags-us',

      },
      {
        code: 'mr',
        file: 'marathi.json',
        name: 'मराठी',
        language: 'mr-IN',
        iso: 'mr-IN',
        icon: 'i-circle-flags-in',
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

  icon: {
    serverBundle: {
      // using full @iconify/json define collections to tree-shake
      collections: ['lucide', 'circle-flags'],
    },
  },
})
