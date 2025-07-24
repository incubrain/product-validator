// app/composables/useSeoDefaults.ts - FINAL VERSION
interface PageData {
  title: string
  description: string
  date?: string
  category?: string
  author?: string
  image?: string
  tags?: string[]
  path?: string
  schemas?: any[] // Content can override schemas
  ogImage?: any // Content can override OG image
  [key: string]: any
}

export const useSeoDefaults = async (pageData?: PageData) => {
  const route = useRoute()

  // Load schemas and config
  const [{ data: schemas }, { data: config }] = await Promise.all([
    useAsyncData('seo-schemas', () => queryCollection('seoSchemas').all()),
    useAsyncData('seo-config', () => queryCollection('seoConfig').first()),
  ])

  if (!schemas.value || !config.value) {
    console.warn('🚨 SEO schemas or config not found')
    return { pageType: 'page', seoMeta: {}, schemaOrg: null, ogImage: null, apply: () => {} }
  }

  const schemaRegistry = buildRegistry(schemas.value)
  const pageConfig = getPageConfig(route.path, pageData, config.value)

  const seoMeta = generateMeta(pageData, config.value, pageConfig)
  const schemaOrg = generateSchemas(pageData, schemaRegistry, pageConfig)
  const ogImage = generateOgImage(pageData, pageConfig)

  return {
    pageType: pageConfig.type,
    seoMeta,
    schemaOrg,
    ogImage,
    apply() {
      useSeoMeta(seoMeta)
      if (schemaOrg?.length > 0) useSchemaOrg(schemaOrg)
      if (ogImage) defineOgImage(ogImage)
    },
  }
}

// ====================================
// CORE FUNCTIONS
// ====================================
function buildRegistry(schemaFiles: any[]) {
  const registry: Record<string, any> = {}
  schemaFiles.forEach((file) => {
    registry[file.stem] = file
  })
  return registry
}

function getPageConfig(path: string, pageData: PageData | undefined, config: any) {
  // Content override (highest priority)
  if (pageData?.schemas) {
    return {
      type: 'content-driven',
      schemas: pageData.schemas,
      ogImage: pageData.ogImage || config.defaults.ogImage,
      meta: config.defaults.meta,
    }
  }

  // Exact path match
  if (config.pages[path]) {
    return { type: 'page', ...config.pages[path] }
  }

  // Content type match (blog)
  if (path.includes('/blog/') && path.split('/').length >= 4) {
    return { type: 'blog', ...config.contentTypes.blog }
  }

  // Default fallback
  return { type: 'default', ...config.defaults }
}

function generateSchemas(pageData: PageData | undefined, registry: Record<string, any>, pageConfig: any) {
  const schemas = []

  pageConfig.schemas.forEach((schemaItem: any) => {
    if (typeof schemaItem === 'string') {
      // Simple reference: "organization"
      if (registry[schemaItem]) {
        schemas.push(registry[schemaItem])
      }
    } else if (typeof schemaItem === 'object') {
      // Enhanced schema: "webpage: { name: '...', description: '...' }"
      const schemaType = Object.keys(schemaItem)[0]
      const enhancements = schemaItem[schemaType]

      if (registry[schemaType]) {
        // Base schema exists, enhance it
        const enhanced = enhanceSchema(registry[schemaType], enhancements, pageData, registry)
        schemas.push(enhanced)
      } else {
        // Create new schema with enhancements
        const newSchema = {
          '@type': getSchemaType(schemaType),
          ...resolveEnhancements(enhancements, pageData, registry),
        }
        schemas.push(newSchema)
      }
    }
  })

  return schemas.filter(Boolean)
}

function enhanceSchema(baseSchema: any, enhancements: any, pageData: PageData | undefined, registry: Record<string, any>) {
  return {
    ...baseSchema,
    ...resolveEnhancements(enhancements, pageData, registry),
  }
}

function resolveEnhancements(enhancements: any, pageData: PageData | undefined, registry: Record<string, any>): any {
  if (typeof enhancements === 'string') {
    return resolveValue(enhancements, pageData, registry)
  }

  if (typeof enhancements === 'object' && enhancements !== null) {
    const resolved: any = {}
    Object.entries(enhancements).forEach(([key, value]) => {
      resolved[key] = resolveEnhancements(value, pageData, registry)
    })
    return resolved
  }

  return enhancements
}

