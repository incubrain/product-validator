// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  modules: [
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-svgo',
    '@nuxtjs/mdc',
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
    dirs: ['~~/theme/*.ts'],
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
      ],
    },
  },

  alias: {
    '#theme': fileURLToPath(new URL('./theme/index.ts', import.meta.url)),
    '#theme/*': fileURLToPath(new URL('./theme', import.meta.url)),
    '#config': fileURLToPath(new URL('./shared/config/index.ts', import.meta.url)),
    '#config/*': fileURLToPath(new URL('./shared/config', import.meta.url)),
  },

  routeRules: {
    '/': { prerender: true },
  },

  components: [
    { path: '~/components', prefix: 'I' },
    { path: '~/components/ui', prefix: 'UI' },
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
      'check': 'i-lucide-check',
      'close': 'i-lucide-x',
      'search': 'i-lucide-search',
    },
  },

  svgo: {
    autoImportPath: './assets/svg/',
    defaultImport: 'component',
    customComponent: 'ISVG',
  },
});
