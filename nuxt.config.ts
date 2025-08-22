// https://nuxt.com/docs/api/configuration/nuxt-config
import { getBusinessRuntimeConfig } from './shared/config/business'
import { fileURLToPath } from 'node:url'

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
    modules: [
      '@nuxt/eslint',
      '@compodium/nuxt',
    ],

    devtools: { enabled: true },

    // Dev runtime config
    runtimeConfig: {
      public: {
        incubrain: {
          debug: process.env.NUXT_PUBLIC_DEBUG === 'true',
        },
      },
    },

    // Dev-specific Nitro config
    nitro: {
      debug: true,
    },

    // TypeScript checking in dev
    typescript: {
      typeCheck: true,
      strict: true,
    },

    eslint: {
      config: {
        stylistic: {
          pluginName: '@new-stylistic',
          indent: 2,
          quotes: 'single',
          semi: false,
          jsx: true,
          arrowParens: true,
          braceStyle: '1tbs',
          commaDangle: 'always-multiline',
          quoteProps: 'consistent-as-needed',
          blockSpacing: true,
          severity: 'warn',
        },
      },
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
    dirs: [
      '~~/theme/*.ts',
      '~/providers/*.ts',
    ],
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

  css: ['~/assets/css/main.css', '~/assets/css/motion.css'],

  ui: {
    theme: {
      colors: ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'error'],
    },
  },

  runtimeConfig: {
    public: {
      ...getBusinessRuntimeConfig(),
      motion: {
        directives: {
          'fade-up': {
            initial: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } },
          },
          'scale-in': {
            initial: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 400, ease: 'easeOut' } },
          },
          'tech-slide': {
            initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 800, ease: 'circOut' } },
          },
          'matrix-appear': {
            initial: { opacity: 0, scale: 0.8, rotateX: -15 },
            visible: { opacity: 1, scale: 1, rotateX: 0, transition: { type: 'spring', stiffness: 150, damping: 12 } },
          },
        },
      },
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

  fonts: {
    families: [
      { name: 'Outfit', provider: 'google' },
      { name: 'IBM Plex Sans', provider: 'google' },
      { name: 'JetBrains Mono', provider: 'google' },
    ],
  },

  icon: {
    serverBundle: {
      // using full @iconify/json define collections to tree-shake
      collections: ['lucide', 'mdi'],
    },
    aliases: {
      'arrow-left': 'i-lucide-arrow-left',
      'arrow-right': 'i-lucide-arrow-right',
      'check': 'i-lucide-check',
      'close': 'i-lucide-x',
      'search': 'i-lucide-search',
    },
  },

  shiki: {
    defaultTheme: 'vitesse-dark',
    defaultLang: 'typescript',
    bundledLangs: ['typescript', 'javascript', 'vue', 'vue-html', 'yaml', 'typespec'],
    bundledThemes: ['vitesse-dark', 'vitesse-light'],
  },
})
