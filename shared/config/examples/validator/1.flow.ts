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
      title: "We're open-source",
      description: 'Star us on GitHub',
      to: 'https://github.com/incubrain/product-validator',
    },
    intro: {
      title: 'Sick of Being "Almost Ready" to Launch?',
      description:
        'Flip the script and ship a headless funnel today, let data drive your business decisions.',
    },
    media: {
      type: 'video',
      src: null,
      alt: null,
    },
  },

  problemSolution: {
    enabled: true,
    minStage: 'conversion',
    intro: {
      icon: 'i-lucide-alert-triangle',
      headline: 'Struggling Founders',
      title: 'Stop Making Excuses',
      description:
        'You have years of experience and expertise but cannot translate this into your own business; why?',
    },
    cards: problemSolutionCards,
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
    enabled: true,
    minStage: 'conversion',
    intro: {
      icon: 'i-lucide-package',
      headline: 'All You Need - No Distractions',
      title: 'Zero Upfront Cost',
      description:
        'Deploy in under an hour, provider agnostic, validate first, pay for scaling assistance.',
    },
    features,
    separators: [
      {
        label: 'step by step breakdown',
        description:
          'Your success is our success, we are here to help at every step',
      },
      {
        label: 'What Does "Validated" Mean?',
        description:
          'Data-driven thresholds prevent emotional decisions. Set your criteria now based on these industry standards, measure later, decide with confidence.',
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
      headline: 'Learn from my many mistakes',
      title: '13 Years and $350k+ Lost',
      description:
        "Started shipping weekly one month ago. You're watching the validation method work in real-time. Transparent, not polished.",
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
      headline: 'Limited Early Access',
      title: 'Everything You Need to Start',
      description:
        'Get live in <10 minutes, complete the 4-step sequence, receive strategic feedback. Zero cost until you validate demand.',
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
    enabled: true,
    minStage: 'build',
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
    enabled: true,
    minStage: 'conversion',
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
