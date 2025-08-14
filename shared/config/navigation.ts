// shared/config/navigation.ts
import type { NavigationMenuItem } from '@nuxt/ui'

export interface SocialLink {
  label: string
  icon: string
  to: string
  target?: string
}

export interface QuickLink {
  label: string
  to: string
  description?: string
  icon?: string
}

export interface NavigationConfig {
  mainNavigation: NavigationMenuItem[]
  socialLinks: SocialLink[]
  quickLinks: QuickLink[]
  footerLinks: {
    company: QuickLink[]
    resources: QuickLink[]
  }
  ctaButtons: {
    primary: {
      label: string
      action: string
      icon?: string
    }
    secondary: {
      label: string
      action: string
      icon?: string
    }
  }
}

export const navigationConfig: NavigationConfig = {
  // Main header navigation
  mainNavigation: [
    {
      label: 'Home',
      to: '/',
      icon: 'i-lucide-home',
    },
    {
      label: 'Showcase',
      icon: 'i-lucide-layout-template',
      to: '/showcase',
      children: [
        {
          label: 'Overview',
          to: '/showcase',
          description: 'Template system overview',
          icon: 'i-lucide-eye',
        },
        {
          label: 'Layout Components',
          to: '/showcase/center',
          description: 'Layout system demos',
          icon: 'i-lucide-layout',
        },
        {
          label: 'Grid System',
          to: '/showcase/grid',
          description: 'Grid layout examples',
          icon: 'i-lucide-grid-3x3',
        },
        {
          label: 'Split Layouts',
          to: '/showcase/split',
          description: 'Split section demos',
          icon: 'i-lucide-columns',
        },
        {
          label: 'Stack Layouts',
          to: '/showcase/stack',
          description: 'Vertical stacking demos',
          icon: 'i-lucide-layers',
        },
      ],
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
    {
      label: 'Discord',
      icon: 'i-lucide-message-circle',
      to: 'https://discord.gg/zSGHvNZXAa',
      target: '_blank',
    },
  ],

  // Quick links for footer
  quickLinks: [
    {
      label: 'Showcase',
      to: '/showcase',
      description: 'Component examples and demos',
      icon: 'i-lucide-layout-template',
    },
  ],

  // Organized footer links
  footerLinks: {
    company: [
      {
        label: 'About',
        to: '/about',
        description: 'Learn about our company',
      },
    ],
    resources: [
      {
        label: 'Showcase',
        to: '/showcase',
        description: 'Component examples',
      },
    ],
  },

  // Call-to-action buttons
  ctaButtons: {
    primary: {
      label: 'Free Consultation',
      action: 'whatsapp_consultation',
      icon: 'i-lucide-message-circle',
    },
    secondary: {
      label: 'Download Template',
      action: 'template_download',
      icon: 'i-lucide-download',
    },
  },
} as const

// Helper functions for navigation
export const getMainNavigation = () => navigationConfig.mainNavigation
export const getSocialLinks = () => navigationConfig.socialLinks
export const getQuickLinks = () => navigationConfig.quickLinks
export const getFooterLinks = () => navigationConfig.footerLinks
export const getCTAButtons = () => navigationConfig.ctaButtons

// Helper to get navigation items by section
export const getNavigationBySection = (section: keyof typeof navigationConfig) => {
  return navigationConfig[section]
}

// Helper to find navigation item by path
export const findNavigationItem = (path: string): NavigationMenuItem | undefined => {
  const findInItems = (items: NavigationMenuItem[]): NavigationMenuItem | undefined => {
    for (const item of items) {
      if (item.to === path) return item
      if (item.children) {
        const found = findInItems(item.children)
        if (found) return found
      }
    }
    return undefined
  }

  return findInItems(navigationConfig.mainNavigation)
}

// Helper to get breadcrumb trail for a path
export const getBreadcrumbTrail = (path: string): NavigationMenuItem[] => {
  const trail: NavigationMenuItem[] = []

  const findTrail = (items: NavigationMenuItem[], currentTrail: NavigationMenuItem[] = []): boolean => {
    for (const item of items) {
      const newTrail = [...currentTrail, item]

      if (item.to === path) {
        trail.push(...newTrail)
        return true
      }

      if (item.children && findTrail(item.children, newTrail)) {
        return true
      }
    }
    return false
  }

  findTrail(navigationConfig.mainNavigation)
  return trail
}

export default navigationConfig
