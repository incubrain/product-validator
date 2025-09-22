// flow.config.ts
import type { ButtonProps } from '@nuxt/ui';
// Opinionated content model for product ideation → landing-page copy.
// Each section below is commented as if it were a separate file (01..08),
// but kept together here so you can iterate the structure in one place.

// -----------------------------------------------------------------------------
// Shared primitives
// -----------------------------------------------------------------------------
type Link = { platform: string; label: string; url: string };

export type Cta = {
  label: string;
  to: string;
  note?: string;
  icon?: string;
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
  labelMobile?: string;
  disabled?: boolean;
};

type SectionConfig = {
  intro: {
    icon?: string; // Optional section icon
    headline?: string; // Optional badge/eyebrow text
    title: string;
    description: string;
  };
  separators?: Record<
    string,
    {
      label: string;
      description: string;
    }
  >;
  bridge?: {
    headline: string;
    message: string;
    cta: Cta;
  };
};

type Metric = { label: string; value: string | number; sub?: string };

// -----------------------------------------------------------------------------
// 00) Hypothesis (claim, audience)
// -----------------------------------------------------------------------------
type Scale1to5 = 1 | 2 | 3 | 4 | 5;

type EvidenceItem = {
  id?: string;
  type:
    | 'interview'
    | 'survey'
    | 'research'
    | 'market_report'
    | 'experiment'
    | 'personal_experience';
  summary: string; // one-line takeaway
  description: string; // detailed explanation for UI
  strength?: Scale1to5; // confidence in this item
  date?: string;
  sample_size?: number;
  source?: string; // URL, doc id, or "Customer: ACME"
  icon: string; // UI icon for display
};

interface CustomerProfile {
  id: string;
  label: string;
  primary?: boolean;
  description: string; // Rich narrative including identity traits
  context: Record<string, string>; // Flat key-value for easy templating
  pains: Array<{
    label: string;
    severity: string;
    cost: string;
  }>;
  outcomes: Array<{
    label: string;
    target: number;
    unit: string;
    value: string;
  }>;
  objections: Array<{
    label: string;
    rebuttal: string;
  }>;
}

type Hypothesis = {
  // Section configuration
  sections: SectionConfig;

  // Consolidated evidence (single source)
  evidence: EvidenceItem[];

  // Static outcome features (not profile-reactive)
  outcomeFeatures: Array<{
    title: string;
    description: string;
    icon: string;
  }>;

  // Simplified problem data for hero section
  problem: {
    statement: string; // What is the problem
    solution: {
      claim: string; // Bold Claim
      pitch: string; // Claim Explanation
      promise: string; // Minimum Outcome
    };
  };

  // Customer profiles (pains are reactive in tabs)
  customerProfiles: CustomerProfile[];
};

// -----------------------------------------------------------------------------
// 01) Founder (founder fit)
// -----------------------------------------------------------------------------

type BusinessInfo = {
  name: string;
  description: string;
  tagline: string;
  legal_name: string;
  founding_year: number;
};

type Image = {
  src: string;
  alt: string;
};

type Founder = {
  sections: SectionConfig;
  name: string;
  business: BusinessInfo;
  role: string;
  bioShort: string;
  bioLong?: string;
  backgroundStory?: string;
  promise?: string;
  avatar?: Image;
  portrait?: Image;
  skills: string[];
  domains: string[];
  highlights?: string[];
  links?: Link[];
};

// -----------------------------------------------------------------------------
// 02) Positioning (USP)
// -----------------------------------------------------------------------------
type Positioning = {
  sections: SectionConfig;
  category: string;
  affiliations: { name?: string; logo: string; note?: string }[];
  comparison: {
    tiers: {
      id: string;
      title: string;
      highlight?: boolean;
    }[];
    sections: {
      title: string;
      features: {
        title: string;
        tiers: Record<string, string>;
      }[];
    }[];
  };
  approach: {
    title: string;
    description: string;
    icon: string;
  }[];
};

