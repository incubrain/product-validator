// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';
import { getActiveConfigSource } from './shared/utils/config-resolver';
import path from 'node:path';

const appConfig = getActiveConfigSource();

export default defineNuxtConfig({
  dir: {
    public: appConfig.publicDir,
  },

  modules: [
    '@nuxtjs/seo',
    '@nuxt/ui',
    '@nuxt/content', // <-- Must be after @nuxtjs/seo & @nuxt/ui
    '@nuxt/fonts',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/scripts',
    // 'nuxt-studio', // {DX}: studio breaks HMR alpha.2
  ],

  // {CONFIG}
  site: {
    url: 'https://founder-funnel.incubrain.org',
    name: 'Founder Funnel',
    description: 'Open-source funnel for technical founders',
  },

  seo: {
    redirectToCanonicalSiteUrl: true,
  },

  // {DX}: studio breaks HMR alpha.2
  // studio: {
  //     // Studio admin route (default: '/_studio')
  //     route: '/_studio',
  //
  //     // {FIX}: broken, pending triage of this https://github.com/nuxt-content/studio/pull/73
  //     // development: {
  //     //   sync: true, // Enable development mode
  //     // },
  //
  //     // GitHub repository configuration (owner and repo are required)
  //     repository: {
  //       provider: 'github', // only GitHub is currently supported
  //       owner: 'incubrain', // your GitHub username or organization
  //       repo: 'founder-funnel', // your repository name
  //       branch: 'main', // the branch to commit to (default: main)
  //       rootDir: appConfig.prefix,
  //       private: true,
  //     },
  //   },

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

    nitro: {
      prerender: {
        // Intentionally empty - dynamic routes are not prerendered
        routes: [],
        crawlLinks: false,
      },
    },
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
      debug: true,
      analyticsLink: '',
      configSource: '',
      scripts: {
        umamiAnalytics: {
          websiteId: '',
          scriptInput: {
            src: '',
          },
        },
      },
    },
    // Server-only config (not exposed to client)
    webhookUrl: '',
    telegramChatId: '',
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
    '#config': fileURLToPath(
      new URL('./shared/config/index.ts', import.meta.url),
    ),
    '#types': fileURLToPath(
      new URL('./shared/types/config.ts', import.meta.url),
    ),
    '#constants': fileURLToPath(
      new URL('./shared/constants.ts', import.meta.url),
    ),
  },

  future: {
    compatibilityVersion: 4,
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },

  routeRules: {
    '/': {
      ssr: true,
      prerender: false,
    },
    '/offers/**': {
      ssr: true,
      prerender: false,
    },
    '/story': { ssr: true, prerender: false },
    '/updates': { swr: 3600 }, // Updates cached for 1 hour, regenerates in background
    '/updates/**': { swr: 3600 },
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

  icon: {
    serverBundle: {
      // {DX}: Using full @iconify/json no need to install collection packages
      // collections array enables tree-shake
      collections: ['lucide', 'mdi', 'logos'],
    },
  },
});
