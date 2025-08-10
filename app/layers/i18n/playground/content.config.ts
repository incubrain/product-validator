// playground/content.config.ts - WITH SPLIT YAML COLLECTIONS
import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

const slugsSchema = z.object({ en: z.string(), mr: z.string() })

// ✅ Blog schema (unchanged)
const blogSchema = z.object({
  title: z.string(),
  testing: z.string(),
  slugs: z.object({ en: z.string(), mr: z.string() }),
  subtitle: z.string().optional(),
  excerpt: z.string().optional(),
  category: z.string().optional(),
  author: z.string().optional(),
  publishedAt: z.string().optional(),
  featured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
})

// ✅ Category schema (unchanged)
const categorySchema = z.object({
  slug: z.string(),
  slugs: slugsSchema,
  icon: z.string().optional(),
  color: z.string().optional(),
  title: z.record(z.string(), z.string()),
  description: z.record(z.string(), z.string()).optional(),
})

// ✅ Traditional page schema (unchanged)
const pageSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  slug: z.string(),
  slugs: slugsSchema,
  description: z.string().optional(),
  layout: z.string().optional(),
  content: z.object({}),
})

export default defineContentConfig({
  collections: {
    // ✅ BLOG COLLECTIONS (unchanged)
    blog_en: defineCollection(asSeoCollection({
      type: 'page',
      source: { include: 'en/blog/**/*.md', prefix: '' },
      schema: blogSchema,
    })),

    blog_mr: defineCollection(asSeoCollection({
      type: 'page',
      source: { include: 'mr/blog/**/*.md', prefix: '' },
      schema: blogSchema,
    })),

    // ✅ TRADITIONAL PAGE COLLECTIONS (unchanged)
    pages_en: defineCollection(asSeoCollection({
      type: 'page',
      source: { include: 'en/pages/**', prefix: '' },
      schema: pageSchema,
    })),
    pages_mr: defineCollection(asSeoCollection({
      type: 'page',
      source: { include: 'mr/pages/**', prefix: '' },
      schema: pageSchema,
    })),

    // ✅ CATEGORIES (unchanged)
    categories: defineCollection({
      type: 'data',
      source: { include: 'categories/**', prefix: '/categories' },
      schema: categorySchema,
    }),
  },
})
