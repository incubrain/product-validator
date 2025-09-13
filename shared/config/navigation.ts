// shared/config/navigation.ts - UPDATED WITH ALL SHOWCASE PAGES
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
      label: 'Changelog',
      to: '/changelog',
      icon: 'i-lucide-file-text',
    },
    {
      label: 'Showcase',
      to: '/showcase',
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
      {
        label: 'Layout Components',
        to: '/showcase/stack',
        description: 'Layout system documentation',
      },
    ],
  },

  // Call-to-action buttons
  ctaButtons: {
    primary: {
      label: 'Hire Me',
      action: 'hire_me',
      icon: 'i-lucide-briefcase',
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

// ✅ NEW: Get all showcase routes for dynamic rendering
export const getShowcaseRoutes = () => {
  const showcaseItem = navigationConfig.mainNavigation.find((item) => item.to === '/showcase')
  if (!showcaseItem?.children) return []

  return showcaseItem.children
    .filter((child) => child.to && child.to !== '/showcase' && child.type !== 'label')
    .map((child) => ({
      path: child.to!,
      title: child.label || '',
      description: child.description || '',
      icon: child.icon || 'i-lucide-component',
      category: 'components', // All are layout components for now
    }))
}

export default navigationConfig
