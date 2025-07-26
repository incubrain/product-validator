import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

const emotionalTriggerSchema = z.enum(['trust', 'authority', 'urgency'])
const websiteGoalSchema = z.enum(['convert', 'credibility', 'awareness', 'engage'])

// Media configuration schema
const mediaConfigSchema = z.object({
  type: z.enum(['image', 'video', 'none']),
  src: z.string().optional(),
  alt: z.string().optional(),
  poster: z.string().optional(),
}).optional()

// Action configuration schema
const actionConfigSchema = z.object({
  text: z.string(),
  link: z.string(),
  description: z.string().optional(),
}).optional()

// Base section schema
const baseSectionSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  variant: emotionalTriggerSchema.optional(), // Optional - will auto-assign if not provided
  goal: websiteGoalSchema.optional(),
  action: actionConfigSchema,
  media: mediaConfigSchema,
  items: z.array(z.any()).optional(),
})

// Individual section schemas
const heroSectionSchema = baseSectionSchema.extend({
  type: z.literal('hero'),
})

const resultsSectionSchema = baseSectionSchema.extend({
  type: z.literal('results'),
})

const workSectionSchema = baseSectionSchema.extend({
  type: z.literal('work'),
})

const aboutSectionSchema = baseSectionSchema.extend({
  type: z.literal('about'),
  story: z.string(),
  image: z.string().optional(),
})

const ctaSectionSchema = baseSectionSchema.extend({
  type: z.literal('cta'),
})

const faqSectionSchema = baseSectionSchema.extend({
  type: z.literal('faq'),
  categories: z.array(z.string()),
})

// Union of all section types
const sectionSchema = z.union([
  heroSectionSchema,
  resultsSectionSchema,
  workSectionSchema,
  aboutSectionSchema,
  ctaSectionSchema,
  faqSectionSchema,
])

export default defineContentConfig({
  collections: {
    blog: defineCollection(
      asSeoCollection({
        type: 'page',
        source: 'blog/**/*.md',
        schema: z.object({
          title: z.string(),
          description: z.string(),
          date: z.string(),
          category: z.enum([
            'ai-automation',
            'business-automation',
            'space-tech',
            'future-ai',
            'company-culture',
          ]),
          author: z.string().default('Incubrain Team'),
          readTime: z.string().optional(),
          featured: z.boolean().default(false),
          tags: z.array(z.string()).optional(),
          image: z.string().optional(),
          // Sitemap-specific fields
          sitemap: z
            .object({
              lastmod: z.string().optional(),
              changefreq: z
                .enum(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'])
                .optional(),
              priority: z.number().min(0).max(1).optional(),
            })
            .optional(),
        }),
      }),
    ),

    pages: defineCollection(
      asSeoCollection({
        type: 'page',
        source: {
          include: 'pages/**.yml',
          prefix: '/',
        },
        schema: z.object({
          meta: z.object({
            title: z.string(),
            description: z.string(),
            keywords: z.array(z.string()).optional(),
          }),
          sections: z.array(sectionSchema), // Array of typed sections
        }),
      }),
    ),

    seoSchemas: defineCollection({
      type: 'data',
      source: 'seo/schemas/**/*.yml',
      schema: z.object({
        schema: z.record(z.any()),
      }),
    }),

    faq: defineCollection({
      type: 'data',
      source: 'faq/**/*.yml',
      schema: z.object({
        faqs: z.array(z.object({
          question: z.string(),
          answer: z.string(),
          keywords: z.array(z.string()).optional(),
          priority: z.number().optional(),
        })),
      }),
    }),

    // NEW: Single unified SEO config
    seoConfig: defineCollection({
      type: 'data',
      source: 'seo/config.yml',
      schema: z.object({
        meta: z.record(z.any()),
        defaults: z.record(z.any()),
        pages: z.record(z.any()),
        contentTypes: z.record(z.any()).optional(),
      }),
    }),

    config: defineCollection({
      type: 'data',
      source: 'config/**.yml',
      schema: z.object({ name: z.string(), data: z.record(z.any()) }),
    }),
  },
})
