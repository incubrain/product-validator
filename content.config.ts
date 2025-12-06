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
    pages: defineCollection({
      type: 'page',
      source: {
        cwd: appConfig.contentDir,
        include: 'pages/**/*.md',
        prefix: '/'
      },
      schema: z.object({
        // Optional fields for updates
        version: z.string().optional(),
        date: z.string().optional(),
        summary: z.string().optional(),
        // Optional fields for index page values
        values: z.array(z.object({
          title: z.string(),
          description: z.string(),
        })).optional(),
      }),
    }),

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
          location: z.string(),
          logo: z.string(),
          mission: z.string(),
        }).optional(),
        socials: z.array(z.object({
          platform: z.string(),
          label: z.string(),
          url: z.string(),
        })).optional(),
      }),
    }),

    team: defineCollection({
      type: 'data',
      source: {
        cwd: appConfig.contentDir,
        include: 'team/*.yml',
      },
      schema: z.object({
        slug: z.string(),
        given_name: z.string(),
        surname: z.string(),
        email: z.string().optional(),
        role: z.string(),
        avatar: z.object({
          src: z.string(),
          alt: z.string(),
        }).optional(),
        bio: z.string(),
      }),
    }),

    faq: defineCollection({
      type: 'data',
      source: {
        cwd: appConfig.contentDir,
        include: 'faq/*.yml',
      },
      schema: z.object({
        type: z.enum(['warning', 'objection', 'support', 'general']),
        label: z.string(),
        icon: z.string(),
        color: FAQ_COLORS,
        items: z.array(z.object({
          q: z.string(),
          a: z.string(),
        })),
      }),
    }),
  },
});
