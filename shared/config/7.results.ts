import type { Testimonial, CaseStudy } from '#types';

/**
 * {CONFIG}: SOCIAL PROOF & RESULTS
 *
 * Testimonials and case studies that build trust.
 *
 * SOURCES:
 * - Step 2: Your own results/transformation (can be first case study)
 * - External: Customer testimonials (add as you gather them)
 *
 * Key sections:
 * - testimonials: Short quotes from customers
 * - caseStudies: Detailed success stories with metrics
 *
 * START WITH: Your own story as the first case study
 */

export const testimonials = [
  {
    type: 'testimonial',
    name: '⚠️ Customer name',
    role: '⚠️ Customer role or title',
    quote: '⚠️ Their testimonial quote',
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
    highlight: false,
  },
] satisfies Testimonial[];

export const caseStudies = [
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
] satisfies CaseStudy[];
