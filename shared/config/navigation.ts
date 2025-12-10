// shared/config/navigation.ts
import type { NavigationMenuItem } from '@nuxt/ui';

export type SectionAnchor =
  | '#benefits'
  | '#outcome'
  | '#offer'
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
  footerLinks: {
    label: string;
    children: {
      label: string;
      to: string;
    }[];
  }[];
}

// Define unique offers (Canonical sources)
export const OFFERS = {
  template: {
    label: 'Get Template Guide',
    to: '/offers/template-guide',
    icon: 'i-lucide-download',
    note: 'No email required',
  },
  mentorship: {
    label: '1-on-1 Mentorship',
    to: '/offers/mentorship',
    icon: 'i-lucide-user-plus',
  },
  github: {
    label: 'One Click Deploy',
    to: 'https://github.com/incubrain/founder-funnel',
    icon: 'i-lucide-rocket',
  },
} as const;

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
  footerLinks: [
    {
      label: 'About',
      children: [
        { label: 'Founder', to: '/founder' },
        { label: 'Updates', to: '/updates' },
      ],
    },
    {
      label: 'Offers',
      children: [
        { label: 'Template Guide', to: '/offers/template-guide' },
        { label: 'Mentorship', to: '/offers/mentorship' },
        { label: 'Join Us', to: '/offers/join-us' },
      ],
    },
  ],
  ctas: {
    hero: OFFERS.template,
    banner: OFFERS.mentorship,
    footer: {
      ...OFFERS.mentorship,
      label: 'Hire Me',
      icon: 'i-lucide-calendar',
    },
    conversion: {
      ...OFFERS.template,
      label: 'Get Instant Access',
      icon: 'i-lucide-play',
      note: 'Start building today',
    },
    secondary: OFFERS.github,
  },
} as const;

export default NAVIGATION;