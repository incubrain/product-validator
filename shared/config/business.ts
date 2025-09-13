// shared/config/business.ts
export interface BusinessConfig {
  business: {
    name: string
    url: string
    tagline: string
    description: string
    legal_name: string

    // Authority Building
    founder: {
      name: string
      title: string
      bio: string
      experience: string
      credentials: string[]
    }

    // Geographic Authority
    location: {
      city: string
      state: string
      country: string
      timezone: string
    }
  }

  // Contact Information
  contact: {
    email: string
    phone: string
    business_hours: string

    // Primary/Secondary Contact Methods
    primary: string
    secondary: string

    // Full URLs for schema.org integration
    social: {
      github: string
      linkedin: string
      twitter: string
      community: string
    }
  }

  // Service Authority
  services: {
    categories: string[]
    specialties: string[]
  }

  // Repetitive Content/Stats
  stats: {
    setup_time: string
    launch_ready: string
    components_included: string
    time_saved: string
  }

  // Goals/Conversion
  goals: {
    primary: string
    secondary: string
  }
}

export const businessConfig: BusinessConfig = {
  business: {
    name: 'Nuxt Launch Kit',
    url: import.meta.dev ? 'localhost:3000' : 'incubrain.org',
    tagline: 'From Idea to Launch in Days, Not Months',
    description: 'Ship faster with our proven Nuxt Launch Kit and community',
    legal_name: 'Incubrain Private Limited',

    founder: {
      name: 'Drew MacGibbon',
      title: 'Full-Stack Developer & Launch Expert',
      bio: 'Helped 70+ developers ship faster with proven patterns',
      experience: '6 years building production SaaS applications',
      credentials: [],
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

  // Service Authority
  services: {
    categories: [
      'Launch Kit Components',
      'Developer Community',
      'Production Templates',
    ],
    specialties: [
      'Rapid Prototyping',
      'SEO-Ready Templates',
      'Developer Experience',
    ],
  },

  // Repetitive Content/Stats
  stats: {
    setup_time: '5 minutes',
    launch_ready: '24 hours',
    components_included: '10+',
    time_saved: '90%',
  },

  // Goals/Conversion
  goals: {
    primary: 'hire_me',
    secondary: 'github_star',
  },
} as const

// Helper function to access nested config values
export function getBusinessConfig<T extends keyof BusinessConfig>(section: T): BusinessConfig[T] {
  return businessConfig[section]
}

// Convenience exports for common usage patterns
export const {
  business: businessInfo,
  contact: contactInfo,
  services: servicesInfo,
  stats: statsInfo,
} = businessConfig

// Type-safe getters for template usage
export const getContactInfo = () => contactInfo
export const getBusinessInfo = () => businessInfo
export const getServicesInfo = () => servicesInfo
export const getStatsInfo = () => statsInfo

// Runtime config integration helper
export const getBusinessRuntimeConfig = () => ({
  public: {
    business: businessInfo,
    contact: contactInfo,
    services: servicesInfo,
    stats: statsInfo,
  },
})

export default businessConfig
