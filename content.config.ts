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
        source: resolveConfigPath({ suffix: 'magnet/*.md' }),
        schema: z.object({
          step: z.number().optional(),
          title: z.string(),
          description: z.string().optional(),
          duration: z.string().optional(),
        }),
      }),
    ),
  },
});
