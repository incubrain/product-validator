// @incubrain/i18n-layer/nuxt.config.ts
import { createResolver } from '@nuxt/kit'
import { fileURLToPath } from 'node:url'

const resolver = createResolver(import.meta.url)

export default defineNuxtConfig({
  // ✅ Auto-install required modules
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxtjs/content',
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

  alias: {
    '#theme': fileURLToPath(new URL('../../theme', import.meta.url)),
    '#shared': fileURLToPath(new URL('#shared', import.meta.url)),
  },

  experimental: {
    localLayerAliases: true,
  },

  // ✅ Type generation
  typescript: {
    includeWorkspace: true,
  },
})
