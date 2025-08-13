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

  runtimeConfig: {
    public: {
      i18n: {
        debug: process.env.NUXT_PUBLIC_DEBUG === 'true' || process.env.NODE_ENV === 'development',
      },
    },
  },

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
    customRoutes: 'config',
    pages: {
      'pages': {
        en: '/pages',
        mr: '/paane',
      },
      'pages-slug': {
        en: '/pages/[slug]',
        mr: '/paane/[slug]',
      },
      'data': {
        en: '/data',
        mr: '/mahiti',
      },
      'data-slug': {
        en: '/data/[slug]',
        mr: '/mahiti/[slug]',
      },
      'blog': {
        en: '/blog',
        mr: '/blooga',
      },
      'blog-category': {
        en: '/blog/[category]',
        mr: '/blooga/[category]',
      },
      'blog-category-slug': {
        en: '/blog/[category]/[slug]',
        mr: '/blooga/[category]/[slug]',
      },
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
