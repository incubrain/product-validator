import type { Offer } from '#types';

export const offers = [
  {
    id: 'magnet',
    primary: true,

    title: 'Validation Kit',
    description:
      'Complete 5-stage validation system. Go from idea to validated business model with structured guidance and community support.',

    price: 'Free',
    discount: null,
    billingCycle: 'Limited availability',
    terms: 'No credit card required',

    tagline:
      '🎯 For technical founders ready to validate through real market feedback',

    badge: {
      label: 'Early Access',
      color: 'success',
      variant: 'solid',
      size: 'lg',
    },

    features: [
      {
        title: '5-stage validation framework with success metrics',
        icon: 'status-available',
      },
      {
        title: 'AI prompts guiding each validation stage',
        icon: 'status-available',
      },
      {
        title: 'Guerrilla marketing playbook',
        icon: 'status-coming-soon',
      },
      {
        title: 'Video walkthrough: Setup to validation',
        icon: 'status-coming-soon',
      },
      {
        title: 'Exclusive founder community + support chat',
        icon: 'status-available',
      },
    ],

    variant: 'outline',
    highlight: true,

    stock: {
      limit: 100,
      claimed: 7,
      type: 'spots',
    },

    cta: {
      label: 'Get Free Validation Kit',
      to: undefined,
      icon: 'i-lucide-rocket',
      modal: 'window',
      note: 'Email required for delivery',
    },
  },

  {
    id: 'direct',
    title: 'Done-With-You Implementation',
    description:
      'Accountability + hands-on execution; let\'s build together.',
    tagline:
      '⚡ Upgrade when: You need momentum, accountability, or technical execution help',
    price: '$50',
    discount: '$27',
    billingCycle: 'hour',
    terms: 'Billed monthly. Minimum 3 hours.',
    highlight: false,
    variant: 'outline',
    primary: false,
    badge: undefined,
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

    cta: {
      label: 'Book a Call',
      to: 'https://www.upwork.com/freelancers/~01b4c32258ac48835f',
      icon: 'i-lucide-handshake',
      color: 'secondary',
      note: 'Monthly packages available. First hour: strategy session.',
    },
  },
] satisfies Offer[];
