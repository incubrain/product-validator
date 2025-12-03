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
        process: 'launch',
        product: 'launch',
        concerns: 'launch',
        founder: 'growth',
        results: 'growth',
      },
      features: {
        heroMedia: 'launch',
        heroMarquees: 'growth',
        footerFounder: 'growth',
        sectionBridge: 'growth',
        marqueeProof: 'growth',
      },
    },
  },
} as const satisfies StageConfig;
