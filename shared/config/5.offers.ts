import type { Offer } from '#types';

/**
 * {CONFIG}: MONETIZATION OFFERS
 *
 * Define your monetization structure.
 *
 * VALIDATION PHASE: Only 2 offers needed
 * - magnet: Free lead magnet (primary conversion)
 * - direct: Paid hourly service (revenue bridge)
 *
 * SOURCES:
 * - Step 3: Your offer packaging and positioning
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
    price: 'Free',
    discount: undefined,
    billingCycle: 'Limited availability',
    title: '⚠️ Lead Magnet',
    description: '⚠️ What they get for free',
    badge: {
      label: '100 Spots',
      color: 'success',
      variant: 'solid',
      size: 'lg',
    },
    terms: '⚠️ Terms of service or billing',
    tagline: '⚠️ Short compelling tagline',
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
      note: '⚠️ Small text below button',
    },
  },
  {
    id: 'direct',
    variant: 'outline',
    title: '⚠️ Hire Me Directly',
    description: '⚠️ Your hourly service description',
    price: '$100',
    discount: '$50',
    billingCycle: '/hour',
    badge: '⚠️ Badge text',
    terms: '⚠️ Terms of service or billing',
    tagline: '⚠️ Short compelling tagline',
    highlight: false,
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
    cta: {
      label: '⚠️ Button text',
      to: 'https://your-booking-link.com',
      icon: 'i-lucide-handshake',
      color: 'secondary',
      note: '⚠️ Small text below button',
    },
  },
] satisfies Offer[];