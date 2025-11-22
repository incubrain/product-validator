// config/stages.ts
import type { StageConfig } from '#shared/types/config';

export const STAGE_CONFIG = {
  currentStage: 'launch',
  
  stages: [
    { value: 'pre-launch', label: 'Pre-Launch', order: 1 },
    { value: 'launch', label: 'Launch', order: 2 },
    { value: 'growth', label: 'Growth', order: 3 },
  ],
  
  offers: {
    primary: 'magnet',
    secondary: 'direct',
  },
  
  disableFakeDoorAt: 'launch',
  
  
  
  visibility: {
    unlock: {
      layout: {
        banner: 'pre-launch',
        navbar: 'pre-launch',
        footer: 'pre-launch',
      },
      sections: {
        hero: 'pre-launch',
        problemSolution: 'pre-launch',
        process: 'launch',
        offer: 'launch',
        concerns: 'launch',
        founder: 'growth',
        results: 'growth',
      },
      features: {
        heroCountdown: 'pre-launch',
        heroCTA: 'launch',
        heroMedia: 'launch',
        heroMarquees: 'growth',
        footerFounder: 'growth',
        sectionBridge: 'growth',
        marqueeProof: 'growth',
      },
    },
    lock: {
      features: {
        heroCountdown: 'launch',
      },
    },
  },
} as const satisfies StageConfig;