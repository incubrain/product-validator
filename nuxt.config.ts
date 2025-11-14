// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  debug: true,

  modules: [
    '@nuxtjs/seo',
    '@nuxt/ui',
    '@nuxt/content', // <-- Must be after @nuxtjs/seo & @nuxt/ui
    '@nuxt/fonts',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/scripts',
    'nuxt-studio',
  ],

  hooks: {
    'content:file:afterParse'(ctx) {
      const { content } = ctx;

      if (content.id.startsWith('magnet')) {
        content.disabled = content.status !== 'published';
      }
    },
  },

  // {CONFIG}
  site: {
    url: 'https://product-validator.incubrain.org',
    name: 'Product Validator',
    description: 'Ship today, build in public, validate in weeks',
  },

  studio: {
    // Studio admin route (default: '/_studio')
    route: '/_studio',

    // GitHub repository configuration (owner and repo are required)
    repository: {
      provider: 'github', // only GitHub is currently supported
      owner: 'incubrain', // your GitHub username or organization
      repo: 'product-validator', // your repository name
      branch: process.env.STUDIO_GITHUB_BRANCH_NAME, // the branch to commit to (default: main)
      rootDir: '', // optional: if your Nuxt app is in a subdirectory (default: '')
    },
  },

  ssr: true,

  $development: {
    modules: ['@nuxt/eslint', '@compodium/nuxt', '@nuxt/hints'],

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
      preset: process.env.PROVIDER,
      prerender: {
        crawlLinks: true,
        routes: ['/'],
        ignore: ['/magnet', '/magnet/**'],
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
      configSource: '',
      validationStage: '',
      scripts: {
        umamiAnalytics: {
          websiteId: '',
          scriptInput: {
            src: '',
          },
        },
      },
    },
    storage: {
      provider: '',
      url: '',
      secret: '',
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
    '#config': fileURLToPath(
      new URL('./shared/config/index.ts', import.meta.url),
    ),
    '#types': fileURLToPath(
      new URL('./shared/types/config.ts', import.meta.url),
    ),
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/updates': { swr: 3600 }, // Updates cached for 1 hour, regenerates in background
    '/magnet': { ssr: false }, // Magnet dashboard SPA-only (client-side rendered)
    '/magnet/**': { ssr: false }, // Magnet pages SPA-only (client-side rendered)
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
