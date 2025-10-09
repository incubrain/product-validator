// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import { asSeoCollection } from '@nuxtjs/seo/content';
import { getConfigPath } from './shared/utils/config-resolver';

export default defineContentConfig({
  collections: {
    updates: defineCollection(
      asSeoCollection({
        type: 'page',
        source: getConfigPath({ suffix: 'updates/*.md' }),
        schema: z.object({
          version: z.string(),
          date: z.string(),
          title: z.string(),
          summary: z.string(),
        }),
      }),
    ),
  },
});
