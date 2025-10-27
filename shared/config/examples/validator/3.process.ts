import type { ProcessFeature, ProcessStep } from '#types';
// {FRICTION}: this has to be deleted, can it be extracted or does it provide value?

export const features = [
  {
    title: 'Open-Source & Free',
    description: 'Own your own code! Built using Nuxt 4 best practices.',
    icon: 'i-lucide-rocket',
  },
  {
    title: 'Incremental Features',
    description:
      'Validation stage determines which sections and features are active.',
    icon: 'i-lucide-target',
  },
  {
    title: 'Headless Funnel',
    description: 'Provider agnostic system, change with ~20 lines of code.',
    icon: 'i-lucide-bar-chart-3',
  },
] satisfies ProcessFeature[];

export const processSteps = [
  {
    id: 'step-1-attention',
    title: 'Stage 1: Capture Attention',
    duration: '1-2 weeks',
    description:
      'Drive traffic and validate message continuity through bounce rate analysis.',
    card: {
      title: 'Traffic & Message Continuity',
      description: 'Daily visitors + bounce rate',
      icon: 'i-lucide-target',
      thresholds: {
        weak: {
          range: '<10/day',
          meaning: 'No traffic strategy → Learn one channel',
        },
        average: {
          range: '10-30/day',
          meaning: 'Growing traction → Refine messaging',
        },
        strong: {
          range: '>30/day',
          meaning: 'Validated traffic source → Optimize offer',
        },
      },
    },
  },
  {
    id: 'step-2-conversion',
    title: 'Stage 2: Convert to Leads',
    duration: '2-4 weeks',
    description:
      'Build complete positioning and iterate until visitors convert to email signups.',
    card: {
      title: 'Email Capture Rate',
      description: 'Visitors → Email Signups',
      icon: 'i-lucide-mail',
      thresholds: {
        weak: {
          range: '<5%',
          meaning: 'Positioning unclear → Refine offer',
        },
        average: {
          range: '5-15%',
          meaning: 'Good interest → Test improvements',
        },
        strong: {
          range: '>15%',
          meaning: 'Strong signal → Build the magnet',
        },
      },
    },
  },
  {
    id: 'step-3-engagement',
    title: 'Stage 3: Validate Engagement',
    duration: '2-4 weeks',
    description:
      'Deliver lead magnet and measure completion rates to validate content value.',
    card: {
      title: 'Magnet Completion Rate',
      description: 'Signups → Completed Magnet',
      icon: 'i-lucide-check-circle',
      thresholds: {
        weak: {
          range: '<20%',
          meaning: 'Content lacks value → Improve magnet',
        },
        average: {
          range: '20-40%',
          meaning: 'Decent engagement → Refine delivery',
        },
        strong: {
          range: '>40%',
          meaning: 'High completion → Schedule feedback calls',
        },
      },
    },
  },
  {
    id: 'step-4-demand',
    title: 'Stage 4: Validate Demand',
    duration: 'Ongoing',
    description:
      'Present upsells to completers and measure purchase intent to validate business model.',
    card: {
      title: 'Purchase Intent Rate',
      description: 'Completers → Expressed Purchase Interest',
      icon: 'i-lucide-trending-up',
      thresholds: {
        weak: {
          range: '<10%',
          meaning: 'Offer misaligned → Revisit pain points',
        },
        average: {
          range: '10-20%',
          meaning: 'Some interest → Refine pricing/offer',
        },
        strong: {
          range: '>20%',
          meaning: 'Strong monetization signal → Build it',
        },
      },
    },
  },
  {
    id: 'step-5-build',
    title: 'Stage 5: Build & Polish',
    duration: 'Ongoing',
    description:
      'Optimize all conversion stages, add testimonials, create media assets, and refine messaging based on validated feedback.',
    card: {
      title: 'Full-Funnel Conversion',
      description: 'Visitors → Paying Customers',
      icon: 'i-lucide-sparkles',
      thresholds: {
        weak: {
          range: '<1%',
          meaning: 'Funnel leaks → Identify drop-off points',
        },
        average: {
          range: '1-3%',
          meaning: 'Solid foundation → Continue optimization',
        },
        strong: {
          range: '>3%',
          meaning: 'Validated product → Scale confidently',
        },
      },
    },
  },
] satisfies ProcessStep[];
