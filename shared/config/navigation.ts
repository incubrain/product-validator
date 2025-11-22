// shared/config/navigation.ts
import type { NavigationMenuItem } from '@nuxt/ui';

export interface NavigationConfig {
  layout: {
    banner: { sticky: boolean };
    navbar: { sticky: boolean };
  };
  main: NavigationMenuItem[];
}

export const NAVIGATION: NavigationConfig = {
  layout: {
    banner: { sticky: true },
    navbar: { sticky: false },
  },
  main: [
    {
      label: 'Updates',
      to: '/updates',
      icon: 'i-lucide-file-text',
    },
  ],
} as const;

export default NAVIGATION;