import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

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
          include: 'pages/**/*.md',
          prefix: '/',
        },
        schema: z.object({
          title: z.string(),
          subtitle: z.string(),
          description: z.string(),
          sections: z.array(z.string()).optional(), // Array of section references
          keywords: z.array(z.string()).optional(),
          searchSections: z
            .array(
              z.object({
                id: z.string(),
                title: z.string(),
                content: z.string(),
              }),
            )
            .optional(),
          searchContent: z.string().optional(),
          aiContext: z.string().optional(),
          componentList: z.array(z.string()).optional(),
        }),
      }),
    ),

    sections: defineCollection({
      type: 'page',
      source: 'sections/**/*.md',
      schema: z.object({
        sectionName: z.string(),
        agentSummary: z.string(),
        variants: z.record(z.object({
          intent: z.string(),
          emotion: z.string(),
        })).optional(),
      }),
    }),

    seoSchemas: defineCollection({
      type: 'data',
      source: 'seo/schemas/**/*.yml',
      schema: z.object({
        schema: z.record(z.any()),
      }),
    }),

    faq: defineCollection({
      type: 'data',
      source: 'faq/**/*.yaml',
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
      source: 'config/**/*.yml',
      schema: z.object({ data: z.record(z.any()) }),
    }),
  },
})
