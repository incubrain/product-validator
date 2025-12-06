// shared/config/navigation.ts
import type { NavigationMenuItem } from '@nuxt/ui';

export type SectionAnchor =
  | '#benefits'
  | '#outcome'
  | '#product'
  | '#results'
  | '#faq';

export interface CtaConfig {
  label: string;
  to: string;
  icon: string;
  note?: string;
}

export interface NavigationConfig {
  layout: {
    banner: { sticky: boolean };
    navbar: { sticky: boolean };
  };
  main: NavigationMenuItem[];
  ctas: {
    hero: CtaConfig;
    banner: CtaConfig;
    footer: CtaConfig;
    conversion: CtaConfig;
    secondary?: CtaConfig;
  };
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
  ctas: {
    hero: {
      label: 'Get Template Guide',
      to: '/products/template-guide',
      icon: 'i-lucide-download',
      note: 'No email required'
    },
    banner: {
      label: '1-on-1 Mentorship',
      to: '/products/mentorship',
      icon: 'i-lucide-user-plus'
    },
    footer: {
      label: 'Hire Me',
      to: '/products/mentorship',
      icon: 'i-lucide-calendar'
    },
    conversion: {
      label: 'Get Instant Access',
      to: '/products/template-guide',
      icon: 'i-lucide-play',
      note: 'Start building today'
    },
    secondary: {
      label: 'One Click Deploy',
      to: 'https://github.com/incubrain/founder-funnel',
      icon: 'i-lucide-rocket'
    }
  }
} as const;

export default NAVIGATION;