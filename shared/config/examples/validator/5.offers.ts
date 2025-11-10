import type { Offer } from '#types';

export const offers = [
  {
    id: 'magnet',
    primary: true,

    title: 'Validation Kit',
    description:
      'Go from idea to validated business model with structured guidance and community support.',

    price: 'Free',
    discount: null,
    billingCycle: 'Limited for quality control',
    terms: 'No credit card required',

    tagline: null,

    badge: {
      label: 'Early Access',
      color: 'success',
      variant: 'solid',
      size: 'lg',
    },

    features: [
      {
        title: 'Stage based validation framework',
        icon: 'status-available',
      },
      {
        title: 'AI prompts guiding each validation stage',
        icon: 'status-available',
      },
      {
        title: 'Template video walkthrough',
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
      note: null,
    },
  },

  {
    id: 'direct',
    title: 'Done-With-You Implementation',
    description: 'Hands on accountability + validation guidance.',
    tagline:
      '⚡ Upgrade when: You need momentum, accountability, or technical execution help',
    price: '$50',
    discount: '$30',
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
      to: 'https://cal.com/drew-macgibbon/strategy-consultation',
      icon: 'i-lucide-handshake',
      color: 'secondary',
      note: 'Monthly packages available. First hour: strategy session.',
    },
  },
] satisfies Offer[];
