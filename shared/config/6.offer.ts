// {CONFIG}: Define your product offers and pricing structure

export const offer = [
  {
    id: 'magnet',
    primary: true,
    name: '⚠️ Lead Magnet Name',
    description: '⚠️ What they get for free',
    price: null,
    benefits: [
      {
        text: '⚠️ Benefit included in magnet',
        value: 0,
        status: 'available',
      },
    ],
    cta: {
      label: '⚠️ Button text',
      to: '#magnet-form',
      icon: 'i-lucide-rocket',
      variant: 'solid',
      color: 'primary',
      note: '⚠️ Small text below button',
    },
    upsells: [
      {
        target: 'low',
        primary: true,
      },
    ],
  },

  {
    id: 'low',
    name: '⚠️ Low-Ticket Product Name',
    description: '⚠️ What they get for this price',
    price: {
      current: '$50',
      future: '$100',
      recurrence: 'never',
    },
    stock: {
      limit: 50,
      claimed: 0,
    },
    benefits: [
      {
        text: '⚠️ What is included',
        value: 200,
        status: 'available',
      },
    ],
    cta: {
      label: '⚠️ Button text',
      to: 'https://your-payment-link.com',
      icon: 'i-lucide-shopping-cart',
      variant: 'solid',
      color: 'primary',
      note: '⚠️ Small text below button',
    },
    upsells: [
      {
        target: 'medium',
        primary: true,
      },
    ],
  },

  {
    id: 'direct',
    name: '⚠️ Hire Me Directly',
    description: '⚠️ Your hourly service description',
    price: {
      current: '$50',
      future: '$100',
      recurrence: 'hour',
    },
    stock: {
      limit: 80,
      claimed: 0,
      type: 'hours',
    },
    cta: {
      label: '⚠️ Button text',
      to: 'https://your-booking-link.com',
      icon: 'i-lucide-handshake',
      variant: 'solid',
      color: 'secondary',
      note: '⚠️ Small text below button',
    },
  },
] satisfies OfferConfig;