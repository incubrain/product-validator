// shared/config/1.flow.ts
import type { FlowConfig } from '#types';
import { solution, customerProfile } from './2.problem';
import { outcomes, alternatives, affiliations } from './3.solution';
import { features, flow } from './4.process';
import { profile, business, story, accessibility } from './5.founder';
import { offers } from './6.offers';
import { testimonials, caseStudies } from './7.results';
import { concerns } from './8.concerns';

// {CONFIG}: Update this once you have completed your other config files
export const flowConfig = {
  hero: {
    badge: {
      title: '⚠️ Badge title',
      description: '⚠️ Badge text',
      to: 'https://github.com/your-org/your-repo',
    },
    intro: {
      title: '⚠️ Your headline',
      description: '⚠️ Your value prop',
    },
    // {OPTIMIZE}: After gathering feedback and validating consider adding a hero video
    // media: {
    //   type: 'video',
    //   src: '/videos/demo.mp4',
    //   alt: '⚠️ Video description',
    //   poster: '/images/your-hero-poster.jpg',
    // },
  },

  problem: {
    intro: {
      icon: 'i-lucide-alert-triangle',
      headline: '⚠️ Problem section eyebrow',
      title: '⚠️ Core problem statement',
      description: '⚠️ Pain point elaboration',
    },
    solution,
    customerProfile,
  },

  solution: {
    intro: {
      icon: 'i-lucide-target',
      headline: '⚠️ Solution eyebrow',
      title: '⚠️ How you solve it',
      description: '⚠️ Approach details',
    },
    outcomes,
    separators: [
      {
        label: '⚠️ Separator label',
        description: '⚠️ Optional separator description',
      },
    ],
    affiliations,
    alternatives,
  },

  process: {
    intro: {
      icon: 'i-lucide-package',
      headline: '⚠️ Process eyebrow',
      title: '⚠️ How it works',
      description: '⚠️ Process overview',
    },
    features,
    separators: [
      {
        label: '⚠️ Separator label',
        description: '⚠️ Optional separator description',
      },
    ],
    flow,
    bridge: {
      headline: '⚠️ Bridge headline',
      message: '⚠️ Transition message',
      cta: {
        label: '⚠️ Button text',
        to: { path: '/', hash: '#offer' },
        icon: 'i-lucide-arrow-down',
      },
    },
  },

  founder: {
    intro: {
      icon: 'i-lucide-user',
      headline: '⚠️ Founder eyebrow',
      title: '⚠️ Credibility statement',
      description: '⚠️ Background brief',
    },
    profile,
    business,
    story,
    accessibility,
  },

  offer: {
    intro: {
      icon: 'i-lucide-handshake',
      headline: '⚠️ Offer eyebrow',
      title: '⚠️ Offer structure',
      description: '⚠️ Pricing explanation',
    },
    items: offers,
    bridge: {
      headline: '⚠️ Bridge to concerns',
      message: '⚠️ Objection prompt',
      cta: {
        label: '⚠️ Button text',
        to: { path: '/', hash: '#concerns' },
        icon: 'i-lucide-arrow-down',
      },
    },
  },

  results: {
    intro: {
      icon: 'i-lucide-trending-up',
      headline: '⚠️ Results eyebrow',
      title: '⚠️ Social proof headline',
      description: '⚠️ Testimonial context',
    },
    testimonials,
    separators: [
      {
        label: '⚠️ Separator label',
      },
      {
        label: '⚠️ Another separator label',
      },
    ],
    caseStudies,
  },

  concerns: {
    intro: {
      icon: 'i-lucide-help-circle',
      headline: '⚠️ FAQ eyebrow',
      title: '⚠️ Objections headline',
      description: '⚠️ FAQ intro',
    },
    items: concerns,
    bridge: {
      headline: '⚠️ Final CTA headline',
      message: '⚠️ Final message',
      cta: {
        label: '⚠️ Button text',
        to: { path: '/', hash: '#offer' },
        icon: 'i-lucide-rocket',
      },
    },
  },
} satisfies FlowConfig;
