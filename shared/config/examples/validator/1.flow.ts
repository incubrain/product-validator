import type { FlowConfig } from '#shared/types/config';

// Import domain data only
import { solution, customerProfile } from './2.problem';
import { outcomes, affiliations, alternatives } from './3.solution';
import { features, flow } from './4.process';
import { profile, accessibility, business, story } from './5.founder';
import { offers } from './6.offers';
import { caseStudies, testimonials } from './7.results';
import { concerns } from './8.concerns';

export const flowConfig: FlowConfig = {
  // ============================================================================
  // HERO SECTION
  // ============================================================================
  hero: {
    badge: {
      title: "We're open-source",
      description: 'Star us on GitHub',
      to: 'https://github.com/incubrain/product-validator',
    },
    intro: {
      title: 'How Long Have You Been "Almost Ready" to Launch?',
      description:
        'Ship a validation page today. Stop preparing. Start learning. Free template that forces you to deploy now, not later.',
    },
    media: {
      type: 'video',
      src: null,
      alt: null,
    },
  },

  // ============================================================================
  // PROBLEM SECTION
  // ============================================================================
  problem: {
    intro: {
      icon: 'i-lucide-alert-triangle',
      headline: 'This Is Critical',
      title: 'Your Brain IS Holding You Back',
      description:
        "I know because mine did, 13 years of being 'almost ready.' Your brain will keep you safe, comfortable, and broke unless you force it to ship.",
    },
    solution,
    customerProfile,
  },

  // ============================================================================
  // SOLUTION SECTION
  // ============================================================================
  solution: {
    intro: {
      icon: 'i-lucide-target',
      headline: 'Signal First System',
      title: 'Break The Cycle, Ship Today',
      description:
        'Force immediate deployment with placeholder content. Break psychological barriers through public iteration. Validate demand before investing months.',
    },
    outcomes,
    separators: [
      {
        label: 'Why Alternatives Fail',
        description:
          "High cost to start, vendor lock-in, 'do it all' approach, and lack of personalised support at scale while pushing you to build a business without validating it first",
      },
    ],
    affiliations,
    alternatives,
  },

  // ============================================================================
  // PROCESS SECTION
  // ============================================================================
  process: {
    intro: {
      icon: 'i-lucide-package',
      headline: 'All You Need - No Distractions',
      title: 'Zero Upfront Cost',
      description:
        'Deploy in under an hour, provider agnostic, validate + earn, pay for scaling assistance.',
    },
    features,
    separators: [
      {
        label: 'step by step breakdown',
        description:
          "You're success is our success, we are here to help at every step",
      },
    ],
    flow,
    bridge: {
      headline: 'Ready to get started?',
      message: "No excuses it's free! No strings attached",
      cta: {
        label: 'Check out the Launch Kit',
        to: { path: '/', hash: '#offer' },
        icon: 'i-lucide-arrow-down',
      },
    },
  },

  // ============================================================================
  // FOUNDER SECTION
  // ============================================================================
  founder: {
    intro: {
      icon: 'i-lucide-user',
      headline: 'Learn from my many mistakes',
      title: '13 Years and $350k+ Lost',
      description:
        "One month ago I started shipping weekly. You're watching the validation method work in real-time. Transparent, not polished.",
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
    intro: {
      icon: 'i-lucide-handshake',
      headline: 'Limited Spots Available',
      title: 'Stop Guessing, Get Feedback',
      description:
        'Free validation launch kit gets you live and gathering feedback.',
    },
    items: offers,
    bridge: {
      headline: 'Have concerns?',
      message:
        'Address objections about technical requirements, time investment, and why alternatives fail',
      cta: {
        label: 'Get Answers',
        to: { path: '/', hash: '#concerns' },
        icon: 'i-lucide-arrow-down',
      },
    },
  },

  // ============================================================================
  // RESULTS SECTION
  // ============================================================================
  results: {
    intro: {
      icon: 'i-lucide-trending-up',
      headline: 'Testimonials',
      title: 'Your Testimonial Could Be Here',
      description:
        "We just launched! Use the template and provide some feedback, we'll drive traffic to your landing page.",
    },
    caseStudies,
    separators: [
      {
        label: 'Success Stories',
      },
      {
        label: 'Testimonials',
      },
    ],
    testimonials,
  },

  // ============================================================================
  // CONCERNS SECTION
  // ============================================================================
  concerns: {
    intro: {
      icon: 'i-lucide-help-circle',
      headline: 'Objections & Reality Checks',
      title: 'Why not ClickFunnels?',
      description:
        "Honest answers about technical requirements, competition, freshness, and who this isn't for",
    },
    items: concerns,
    bridge: {
      headline: 'Questions answered?',
      message: "Let's turn your idea into validated evidence—start free",
      cta: {
        label: 'Get Validation Launch Kit',
        to: { path: '/', hash: '#offer' },
        icon: 'i-lucide-rocket',
      },
    },
  },
};
