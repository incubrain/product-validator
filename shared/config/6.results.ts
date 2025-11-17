import type { Testimonial, ProofTrack } from '#types';

/**
 * {CONFIG}: SOCIAL PROOF & RESULTS
 *
 * Testimonials - proof builds trust.
 *
 * SOURCES:
 * - Step 2: Your own results/transformation (can be first case study)
 * - External: Customer testimonials (add as you gather them)
 * - Proof tracks: Companies, tools, or validations you've worked with
 *
 * Key sections:
 * - testimonials: Short quotes from customers
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
