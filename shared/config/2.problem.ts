import type { CustomerProfile, ProblemSolution } from '#types';

/**
 * {CONFIG}: PROBLEM & CUSTOMER PROFILE
 *
 * Define WHO you're serving and WHAT pain you're solving.
 *
 * SOURCES:
 * - Step 2: Your expensive pain point, target customer (past-you)
 * - Step 3: Refined problem framing from competitive analysis
 *
 * Key sections:
 * - solution: Your problem statement and promise
 * - customerProfile: Detailed persona with context and pain points
 */

export const solution = {
  statement: '⚠️ One-sentence problem statement',
  claim: '⚠️ Your bold claim or promise',
  pitch: '⚠️ Explanation of your claim in 1-2 sentences',
  promise: '⚠️ Minimum outcome you guarantee',
} satisfies ProblemSolution;

export const customerProfile = {
  id: 'your-customer-segment',
  label: '⚠️ Customer Segment Name',
  description:
    '⚠️ Detailed persona description including identity traits, background, and current situation',

  context: [
    '⚠️ Years of experience or skill level',
    '⚠️ Current state or position',
    '⚠️ Primary obstacle preventing progress',
    '⚠️ Where they are in their journey',
  ],

  pains: [
    {
      label: '⚠️ First major pain point',
      impact: '⚠️ How critical this issue is and why',
      cost: '⚠️ What this pain costs them in time, money, or opportunity',
      reality: '⚠️ What the actual solution or path forward looks like',
    },
  ],
} satisfies CustomerProfile;
