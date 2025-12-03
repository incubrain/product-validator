import type { StageConfig } from '#shared/types/config';

export const STAGE_CONFIG = {
  currentStage: 'post-launch',
  products: {
    primary: 'magnet',
    secondary: 'direct',
  },
  stages: [
    { value: 'coming-soon', label: 'Coming Soon', order: 1 },
    { value: 'launch', label: 'Launch', order: 2 },
    { value: 'post-launch', label: 'Post Launch', order: 3 },
  ],
  disableWaitlistAt: 'launch',
  visibility: {
    unlock: {
      layout: {
        banner: 'coming-soon',
        navbar: 'launch',
        footer: 'post-launch',
      },
      sections: {
        hero: 'coming-soon',
        benefits: 'launch',
        process: 'launch',
        product: 'launch',
        faq: 'post-launch',
        results: 'post-launch',
      },
      features: {
        heroMedia: 'launch',
        footerFounder: 'post-launch',
        sectionBridge: 'post-launch',
      },
    },
  },
  conversionTarget: {
    'coming-soon': 'waitlist',
    'launch': 'magnet',
    'post-launch': 'magnet',
  },
} as const satisfies StageConfig;
