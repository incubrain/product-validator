// shared/config/navigation.ts - UPDATED WITH ALL SHOWCASE PAGES
import type { NavigationMenuItem } from '@nuxt/ui';

export interface QuickLink {
  label: string;
  to: string;
  description?: string;
  icon?: string;
}

export interface NavigationConfig {
  mainNavigation: NavigationMenuItem[];
}

export const navigationConfig: NavigationConfig = {
  // Main header navigation
  mainNavigation: [
    {
      label: 'Changelog',
      to: '/changelog',
      icon: 'i-lucide-file-text',
    },
  ],

  // Add footer links when needed
} as const;

// Helper functions for navigation
export const getMainNavigation = () => navigationConfig.mainNavigation;

export default navigationConfig;
