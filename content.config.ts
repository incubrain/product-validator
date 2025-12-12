// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import { asSeoCollection } from '@nuxtjs/seo/content';
import { getActiveConfigSource } from './shared/utils/config-resolver';
import path from 'node:path';

const FAQ_COLORS = z.enum(['error', 'warning', 'success', 'info']);


// Determine the root directory for content based on the active source
// Custom: Uses project root (which contains a 'content' dir)
const appConfig = getActiveConfigSource();

export default defineContentConfig({
  collections: {
    pages: defineCollection(asSeoCollection({
      type: 'page',
      source: {
        cwd: appConfig.contentDir,
        include: 'pages/**/*.md',
        prefix: '/'
      },
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        image: z.string().optional(),
        // Optional fields for updates
        version: z.string().optional(),
        date: z.string().optional(),

      }),
    })),

    config: defineCollection({
      type: 'data',
      source: {
        cwd: appConfig.contentDir,
        include: 'config/*.yml',
      },
      schema: z.object({
        business: z.object({
          name: z.string(),
          legal_name: z.string(),
          founding_year: z.number(),
          logo: z.string(),
          mission: z.string(),
        }),
        founder: z.object({
          given_name: z.string(),
          surname: z.string(),
          email: z.string().email(),
          role: z.string(),
          avatar: z.object({
            src: z.string(),
            alt: z.string(),
          }),
          bio: z.string(),
          links: z.array(z.object({
            label: z.string(),
            url: z.string(),
            icon: z.string(),
          })).optional(),
        }),
      }),
    }),

    faq: defineCollection({
      type: 'data',
      source: {
        cwd: appConfig.contentDir,
        include: 'faq/*.yml',
      },
      schema: z.object({
        type: z.enum(['warning', 'objection', 'support', 'general', 'values']),
        label: z.string(),
        icon: z.string(),
        color: FAQ_COLORS,
        items: z.array(z.object({
          label: z.string(),
          content: z.string(),
        })),
      }),
    }),
  },
});
