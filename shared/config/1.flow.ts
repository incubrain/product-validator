import type { FlowConfig } from '#shared/types/config';

// Import domain data only
import { problemSolutionCards } from './2.problem-solution';
import { features, processSteps } from './3.process';
import { profile, accessibility, business, story } from './4.founder';
import { offers } from './5.offers';
import { caseStudies, testimonials, proof } from './6.results';
import { concerns } from './7.concerns';

export const flowConfig: FlowConfig = {
  // ============================================================================
  // HERO SECTION
  // ============================================================================
  hero: {
    enabled: true,
    minStage: 'attention',
    badge: {
      title: '⚠️ Badge title',
      description: '⚠️ Badge description',
      to: 'https://example.com',
    },
    intro: {
      title: '⚠️ Your compelling headline',
      description: '⚠️ Your value proposition description',
    },
    media: {
      type: 'video',
      src: null,
      alt: null,
    },
  },

  // ============================================================================
  // PROBLEM/SOLUTION SECTION
  // ============================================================================
  problemSolution: {
    enabled: true,
    minStage: 'conversion',
    intro: {
      icon: 'i-lucide-alert-triangle',
      headline: '⚠️ Section headline',
      title: '⚠️ Section title',
      description: '⚠️ Section description',
    },
    cards: problemSolutionCards,
    bridge: {
      headline: '⚠️ Bridge headline',
      message: '⚠️ Bridge message',
      cta: {
        label: '⚠️ CTA label',
        to: { path: '/', hash: '#offer' },
        icon: 'i-lucide-arrow-down',
      },
    },
  },

  // ============================================================================
  // PROCESS SECTION
  // ============================================================================
  process: {
    enabled: true,
    minStage: 'conversion',
    intro: {
      icon: 'i-lucide-package',
      headline: '⚠️ Section headline',
      title: '⚠️ Section title',
      description: '⚠️ Section description',
    },
    features,
    separators: [
      {
        label: '⚠️ Separator label',
        description: '⚠️ Optional separator description',
      },
      {
        label: '⚠️ Another separator label',
        description: '⚠️ Optional separator description',
      },
    ],
    steps: processSteps,
  },

  // ============================================================================
  // FOUNDER SECTION
  // ============================================================================
  founder: {
    enabled: true,
    minStage: 'engagement',
    intro: {
      icon: 'i-lucide-user',
      headline: '⚠️ Section headline',
      title: '⚠️ Section title',
      description: '⚠️ Section description',
    },
    profile,
    accessibility,
    business,
    story,
  },

  // ============================================================================
  // OFFER SECTION
  // ============================================================================
  offer: {
    enabled: true,
    minStage: 'attention',
    intro: {
      icon: 'i-lucide-handshake',
      headline: '⚠️ Section headline',
      title: '⚠️ Section title',
      description: '⚠️ Section description',
    },
    items: offers,
    bridge: {
      headline: '⚠️ Bridge headline',
      message: '⚠️ Bridge message',
      cta: {
        label: '⚠️ CTA label',
        to: { path: '/', hash: '#concerns' },
        icon: 'i-lucide-arrow-down',
      },
    },
  },

  // ============================================================================
  // RESULTS SECTION
  // ============================================================================
  results: {
    enabled: true,
    minStage: 'demand',
    intro: {
      icon: 'i-lucide-trending-up',
      headline: '⚠️ Section headline',
      title: '⚠️ Section title',
      description: '⚠️ Section description',
    },
    separators: [
      {
        label: '⚠️ Separator label',
      },
      {
        label: '⚠️ Another separator label',
      },
    ],
    caseStudies,
    testimonials,
    proof,
  },

  // ============================================================================
  // CONCERNS SECTION
  // ============================================================================
  concerns: {
    enabled: true,
    minStage: 'conversion',
    intro: {
      icon: 'i-lucide-help-circle',
      headline: '⚠️ Section headline',
      title: '⚠️ Section title',
      description: '⚠️ Section description',
    },
    items: concerns,
    bridge: {
      headline: '⚠️ Bridge headline',
      message: '⚠️ Bridge message',
      cta: {
        label: '⚠️ CTA label',
        to: { path: '/', hash: '#offer' },
        icon: 'i-lucide-rocket',
      },
    },
  },
};
