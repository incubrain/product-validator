import type { StageConfig } from '#shared/types/config';

export const STAGE_CONFIG = {
  currentStage: 'conversion',
  disableWaitlistAt: 'engagement',
  stages: [
    { value: 'identity', label: 'Identity', order: 1 },
    { value: 'attention', label: 'Attention', order: 2 },
    { value: 'traffic', label: 'Traffic', order: 3 },
    { value: 'conversion', label: 'Conversion', order: 4 },
    { value: 'engagement', label: 'Engagement', order: 5 },
    { value: 'demand', label: 'Demand', order: 6 },
  ],
  visibility: {
    unlock: {
      layout: {
        banner: 'identity',
        navbar: 'conversion',
        footer: 'conversion',
      },
      sections: {
        hero: 'identity',
        benefits: 'traffic',
        outcome: 'traffic',
        product: 'traffic',
        faq: 'conversion',
        results: 'demand',
      },
      features: {
        heroMedia: 'traffic',
        footerFounder: 'engagement',
        sectionBridge: 'demand',
      },
    },
  },
  conversionTarget: {
    identity: 'waitlist',
    attention: 'waitlist',
    traffic: 'waitlist',
    conversion: 'waitlist',
    engagement: 'magnet',
    demand: 'magnet',
  },
} as const satisfies StageConfig;
