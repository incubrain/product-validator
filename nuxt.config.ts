// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';
import { getActiveConfigSource } from './shared/utils/config-resolver';
import path from 'node:path';

const activeSource = getActiveConfigSource();
const publicDir = activeSource === 'root' 
  ? 'public' 
  : path.resolve(process.cwd(), `examples/${activeSource}/public`);

export default defineNuxtConfig({
  dir: {
    public: publicDir,
  },

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

  // {DX}: Commented out as it is too buggy and impacting dx significantly
    studio: {
      // Studio admin route (default: '/_studio')
      route: '/_studio',
  
      // {FIX}: broken, pending triage of this https://github.com/nuxt-content/studio/pull/73
      development: {
        sync: true, // Enable development mode
      },
  
      // GitHub repository configuration (owner and repo are required)
      repository: {
        provider: 'github', // only GitHub is currently supported
        owner: 'incubrain', // your GitHub username or organization
        repo: 'product-validator', // your repository name
        branch: 'main', // the branch to commit to (default: main)
        rootDir: activeSource === 'validator' ? 'examples/validator' : '', // optional: if your Nuxt app is in a subdirectory (default: '')
        private: true,
      },
    },

  ssr: true,

  $development: {
    modules: [
      '@nuxt/eslint',
      '@compodium/nuxt',
      // '@nuxt/hints'
    ],

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
        routes: [],
        crawlLinks: false,
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
    '#stage-config': activeSource === 'root'
      ? fileURLToPath(new URL('./config/stages.ts', import.meta.url))
      : fileURLToPath(new URL(`./examples/${activeSource}/config/stages.ts`, import.meta.url)),
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },

  routeRules: {
    '/': { 
      ssr: true,      
      prerender: false
    },
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
