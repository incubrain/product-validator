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
      to: '#offer',
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
