// {FRICTION}: this has to be deleted, can it be extracted or does it provide value?
export const process = {
  features: [
    {
      title: 'Deploy in Under 1 Hour',
      description: 'Step by step guide to get you live today, no excuses!',
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
  ],
  flow: [
    {
      slot: 'create',
      title: 'Create',
      description: 'Follow the Magnet Creation Guide.',
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
          value:
            'This phase requires deep thinking about your offering, market, and positioning. Rush this and validation results will be meaningless.',
        },
        {
          type: 'image',
          src: '/images/steps/step-1.png',
          alt: 'Complete template configuration process',
        },
      ],
    },

    {
      slot: 'validate',
      title: 'Validate',
      description:
        'Get real users to interact with your offering targetting 50 magnet COMPLETETIONS and gather feedback.',
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
          value:
            'Validation requires consistent daily effort. 10 visitors/day × 14 days = 140 visitors. With 35% conversion rate = 50 signups.',
        },
        {
          type: 'image',
          src: '/images/steps/step-2.png',
          alt: 'Proven validation and distribution strategies',
        },
      ],
    },

    {
      slot: 'decide',
      title: 'Decide',
      description: 'Use data to make confident build/pivot/abandon decisions',
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
          value:
            'Decision framework removes emotion from the process. Let data guide your choice between pivot, refine & build, or abandon.',
        },
        {
          type: 'image',
          src: '/images/steps/step-3.png',
          alt: 'How to interpret validation results and make confident decisions',
        },
      ],
    },
  ],
} satisfies ProcessSection;
