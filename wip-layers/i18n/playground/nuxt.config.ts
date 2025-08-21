// playground/nuxt.config.ts
import { createResolver } from '@nuxt/kit'
import { fileURLToPath } from 'node:url'
import { getBusinessInfo } from '../../../shared/config/business'

const business = getBusinessInfo()
const resolver = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: ['../'],
  modules: ['@nuxt/ui', '@nuxtjs/seo', '@nuxt/content'],

  devtools: { enabled: true },

  css: [
    resolver.resolve('./assets/main.css'),
  ],

  site: {
    url: import.meta.dev ? `http://${business.url}` : `https://i18n.${business.url}`,
    name: business.name,
    description: business.description,
  },

  // Dev-specific content config
  // content: {
  //   watch: {
  //     enabled: true,
  //     port: 4000,
  //     showURL: false,
  //   },
  // },

  content: {
    build: {
      markdown: {
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
            'json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml',
            'python', 'sql', 'bash', 'dockerfile', 'nginx', 'apache', 'r', 'toml',
            'mermaid', 'javascript', 'typescript',
          ],
        },
      },
    },
    renderer: {
      anchorLinks: {
        h1: false, h2: true, h3: true, h4: true, h5: false, h6: false,
      },
      alias: {
        callout: 'Callout', alert: 'Alert', h1: 'ProseH1', h2: 'ProseH2',
        h3: 'ProseH3', h4: 'ProseH4', p: 'ProseP', a: 'ProseA',
        strong: 'ProseStrong', ul: 'ProseUl', ol: 'ProseOl', li: 'ProseLi',
        code: 'ProseCode', em: 'ProseEm', blockquote: 'ProseBlockquote',
      },
    },
  },

  runtimeConfig: {
    public: {
      i18n: {
        debug: process.env.NUXT_PUBLIC_DEBUG === 'true' || process.env.NODE_ENV === 'development',
      },
    },
  },

  alias: {
    '#shared': fileURLToPath(new URL('../../../shared', import.meta.url)),
    '#theme': fileURLToPath(new URL('../../../theme', import.meta.url)),
  },

  compatibilityDate: '2025-08-09',

  i18n: {
    restructureDir: '.',
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        file: 'english.json',
        name: 'English',
        language: 'en-US',
        iso: 'en-US',
        icon: 'i-circle-flags-us',

      },
      {
        code: 'mr',
        file: 'marathi.json',
        name: 'मराठी',
        language: 'mr-IN',
        iso: 'mr-IN',
        icon: 'i-circle-flags-in',
      },
    ],
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
    },
    customRoutes: 'config',
    pages: {
      'pages': {
        en: '/pages',
        mr: '/paane',
      },
      'pages-slug': {
        en: '/pages/[slug]',
        mr: '/paane/[slug]',
      },
      'data': {
        en: '/data',
        mr: '/mahiti',
      },
      'data-slug': {
        en: '/data/[slug]',
        mr: '/mahiti/[slug]',
      },
      'blog': {
        en: '/blog',
        mr: '/blooga',
      },
      'blog-category': {
        en: '/blog/[category]',
        mr: '/blooga/[category]',
      },
      'blog-category-slug': {
        en: '/blog/[category]/[slug]',
        mr: '/blooga/[category]/[slug]',
      },
    },
    skipSettingLocaleOnNavigate: false,
    debug: true,
    baseUrl: import.meta.dev ? `http://${business.url}` : `https://i18n.${business.url}`,
  },

  icon: {
    serverBundle: {
      // using full @iconify/json define collections to tree-shake
      collections: ['lucide', 'circle-flags'],
    },
  },

  ogImage: {
    defaults: {
      component: 'Nuxt',
      renderer: 'satori',
      extension: 'png',
      width: 1200,
      height: 630,
      emojis: 'twemoji',
    },
  },

  robots: {
    disallow: process.env.NODE_ENV === 'development' ? ['/'] : [],
    sitemap: ['/sitemap.xml'],
    blockNonSeoBots: true,
    blockAiBots: false,
  },

  seo: {
    fallbackTitle: true,
    canonicalLowercase: true,
    canonicalQueryWhitelist: ['page', 'sort', 'filter', 'search', 'q'],
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

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    excludeAppSources: ['nuxt:route-rules'],
    cacheMaxAgeSeconds: 3600,
  },
})
