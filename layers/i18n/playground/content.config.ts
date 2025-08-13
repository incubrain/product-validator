// playground/content.config.ts - WITH SPLIT YAML COLLECTIONS
import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

export const StatusEnum = z.enum(['draft', 'published', 'archived', 'scheduled'])
export const ColorEnum = z.enum([
  'primary', 'blue', 'green', 'amber', 'purple', 'pink', 'slate', 'neutral',
])

export const BaseContentMetaSchema = z.object({
  title: z.string().min(1, 'title is required'),
  slug: z.string().min(1, 'slug is required')
    // enforce ascii-kebab for URLs
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug must be kebab-case ascii'),
  description: z.string().min(1, 'description is required'),
  status: StatusEnum.default('draft'),
  createdAt: z.string().min(1, 'createdAt is required'),
  updatedAt: z.string().optional(),
  priority: z.number().int().min(0).default(100),
})

export const AudienceEnum = z.enum(['beginner', 'intermediate', 'professional'])
export const LayoutEnum = z.enum(['article', 'showcase', 'product', 'tutorial', 'course'])
export const AuthorNameEnum = z.enum([
  'drew-macgibbon',
  'jane-doe',
  'john-smith',
])

export const AuthorRoleEnum = z.enum([
  'creator',
  'contributor',
  'editor',
  'reviewer',
  'maintainer',
])

export const TagsEnum = z.enum([
  'technology',
  'innovation',
  'future',
  'guide',
  'news',
  'case-study',
])

// ---- Small sub-schemas ----
export const ImageSchema = z.object({
  src: z.string().min(1, 'image.src is required'),
  alt: z.string().min(1, 'image.alt is required'),
})

export const AuthorSchema = z.object({
  name: AuthorNameEnum,
  role: AuthorRoleEnum.default('creator'),
})

export const ResourceSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
})

export const ArticleLikeSchema = z.object({
  // Works across blogs, showcases, products, tutorials, courses.
  // Required core
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  description: z.string().min(1),
  // Editorial lifecycle
  status: StatusEnum.default('draft'),
  createdAt: z.string().min(1),
  updatedAt: z.string().optional(),
  // Targeting & layout
  audience: AudienceEnum.default('beginner'),
  layout: LayoutEnum.default('article'),
  // Taxonomy / linking
  categoryStem: z.string().min(1),
  // Credits
  authors: z.array(AuthorSchema).min(1, 'Provide at least one author'),
  // Media
  media: ImageSchema.optional(),
  // Classification
  tags: z.array(TagsEnum).default([]),
  // Versioning / reading time / course length, etc.
  version: z.string().or(z.number()).optional(),
  duration: z.number().int().nonnegative().optional(), // minutes by convention
  // Helpful external links
  resources: z.array(ResourceSchema).default([]),
})

const baseSchema = z.object({
  slug: z.string(),
  status: StatusEnum.default('draft'),
})

const CategorySchema = BaseContentMetaSchema.extend({
  icon: z.string().optional(),
  color: ColorEnum.optional(),
})

// ✅ Traditional page schema (unchanged)
const pageSchema = baseSchema.extend({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  layout: z.string().optional(),
  content: z.object({}),
})

export default defineContentConfig({
  collections: {
    en_blog: defineCollection(asSeoCollection({
      type: 'page',
      source: { include: 'en/blog/**/*.md', prefix: '' },
      schema: ArticleLikeSchema,
    })),
    mr_blog: defineCollection(asSeoCollection({
      type: 'page',
      source: { include: 'mr/blog/**/*.md', prefix: '' },
      schema: ArticleLikeSchema,
    })),

    // ✅ TRADITIONAL PAGE COLLECTIONS (unchanged)
    en_pages: defineCollection(asSeoCollection({
      type: 'page',
      source: { include: 'en/pages/**', prefix: '' },
      schema: pageSchema,
    })),
    mr_pages: defineCollection(asSeoCollection({
      type: 'page',
      source: { include: 'mr/pages/**', prefix: '' },
      schema: pageSchema,
    })),

    // ✅ CATEGORIES (unchanged)
    en_categories: defineCollection({
      type: 'data',
      source: { include: 'en/categories/**', prefix: '' },
      schema: CategorySchema,
    }),

    mr_categories: defineCollection({
      type: 'data',
      source: { include: 'mr/categories/**', prefix: '' },
      schema: CategorySchema,
    }),
  },
})
