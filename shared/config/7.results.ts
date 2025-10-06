// {CONFIG}: Add testimonials and case studies for social proof
export const testimonials: Testimonial[] = [
  {
    type: 'testimonial',
    name: '⚠️ Customer name',
    role: '⚠️ Customer role or title',
    quote: '⚠️ Their testimonial quote',
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
    highlight: false,
  },
];

export const caseStudies: CaseStudy[] = [
  {
    type: 'case-study',
    status: 'example',
    highlight: true,

    title: '⚠️ Case study title',

    founder: {
      name: '⚠️ Founder name',
      productType: '⚠️ Product type',
      websiteUrl: 'https://example.com',
    },

    description: '⚠️ Brief case study description',

    metrics: [{ label: '⚠️ Metric name', value: '⚠️ Metric value' }],

    timeline: {
      start: '2025-10-13',
      duration: '⚠️ Time period',
      milestones: [
        {
          date: '2025-10-13',
          event: '⚠️ What did they achieve',
        },
      ],
    },

    link: 'https://example.com',
  },
];

export const results = {
  testimonials,
  caseStudies,
};
