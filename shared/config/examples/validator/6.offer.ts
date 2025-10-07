// {FRICTION}: this has to be deleted, can it be extracted or does it provide value?
export const offer = [
  {
    id: 'magnet',
    primary: true,
    name: 'Validation Launch Kit',
    description:
      '4-step guided process: deploy now, discover your value, create irresistible offers, configure with purpose',
    price: null,
    benefits: [
      {
        text: 'Technical setup guide (deploy in <1 hour)',
        value: 200,
        status: 'beta',
      },
      {
        text: 'Deep introspection workbook (PDF)',
        value: 150,
        status: 'beta',
      },
      {
        text: 'Irresistible offer creation framework (PDF)',
        value: 300,
        status: 'beta',
      },
      {
        text: 'Unified configuration checklist',
        value: 100,
        status: 'beta',
      },
      {
        text: '30-min recorded YouTube critique of your site',
        value: 250,
        status: 'beta',
      },
      {
        text: 'Private feedback session (10-15 min)',
        value: 150,
        status: 'beta',
      },
      {
        text: 'Support chat access throughout',
        value: 100,
        status: 'beta',
      },
    ],
    cta: {
      label: 'Get Launch Pack',
      icon: 'i-lucide-rocket',
      modal: 'window',
      captureEmail: true,
      formId: 'aYZbzo6xQ5us',
      note: 'Email required for delivery',
    },
    upsells: [
      {
        target: 'low',
        primary: true,
      },
      {
        target: 'medium',
      },
    ],
  },
  {
    id: 'low',
    name: 'Validator Accelerator',
    description: 'Complete validation course with community access',
    price: {
      current: '$50',
      future: '$100',
      recurrence: 'never',
    },
    stock: {
      limit: 50,
      claimed: 7,
    },
    benefits: [
      {
        text: 'YouTube review of your product page',
        value: 200,
        status: 'available',
      },
      {
        text: '2 selected founders get 1-month 1:1 coaching',
        value: 2000,
        status: 'available',
      },
      {
        text: '30-day validation roadmap (step-by-step)',
        status: 'coming-soon',
      },
      {
        text: 'Asset resource database + AI generation guides',
        status: 'coming-soon',
      },
      {
        text: 'Proven AI prompts for setup & optimization',
        status: 'coming-soon',
      },
      { text: 'Idea assessment framework', status: 'coming-soon' },
    ],
    cta: {
      label: 'Accelerator Course',
      to: 'https://whop.com/incubrain-community/product-validator',
      icon: 'i-lucide-shopping-cart',
      variant: 'solid',
      color: 'primary',
      note: 'Secure your spot',
    },
    upsells: [
      {
        target: 'medium',
        primary: true,
      },
      {
        target: 'high',
        primary: false,
      },
    ],
  },
  {
    id: 'direct',
    name: 'Hire me directly',
    description:
      "I'll guide you through the validation process",
    price: {
      current: '$27',
      future: '$50',
      recurrence: 'hour',
    },
    stock: {
      limit: 80,
      claimed: 10,
      type: 'hours',
    },
    benefits: [
      {
        text: 'Accountability & execution rhythm (weekly check-ins, task plan)',
        status: 'available',
      },
      {
        text: 'Mentorship to clarify product from strengths & life experience',
        status: 'available',
      },
      {
        text: 'Product ideation & irresistible-offer packaging',
        status: 'available',
      },
      {
        text: 'Hands-on development support or fully managed',
        status: 'available',
      },
      {
        text: 'Validation strategy & daily guerrilla marketing playbook',
        status: 'available',
      },
      {
        text: 'Copywriting & messaging review for clarity and conversion',
        status: 'available',
      },
    ],
    cta: {
      label: 'Hire me',
      to: 'https://www.upwork.com/freelancers/~01b4c32258ac48835f?mp_source=share',
      icon: 'i-lucide-handshake',
      variant: 'solid',
      color: 'secondary',
      note: 'Direct-hire via Upwork',
    },
  },
] satisfies Offer[];
