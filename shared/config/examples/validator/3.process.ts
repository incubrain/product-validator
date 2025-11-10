import type { ProcessStep } from '#types';

export const productSteps = [
  {
    id: 'stage-1-identity',
    title: 'You ARE the Business',
    icon: 'i-lucide-compass',
    duration: '4 hours',
    description: 'Your values filter ideas. Know yourself, veto fast.',
    result: 'Product clarity unlocked',
  },
  {
    id: 'stage-2-attention',
    title: 'Earn Attention Daily',
    icon: 'i-lucide-megaphone',
    duration: '2-4 weeks',
    description: 'Show up daily. Test messages in public, not your head.',
    result: 'Social habit forms',
  },
  {
    id: 'stage-3-traffic',
    title: 'Prove Message Match',
    icon: 'i-lucide-mouse-pointer-click',
    duration: '1-2 weeks',
    description:
      'Social promise = landing reality. High bounce? Refine messaging.',
    result: 'Website visitors scroll',
  },
  {
    id: 'stage-4-conversion',
    title: 'Capture Intent',
    icon: 'i-lucide-mail',
    duration: '2-4 weeks',
    description:
      'Attention without commitment = nothing. Weak offer? No pipeline.',
    result: 'Visitors convert to leads',
  },
  {
    id: 'stage-5-engagement',
    title: 'Prove Value',
    icon: 'i-lucide-check-circle',
    duration: '2-4 weeks',
    description: 'Leads who ghost = broken promise. No completion? No trust.',
    result: 'Leads complete content',
  },
  {
    id: 'stage-6-demand',
    title: 'Validate Payment',
    icon: 'i-lucide-trending-up',
    duration: 'Ongoing',
    description: 'Feedback reveals intent. No payment signal? Pivot now.',
    result: 'Leads willing to pay',
  },
] satisfies ProcessStep[];
