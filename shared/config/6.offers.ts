import type { Offer } from '#types';

/**
 * {CONFIG}: OFFERS & PRICING
 *
 * Define your monetization structure.
 *
 * SOURCES:
 * - Step 3: Launch Kit package (free magnet) + Direct hire service
 *
 * Key sections:
 * - magnet: Free Launch Kit offer (primary conversion)
 * - direct: Hourly service offer (paid alternative)
 *
 * FEATURE STATUS ICONS:
 * - status-available: Green check (ready to use)
 * - status-beta: Blue flask (beta/testing)
 * - status-coming-soon: Orange clock (planned feature)
 */

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
        title: '⚠️ Available benefit',
        icon: 'status-available',
      },
      {
        title: '⚠️ Beta benefit',
        icon: 'status-beta',
      },
      {
        title: '⚠️ Coming soon benefit',
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
