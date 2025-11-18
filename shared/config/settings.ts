// shared/config/settings.ts
import type { ValidationStage } from '#shared/types/config';

/**
 * VISIBILITY UNLOCK STAGES
 *
 * Define WHEN each element unlocks (appears).
 * Everything is cumulative - once unlocked, stays visible.
 *
 * Think: "At what stage does this first appear?"
 */
export const VISIBILITY_UNLOCK_STAGES = {
  /**
   * Layout Components
   * Controls header, footer, banner visibility
   */
  layout: {
    banner: 'identity' as ValidationStage, // Always visible from start
    navbar: 'conversion' as ValidationStage, // Navigation appears at conversion
    footer: 'conversion' as ValidationStage, // Footer appears at conversion
  },

  /**
   * Page Sections
   * Controls which sections appear on landing page
   */
  sections: {
    hero: 'identity' as ValidationStage, // Always visible
    problemSolution: 'traffic' as ValidationStage, // Unlocks at traffic
    process: 'traffic' as ValidationStage, // Unlocks at traffic
    offer: 'traffic' as ValidationStage, // Unlocks at traffic
    concerns: 'conversion' as ValidationStage, // Unlocks at conversion
    founder: 'engagement' as ValidationStage, // Unlocks at engagement
    results: 'demand' as ValidationStage, // Unlocks at demand
  },

  /**
   * Features Within Components
   * Controls specific features/content within components
   */
  features: {
    // Hero features
    heroCountdown: 'identity' as ValidationStage, // Countdown timer in hero
    heroCTA: 'traffic' as ValidationStage, // CTA button in hero
    heroMedia: 'traffic' as ValidationStage, // Video/image in hero
    heroMarquees: 'traffic' as ValidationStage, // Proof marquees in hero

    // Footer features
    footerFounder: 'engagement' as ValidationStage, // Founder card in footer

    // Section features
    sectionBridge: 'demand' as ValidationStage, // Bridge CTAs in sections
    marqueeProof: 'conversion' as ValidationStage, // Proof items in marquees
  },
} as const;

/**
 * VISIBILITY_LOCK_STAGES (Optional)
 *
 * Define WHEN elements should hide/lock.
 * Use sparingly - most elements stay visible once unlocked.
 *
 * Think: "At what stage does this disappear?"
 */
export const VISIBILITY_LOCK_STAGES = {
  features: {
    heroCountdown: 'traffic' as ValidationStage, // Countdown hides at traffic stage
  },
} as const;

/**
 * Stage progression order for comparisons
 */
export const STAGE_ORDER: Record<ValidationStage, number> = {
  identity: 1,
  attention: 2,
  traffic: 3,
  conversion: 4,
  engagement: 5,
  demand: 6,
};

// Type exports
export type LayoutKey = keyof typeof VISIBILITY_UNLOCK_STAGES.layout;
export type SectionKey = keyof typeof VISIBILITY_UNLOCK_STAGES.sections;
export type FeatureKey = keyof typeof VISIBILITY_UNLOCK_STAGES.features;
