import type { FaqItem } from '#types';

/**
 * {CONFIG}: FAQ & OBJECTIONS
 *
 * Address common concerns and objections before they ask.
 *
 * SOURCES:
 * - Step 3: Competitive positioning (why not alternatives?)
 * - Common sense: Time investment, support, technical requirements
 *
 * Key sections:
 * - warning: Set realistic expectations
 * - objection: Address competitive concerns
 * - support: Explain help available
 * - general: Answer basic questions
 */

export const concerns = [
  {
    q: '⚠️ Question about time commitment?',
    a: '⚠️ Honest answer about effort required',
    type: 'warning',
  },
  {
    q: '⚠️ Why not use competitor X?',
    a: '⚠️ Your differentiation and trade-offs',
    type: 'objection',
  },
  {
    q: '⚠️ What support is available?',
    a: '⚠️ Your support channels and response times',
    type: 'support',
  },
  {
    q: '⚠️ General question about your product?',
    a: '⚠️ Clear factual answer',
    type: 'general',
  },
] satisfies FaqItem[];
