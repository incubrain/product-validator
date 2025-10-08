/**
 * {CONFIG}: Define your product offers and pricing structure
 *
 * FEATURE STATUS ICONS (via aliases in nuxt.config):
 * - status-available   → Green check (ready to use)
 * - status-beta        → Blue flask (beta/testing)
 * - status-coming-soon → Orange clock (planned feature)
 */

import type { Offer } from '#types';

export const offers = [
  {
    id: 'magnet',
    primary: true,
    variant: 'outline',
    highlight: true,
    title: '⚠️ Lead Magnet Name',
    description: '⚠️ What they get for free',
    badge: {
      label: 'FREE',
      color: 'success',
      variant: 'solid',
      size: 'lg',
    },
    features: [
      {
        title: '⚠️ Benefit included in magnet',
        icon: 'status-beta',
      },
      {
        title: '⚠️ Another benefit',
        icon: 'status-available',
      },
      {
        title: '⚠️ Coming soon feature',
        icon: 'status-coming-soon',
      },
    ],
    cta: {
      label: '⚠️ Button text',
      to: undefined,
      icon: 'i-lucide-rocket',
      modal: 'window',
      captureEmail: true,
      formId: 'your-form-id',
      note: '⚠️ Small text below button',
    },
  },
  {
    id: 'direct',
    variant: 'outline',
    title: '⚠️ Hire Me Directly',
    description: '⚠️ Your hourly service description',
    price: '$50',
    discount: '$100',
    billingCycle: '/hour',
    features: [
      {
        title: '⚠️ Service benefit 1',
        icon: 'status-available',
      },
      {
        title: '⚠️ Service benefit 2',
        icon: 'status-available',
      },
      {
        title: '⚠️ Service benefit 3',
        icon: 'status-coming-soon',
      },
    ],
    stock: {
      limit: 80,
      claimed: 0,
      type: 'hours',
    },
    cta: {
      label: '⚠️ Button text',
      to: 'https://your-booking-link.com',
      icon: 'i-lucide-handshake',
      color: 'secondary',
      note: '⚠️ Small text below button',
    },
  },
] satisfies Offer[];
