// shared/config/business.ts
export interface FounderConfig {
  firstName: string; // "Drew"
  lastName: string; // "MacGibbon"
  title: string; // "Full-Stack Developer & Launch Expert"

  // Short, 1-sentence value statement used in footer/mobile etc.
  shortMessage: string; // ~80–120 chars

  // Long mission + why (used in Founder Note / About)
  longMessage: string; // ~120–240 words (2–4 short paragraphs)

  // Trust / expertise bullets (3–6 items)
  expertise: Array<{
    label: string; // "10+ years in business"
    icon?: string; // e.g. 'i-lucide-briefcase'
  }>;

  // Personal background — 1 short story (optional)
  backgroundStory?: string; // ~80–150 words

  // Clear promise/commitment to the user
  promise: string; // ~1–2 sentences

  // Media + profile
  avatar: { src: string; alt?: string };
  socials?: Array<{
    label: string;
    icon: string;
    to: string;
    target?: '_blank' | '_self';
  }>;
}

export interface BusinessConfig {
  business: {
    name: string;
    url: string;
    tagline: string;
    description: string;
    legal_name: string;
    founding_year: number;

    // Authority Building
    founder: FounderConfig;

    // Geographic Authority
    location: {
      city: string;
      state: string;
      country: string;
      timezone: string;
    };
  };

  // Contact Information
  contact: {
    email: string;
    phone: string;
    business_hours: string;

    // Primary/Secondary Contact Methods
    primary: string;
    secondary: string;

    // Full URLs for schema.org integration
    social: {
      github: string;
      linkedin: string;
      twitter: string;
      community: string;
    };
  };

  // Goals/Conversion
  goals: {
    primary: string;
    secondary: string;
  };
}

export const businessConfig: BusinessConfig = {
  business: {
    name: 'Nuxt Launch Kit',
    url: import.meta.dev ? 'localhost:3000' : 'incubrain.org',
    tagline: 'From Idea to Launch in Days, Not Months',
    description: 'Ship faster with our proven Nuxt Launch Kit and community',
    legal_name: 'Incubrain Pvt. Ltd.',
    founding_year: 2023,

    founder: {
      firstName: 'Drew',
      lastName: 'MacGibbon',
      title: 'Product Strategist & Builder',

      shortMessage:
        'Ship faster with a validation-first mindset: decide with evidence, not wishful features.',

      longMessage: `I built this kit to help founders avoid the trap I fell into for years: perfecting features before anyone cared. Validation isn't about shipping *more*—it's about shipping **signal**. 
     The goal is clarity, speed, and evidence. Publish a high-signal page, share it with real people, capture interest, test your message, and only then decide whether to invest. This template removes friction so the decision loop is days—not months.`,

      expertise: [
        { label: '10+ years in business', icon: 'i-lucide-briefcase' },
        { label: '6+ years as full-stack developer', icon: 'i-lucide-code' },
        { label: 'Product-focused, results-driven', icon: 'i-lucide-target' },
      ],

      backgroundStory: `I started my first business at 19 and spent a decade building for myself and others. Too often, teams (including me) built polished ghosts—products without proof. This kit is the antidote: a focused path to learn from customers first and build only what matters.`,

      promise:
        'I’ll help you decide faster—validate in days, not months—so you either double down with confidence or walk away early without sunk costs.',

      avatar: {
        src: 'https://github.com/Drew-MacGibbon.png',
        alt: 'Drew MacGibbon',
      },
      socials: [
        {
          label: 'YouTube',
          icon: 'i-simple-icons-youtube',
          to: 'https://www.youtube.com/@Incubrain',
          target: '_blank',
        },
        {
          label: 'GitHub',
          icon: 'i-simple-icons-github',
          to: 'https://github.com/incubrain',
          target: '_blank',
        },
        {
          label: 'X',
          icon: 'i-simple-icons-x',
          to: 'https://x.com/incubrain',
          target: '_blank',
        },
        {
          label: 'Email',
          icon: 'i-lucide-mail',
          to: 'mailto:mac@incubrain.org',
        },
      ],
    },

    // Geographic Authority
    location: {
      city: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      timezone: 'Asia/Kolkata',
    },
  },

  // Contact Information
  contact: {
    email: 'mac@incubrain.org',
    phone: '+91-8421399956',
    business_hours: '24/7 Community Support',

    // Primary/Secondary Contact Methods
    primary: 'https://whop.com/c/incubrain-community/launch-kit',
    secondary: 'https://github.com/incubrain/nuxt-launch-kit',

    // Full URLs for schema.org integration
    social: {
      github: 'https://github.com/incubrain/nuxt-launch-kit',
      linkedin: 'https://www.linkedin.com/company/incubrain',
      twitter: 'https://twitter.com/incubrain',
      community: 'https://whop.com/experiences/exp_3irNegyjJ8ahwA',
    },
  },

  // Goals/Conversion
  goals: {
    primary: 'hire_me',
    secondary: 'github_star',
  },
} as const;

// Helper function to access nested config values
export function getBusinessConfig<T extends keyof BusinessConfig>(
  section: T,
): BusinessConfig[T] {
  return businessConfig[section];
}

// Convenience exports for common usage patterns
export const {
  business: businessInfo,
  contact: contactInfo,
} = businessConfig;

// Type-safe getters for template usage
export const getContactInfo = () => contactInfo;
export const getBusinessInfo = () => businessInfo;
export const getFounderInfo = () => businessInfo.founder;


export default businessConfig;
