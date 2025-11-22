import type { StageConfig } from '#shared/types/config';

export const STAGE_CONFIG = {
  currentStage: 'post-launch',
  offers: {
    primary: 'magnet',
    secondary: 'direct',
  },
  stages: [
    { value: 'coming-soon', label: 'Coming Soon', order: 1 },
    { value: 'launch', label: 'Launch', order: 2 },
    { value: 'post-launch', label: 'Post Launch', order: 3 },
  ],
  disableFakeDoorAt: 'launch',
  visibility: {
    unlock: {
      layout: {
        banner: 'coming-soon',
        navbar: 'launch',
        footer: 'post-launch',
      },
      sections: {
        hero: 'coming-soon',
        problemSolution: 'launch',
        process: 'launch',
        offer: 'launch',
        concerns: 'post-launch',
        founder: 'post-launch',
        results: 'post-launch',
      },
      features: {
        heroCountdown: 'coming-soon',
        heroCTA: 'launch',
        heroMedia: 'launch',
        heroMarquees: 'launch',
        footerFounder: 'post-launch',
        sectionBridge: 'post-launch',
        marqueeProof: 'post-launch',
      },
    },
    lock: {
      features: {
        // Hide countdown form when CTA button appears
        heroCountdown: 'launch',
      },
    },
  },
  conversionTarget: {
    'coming-soon': 'fake_door',
    'launch': 'magnet',
    'post-launch': 'magnet',
  },
} as const satisfies StageConfig;

