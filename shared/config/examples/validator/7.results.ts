// shared/config/7.results.ts
// {FRICTION}: this has to be deleted, can it be extracted or does it provide value?

export const testimonials: Testimonial[] = [
  {
    type: 'testimonial',
    name: 'Your Name',
    role: 'Example Testimonial*',
    quote:
      "This template includes a testimonials section. Share your results on X and they'll be featured here.",
    link: 'https://x.com/incubrain',
    highlight: true,
  },
  {
    type: 'testimonial',
    quote:
      'Finally shipped after 6 months of "perfecting" my side project. The template forced me to focus on what actually matters.',
    name: 'Alex Chen',
    role: 'Example Testimonial*',
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
  },
  {
    type: 'testimonial',
    quote:
      'Deployed on Tuesday, had 200 email signups by Friday. Sometimes you just need to hit publish and see what happens.',
    name: 'Taylor Kim',
    role: 'Example Testimonial*',
    avatarUrl: 'https://i.pravatar.cc/150?img=32',
  },
  {
    type: 'testimonial',
    quote:
      'My perfectionist brain hated this template at first. Then I realized that was exactly the point.',
    name: 'Jordan Rivera',
    role: 'Example Testimonial*',
    avatarUrl: 'https://i.pravatar.cc/150?img=68',
  },
  {
    type: 'testimonial',
    quote:
      'Stopped overthinking and started shipping. Three validation pages later, I found my winning idea.',
    name: 'Sarah Chen',
    role: 'Example Testimonial*',
    avatarUrl: 'https://i.pravatar.cc/150?img=44',
  },
  {
    type: 'testimonial',
    quote:
      'The template forced me out of perfectionist mode. Best $50 I spent on my startup journey.',
    name: 'Marcus Rodriguez',
    role: 'Example Testimonial*',
    avatarUrl: 'https://i.pravatar.cc/150?img=52',
  },
] satisfies Testimonial[];

export const caseStudies: CaseStudy[] = [
  {
    type: 'case-study',
    status: 'in-progress',

    title: 'Incubrain Launch',

    founder: {
      name: 'Drew MacGibbon',
      productType: 'Workshops (Template + Mentorship Funnel)',
      websiteUrl: 'https://incubrain.org',
    },

    description:
      'Assuming the validation of this template, I will be launching workshops in Maharashtra (Pune & Mumbai) as the primary product, built around this validation template.',

    metrics: [
      { label: 'Status', value: 'Conceptual' },
      { label: 'Target locations', value: 'Pune & Mumbai' },
    ],

    timeline: {
      start: '2025-11-01',
      milestones: [
        {
          date: '2025-11-01',
          event: 'Start building landing page & offer magnet',
        },
      ],
    },

    link: 'https://incubrain.org',
  },

  {
    type: 'case-study',
    status: 'example',
    highlight: true, // This one gets special UI treatment

    title: 'Your success story here',

    founder: {
      name: 'Your name',
      productType: 'Your product type',
    },

    description:
      'You have an idea but struggle with validation paralysis. Use this template to ship fast and gather real feedback. Data-driven decisions instead of endless iteration.',

    metrics: [{ label: 'Your metric', value: 'Your result' }],

    timeline: {
      start: new Date().toISOString().slice(0, 10),
    },

    link: 'https://x.com/incubrain',
  },
] satisfies CaseStudy[];

export const results = {
  testimonials,
  caseStudies,
};
