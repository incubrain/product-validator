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
    sticky: true,
  },
};

// Layout configuration for sticky offset calculation
export const LAYOUT_CONFIG = {
  banner: {
    enabled: true,
    sticky: true,
    height: 'var(--ui-banner-height)',
  },
  navbar: {
    enabled: true,
    sticky: false,
    height: 'var(--ui-header-height)',
  },
  anchor: {
    offset: '--spacing(12)',
  },
} as const;

export default NAVIGATION;
