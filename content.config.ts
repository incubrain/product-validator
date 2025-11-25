// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import { asSeoCollection } from '@nuxtjs/seo/content';
import { asOgImageCollection } from 'nuxt-og-image/content';
import { getActiveConfigSource } from './shared/utils/config-resolver';
import path from 'node:path';

// Determine the root directory for content based on the active source
// Custom: Uses project root (which contains a 'content' dir)
const activeSource = getActiveConfigSource();
const contentCwd = activeSource === 'root' 
  ? path.resolve(process.cwd(), 'content') 
  : path.resolve(process.cwd(), `examples/${activeSource}/content`);

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: {
        cwd: contentCwd,
        include: 'pages/*.md',
        prefix: '/'
      },
    }),

    config: defineCollection({
      type: 'data',
      source: {
        cwd: contentCwd,
        include: 'config/*.yml',
      },
      schema: z.object({
        business: z.object({
          name: z.string(),
          legal_name: z.string(),
          founding_year: z.number(),
          location: z.string(),
          logo: z.string(),
        }).optional(),
        social: z.object({
          availability: z.string(),
          response_time: z.string(),
          links: z.array(z.object({
            platform: z.string(),
            label: z.string(),
            url: z.string(),
          })),
        }).optional(),
      }),
    }),

    team: defineCollection({
      type: 'data',
      source: {
        cwd: contentCwd,
        include: 'team/*.yml',
      },
      schema: z.object({
        id: z.string(),
        profile: z.object({
          given_name: z.string(),
          surname: z.string(),
          name: z.string(),
          email: z.string().optional(),
          role: z.string(),
          avatar: z.object({
            src: z.string(),
            alt: z.string(),
          }).optional(),
          portrait: z.object({
            src: z.string(),
            alt: z.string(),
          }).optional(),
        }),
        story: z.object({
          mission: z.string(),
          background: z.array(z.string()),
          challenge: z.string(),
        }),
      }),
    }),

    offers: defineCollection(
      asSeoCollection({
        type: 'data',
        source: {
          cwd: contentCwd,
          include: 'offers/*.yml',
        },
        schema: z.object({
          slug: z.string(),
          primary: z.boolean().optional(),
          title: z.string(),
          description: z.string(),
          price: z.string(),
          discount: z.string().nullable().optional(),
          billingCycle: z.string(),
          terms: z.string(),
          tagline: z.string().nullable().optional(),
          badge: z.object({
            label: z.string(),
            color: z.enum(['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral']),
            variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']),
            size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']),
          }).optional(),
          features: z.array(z.object({
            title: z.string(),
            icon: z.string(),
          })),
          variant: z.string(),
          highlight: z.boolean(),
          type: z.enum(['ebook', 'course', 'mentorship']).default('ebook'),
          stock: z.object({
            limit: z.number(),
            claimed: z.number(),
            type: z.string(),
          }).optional(),
          cta: z.object({
            label: z.string(),
            to: z.string().optional(),
            icon: z.string(),
            modal: z.string().optional(),
            color: z.string().optional(),
            note: z.string().nullable().optional(),
          }),
          secondaryCta: z.object({
            label: z.string(),
            to: z.string().optional(),
            icon: z.string(),
            modal: z.string().optional(),
            color: z.string().optional(),
            note: z.string().nullable().optional(),
          }).optional(),
          media: z.object({
            type: z.enum(['image', 'video']),
            src: z.string(),
            alt: z.string(),
          }).optional(),
        }),
      }),
    ),

    faq: defineCollection({
      type: 'data',
      source: {
        cwd: contentCwd,
        include: 'faq/*.yml',
      },
      schema: z.object({
        type: z.enum(['warning', 'objection', 'support', 'general']),
        label: z.string(),
        icon: z.string(),
        color: z.enum(['error', 'warning', 'success', 'info']),
        items: z.array(z.object({
          q: z.string(),
          a: z.string(),
        })),
      }),
    }),

    // Consolidated features collection (benefits + process cards)
    features: defineCollection({
      type: 'data',
      source: {
        cwd: contentCwd,
        include: 'features/*.yml',
      },
      schema: z.object({
        items: z.array(z.object({
          id: z.string(),
          title: z.string(),
          icon: z.string(),
          description: z.string(),
          // Optional fields for benefits
          result: z.string().optional(),
        })),
      }),
    }),

    // Renamed from testimonials to results
    results: defineCollection({
      type: 'data',
      source: {
        cwd: contentCwd,
        include: 'results/*.yml',
      },
      schema: z.object({
        // For testimonials.yml
        items: z.array(z.object({
          type: z.string().optional(),
          name: z.string().optional(),
          role: z.string().optional(),
          quote: z.string().optional(),
          link: z.string().optional(),
          highlight: z.boolean().optional(),
          avatarUrl: z.string().optional(),
        })).optional(),
        // For customers.yml (proof track)
        label: z.string().optional(),
        badgeColor: z.string().optional(),
      }),
    }),

    // ============================================================================
    // OTHER CONTENT COLLECTIONS
    // ============================================================================

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
