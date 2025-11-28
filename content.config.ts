// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import { asSeoCollection } from '@nuxtjs/seo/content';
import { getActiveConfigSource } from './shared/utils/config-resolver';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Shared schema constants for consistency across collections

const WAITLIST_BADGE_VARIANTS = z.enum(['solid', 'outline', 'subtle', 'soft']);
const FAQ_COLORS = z.enum(['error', 'warning', 'success', 'info']);

const BADGE_SCHEMA = z.object({
  label: z.string(),
  color: z.enum(['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral']),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft']),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']),
});

const CTA_SCHEMA = z.object({
  strategy: z.enum(['modal', 'link', 'external']).optional(),
  label: z.string(),
  to: z.string().optional(),
  icon: z.string(),
  modal: z.string().optional(),
  color: z.string().optional(),
  variant: z.string().optional(),
  note: z.string().nullable().optional(),
});

const CTA_NAME = z.enum(['conversion', 'funnel', 'secondary']);


// Determine the root directory for content based on the active source
// Custom: Uses project root (which contains a 'content' dir)
const activeSource = getActiveConfigSource();
const contentCwd = activeSource === 'root' 
  ? path.resolve(process.cwd(), 'content') 
  : path.resolve(process.cwd(), `examples/${activeSource}/content`);

// Core collections
const collections: Record<string, any> = {
  pages: defineCollection({
    type: 'page',
    source: {
      cwd: contentCwd,
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
        badge: BADGE_SCHEMA.optional(),
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
        ctas: z.record(CTA_NAME, CTA_SCHEMA),

        media: z.object({
          type: z.enum(['image', 'video']),
          src: z.string(),
          alt: z.string(),
        }).optional(),

        waitlist: z.object({
          coming_soon: z.object({
            badge: BADGE_SCHEMA,
            description: z.string(),
            success: z.object({
              title: z.string(),
              message: z.string(),
            }),
          }),
          unavailable: z.object({
            badge: BADGE_SCHEMA,
            description: z.string(),
            success: z.object({
              title: z.string(),
              message: z.string(),
            }),
          }),
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
      color: FAQ_COLORS,
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
    }),
  }),
};

// Conditionally add gated content if layer exists
const layerPath = resolve(process.cwd(), 'layers/gated-content');
if (existsSync(layerPath)) {
  try {
    // Dynamic import of the schema
    // Note: We use a relative path from this config file
    const { GATED_CONTENT_SCHEMA } = await import('./layers/gated-content/content.schema');
    
    // Override source to use project's content directory
    collections.gated = defineCollection(
      asSeoCollection({
        type: 'page',
        source: {
          cwd: contentCwd,
          include: 'gated/**/*.{md,yml}',
          prefix: '/gated', // Matches the route prefix we set
        },
        schema: GATED_CONTENT_SCHEMA
      })
    );
    console.log('[Content Config] Gated content layer detected and registered.');
  } catch (e) {
    console.warn('[Content Config] Gated content layer found but schema failed to load:', e);
  }
}

export default defineContentConfig({
  collections,
});

