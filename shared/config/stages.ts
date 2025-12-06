// config/stages.ts
import type { StageConfig } from '#shared/types/config';

export const STAGE_CONFIG = {
  currentStage: 'launch',

  stages: [
    { value: 'waitlist', label: 'Waitlist', order: 1 },
    { value: 'launch', label: 'Launch', order: 2 },
    { value: 'growth', label: 'Growth', order: 3 },
  ],

  products: {
    primary: 'magnet',
    secondary: 'direct',
  },

  disableWaitlistAt: 'launch',

  conversionTarget: {
    waitlist: 'waitlist',
    launch: 'magnet',
    growth: 'magnet',
  },

  visibility: {
    unlock: {
      layout: {
        banner: 'waitlist',
        navbar: 'waitlist',
        footer: 'waitlist',
      },
      sections: {
        hero: 'waitlist',
        benefits: 'waitlist',
        outcome: 'launch',
        product: 'launch',
        faq: 'launch',
        results: 'growth',
      },
      features: {
        heroMedia: 'launch',
        footerFounder: 'growth',
        sectionBridge: 'growth',
      },
    },
  },
} as const satisfies StageConfig;
