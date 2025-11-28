import { z, defineCollection } from '@nuxt/content'

export const GATED_CONTENT_SCHEMA = z.object({
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(['published', 'draft', 'locked', 'beta', 'deprecated', 'feature_flag', 'deprecated_hidden']).default('published'),
  disabled: z.boolean().default(false),
  media: z.object({
    src: z.string(),
    alt: z.string().optional(),
    type: z.enum(['image', 'video']).default('image')
  }).optional()
})
