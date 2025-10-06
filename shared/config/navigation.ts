// shared/config/navigation.ts
import type { NavigationMenuItem } from '@nuxt/ui';

export interface NavigationConfig {
  mainNavigation: NavigationMenuItem[];
}

export const navigationConfig: NavigationConfig = {
  mainNavigation: [
    {
      label: 'Updates',
      to: '/updates',
      icon: 'i-lucide-file-text',
    },
  ],
} as const;

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

export const getStickyOffset = (withOffset = true) => {
  const banner =
    LAYOUT_CONFIG.banner.enabled && LAYOUT_CONFIG.banner.sticky
      ? `${LAYOUT_CONFIG.banner.height}+`
      : '';

  const navbar =
    LAYOUT_CONFIG.navbar.enabled && LAYOUT_CONFIG.navbar.sticky
      ? `${LAYOUT_CONFIG.navbar.height}+`
      : '';

  if (!withOffset) {
    return `calc(${banner}${navbar})`;
  }

  return `calc(${banner}${navbar}${LAYOUT_CONFIG.anchor.offset})`;
};

export const getMainNavigation = () => navigationConfig.mainNavigation;

export default navigationConfig;
