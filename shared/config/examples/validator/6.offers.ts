import type { Offer } from '#types';

export const offers = [
  {
    id: 'magnet',
    primary: true,

    title: 'Launch Kit',
    description: 'AI Guided: Deploy → Discover → Package → Ship. (8-12 hours)',

    // NEW: Add tagline for clarity
    tagline:
      '🎯 Perfect for: Technical founders who can execute with structured guidance',

    badge: {
      label: 'FREE',
      color: 'success',
      variant: 'solid',
      size: 'lg',
    },
    features: [
      {
        title: 'Step 1: Deploy in <10 minutes - break the cycle',
        icon: 'status-available',
      },
      {
        title: 'Step 2: Discover your value',
        icon: 'status-available',
      },
      {
        title: 'Step 3: Positioning + offer packaging',
        icon: 'status-available',
      },
      {
        title: 'Step 4: Content generation + ship',
        icon: 'status-available',
      },
      {
        title: '30-min recorded YouTube feedback call',
        icon: 'status-available',
      },
      {
        title: 'Private strategic guidance (10-15 min)',
        icon: 'status-available',
      },
      {
        title: 'Support community access throughout',
        icon: 'status-available',
      },
    ],

    variant: 'outline',
    highlight: true,

    stock: {
      limit: 100,
      claimed: 7,
    },

    cta: {
      label: 'Start Free Launch Kit',
      to: undefined,
      icon: 'i-lucide-rocket',
      modal: 'window',
      captureEmail: true,
      formId: 'aYZbzo6xQ5us',
      note: 'Email required for delivery',
    },
  },

  {
    id: 'direct',

    title: 'Done-With-You Implementation',
    description:
      'Weekly accountability + hands-on execution. We build it together (or I do it for you).',

    tagline:
      '⚡ Upgrade when: You need momentum, accountability, or technical execution help',

    price: '$27',
    discount: '$50',
    billingCycle: 'hour',

    features: [
      {
        title: 'Weekly 1:1 check-ins + execution planning (not just advice)',
        icon: 'status-available',
      },
      {
        title: 'Strategic mentorship: positioning, offer packaging, messaging',
        icon: 'status-available',
      },
      {
        title: 'Hands-on development support (or fully managed implementation)',
        icon: 'status-available',
      },
      {
        title: 'Daily guerrilla marketing playbook + validation strategy',
        icon: 'status-available',
      },
      {
        title: 'Copywriting + messaging review for conversions',
        icon: 'status-available',
      },
      {
        title: 'Custom integration setup (analytics, forms, email sequences)',
        icon: 'status-available',
      },
    ],

    variant: 'outline',

    stock: {
      limit: 80,
      claimed: 10,
      type: 'hours',
    },

    cta: {
      label: 'Book a Call',
      to: 'https://www.upwork.com/freelancers/~01b4c32258ac48835f',
      icon: 'i-lucide-handshake',
      color: 'secondary',
      note: 'Monthly packages available. First hour: strategy session.',
    },
  },
] satisfies Offer[];
