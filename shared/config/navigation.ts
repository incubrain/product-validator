// shared/config/navigation.ts - UPDATED WITH ALL SHOWCASE PAGES
import type { NavigationMenuItem } from '@nuxt/ui';

export interface SocialLink {
  label: string;
  icon: string;
  to: string;
  target?: string;
}

export interface QuickLink {
  label: string;
  to: string;
  description?: string;
  icon?: string;
}

export interface NavigationConfig {
  mainNavigation: NavigationMenuItem[];
  socialLinks: SocialLink[];
}

export const navigationConfig: NavigationConfig = {
  // Main header navigation
  mainNavigation: [
    {
      label: 'Showcase',
      to: '/showcase',
      icon: 'i-lucide-file-text',
    },
    {
      label: 'Changelog',
      to: '/changelog',
      icon: 'i-lucide-file-text',
    },
  ],

  // Social media links
  socialLinks: [
    {
      label: 'LinkedIn',
      icon: 'i-lucide-linkedin',
      to: 'https://linkedin.com/company/incubrain',
      target: '_blank',
    },
    {
      label: 'GitHub',
      icon: 'i-lucide-github',
      to: 'https://github.com/incubrain',
      target: '_blank',
    },
    {
      label: 'Twitter',
      icon: 'i-lucide-twitter',
      to: 'https://twitter.com/incubrain',
      target: '_blank',
    },
  ],
} as const;

// Helper functions for navigation
export const getMainNavigation = () => navigationConfig.mainNavigation;
export const getSocialLinks = () => navigationConfig.socialLinks;

export default navigationConfig;
