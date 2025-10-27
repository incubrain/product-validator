import type { Testimonial, CaseStudy, ProofTrack } from '#types';

/**
 * {CONFIG}: SOCIAL PROOF & RESULTS
 *
 * Testimonials, case studies, and proof tracks that build trust.
 *
 * SOURCES:
 * - Step 2: Your own results/transformation (can be first case study)
 * - External: Customer testimonials (add as you gather them)
 * - Proof tracks: Companies, tools, or validations you've worked with
 *
 * Key sections:
 * - testimonials: Short quotes from customers
 * - caseStudies: Detailed success stories with metrics
 * - proof: Logo/name tracks showing credibility
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
    highlight: true,
  },
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

export const proof = [
  {
    label: '⚠️ Proof track label',
    badgeColor: 'info',
    items: [
      {
        name: '⚠️ Company/Person name',
        logo: 'i-lucide-check-circle',
        note: '⚠️ Optional note',
      },
      {
        name: '⚠️ Company/Person name',
        logo: 'i-lucide-check-circle',
        note: '⚠️ Optional note',
      },
      {
        name: '⚠️ Another name',
        logo: 'https://example.com/logo.png',
      },
      {
        name: '⚠️ Another name',
        logo: 'https://example.com/logo.png',
      },
    ],
  },
] satisfies ProofTrack[];
