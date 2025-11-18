// shared/config/navigation.ts
import type { NavigationMenuItem } from '@nuxt/ui';
import type { ValidationStage } from '#shared/types/config';

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
 * Form type options for validation stages
 */
export type FormType = 'fake_door' | 'magnet';

export const CONVERSION = {
  /**
   * Primary and secondary offer IDs
   */
  primary: 'magnet',
  secondary: 'direct',

  /**
   * Form behavior by validation stage
   * Controls which form shows for primary offer at each stage
   */
  conversionTarget: {
    identity: 'fake_door',
    attention: 'fake_door',
    traffic: 'fake_door',
    conversion: 'fake_door',
    engagement: 'magnet',
    demand: 'magnet',
  } as const satisfies Record<ValidationStage, FormType>,

  /**
   * Fake door configuration
   * Used when conversionTarget returns 'fake_door'
   */
  fakeDoor: {
    message:
      "Thanks for your interest! We're finalizing this and will email you when it's ready.",
    collectFeedback: true,
    feedbackPrompt: 'What would make this most valuable for you?',
  },

  /**
   * Layout configuration
   */
  banner: {
    sticky: true,
  },

  navbar: {
    sticky: false,
  },
} as const;

export default NAVIGATION;
