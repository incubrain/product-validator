// shared/config/settings.ts
import type { ValidationStage } from '#shared/types/config';

/**
 * Section Configuration Settings
 * Controls which sections are enabled and when they appear
 */
export const SECTIONS = {
  hero: {
    enabled: true,
    minStage: 'identity' as ValidationStage,
  },
  problemSolution: {
    enabled: true,
    minStage: 'conversion' as ValidationStage,
  },
  process: {
    enabled: true,
    minStage: 'conversion' as ValidationStage,
  },
  founder: {
    enabled: true,
    minStage: 'engagement' as ValidationStage,
  },
  offer: {
    enabled: true,
    minStage: 'traffic' as ValidationStage,
  },
  results: {
    enabled: true,
    minStage: 'demand' as ValidationStage,
  },
  concerns: {
    enabled: true,
    minStage: 'conversion' as ValidationStage,
  },
} as const;

export type SectionKey = keyof typeof SECTIONS;
