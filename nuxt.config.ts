// https://nuxt.com/docs/api/configuration/nuxt-config
import { getBusinessRuntimeConfig } from './shared/config/business';

import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  modules: [
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    'nuxt-shiki',
  ],

  // ✅ DEVELOPMENT ONLY: All dev-specific configuration
  $development: {
    modules: ['@nuxt/eslint', '@compodium/nuxt'],

    devtools: { enabled: true },

    // Dev runtime config
    runtimeConfig: {
      public: {
        incubrain: {
          debug: true,
        },
      },
    },

    // Dev-specific Nitro config
    nitro: {
      debug: true,
    },

    // TypeScript checking in dev
    typescript: {
      typeCheck: false,
      strict: false,
    },
  },

  // ✅ PRODUCTION ONLY: Performance optimizations
  $production: {
    runtimeConfig: {
      public: {
        incubrain: {
          debug: false,
        },
      },
    },
    sourcemap: false,
    experimental: {
      payloadExtraction: false, // Faster builds
    },

    // Production Nitro optimizations
    nitro: {
      minify: true,
      prerender: {
        crawlLinks: true,
        routes: ['/'],
      },
    },
  },

  imports: {
    dirs: ['~~/theme/*.ts', '~/providers/*.ts'],
  },

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
    },
  },

  css: ['~/assets/css/main.css'],

  ui: {
    theme: {
      colors: [
        'primary',
        'secondary',
        'neutral',
        'info',
        'success',
        'warning',
        'error',
        'inverted',
      ],
    },
  },

  runtimeConfig: {
    public: {
      ...getBusinessRuntimeConfig(),
    },
  },

  alias: {
    '#theme': fileURLToPath(new URL('./theme', import.meta.url)),
  },

  routeRules: {
    '/': { prerender: true },
    '/blog': { isr: 3600 },
    '/blog/**': { isr: true },
    '/api/blog/**': {
      cache: { maxAge: 60 * 10 },
      headers: { 'cache-control': 's-maxage=600' },
    },
  },

  components: [
    { path: '~/components', prefix: 'I' },
    { path: '~/components/wrap', prefix: 'IU' },
    '~/components',
  ],

  experimental: {
    defaults: {
      nuxtLink: {
        externalRelAttribute: 'noopener noreferrer',
        prefetch: false,
        prefetchOn: { interaction: true },
        trailingSlash: 'remove',
      },
    },
  },

  compatibilityDate: '2025-07-15',

  icon: {
    serverBundle: {
      // using full @iconify/json define collections to tree-shake
      collections: ['lucide', 'mdi', 'logos'],
    },
    aliases: {
      'arrow-left': 'i-lucide-arrow-left',
      'arrow-right': 'i-lucide-arrow-right',
      check: 'i-lucide-check',
      close: 'i-lucide-x',
      search: 'i-lucide-search',
    },
  },

  shiki: {
    defaultTheme: 'vitesse-dark',
    defaultLang: 'typescript',
    bundledLangs: [
      'typescript',
      'javascript',
      'vue',
      'vue-html',
      'yaml',
      'typespec',
    ],
    bundledThemes: ['vitesse-dark', 'vitesse-light'],
  },

  tvBuild: {
    enabled: true,
  },
});