function resolveValue(value: string, pageData: PageData | undefined, registry: Record<string, any>): any {
  // Template interpolation: "{organization.url}/path"
  if (value.includes('{') && value.includes('}')) {
    return value.replace(/\{([^}]+)\}/g, (match, path) => {
      const resolved = getPath(path, { pageData, ...registry })
      return resolved?.toString() || match
    })
  }

  // Object path: "organization.name"
  if (value.includes('.')) {
    return getPath(value, { pageData, ...registry })
  }

  // Direct reference: "person"
  if (registry[value]) {
    return registry[value]
  }

  // Function call: "getCategoryName(pageData.category)"
  if (value.includes('(') && value.includes(')')) {
    return executeFunction(value, pageData)
  }

  return value
}

function getPath(path: string, context: any): any {
  return path.split('.').reduce((obj, key) => obj?.[key], context)
}

function executeFunction(funcCall: string, pageData: PageData | undefined): any {
  // Simple function execution for known functions
  if (funcCall.startsWith('getCategoryName(')) {
    const arg = funcCall.match(/\(([^)]+)\)/)?.[1]
    if (arg === 'pageData.category') {
      return getCategoryName(pageData?.category)
    }
  }

  if (funcCall.startsWith('estimateWordCount(')) {
    return estimateWordCount(pageData)
  }

  return funcCall
}

function getSchemaType(schemaKey: string): string {
  const typeMap: Record<string, string> = {
    webpage: 'WebPage',
    website: 'WebSite',
    aboutPage: 'AboutPage',
    contactPage: 'ContactPage',
    blogPost: 'BlogPosting',
  }
  return typeMap[schemaKey] || 'Thing'
}

function generateMeta(pageData: PageData | undefined, config: any, pageConfig: any) {
  const defaults = config.meta

  if (!pageData) {
    return {
      title: defaults.siteName,
      titleTemplate: defaults.titleTemplate,
      description: 'Default description',
      ogSiteName: defaults.ogSiteName,
      ogImage: defaults.defaultOgImage,
      twitterCard: 'summary_large_image',
      twitterSite: defaults.twitterSite,
    }
  }

  return {
    title: pageData.title || 'Untitled',
    titleTemplate: defaults.titleTemplate,
    description: pageData.description || 'Default description',
    ogTitle: pageData.title,
    ogDescription: pageData.description,
    ogSiteName: defaults.ogSiteName,
    ogType: pageConfig.type === 'blog' ? 'article' : 'website',
    ogImage: pageData.image
      ? `/images/blog/${pageData.category}/${pageData.image}`
      : defaults.defaultOgImage,
    twitterCard: 'summary_large_image',
    twitterSite: defaults.twitterSite,
    twitterCreator: defaults.twitterCreator,
    robots: 'index, follow',
    canonical: `https://incubrain.org${pageData.path || ''}`,
    ...(pageConfig.type === 'blog' && {
      articlePublishedTime: pageData.date,
      articleModifiedTime: pageData.date,
      articleAuthor: pageData.author || 'Default Author',
      articleSection: getCategoryName(pageData.category),
      articleTag: pageData.tags || [],
    }),
  }
}

function generateOgImage(pageData: PageData | undefined, pageConfig: any) {
  if (!pageData?.title || !pageConfig.ogImage) return null

  const ogConfig = pageConfig.ogImage

  // Blog category mapping
  if (pageConfig.type === 'blog' && pageData.category && ogConfig.categoryMapping) {
    const component = ogConfig.categoryMapping[pageData.category] || ogConfig.categoryMapping.default

    return {
      component,
      props: {
        title: pageData.title,
        category: getCategoryName(pageData.category),
        author: pageData.author || 'Default Author',
        date: pageData.date,
        image: pageData.image,
        ...(pageData.tags && { tags: pageData.tags.slice(0, 3) }),
      },
    }
  }

  // Standard page
  return {
    component: ogConfig.component,
    props: {
      title: pageData.title,
      description: pageData.description,
      type: pageConfig.type,
      variant: ogConfig.variant || 'default',
    },
  }
}

// ====================================
// UTILITIES
// ====================================
function estimateWordCount(pageData: PageData | undefined): number {
  const text = pageData?.description || ''
  return Math.max(text.split(' ').length * 10, 500)
}

function getCategoryName(category?: string): string {
  if (!category) return 'General'
  return category.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}
