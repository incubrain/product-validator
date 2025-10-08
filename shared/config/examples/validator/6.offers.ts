import type { Offer } from '#types'

export const offers = [
  {
    id: 'magnet',
    primary: true,

    title: 'Launch Kit',
    description:
      'Guided process: deploy now, discover your value, create irresistible offers, configure with purpose',

    badge: {
      label: 'FREE',
      color: 'success',
      variant: 'solid',
      size: 'lg',
    },
    features: [
      {
        title: 'Technical setup guide (deploy in <1 hour)',
        icon: 'status-beta',
      },
      {
        title: 'Deep introspection workbook (PDF)',
        icon: 'status-beta',
      },
      {
        title: 'Irresistible offer creation framework (PDF)',
        icon: 'status-beta',
      },
      {
        title: 'Unified configuration checklist',
        icon: 'status-beta',
      },
      {
        title: '30-min recorded YouTube critique of your site',
        icon: 'status-beta',
      },
      {
        title: 'Private feedback session (10-15 min)',
        icon: 'status-beta',
      },
      {
        title: 'Support chat access throughout',
        icon: 'status-beta',
      },
    ],

    variant: 'outline',
    highlight: true,

    stock: {
      limit: 50,
      claimed: 7,
    },

    cta: {
      label: 'Free Launch Kit',
      to: undefined,
      icon: 'i-lucide-rocket',
      modal: 'window',
      captureEmail: true,
      formId: 'aYZbzo6xQ5us',
      note: 'Email required for delivery',
    },
  },

  {
    id: 'low',
    title: 'Validator Accelerator',
    description: 'Complete validation course with community access',
    price: '$100',
    discount: '$50',
    billingCycle: 'one-time',

    features: [
      {
        title: 'YouTube review of your product page',
        icon: 'status-available',
      },
      {
        title: '2 selected founders get 1-month 1:1 coaching',
        icon: 'status-available',
      },
      {
        title: '30-day validation roadmap (step-by-step)',
        icon: 'status-coming-soon',
      },
      {
        title: 'Asset resource database + AI generation guides',
        icon: 'status-coming-soon',
      },
      {
        title: 'Proven AI prompts for setup & optimization',
        icon: 'status-coming-soon',
      },
      {
        title: 'Idea assessment framework',
        icon: 'status-coming-soon',
      },
    ],

    variant: 'outline',

    stock: {
      limit: 50,
      claimed: 7,
    },

    cta: {
      label: 'Accelerator Course',
      to: 'https://whop.com/incubrain-community/product-validator',
      icon: 'i-lucide-shopping-cart',
    },
  },

  {
    id: 'direct',

    title: 'Hire Me Directly',
    description: "I'll guide you through the validation process",

    price: '$50',
    discount: '$27',
    billingCycle: '/hour',

    features: [
      {
        title:
          'Accountability & execution rhythm (weekly check-ins, task plan)',
        icon: 'status-available',
      },
      {
        title: 'Mentorship to clarify product from strengths & life experience',
        icon: 'status-available',
      },
      {
        title: 'Product ideation & irresistible-offer packaging',
        icon: 'status-available',
      },
      {
        title: 'Hands-on development support or fully managed',
        icon: 'status-available',
      },
      {
        title: 'Validation strategy & daily guerrilla marketing playbook',
        icon: 'status-available',
      },
      {
        title: 'Copywriting & messaging review for clarity and conversion',
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
      label: 'Hire me',
      to: 'https://www.upwork.com/freelancers/~01b4c32258ac48835f',
      icon: 'i-lucide-handshake',
      color: 'secondary',
    },
  },
] satisfies Offer[];
