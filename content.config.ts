// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import { asSeoCollection } from '@nuxtjs/seo/content';
import { getActiveConfigSource } from './shared/utils/config-resolver';
import path from 'node:path';

// Determine the root directory for content based on the active source
// Validator: Uses root 'examples/validator' (which contains a 'content' dir)
// Custom: Uses project root (which contains a 'content' dir)
const activeSource = getActiveConfigSource();
const contentCwd = activeSource === 'validator' 
  ? path.resolve(process.cwd(), 'examples/validator/content') 
  : process.cwd();

export default defineContentConfig({
  collections: {
    updates: defineCollection(
      asSeoCollection({
        type: 'page',
        source: {
          cwd: contentCwd,
          include: 'updates/*.md',
        },
        schema: z.object({
          version: z.string(),
          date: z.string(),
          title: z.string(),
          summary: z.string(),
        }),
      }),
    ),
    forms: defineCollection(
      asSeoCollection({
        type: 'page',
        source: {
          cwd: contentCwd,
          include: 'forms/*.md',
        },
        schema: z.object({
          formId: z.string(),
        }),
      }),
    ),
    magnet: defineCollection(
      asSeoCollection({
        type: 'page',
        source: {
          cwd: contentCwd,
          include: 'magnet/**/*.{md,yml}',
          prefix: '/magnet',
        },
        schema: z.object({
          title: z.string(),
          description: z.string().optional(),
          status: z
            .enum([
              'published',
              'draft',
              'locked',
              'feature_flag',
              'beta',
              'deprecated',
              'deprecated_hidden',
            ])
            .optional()
            .default('draft'),
          disabled: z.boolean(),
          media: z
            .object({
              src: z.string(),
              alt: z.string().optional(),
              type: z.enum(['image', 'video']).optional().default('image'),
            })
            .optional(),
        }),
      }),
    ),
  },
});
