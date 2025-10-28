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

export const CONVERSION = {
  /**
   * Current validation stage
   * Toggle this to move through validation lifecycle
   */
  primary: 'magnet',
  secondary: 'direct',

  /**
   * Fake door configuration (only applies when stage === 'attention')
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
