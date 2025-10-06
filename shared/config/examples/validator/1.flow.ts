// shared/config/0.flow.ts
import type { FlowConfig } from '#shared/types/config';

// Import domain data only
import { problem } from './2.problem';
import { solution } from './3.solution';
import { process } from './4.process';
import { founder } from './5.founder';
import { offer } from './6.offer';
import { results } from './7.results';
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
      title: 'Ship today, add your idea, validate in weeks',
      description:
        'Stop wasting months building ghost products. Package your idea as a lead magnet, gather feedback and let users drive your product creation.',
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
        "Mine cost me 13 years and $350k+ in investements/lost income, don't make the same mistakes I did",
    },
    ...problem,
  },

  // ============================================================================
  // SOLUTION SECTION
  // ============================================================================
  solution: {
    intro: {
      icon: 'i-lucide-target',
      headline: 'Validation-First System',
      title: 'Break The Cycle, Ship Today',
      description:
        'Force immediate deployment with placeholder content. Break psychological barriers through public iteration. Validate demand before investing months.',
    },
    separators: [
      {
        label: 'Why Alternatives Fail',
        description:
          "High cost to start, vendor lock-in, 'do it all' approach, and lack of personalised support at scale while pushing you to build a business without validating it first",
      },
    ],
    ...solution,
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
    separators: [
      {
        label: 'step by step breakdown',
        description:
          "You're success is our success, we are here to help at every step",
      },
    ],
    ...process,
    bridge: {
      headline: 'Fits your needs?',
      message: 'jump in and get started',
      cta: {
        label: 'Get Started Now',
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
      headline: 'Learn from my mistakes',
      title: '13 years and $350k+ lost building ghost products',
      description:
        "One month ago I started shipping weekly. You're watching the validation method work in real-time. Transparent, not polished.",
    },
    ...founder,
  },

  // ============================================================================
  // OFFER SECTION
  // ============================================================================
  offer: {
    intro: {
      icon: 'i-lucide-handshake',
      headline: 'Start Free, Upgrade When Ready',
      title: 'Most founders begin with the free magnet',
      description:
        'Free 4-step validation guide gets you live and gathering feedback. Accelerator ($50) adds structured methodology + expert critique.',
    },
    items: offer,
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
      headline: 'Example Testimonials',
      title: 'Your Testimonial Could Be Here',
      description:
        "We just launched! Use the template and provide some feedback, we'll drive traffic to your landing page.",
    },
    separators: [
      {
        label: 'Success Stories',
      },
      {
        label: 'Testimonials',
      },
    ],
    ...results,
  },

  // ============================================================================
  // CONCERNS SECTION
  // ============================================================================
  concerns: {
    intro: {
      icon: 'i-lucide-help-circle',
      headline: 'Objections & Reality Checks',
      title: 'Why not ClickFunnels? Too fresh? No audience?',
      description:
        "Honest answers about technical requirements, competition, freshness, and who this isn't for",
    },
    items: concerns,
    bridge: {
      headline: 'Questions answered?',
      message: "Let's turn your idea into validated evidence—start free",
      cta: {
        label: 'Get Validation Starter Pack',
        to: { path: '/', hash: '#offer' },
        icon: 'i-lucide-rocket',
      },
    },
  },
};
