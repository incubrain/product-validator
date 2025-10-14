import type { Outcome, Alternative, Affiliations } from '#types';

/**
 * {CONFIG}: SOLUTION & COMPETITIVE POSITIONING
 *
 * Define HOW you solve it and WHY they choose you vs alternatives.
 *
 * SOURCES:
 * - Step 2: Your breakthrough solution and unique experience
 * - Step 3: Competitive research, positioning statement, differentiators
 *
 * Key sections:
 * - outcomes: Benefits/transformations you deliver
 * - alternatives: Competitors and why they fall short
 * - affiliations: Trust markers (tech stack, endorsements, etc.)
 */

export const outcomes = [
  {
    title: '⚠️ First outcome or benefit',
    description: '⚠️ Explanation of this outcome',
    icon: 'i-lucide-rocket',
  },
] satisfies Outcome[];

export const alternatives = [
  {
    id: 'competitor-or-alternative',
    title: '⚠️ Alternative approach name',
    problem: '⚠️ Why this alternative falls short',
    cost: '⚠️ Cost in time or money',
    why_fails: '⚠️ Core reason this alternative fails for validation',
    examples: ['Example 1', 'Example 2'],
  },
] satisfies Alternative[];

export const affiliations = {
  label: '⚠️ Trusted By',
  items: [
    {
      name: 'Brand Name',
      logo: 'i-lucide-triangle-alert',
      note: 'small anecdote',
    },
    {
      name: 'Person Name',
      logo: 'i-lucide-triangle-alert',
      note: 'small quote',
    },
    {
      name: 'Technology',
      logo: 'i-lucide-triangle-alert',
      note: 'version number',
    },
  ],
} satisfies Affiliations;
