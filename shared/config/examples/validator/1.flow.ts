import type { FlowConfig } from '#shared/types/config';

// Import domain data only
import { problemSolutionCards } from './2.problem-solution';
import { productSteps } from './3.process';
import { profile, accessibility, business, story } from './4.founder';
import { offers } from './5.offers';
import { caseStudies, testimonials, proof } from './6.results';
import { concerns } from './7.concerns';

export const flowConfig: FlowConfig = {
  // ============================================================================
  // HERO SECTION
  // ============================================================================
  hero: {
    badge: {
      title: "We're open-source",
      description: 'helping 70+ founders',
      to: 'https://github.com/incubrain/product-validator',
    },
    intro: {
      title: 'Sick of Being "Almost Ready" to Launch?',
      description:
        'Flip the script, strategically validate your business model BEFORE you build the product',
    },
    media: {
      type: 'video',
      src: null,
      alt: null,
    },
    countdown: {
      enabled: true,
      launchDate: '2025-12-31T00:00:00Z',
      message: 'Launching Soon!',
      fallbackMessage: 'Launching Any Day Now',
      showTimer: true, // false = just shows "Coming in 2025!"
    },
  },

  problemSolution: {
    intro: {
      icon: 'i-lucide-alert-triangle',
      headline: 'Struggling Founders',
      title: 'Destroy Your Excuses',
      description:
        'Take control of your destiny today or risk wasting years like I did.',
    },
    cards: problemSolutionCards,
    statement:
      'Break Perfectionism - Ship Daily • Validate First - Build For Demand • Stop Chasing Unicorns - Define Your Success •',
    bridge: {
      headline: 'Ready to get started?',
      message: "No excuses it's free! No strings attached",
      cta: {
        label: 'Check out the Validation Kit',
        to: { path: '/', hash: '#offer' },
        icon: 'i-lucide-arrow-down',
      },
    },
  },

  // ============================================================================
  // PROCESS SECTION
  // ============================================================================
  process: {
    intro: {
      icon: 'i-lucide-package',
      headline: 'All You Need - No Distractions',
      title: 'Product Validator Template',
      description:
        'Step-by-step system; fail fast, fail early, advance with confidence.',
    },
    steps: productSteps,
  },

  // ============================================================================
  // FOUNDER SECTION
  // ============================================================================
  founder: {
    intro: {
      icon: 'i-lucide-user',
      headline: 'Learn from my mistakes',
      title: 'My Scar, 13 Years and $300k+',
      description:
        'The Product Validator only exists because of my suffering; you need not!',
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
      headline: 'Limited Early Access',
      title: 'Focus On What Matters',
      description: 'Solve the problems that are holding you back from success.',
    },
    items: offers,
    bridge: {
      headline: 'Have concerns?',
      message:
        "Honest answers about technical requirements, time investment, competition, and who this isn't for",
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
      headline: 'Built in Public',
      title: 'Your Success Story Could Be Here',
      description:
        "Just launched publicly. Use the template, provide feedback, and we'll drive traffic to your validated landing page as social proof.",
    },
    separators: [
      {
        label: 'Success Stories',
      },
      {
        label: 'Community Feedback',
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
    intro: {
      icon: 'i-lucide-help-circle',
      headline: 'Objections & Reality Checks',
      title: 'We Value Transparency',
      description:
        "You are early, this product isn't going to be perfect; with your help, we can make it great.",
    },
    items: concerns,
    bridge: {
      headline: 'Validation is Phase 1. What about Phase 2?',
      message:
        'After you validate demand with fake door testing, Phase 2 is building your validated magnet and scaling traffic. We help with both. First validate the signal. Then we help you build what sells.',
      cta: {
        label: 'Start Phase 1 Now',
        to: { path: '/', hash: '#offer' },
        icon: 'i-lucide-rocket',
      },
    },
  },
};
