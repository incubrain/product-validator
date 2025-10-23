// shared/config/navigation.ts
import type { NavigationMenuItem } from '@nuxt/ui';

export interface NavigationConfig {
  main: NavigationMenuItem[];
}

export const NAVIGATION: NavigationConfig = {
  main: [
    {
      label: 'Updates',
      to: '/updates',
      icon: 'i-lucide-file-text',
    },
  ],
} as const;

/**
 * Validation lifecycle stages:
 * - fake_door: Capture interest only (no delivery)
 * - magnet: Deliver lead magnet via email
 * - payment_intent: Are customers ready to pay?
 */
export type ValidationStage = 'fake_door' | 'magnet' | 'payment_intent';

export const CONVERSION = {
  /**
   * Current validation stage
   * Toggle this to move through validation lifecycle
   */
  stage: 'fake_door' as ValidationStage,

  primary: 'magnet',
  secondary: 'direct',

  /**
   * Fake door configuration (only applies when stage === 'fake_door')
   */
  fakeDoor: {
    message:
      "Thanks for your interest! We're finalizing this and will email you when it's ready.",
    collectFeedback: true,
    feedbackPrompt: 'What would make this most valuable for you?',
  },

  banner: {
    sticky: true,
  },
  
  navbar: {
    sticky: false,
  },
} as const;

export default NAVIGATION;