// -----------------------------------------------------------------------------
// 04) Product (how it works, features)
// -----------------------------------------------------------------------------
type FlowContent =
  | { type: 'text'; value: string }
  | { type: 'video'; src: string; alt?: string; poster?: string }
  | { type: 'image'; src: string; alt?: string }
  | { type: 'list'; items: string[]; style?: 'bullets' | 'numbers' | 'checks' }
  | { type: 'code'; language: string; snippet: string; label?: string };

type Product = {
  sections: SectionConfig;
  elevator: string;
  flow: {
    id: string;
    title: string;
    description: string;
    content: FlowContent[];
  }[];
  media?: { type: 'image' | 'video'; src: string; alt?: string };
};

// -----------------------------------------------------------------------------
// 06) Proof (social & numbers)
// -----------------------------------------------------------------------------
type SocialProof =
  | {
      type: 'testimonial';
      quote: string;
      name: string;
      role?: string;
      avatarUrl?: string;
      link?: string;
    }
  | {
      type: 'case-study';
      title: string;
      situation: string;
      action: string;
      result: string;
      metric?: Metric;
      link?: string;
    }
  | {
      type: 'metric';
      label: string;
      value: string | number;
      sub?: string;
      icon?: string;
    }
  | {
      type: 'highlight';
      title: string;
      description: string;
      icon: string;
      to?: string;
    }
  | { type: 'endorsement'; label: string; url: string; icon?: string }
  | { type: 'logo'; name: string; imageUrl: string; alt?: string };

// -----------------------------------------------------------------------------
// 07) Questions (Warnings, Objections, Support, General)
// -----------------------------------------------------------------------------

export type FaqItem = {
  q: string;
  a: string;
  type: 'general' | 'objection' | 'warning' | 'support';
};

// -----------------------------------------------------------------------------
// 08) Offer (pricing & CTA)
// -----------------------------------------------------------------------------
export type OfferID = 'product' | 'magnet' | 'direct' | 'social';
type Offer = {
  id: OfferID;
  name: string;
  description: string;
  price?: string;
  compareAt?: string;
  benefits: Array<{
    text: string;
    status: 'available' | 'coming-soon' | 'beta';
    value?: number;
  }>;
  cta: Cta;
  inventory?: { total: number; claimed: number };
};

export type FlowConfig = {
  hypothesis: Hypothesis;
  positioning: Positioning;
  product: Product;
  offers: {
    sections: SectionConfig;
    items: Offer[];
  };
  founder: Founder;
  socialProof: {
    sections: SectionConfig;
    items: SocialProof[];
  };
  questions: {
    sections: SectionConfig;
    items: FaqItem[];
  };
};

