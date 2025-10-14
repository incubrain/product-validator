import type { ProcessFeature, ProcessStep } from '#types';
// {FRICTION}: this has to be deleted, can it be extracted or does it provide value?

export const features = [
  {
    title: 'Deploy with one click',
    description:
      'If you can click a button and have a GitHub account, no excuses!',
    icon: 'i-lucide-rocket',
  },
  {
    title: 'Conversion-Optimized',
    description:
      'Strategically crafted sections retain customer attention; exit intent modals, feedback forms, and popup flows drive conversions.',
    icon: 'i-lucide-target',
  },
  {
    title: 'Analytics Ready',
    description:
      'Provider agnostic events system pre-integrated with Umami Analytics. Switch providers with ~20 lines of code.',
    icon: 'i-lucide-bar-chart-3',
  },
  {
    title: 'Feedback Collection',
    description:
      'FillOutForm pre-integrated for capturing leads, booking consultations, and automating follow-ups.',
    icon: 'i-lucide-form-input',
  },
  {
    title: 'Own Your Code',
    description:
      'No monthly platform fees, no vendor lock-in. Customize, and scale without limits.',
    icon: 'i-lucide-shield-check',
  },
  {
    title: 'Guided Magnet Creation',
    description:
      'Structured system walks you through how to create your first lead magnet.',
    icon: 'i-lucide-compass',
  },
] satisfies ProcessFeature[];

export const flow = [
  {
    slot: 'launch',
    title: 'Launch',
    description: 'Deploy your validation page and start gathering signal.',
    duration: '3-7 days',

    actions: [
      {
        task: 'Clone template repository',
        estimated_time: '5 minutes',
      },
      {
        task: 'Configure template sections',
        estimated_time: '2-4 hours each',
      },
      {
        task: 'Setup analytics integration',
        estimated_time: '1 hour',
      },
      {
        task: 'Deploy and test all flows',
        estimated_time: '1 hour',
      },
    ],

    content: [
      {
        type: 'text',
        value: `**Deep thinking required here.** This phase forces you to clarify:

- Who you're serving (customer profile)
- What pain you're solving (problem statement)
- Why your approach works (solution positioning)
- How they access value (offer structure)

Rush this and validation results become noise. Take time to articulate clearly. The template structure guides you, but the thinking is yours.

**Pro tip:** If you struggle to write a section, you don't understand that part of your business yet. That's the gap to fill before launching.`,
      },
    ],
  },

  {
    slot: 'validate',
    title: 'Validate',
    description: 'Drive traffic, capture feedback, and measure real interest.',
    duration: '1-3 weeks',

    actions: [
      {
        task: 'Submit landing page for community review',
        estimated_time: '30 minutes',
      },
      {
        task: 'Execute guerrilla marketing tactics daily',
        estimated_time: '4 hours per day',
      },
      {
        task: 'Direct outreach to target users',
        estimated_time: '2 hours per day',
      },
      {
        task: 'Monitor and adjust messaging based on early signals',
        estimated_time: '1 hour per day',
      },
    ],

    content: [
      {
        type: 'text',
        value: `**Consistent effort beats sporadic hustle.** Validation isn't a one-day push—it's daily iteration.

**Baseline goal:** 10 visitors/day via free channels (Reddit, forums, direct outreach, social posts)

**Math:** 10 visitors/day × 14 days = 140 visitors  
With 35% conversion = **49 magnet signups**

**Key metric:** Conversion rate matters more than raw traffic. 5% conversion from 100 visitors (5 signups) shows stronger signal than 2% from 300 visitors (6 signups).

Focus on *quality of interest*, not vanity metrics.`,
      },
    ],
  },

  {
    slot: 'decide',
    title: 'Decide',
    description: 'Let data guide your next move—build, pivot, or abandon.',
    duration: '2-3 days',

    actions: [
      {
        task: 'Analyze conversion data and user feedback',
        estimated_time: '4 hours',
      },
      {
        task: 'Apply decision framework to results',
        estimated_time: '2 hours',
      },
      {
        task: 'Calculate demand vs success thresholds',
        estimated_time: '1 hour',
      },
      {
        task: 'Document decision and next steps',
        estimated_time: '1 hour',
      },
    ],

    content: [
      {
        type: 'text',
        value: `**Decision framework removes emotion.**

**Below Average (<15% magnet conversion OR <2% paid conversion):**  
→ Consider pivot or abandon. Messaging/offer likely misaligned with market.

**Average (15-25% magnet OR 2-3% paid):**  
→ Refine and continue. Some signal present, needs optimization.

**Above Average (25%+ magnet OR 3-5% paid):**  
→ Strong validation signal. Proceed to build with confidence.

**Strong Signal (35%+ magnet OR 5%+ paid):**  
→ Exceptional validation. This is a winner. Build now.

Let the data decide. Your job is to interpret it honestly—not justify what you hoped would work.`,
      },
    ],
  },
] satisfies ProcessStep[];
