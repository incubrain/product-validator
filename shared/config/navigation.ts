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
  stage: 'validation',
  primary: 'magnet',
  secondary: 'direct',
  banner: {
    sticky: true,
  },
  navbar: {
    sticky: false,
  },
} as const;

export default NAVIGATION;
