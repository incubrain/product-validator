// shared/config/0.flow.ts
// {FRICTION}: this has to be deleted, can it be extracted or does it provide value?
import { problem } from './examples/validator/2.problem';
import { solution } from './examples/validator/3.solution';
import { process } from './examples/validator/4.process';
import { founder } from './examples/validator/5.founder';
import { offer } from './examples/validator/6.offer';
import { results } from './examples/validator/7.results';
import { concerns } from './examples/validator/8.concerns';

export type OfferID = 'magnet' | 'low' | 'medium' | 'high' | 'direct';

export const flowConfig = {
  hero: {
    badge: {
      title: "⚠️ Badge title",
      description: '⚠️ Badge text',
      to: 'https://github.com/your-org/your-repo',
    },
    intro: {
      title: '⚠️ Your headline',
      description: '⚠️ Your value prop',
    },
    media: {
      type: 'video',
      src: '/videos/demo.mp4',
      alt: '⚠️ Video description',
    },
  },

  problem: {
    intro: {
      icon: 'i-lucide-alert-triangle',
      headline: '⚠️ Problem section eyebrow',
      title: '⚠️ Core problem statement',
      description: '⚠️ Pain point elaboration',
    },
    ...problem,
  },
  solution: {
    intro: {
      icon: 'i-lucide-target',
      headline: '⚠️ Solution eyebrow',
      title: '⚠️ How you solve it',
      description: '⚠️ Approach details',
    },
    ...solution,
  },
  process: {
    intro: {
      icon: 'i-lucide-package',
      headline: '⚠️ Process eyebrow',
      title: '⚠️ How it works',
      description: '⚠️ Process overview',
    },
    ...process, // features, flow
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
    ...founder, // me, business, story, accessibility
  },
  offer: {
    intro: {
      icon: 'i-lucide-handshake',
      headline: '⚠️ Offer eyebrow',
      title: '⚠️ Offer structure',
      description: '⚠️ Pricing explanation',
    },
    items: offer,
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
    ...results,
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