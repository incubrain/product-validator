// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/seo',
    '@nuxt/ui',
    '@nuxt/content', // <-- Must be after @nuxtjs/seo & @nuxt/ui
    '@nuxt/fonts',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/scripts',
  ],

  // {CONFIG}
  site: {
    url: 'https://product-validator.incubrain.org',
    name: 'Product Validator',
    description: 'Ship today, build in public, validate in weeks',
  },

  $development: {
    modules: ['@nuxt/eslint', '@compodium/nuxt'],

    devtools: { enabled: true },

    scripts: {
      registry: {
        umamiAnalytics: 'mock',
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

  // {PERF}: Production only performance optimizations
  $production: {
    sourcemap: false,
    experimental: {
      payloadExtraction: false, // Faster builds
    },

    scripts: {
      registry: {
        umamiAnalytics: true,
      },
    },

    // Production Nitro optimizations
    nitro: {
      minify: true,
      preset: import.meta.env.PROVIDER,
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

  runtimeConfig: {
    public: {
      analyticsLink: '',
      validator: {
        storagePrefix: 'validator',
      },
      scripts: {
        umamiAnalytics: {
          websiteId: '',
          scriptInput: {
            src: '',
          },
        },
      },
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
    '#config': fileURLToPath(
      new URL('./shared/config/index.ts', import.meta.url),
    ),
    '#types': fileURLToPath(
      new URL('./shared/types/config.ts', import.meta.url),
    ),
    '#config/*': fileURLToPath(new URL('./shared/config', import.meta.url)),
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
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
      // {DX}: Using full @iconify/json no need to install collection packages
      // collections array enables tree-shake
      collections: ['lucide', 'mdi', 'logos'],
    },
  },
});