export const flowConfig = {
  hypothesis: {
    sections: {
      intro: {
        title: "This problem hits different when you're technical",
        headline: 'something here',
        icon: 'i-lucide-lightbulb',
        description:
          "We've lived it, researched it, and mapped the exact path out",
      },
      separators: {
        research: {
          label: "We know because we've been there",
          description:
            "This isn't theory. It's lived experience backed by systematic research across the developer community.",
        },
        solution: {
          label: 'Your exact path from paralysis to clarity',
          description:
            'This is why we built a validation-first approach specifically for technical founders. Stop overthinking, start validating, make confident decisions.',
        },
      },
      bridge: {
        headline: 'The bottom line:',
        message:
          "67% of technical founders waste months building unvalidated features. You don't have to be one of them.",
        cta: {
          label: 'See exactly how this works',
          to: '#positioning',
          icon: 'i-lucide-arrow-down',
        },
      },
    },

    // CONSOLIDATED: Single evidence source (remove from problem.evidence)
    evidence: [
      {
        summary: 'Built 10+ products that never launched due to perfectionism',
        description:
          'Personal journey through the perfectionist trap that keeps technical founders stuck',
        type: 'personal_experience',
        icon: 'i-lucide-user',
        sample_size: 10,
        date: 'Jan 2024',
        strength: 5,
      },
      {
        summary: '67% of technical founders have unshipped side projects',
        description:
          'Structured research across developer communities revealed validation paralysis patterns',
        type: 'research',
        icon: 'i-lucide-users',
        sample_size: 150,
        date: 'Aug 2024',
        strength: 4,
      },
      {
        summary:
          'Validation prevents 80% of startup failures according to CB Insights',
        description:
          'Comprehensive analysis of failed startups shows lack of market need as #1 killer',
        type: 'market_report',
        icon: 'i-lucide-trending-down',
        sample_size: 1000,
        date: 'Dec 2023',
        strength: 4,
      },
    ],

    // KEPT: Static outcome features (not profile-reactive)
    outcomeFeatures: [
      {
        title: 'Stop Guessing',
        description:
          'Get your validation page live and start collecting real user signals within 24 hours',
        icon: 'i-lucide-target',
      },
      {
        title: 'Start Knowing',
        description:
          'Gather meaningful feedback from 20+ target users using proven distribution templates',
        icon: 'i-lucide-brain',
      },
      {
        title: 'Decide Confidently',
        description:
          'Make data-driven build/pivot decisions with clear success metrics and next steps',
        icon: 'i-lucide-check-circle',
      },
    ],

    // SIMPLIFIED: Core problem data for hero section
    problem: {
      statement:
        'Technical experts build impressive products but struggle to package and market their expertise effectively',
      solution: {
        claim: 'Validate in days, not months, or years!',
        pitch:
          'Pre-built template removes technical friction, forcing rapid validation over perfectionism',
        promise: 'Get real feedback on your idea within 48 hours of setup',
      },
    },

    customerProfiles: [
      {
        id: 'technical-founders',
        label: 'Technical Founders',
        primary: true,
        description:
          'Perfectionist builders who fear public failure, confident in code but insecure in marketing, value craftsmanship over speed, and are driven to prove technical expertise can build businesses',

        context: {
          experience: '3-15 years development experience',
          team_size: 'Solo founder or small team',
          budget: '$5k-15k validation budget',
          decision_style: 'Wants data-driven decisions',
          stage: 'Pre-revenue bootstrap',
        },

        pains: [
          {
            label: 'Endless iteration without validation',
            severity: 'High - prevents launching anything',
            cost: 'Months of wasted development time',
          },
          {
            label: 'Marketing and positioning knowledge gaps',
            severity: 'Medium - leads to poor messaging',
            cost: 'Low conversion rates, unclear value props',
          },
          {
            label: 'Fear of public failure and judgment',
            severity: 'High - prevents any launch attempts',
            cost: 'Zero market feedback, prolonged uncertainty',
          },
        ],

        outcomes: [
          {
            label: 'Get your validation page live',
            target: 1,
            unit: 'days',
            value: 'Working landing page with analytics',
          },
          {
            label: 'Collect real user feedback',
            target: 7,
            unit: 'days',
            value: '20+ meaningful responses from target users',
          },
          {
            label: 'Make confident build/pivot decision',
            target: 30,
            unit: 'days',
            value: 'Data-driven go/no-go with clear next steps',
          },
        ],

        objections: [
          {
            label: "Can't I just build and see?",
            rebuttal: 'Test messaging in days vs shipping features in weeks',
          },
          {
            label: "I don't have an audience",
            rebuttal:
              'We provide targeted outreach templates for your communities',
          },
        ],
      },
      {
        id: 'expert-consultants',
        label: 'Expert Consultants',
        description:
          'Domain experts frustrated by scaling limits, value expertise and authority, motivated by freedom and leverage, confident in knowledge but uncertain about productization',

        context: {
          experience: '5+ years consulting experience',
          team_size: 'Individual consultant',
          budget: '$2k-10k product budget',
          decision_style: 'Seeks proven frameworks',
          stage: 'Established practice',
        },

        pains: [
          {
            label: 'Difficulty packaging expertise into products',
            severity: 'High - limits scaling potential',
            cost: 'Stuck in time-for-money trap',
          },
          {
            label: 'Time-for-money ceiling limits growth potential',
            severity: 'Medium - impacts long-term scaling',
            cost: 'Capped revenue growth, burnout risk',
          },
          {
            label: 'Difficulty standing out in crowded consulting market',
            severity: 'Medium - affects client acquisition',
            cost: 'Lower rates, commodity positioning',
          },
        ],

        outcomes: [
          {
            label: 'Test productized offering',
            target: 3,
            unit: 'days',
            value: 'Structured product validation approach',
          },
          {
            label: 'Validate market demand',
            target: 14,
            unit: 'days',
            value: 'Clear product-market fit signals',
          },
        ],

        objections: [
          {
            label: 'My expertise is too complex to productize',
            rebuttal:
              'We break complex knowledge into testable value propositions',
          },
          {
            label: 'Clients expect custom solutions',
            rebuttal: "Products complement consulting - they don't replace it",
          },
        ],
      },
    ],
  },

  founder: {
    sections: {
      intro: {
        icon: 'i-lucide-id-card',
        headline: 'Built by Founders, for Founders',
        title: "Who's behind this",
        description:
          'Meet Drew, the technical founder who built this validation system from lived experience',
      },
      bridge: {
        headline: 'Real results from real founders',
        message:
          'See how other technical founders are using this approach to validate and build',
        cta: {
          label: 'See Success Stories',
          to: '#social-proof',
          icon: 'i-lucide-trophy',
        },
      },
    },
    name: 'Drew MacGibbon',
    role: 'Product Strategist & Builder',
    business: {
      name: 'Validator',
      description: 'Ship faster with our proven Validator and community',
      tagline: 'From Idea to Launch in Days, Not Months',
      legal_name: 'Incubrain Pvt. Ltd.',
      founding_year: 2023,
    },
    bioShort:
      'Ship faster with a validation-first mindset: decide with evidence, not wishful features.',
    bioLong: `I built this kit to help founders avoid the trap I fell into for years: perfecting features before anyone cared. Validation isn't about shipping *more*—it's about shipping **signal**. 
     The goal is clarity, speed, and evidence. Publish a high-signal page, share it with real people, capture interest, test your message, and only then decide whether to invest. This template removes friction so the decision loop is days—not months.`,
    backgroundStory: `I started my first business at 19 and spent a decade building for myself and others. Too often, teams (including me) built polished ghosts—products without proof. This kit is the antidote: a focused path to learn from customers first and build only what matters.`,
    promise:
      "I'll help you decide faster—validate in days, not months—so you either double down with confidence or walk away early without sunk costs.",
    avatar: {
      src: '/images/founder-avatar.png',
      alt: 'avatar image of Drew MacGibbon',
    },
    portrait: {
      src: '/images/founder-portrait.png',
      alt: 'portrait image of Drew MacGibbon',
    },
    skills: ['Business', 'Full-stack development', 'Product strategy'],
    domains: ['Validation-first products'],
    highlights: [
      '10+ years in business',
      '6+ years as full-stack developer',
      'Product-focused, results-driven',
    ],
    links: [
      {
        platform: 'youtube',
        label: 'YouTube',
        url: 'https://www.youtube.com/@Incubrain',
      },
      {
        platform: 'github',
        label: 'GitHub',
        url: 'https://github.com/incubrain',
      },
      { platform: 'x', label: 'X', url: 'https://x.com/incubrain' },
      { platform: 'mail', label: 'Email', url: 'mailto:mac@incubrain.org' },
    ],
  },

  positioning: {
    sections: {
      intro: {
        icon: 'i-lucide-target',
        headline: 'Competitive Analysis',
        title: 'Why this approach wins',
        description:
          'See how we stack up against alternatives and why our method gets results faster',
      },
      separators: {
        comparison: {
          label: 'Feature Comparison',
          description: 'Side-by-side breakdown of approaches and outcomes',
        },
      },
      bridge: {
        headline: 'Ready to see it in action?',
        message:
          "Now that you understand the approach, let's walk through exactly how it works",
        cta: {
          label: 'See How It Works',
          to: '#product',
          icon: 'i-lucide-arrow-down',
        },
      },
    },
    category: "We're open-source | Star us on GithHub",
    affiliations: [
      { name: 'Nuxt', logo: 'i-logos-nuxt-icon', note: 'v4' },
      { name: 'Nuxt UI', logo: 'i-logos-nuxt-icon', note: 'v4' },
      { name: 'Tailwind', logo: 'i-logos-tailwindcss-icon', note: 'v4' },
      {
        name: 'Tailwind Variants',
        logo: 'i-lucide-trending-up-down',
        note: 'Latest',
      },
      { name: 'TypeScript', logo: 'i-logos-typescript-icon', note: 'v5.8+' },
    ],
    approach: [
      {
        title: 'Ship working validation pages in hours, not weeks',
        description:
          'Clone, configure, and deploy with minimal setup. No complex frameworks or lengthy development cycles.',
        icon: 'i-lucide-zap',
      },
      {
        title: 'Get structured feedback from real users immediately',
        description:
          'Proven playbook templates help you collect high-signal feedback from your network within 48 hours.',
        icon: 'i-lucide-message-square-text',
      },
      {
        title: 'Track meaningful metrics without vendor lock-in',
        description:
          'Pre-configured analytics events work with any provider. Own your data, choose your tools.',
        icon: 'i-lucide-bar-chart-3',
      },
      {
        title: 'Distribute to social networks with proven templates',
        description:
          'Ready-made messaging templates and distribution strategies maximize reach and response rates.',
        icon: 'i-lucide-share-2',
      },
      {
        title: 'Decide fast: validate or pivot within days',
        description:
          'Clear success metrics and decision frameworks help you move forward with confidence or cut losses early.',
        icon: 'i-lucide-compass',
      },
      {
        title: 'Build community while you validate',
        description:
          'Turn validation into relationship-building. Create advocates before you create customers.',
        icon: 'i-lucide-users',
      },
    ],
    comparison: {
      tiers: [
        {
          id: 'us',
          title: 'Product Validator',
          highlight: true,
        },
        {
          id: 'option-a',
          title: 'DIY',
        },
        {
          id: 'option-b',
          title: 'Agency',
        },
      ],
      sections: [
        {
          title: 'Key Differences',
          features: [
            {
              title: 'Speed to validation',
              tiers: {
                'us': '1-2 days',
                'option-a': '2-4 weeks (custom build)',
                'option-b': '1-3 months',
              },
            },
            {
              title: 'Cost',
              tiers: {
                'us': '$50 + hosting',
                'option-a': '$5k-15k',
                'option-b': '$10k-50k',
              },
            },
            {
              title: 'Analytics setup',
              tiers: {
                'us': 'Pre-configured events',
                'option-a': 'Manual integration',
                'option-b': 'Complex dashboard',
              },
            },
          ],
        },
        {
          title: 'Setup & Launch',
          features: [
            {
              title: 'Time to validation',
              tiers: {
                'us': '1-2 days',
                'option-a': '2-4 weeks',
                'option-b': '1-3 months',
              },
            },
            {
              title: 'Technical requirements',
              tiers: {
                'us': 'Basic Git/Node.js',
                'option-a': 'Full dev stack',
                'option-b': 'Agency managed',
              },
            },
          ],
        },
        {
          title: 'Ongoing Support',
          features: [
            {
              title: 'Community access',
              tiers: {
                'us': 'Discord + YouTube',
                'option-a': 'Stack Overflow',
                'option-b': 'Account manager',
              },
            },
          ],
        },
      ],
    },
  },

  product: {
    sections: {
      intro: {
        icon: 'i-lucide-package',
        headline: 'Step-by-Step Process',
        title: 'How it works',
        description: 'From idea to validation in three focused steps',
      },
      bridge: {
        headline: 'See the value?',
        message:
          'Get started with our validation bundle and turn your idea into evidence',
        cta: { label: 'Get Early Access', to: '#offers', icon: 'i-lucide-zap' },
      },
    },
    elevator:
      'A Nuxt template laser-focused on one question: "Should we build it?"',
    media: {
      type: 'video',
      src: '/videos/test-audio.mp4',
      alt: 'Course preview showing validation process',
    },
    flow: [
      {
        id: 'configure',
        title: 'Configure',
        description: 'Set your headline, value prop, and CTA.',
        content: [
          {
            type: 'text',
            value:
              "Clone the repository, update your messaging in the config file, and customize your value proposition. No complex setup required - just edit JSON and you're ready to deploy.",
          },
          {
            type: 'video',
            src: '/videos/configure-step.mp4',
            alt: 'Configuring your landing page',
          },
          {
            type: 'list',
            style: 'checks',
            items: ['Clone repository', 'Edit config file', 'Deploy'],
          },
        ],
      },
      {
        id: 'launch',
        title: 'Launch & Share',
        description: 'Deploy and push to your network.',
        content: [
          {
            type: 'text',
            value:
              'Deploy to Vercel or Netlify with one click. Share with your target audience through social media, email lists, or direct outreach to start gathering real validation data.',
          },
          {
            type: 'video',
            src: '/videos/launch-step.mp4',
            alt: 'Launching and sharing your page',
          },
          {
            type: 'list',
            style: 'checks',
            items: [
              'Deploy with one-click to Vercel/Netlify',
              'Share in relevant communities and networks',
              'Send to your email list and social followers',
              'Reach out directly to 10-20 target users',
            ],
          },
        ],
      },
      {
        id: 'measure',
        title: 'Measure',
        description: 'Track clicks, signups, and resonance.',
        content: [
          {
            type: 'text',
            value:
              'Built-in analytics track visitor behavior, conversion rates, and engagement metrics. See which headlines perform best and identify the strongest interest signals.',
          },
          {
            type: 'video',
            src: '/videos/measure-step.mp4',
            alt: 'Measuring and tracking results',
          },
          {
            type: 'list',
            style: 'checks',
            items: [
              'Track visitor behavior and conversion rates',
              'Monitor which headlines perform best',
              'Identify strongest interest signals',
              'Collect qualitative feedback via surveys',
            ],
          },
        ],
      },
    ],
  },

  socialProof: {
    sections: {
      intro: {
        icon: 'i-lucide-users',
        headline: 'Community Wins',
        title: 'What early users say',
        description:
          'Real results from founders using the validation-first approach',
      },
      bridge: {
        headline: 'Still have questions?',
        message:
          'Get answers to common concerns and objections about the validation approach',
        cta: {
          label: 'Get Answers',
          to: '#questions',
          icon: 'i-lucide-help-circle',
        },
      },
    },
    items: [
      // Highlight card - CTA to Twitter/X
      {
        type: 'highlight',
        title: 'Your testimonial could be here',
        description:
          'Share your validation wins and help others learn from your journey.',
        icon: 'i-simple-icons-x',
        to: 'https://x.com/incubrain',
      },
      // Mock testimonials (clearly labeled as examples)
      {
        type: 'testimonial',
        quote:
          'Finally shipped after 6 months of "perfecting" my side project. The template forced me to focus on what actually matters.',
        name: 'Alex Chen',
        role: 'Example Testimonial*',
        avatarUrl: 'https://i.pravatar.cc/150?img=11',
      },
      {
        type: 'testimonial',
        quote:
          'Deployed on Tuesday, had 200 email signups by Friday. Sometimes you just need to hit publish and see what happens.',
        name: 'Taylor Kim',
        role: 'Example Testimonial*',
        avatarUrl: 'https://i.pravatar.cc/150?img=32',
      },
      {
        type: 'testimonial',
        quote:
          'My perfectionist brain hated this template at first. Then I realized that was exactly the point.',
        name: 'Jordan Rivera',
        role: 'Example Testimonial*',
        avatarUrl: 'https://i.pravatar.cc/150?img=68',
      },
      {
        type: 'testimonial',
        quote:
          'Stopped overthinking and started shipping. Three validation pages later, I found my winning idea.',
        name: 'Sarah Chen',
        role: 'Example Testimonial*',
        avatarUrl: 'https://i.pravatar.cc/150?img=44',
      },
      {
        type: 'testimonial',
        quote:
          'The template forced me out of perfectionist mode. Best $50 I spent on my startup journey.',
        name: 'Marcus Rodriguez',
        role: 'Example Testimonial*',
        avatarUrl: 'https://i.pravatar.cc/150?img=52',
      },
      // Case studies
      {
        type: 'case-study',
        title: 'Incubrain Launch (WIP)',
        situation:
          'Building validation template while using it to validate our own product',
        action:
          'Eating our own dog food - using this exact template for incubrain.org',
        result:
          'Work in progress - follow our journey and learnings in real-time',
        metric: {
          label: 'Status',
          value: 'Building in public',
          sub: 'Real data coming soon',
        },
        link: 'https://incubrain.org',
      },
      {
        type: 'case-study',
        title: 'Your success story here',
        situation: 'You have an idea but struggle with validation paralysis',
        action: 'Use this template to ship fast and gather real feedback',
        result: 'Data-driven decisions instead of endless iteration',
        metric: {
          label: 'Your metric',
          value: 'Your result',
          sub: 'Your timeline',
        },
        link: 'https://x.com/incubrain',
      },
    ],
  },

  offers: {
    sections: {
      intro: {
        icon: 'i-lucide-handshake',
        headline: 'Validation Bundle',
        title: 'Choose your path',
        description: 'Get the template, strategy, and support to validate fast',
      },
      bridge: {
        headline: 'Questions about fit?',
        message:
          'Meet the founder behind this approach and see if it aligns with your goals',
        cta: {
          label: 'Meet the Founder',
          to: '#founder',
          icon: 'i-lucide-user',
        },
      },
    },
    items: [
      {
        id: 'product',
        name: 'Validator Accelerator',
        description: 'Complete validation course with community access',
        price: '$50',
        compareAt: '$150',
        benefits: [
          {
            text: 'YouTube review of your product page',
            value: 200,
            status: 'available',
          },
          {
            text: '2 selected founders get 1-month 1:1 coaching',
            value: 2000,
            status: 'available',
          },
          {
            text: '30-day validation roadmap (step-by-step)',
            status: 'coming-soon',
          },
          {
            text: 'Asset resource database + AI generation guides',
            status: 'coming-soon',
          },
          {
            text: 'Proven AI prompts for setup & optimization',
            status: 'coming-soon',
          },
          { text: 'Idea assessment framework', status: 'coming-soon' },
        ],
        cta: {
          label: 'Join Course',
          to: 'https://whop.com/incubrain-community/product-validator',
          icon: 'i-lucide-shopping-cart',
          variant: 'solid',
          color: 'primary',
          note: 'Secure your spot',
        },
        inventory: { total: 50, claimed: 7 },
      },
      {
        id: 'magnet',
        name: 'Use Template',
        price: 'Free',
        description: "We're open-source",
        benefits: [
          { text: 'Validation Template', status: 'available' },
          { text: 'Analytics Integration', status: 'available' },
          { text: 'Configuration Driven', status: 'beta' },
          { text: 'Community Support', status: 'beta' },
        ],
        cta: {
          label: 'Star us on GitHub',
          to: 'https://github.com/incubrain/product-validator',
          icon: 'i-lucide-layout-panel-top',
          variant: 'outline',
          color: 'neutral',
          note: 'No credit card required',
        },
      },
      {
        id: 'direct',
        name: 'Hire Me (Support Open Source)',
        description:
          'Get expert Nuxt development while supporting continued template development and community resources',
        price: '$27/hour',
        benefits: [
          {
            text: 'Expert Nuxt 4 + TypeScript development',
            status: 'available',
          },
          { text: 'Validation-first product strategy', status: 'available' },
          {
            text: 'Landing page optimization & analytics',
            status: 'available',
          },
          {
            text: 'Template updates funded by your project',
            status: 'available',
          },
        ],
        cta: {
          label: 'Hire on Upwork',
          to: 'https://www.upwork.com/freelancers/~01b4c32258ac48835f?mp_source=share',
          icon: 'i-lucide-handshake',
          variant: 'solid',
          color: 'secondary',
          note: 'Help keep this template free & updated',
        },
      },
      {
        id: 'social',
        name: 'YouTube Validator Reviews',
        description: 'Learn from real validation examples',
        price: 'Free',
        benefits: [
          { text: 'Public landing page critiques', status: 'available' },
          { text: 'Real validation examples', status: 'available' },
          { text: 'Community learning', status: 'available' },
          { text: 'Free feedback', status: 'available' },
        ],
        cta: {
          label: 'Watch Critiques',
          to: 'https://www.youtube.com/@Incubrain',
          icon: 'i-lucide-youtube',
          variant: 'solid',
          color: 'error',
        },
      },
    ],
  },

  questions: {
    sections: {
      intro: {
        icon: 'i-lucide-message-circle',
        headline: 'Common Questions',
        title: 'Frequently asked questions',
        description: 'Addressing concerns, objections, and fit considerations',
      },
    },
    items: [
      // Warning
      {
        q: 'What are the technical requirements?',
        a: 'Template requires basic dev setup (Node.js, Git). Best results need active sharing and feedback collection. A/B testing requires some traffic to be meaningful.',
        type: 'warning',
      },
      {
        q: 'Who is this NOT suitable for?',
        a: 'Not suitable for post-PMF companies scaling existing products, non-technical founders without dev support, ideas requiring complex demos, or B2B enterprise sales with long evaluation cycles.',
        type: 'warning',
      },
      // Objections
      {
        q: 'I can just build a simple landing page myself',
        a: "True, but you'll spend weeks on setup, analytics integration, copywriting, product ideation, and distribution strategy. This gives you the validation framework immediately.",
        type: 'objection',
      },
      {
        q: 'Why not use a no-code tool like Webflow?',
        a: 'No-code tools are great for marketing sites, but often cost to get started, require design knowhow, knowledge about product messaging structure, and most importantly they are less flexable for when you decide to build; not to mention lock-in!',
        type: 'objection',
      },
      {
        q: '$50 seems expensive for a template',
        a: 'The template is free on GitHub. The $50 gets you the validation course, critique review, and coaching opportunity - potentially saving months of wrong direction.',
        type: 'objection',
      },
      // Support
      {
        q: 'What support is available?',
        a: 'We respond within 48 hours via GitHub issues, Email, YouTube comments, or Community Discord.',
        type: 'support',
      },
      // General
      {
        q: 'Is the template free and open-source?',
        a: 'Yes. Free for personal and commercial use (see repo license).',
        type: 'general',
      },
      {
        q: 'How is the course priced?',
        a: '$50 early-bird bundle (first 50 spots at this price, then it increases).',
        type: 'general',
      },
      {
        q: "What's included in the Validator Bundle?",
        a: 'Template setup, validation strategy, social-first distribution, reading signals, and prioritizing iterations.',
        type: 'general',
      },
      {
        q: 'How do analytics work?',
        a: 'The template emits Nuxt events (views, clicks, conversions, variant views). You wire them to any analytics provider.',
        type: 'general',
      },
      {
        q: 'Where can I watch critiques?',
        a: 'On our YouTube channel: https://www.youtube.com/@Incubrain',
        type: 'general',
      },
      {
        q: 'Can I hire you?',
        a: 'Yes. "Hire me" links are available in the nav and footer.',
        type: 'general',
      },
    ],
  },
} satisfies FlowConfig;
