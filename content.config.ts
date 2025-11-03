// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import { asSeoCollection } from '@nuxtjs/seo/content';
import { resolveConfigPath } from './shared/utils/config-resolver';

export default defineContentConfig({
  collections: {
    updates: defineCollection(
      asSeoCollection({
        type: 'page',
        source: resolveConfigPath({ suffix: 'updates/*.md' }),
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
        source: resolveConfigPath({ suffix: 'forms/*.md' }),
        schema: z.object({
          formId: z.string(),
        }),
      }),
    ),
    magnet: defineCollection(
      asSeoCollection({
        type: 'page',
        source: {
          include: resolveConfigPath({ suffix: 'magnet/**/*.{md,yml}' }),
          prefix: '/magnet',
        },
        schema: z.object({
          stage: z.enum([
            'attention',
            'conversion',
            'engagement',
            'demand',
            'build_prep',
          ]),
          step: z.number().min(1).max(3),
          title: z.string(),
          description: z.string().optional(),
          duration: z.string().optional(),
          media: z
            .object({
              src: z.string(),
              alt: z.string().optional(),
              type: z.enum(['image', 'video']).optional().default('image'),
            })
            .optional(),
          metrics: z
            .array(
              z.object({
                name: z.string(),
                level: z.enum(['weak', 'average', 'strong']),
                range: z.string(),
                meaning: z.string(),
              }),
            )
            .optional(),
        }),
      }),
    ),
  },
});
