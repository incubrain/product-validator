// https://nuxt.com/docs/api/configuration/nuxt-config
import { loadBusinessConfig } from './shared/utils/load-config'
const businessConfig = loadBusinessConfig()

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    // must come before nuxt/content
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@compodium/nuxt',
  ],

  eslint: {
    config: {
      // replaces need for prettier
      // configure - https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/configs/customize.ts
      // all rules - https://eslint.style/rules#rules
      stylistic: {
        indent: 2, // 2 spaces (standard)
        quotes: 'single', // Single quotes (cleaner)
        semi: false, // No semicolons (modern JS)
        arrowParens: false, // (x) => x vs (x) => x
        blockSpacing: true, // { code } vs {code}
        braceStyle: 'stroustrup', // else on new line
        commaDangle: 'always-multiline', // Trailing commas for multiline
        jsx: true, // Vue JSX support
        severity: 'error', // Auto-fix required
        quoteProps: 'consistent-as-needed', // Object property quotes
      },
    },
  },

  routeRules: {
    // Homepage - Pre-rendered at build time (fastest loading)
    '/': { prerender: true },

    // Blog index - ISR with 1 hour cache (balance of fresh content + speed)
    '/blog': { isr: 3600 },
    // // Blog posts - ISR (cache until next deploy, perfect for content)
    '/blog/**': { isr: true },

    // API routes - Server-side only
    '/api/blog/**': {
      cache: { maxAge: 60 * 10 },
      headers: { 'cache-control': 's-maxage=600' },
    },
  },

  

  sitemap: {
    sources: [
      '/api/__sitemap__/urls', // Our custom blog endpoint
    ],
    excludeAppSources: ['nuxt:route-rules'], // Keep pages, exclude unnecessary
    cacheMaxAgeSeconds: 3600, // 1 hour cache
  },

  robots: {
    // Block in development for safety
    disallow: process.env.NODE_ENV === 'development' ? ['/'] : [],

    // Reference our sitemap
    sitemap: ['/sitemap.xml'],

    // Block non-SEO bots (scrapers, etc.) but allow AI crawlers
    blockNonSeoBots: true,
    blockAiBots: false, // Allow AI crawlers like GPTBot, Claude, etc.

    // Future considerations (commented for now):
    // TODO: Add staging environment blocking when needed
  },

  site: {
    url: `https://${businessConfig.business.name.toLowerCase()}.org`,
    name: businessConfig.business.name,
    description: businessConfig.business.description
  },

  schemaOrg: {
    debug: true,
  },

  imports: {
    dirs: [
      '~~/theme/*.ts',
    ]
  },

  ogImage: {
    defaults: {
      component: 'Nuxt', // Use the modern Nuxt template
      renderer: 'satori', // Fast, works everywhere
      extension: 'png', // Good compatibility
      width: 1200,
      height: 630,
      emojis: 'twemoji', // Good emoji support
    },
  },

  // build: {
  //   transpile: [
  //     "embla-carousel-vue",
  //     "embla-carousel-autoplay",
  //     "embla-carousel-auto-scroll",
  //   ],
  // },

  //   hooks: {
  //     'content:file:afterParse'(ctx) {
  //       if (ctx.file.id.startsWith('pages/')) {
  //         console.log('🔍 Processing file:', ctx.file.id)
  //         console.log('🔍 Body structure:', ctx.content.body)
  //
  //         const components = extractMDCComponents(ctx.content.body)
  //         console.log('🔍 Extracted components:', components)
  //
  //         // FIX: Pass componentName not component object
  //         const searchSections = components.map((componentName) => {
  //           // Find the actual component data for this name
  //           const componentData = findComponentData(ctx.content.body, componentName)
  //           const props = extractComponentProps(componentData)
  //           return extractSearchFromProps(componentName, props) // ✅ CORRECT
  //         })
  //
  //         console.log('🔍 Generated search sections:', searchSections)
  //         ctx.content.searchSections = searchSections
  //       }
  //     },
  //   },

  debug: true,
  typescript: {
    typeCheck: true, // Enable build-time type checking
    strict: true, // Keep strict mode
  },

  content: {
    build: {
      markdown: {
        // Enhanced TOC for article navigation
        toc: {
          depth: 4,
          searchDepth: 4,
        },

        highlight: {
          theme: {
            default: 'github-dark',
            dark: 'github-dark',
            light: 'github-light',
          },
          langs: [
            // Default languages
            'json',
            'js',
            'ts',
            'html',
            'css',
            'vue',
            'shell',
            'mdc',
            'md',
            'yaml',
            // Additional languages
            'python',
            'sql',
            'bash',
            'dockerfile',
            'nginx',
            'apache',
            'r',
            'toml',
            'mermaid',
            'javascript',
            'typescript', // Add these explicitly
          ],
        },
      },
    },

    renderer: {
      anchorLinks: {
        h1: false,
        h2: true,
        h3: true,
        h4: true,
        h5: false,
        h6: false,
      },

      alias: {
        callout: 'Callout',
        alert: 'Alert',
        h1: 'ProseH1',
        h2: 'ProseH2',
        h3: 'ProseH3',
        h4: 'ProseH4',
        p: 'ProseP',
        a: 'ProseA',
        strong: 'ProseStrong',
        ul: 'ProseUl',
        ol: 'ProseOl',
        li: 'ProseLi',
        code: 'ProseCode',
        em: 'ProseEm',
        blockquote: 'ProseBlockquote',
      },
    },

    watch: {
      enabled: true,
      port: 4000,
      showURL: false,
    },
  },

  fonts: {
    families: [
      { name: 'Outfit', provider: 'google' },
      { name: 'IBM Plex Sans', provider: 'google' },
      { name: 'JetBrains Mono', provider: 'google' },
    ],
  },

  seo: {
    fallbackTitle: true,
    // Automatic canonical URLs (already working)
    canonicalLowercase: true,
    canonicalQueryWhitelist: ['page', 'sort', 'filter', 'search', 'q'],

    // Global SEO meta defaults
    meta: {
      author: 'Incubrain Team',
      themeColor: [
        { content: '#18181B', media: '(prefers-color-scheme: dark)' },
        { content: '#10B981', media: '(prefers-color-scheme: light)' },
      ],
      colorScheme: 'dark light',
      applicationName: 'Incubrain',
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

  experimental: {
    defaults: {
      nuxtLink: {
        externalRelAttribute: 'noopener noreferrer',
        // Add target="_blank" for external links automatically
        prefetch: false,
        prefetchOn: { interaction: true },
        trailingSlash: 'remove',
      },
    },
  },

  css: ['~/assets/css/main.css', '~/assets/css/motion.css'],

  icon: {
    aliases: {
      'arrow-left': 'i-lucide-arrow-left',
      'arrow-right': 'i-lucide-arrow-right',
      'check': 'i-lucide-check',
      'close': 'i-lucide-x',
      'search': 'i-lucide-search',
    },
  },

  nitro: {
    debug: true,
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  

  runtimeConfig: {
    public: {
      business: businessConfig.business,
      contact: businessConfig.contact,
      services: businessConfig.services,
      motion: {
        directives: {
          // SMB-focused: Smooth, trustworthy animations
          'fade-up': {
            initial: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 600, ease: 'easeOut' },
            },
          },
          'scale-in': {
            initial: { opacity: 0, scale: 0.95 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 400, ease: 'easeOut' },
            },
          },

          // Technical Builder-focused: Precise, sophisticated
          'tech-slide': {
            initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 800, ease: 'circOut' },
            },
          },
          'matrix-appear': {
            initial: { opacity: 0, scale: 0.8, rotateX: -15 },
            visible: {
              opacity: 1,
              scale: 1,
              rotateX: 0,
              transition: { type: 'spring', stiffness: 150, damping: 12 },
            },
          },
        },
      },
    },
  },
})
