// flow.config.ts
// Opinionated content model for product ideation → landing-page copy.
// Each section below is commented as if it were a separate file (01..08),
// but kept together here so you can iterate the structure in one place.

// -----------------------------------------------------------------------------
// Shared primitives
// -----------------------------------------------------------------------------
type Link = { platform: string; label: string; url: string };

type Cta = {
  label: string;
  href: string;
  note?: string;
  icon?: string;
  color?: string;
  variant?: string;
  labelMobile?: string;
  disabled?: boolean;
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
  source?: string; // URL, doc id, or “Customer: ACME”
  strength?: Scale1to5; // confidence in this item
};

type Hypothesis = {
  // Problem object
  problem: {
    statement: string; // What is the problem
    frequency?: string; // How often is it a problem
    severity: string; // How painful is the problem
    triggers: string[]; // What causes the problem
    evidence: EvidenceItem[]; // How do I know it's a problem
    evolution: string; // Will it continue to be a problem
    cost: string; // What will it cost you if you don't sove it
    solution: {
      // How will I solve it for you
      claim: string; // Bold Claim
      pitch: string; // Claim Explanation
      promise: string; // Minimum Outcome
      risks?: { label: string; mitigation: string }[]; // What could make this untrue?
    };
  };

  // Customer Profiles - Who is this a problem for
  customerProfiles: {
    id: string;
    label: string; // Who are they
    primary?: boolean; // Is this our main focus
    pains: {
      // What causes this to be a problem for them
      label: string; // What is the pain
      severity: string; // How bad is it
      cost?: string; // Will it cost them if unsolved?
    }[];
    outcomes: {
      // What are the desired outcomes
      label: string; // Desired outcome
      target: number; // Desired timeframe
    }[];
  }[];
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

type Founder = {
  name: string;
  business: BusinessInfo;
  role: string;
  bioShort: string;
  bioLong?: string;
  backgroundStory?: string;
  promise?: string;
  avatarUrl?: string;
  portraitUrl?: string;
  skills: string[];
  domains: string[];
  highlights?: string[];
  links?: Link[];
};

// -----------------------------------------------------------------------------
// 02) Positioning (USP)
// -----------------------------------------------------------------------------
type Positioning = {
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

type FaqItem = {
  q: string;
  a: string;
  type: 'general' | 'objection' | 'warning' | 'support';
};

// -----------------------------------------------------------------------------
// 08) Offer (pricing & CTA)
// -----------------------------------------------------------------------------
type Offer = {
  id: string;
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
  guarantee?: string;
  inventory?: { total: number; claimed: number };
};

export type FlowConfig = {
  hypothesis: Hypothesis;
  positioning: Positioning;
  product: Product;
  offers: Offer[];
  founder: Founder;
  socialProof: SocialProof[];
  questions: FaqItem[];
};

export const flowConfig = {
  hypothesis: {
    problem: {
      statement:
        'Technical experts build impressive products but struggle to package and market their expertise effectively',
      frequency:
        'Chronic issue affecting most technical founders throughout their careers',
      severity:
        'Career-limiting - prevents monetizing years of valuable experience',
      triggers: [
        'Perfectionist tendencies leading to endless iteration',
        'Preference for building over marketing',
        'Lack of structured validation process',
        "Fear of putting 'imperfect' work in public",
      ],
      evidence: [
        {
          type: 'personal_experience',
          summary:
            'Built 10+ products that never launched due to perfectionism',
          strength: 5,
        },
        {
          type: 'interview',
          summary:
            'Interviewed 50 developers - 80% had unshipped side projects',
          source: 'Dev community survey 2024',
          strength: 4,
        },
      ],
      evolution:
        'Problem worsening as tech moves faster and competition increases',
      cost: 'Years of wasted development time, missed revenue opportunities, career stagnation',
      solution: {
        claim: 'Validate in days, not months, or years!',
        pitch:
          'Pre-built template removes technical friction, forcing rapid validation over perfectionism',
        promise: 'Get real feedback on your idea within 48 hours of setup',
        risks: [
          {
            label: 'Requires basic technical skills',
            mitigation:
              'Provides step-by-step setup guide and community support',
          },
          {
            label:
              'Success depends on user actively sharing and collecting feedback',
            mitigation: 'Includes proven distribution playbook and templates',
          },
        ],
      },
    },

    customerProfiles: [
      {
        id: 'technical-founders',
        label: 'Technical Founders',
        primary: true,
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
        ],
        outcomes: [
          {
            label: 'Launch validation page',
            target: 1, // 1 day
          },
          {
            label: 'Collect meaningful feedback',
            target: 7, // 1 week
          },
          {
            label: 'Make go/no-go decision',
            target: 30, // 1 month
          },
        ],
      },
      {
        id: 'expert-consultants',
        label: 'Expert Consultants',
        pains: [
          {
            label: 'Difficulty packaging expertise into products',
            severity: 'High - limits scaling potential',
            cost: 'Stuck in time-for-money trap',
          },
        ],
        outcomes: [
          {
            label: 'Test productized offering',
            target: 3, // 3 days
          },
          {
            label: 'Validate market demand',
            target: 14, // 2 weeks
          },
        ],
      },
    ],
  },

  founder: {
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
    avatarUrl: 'https://github.com/Drew-MacGibbon.png',
    portraitUrl: 'https://github.com/Drew-MacGibbon.png',
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
    category: 'Validation-first landing page kit',
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
    ],
    comparison: {
      tiers: [
        {
          id: 'launch-kit',
          title: 'Launch Kit',
          highlight: true,
        },
        {
          id: 'alternative-a',
          title: 'DIY',
        },
        {
          id: 'alternative-b',
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
                'launch-kit': '1-2 days',
                'alternative-a': '2-4 weeks (custom build)',
                'alternative-b': '1-3 months',
              },
            },
            {
              title: 'Cost',
              tiers: {
                'launch-kit': '$50 + hosting',
                'alternative-a': '$5k-15k',
                'alternative-b': '$10k-50k',
              },
            },
            {
              title: 'Analytics setup',
              tiers: {
                'launch-kit': 'Pre-configured events',
                'alternative-a': 'Manual integration',
                'alternative-b': 'Complex dashboard',
              },
            },
          ],
        },
      ],
    },
  },

  product: {
    elevator:
      'A Nuxt template laser-focused on one question: "Should we build it?"',
    media: {
      type: 'video',
      src: '/videos/course-preview.mp4',
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
        ],
      },
    ],
  },

  socialProof: [
    {
      type: 'testimonial',
      quote:
        'Launched the same day, got feedback overnight, and iterated the copy by morning. The A/B flags are clutch.',
      name: 'Alex P.',
      role: 'Indie hacker',
      avatarUrl: 'https://i.pravatar.cc/150?img=11',
    },
    {
      type: 'testimonial',
      quote:
        'The critique video pinpointed exactly where my value prop was muddy. Conversion improved with a tighter CTA.',
      name: 'Samira K.',
      role: 'Founder',
      avatarUrl: 'https://i.pravatar.cc/150?img=12',
    },
    // Highlight card
    {
      type: 'highlight',
      title: 'Real-world feedback',
      description:
        'Short, actionable critiques deliver outsized learning. Ship faster with clearer messaging.',
      icon: 'i-lucide-megaphone',
      to: '#',
    },
    // Case studies
    {
      type: 'case-study',
      title: 'SaaS Tool Validation',
      situation: 'Founder had 3 competing product ideas, limited budget',
      action: 'Built 3 landing pages, ran A/B tests on headlines and CTAs',
      result:
        'One idea got 12% conversion vs 2% others. Clear winner in 5 days.',
      metric: {
        label: 'Decision speed',
        value: '5 days',
        sub: 'vs 3 months planned',
      },
    },
    {
      type: 'case-study',
      title: 'B2B Service Launch',
      situation: 'Consultancy testing new service offering',
      action: 'Used playbook to get feedback from 50 existing clients',
      result: '8 pre-orders worth $24k before building the service',
      metric: {
        label: 'Pre-validation revenue',
        value: '$24k',
        sub: '8 confirmed orders',
      },
      link: 'https://example.com/case-study',
    },
  ],

  offers: [
    {
      id: 'validator-course',
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
        label: 'Buy Now',
        href: 'https://whop.com/incubrain-community/product-validator',
        icon: 'i-lucide-play',
        variant: 'solid',
        color: 'primary',
        note: 'Secure your spot',
      },
      guarantee: 'Lock in $50 early-bird price',
      inventory: { total: 50, claimed: 7 },
    },
    {
      id: 'template-free',
      name: 'Use Template',
      price: 'Free',
      description: 'Open-source Nuxt template with validation features',
      benefits: [
        { text: 'Validation Template', status: 'available' },
        { text: 'Analytics Integration', status: 'available' },
        { text: 'Configuration Driven', status: 'beta' },
        { text: 'Community Support', status: 'beta' },
      ],
      cta: {
        label: 'Use Template (Free)',
        href: 'https://github.com/incubrain/nuxt-launch-kit',
        icon: 'i-lucide-layout-panel-top',
        variant: 'outline',
        color: 'neutral',
        note: 'No credit card required',
      },
    },
    {
      id: 'hire-direct',
      name: 'Hire Me Directly',
      description: 'Custom validation strategy & implementation',
      price: 'From $2,500',
      benefits: [
        { text: 'Custom landing page development', status: 'available' },
        { text: 'Validation strategy consultation', status: 'available' },
        { text: 'Analytics implementation', status: 'available' },
        { text: 'Ongoing optimization support', status: 'available' },
      ],
      cta: {
        label: 'Schedule Consultation',
        href: 'mailto:mac@incubrain.org?subject=Direct Hire Inquiry',
        icon: 'i-lucide-calendar',
        variant: 'solid',
        color: 'secondary',
        note: 'Custom pricing available',
      },
    },
  ],

  questions: [
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
      a: 'Template setup, validation strategy, A/B tests, social-first distribution, reading signals, and prioritizing iterations.',
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
} satisfies FlowConfig;
