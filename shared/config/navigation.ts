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
          label: 'Container',
          to: '/showcase/container',
          description: 'Responsive content containers with width control',
          icon: 'i-lucide-square',
        },
        {
          label: 'Stack',
          to: '/showcase/stack',
          description: 'Vertical and horizontal stacking layouts',
          icon: 'i-lucide-layers',
        },
        {
          label: 'Split',
          to: '/showcase/split',
          description: 'Two-column layouts with ratio control',
          icon: 'i-lucide-columns',
        },
        {
          label: 'Grid',
          to: '/showcase/grid',
          description: 'CSS Grid with auto-fit and responsive patterns',
          icon: 'i-lucide-grid-3x3',
        },
        {
          label: 'Cluster',
          to: '/showcase/cluster',
          description: 'Flexible grouping for navigation and tags',
          icon: 'i-lucide-group',
        },
        {
          label: 'Columns',
          to: '/showcase/columns',
          description: 'CSS Columns for masonry and magazine layouts',
          icon: 'i-lucide-columns-3',
        },
        {
          label: 'Frame',
          to: '/showcase/frame',
          description: 'Aspect ratio containers for media content',
          icon: 'i-lucide-frame',
        },
        {
          label: 'Float',
          to: '/showcase/float',
          description: 'CSS float utilities for text wrapping',
          icon: 'i-lucide-move',
        },
        {
          label: 'Position',
          to: '/showcase/position',
          description: 'CSS position utilities for element positioning',
          icon: 'i-lucide-move',
        },
        {
          label: 'ScrollBox',
          to: '/showcase/scroll-box',
          description: 'Scroll containers with overflow control',
          icon: 'i-lucide-scroll',
        },
        {
          label: 'Transform',
          to: '/showcase/transform',
          description: 'Transform effects and animations',
          icon: 'i-lucide-rotate-3d',
        },
        {
          label: 'Divider',
          to: '/showcase/divider',
          description: 'Content separators and visual breaks',
          icon: 'i-lucide-minus',
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
      label: 'Nuxt Community',
      action: 'join_community',
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
