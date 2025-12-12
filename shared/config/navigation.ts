// shared/config/navigation.ts
import type { NavigationMenuItem } from '@nuxt/ui';

export type SectionAnchor =
  | '#benefits'
  | '#outcome'
  | '#offer'
  | '#results'
  | '#faq';

export interface NavigationConfig {
  layout: {
    banner: { sticky: boolean; offer: string };
    navbar: { sticky: boolean };
    footer: { offer: string };
  };
  main: NavigationMenuItem[];
  footerLinks: {
    label: string;
    children: {
      label: string;
      to: string;
    }[];
  }[];
}

export const NAVIGATION: NavigationConfig = {
  layout: {
    banner: { sticky: true, offer: 'mentorship' },
    navbar: { sticky: false },
    footer: { offer: 'join-us' },
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
} as const;

export default NAVIGATION;