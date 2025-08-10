// @incubrain/i18n-layer/nuxt.config.ts
import { createResolver } from '@nuxt/kit'

const resolver = createResolver(import.meta.url)

export default defineNuxtConfig({
  // ✅ Auto-install required modules
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
  ],

  // ✅ Plugin registration
  plugins: [
    {
      src: resolver.resolve('./app/plugins/i18n.client.ts'),
      mode: 'client',
    },
  ],

  $meta: {
    author: 'Incubrain Team',
    compatibility: {
      nuxt: '>=4.0.3',
    },
    description: 'Enterprise i18n layer for Nuxt applications',
    name: 'incubrain-i18n',
    version: '1.0.0',
  },

  // ✅ Component auto-registration
  components: [
    {
      path: resolver.resolve('./app/components'),
      pathPrefix: false,
      global: true,
      prefix: 'I',
    },
  ],

  // ✅ Composable auto-imports
  imports: {
    dirs: [
      resolver.resolve('./app/composables/**'),
    ],
  },

  // ✅ Locale directory registration
  css: [
    resolver.resolve('./app/assets/css/i18n-base.css'),
  ],

  // ✅ Type generation
  typescript: {
    includeWorkspace: true,
  },

  // ✅ Default i18n configuration (can be overridden)
  i18n: {
    strategy: 'prefix_except_default',
    restructureDir: '.',
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        file: 'english.json',
        name: 'English',
        language: 'en-UK',
      },
      {
        code: 'mr',
        file: 'marathi.json',
        name: 'मराठी',
        language: 'mr-IN',
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'locale',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
    skipSettingLocaleOnNavigate: true,
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
})
