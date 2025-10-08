// {CONFIG}: Define your solution outcomes and competitive positioning
import type { Outcome, Alternative, Affiliations } from '#types';

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
