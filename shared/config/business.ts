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
      discord: string
    }
  }

  // Service Authority
  services: {
    categories: string[]
    specialties: string[]
  }

  // Repetitive Content/Stats
  stats: {
    deploy_time: string
    projects_count: string
    dev_time_saved: string
    seo_ready: string
  }

  // Goals/Conversion
  goals: {
    primary: string
    secondary: string
  }
}

export const businessConfig: BusinessConfig = {
  business: {
    name: 'Incubrain',
    url: import.meta.dev ? 'localhost:3000' : 'incubrain.org',
    tagline: 'AI-Native Development Team',
    description: 'We build AI automation that pays for itself',
    legal_name: 'Incubrain Private Limited',

    // Authority Building
    founder: {
      name: 'Drew MacGibbon',
      title: 'AI Automation Expert',
      bio: '13 years business building, 6 years SaaS development',
      experience: '6 years SaaS development',
      credentials: [
        'AWS Certified',
        'Space Tech Veteran',
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
    email: 'hello@incubrain.org',
    phone: '+91-123-456-7890',
    business_hours: '9 AM - 6 PM IST, Mon-Fri',

    // Primary/Secondary Contact Methods
    primary: 'https://wa.me/1234567890',
    secondary: 'https://github.com/incubrain/nuxt-launch-kit',

    // Full URLs for schema.org integration
    social: {
      github: 'https://github.com/incubrain',
      linkedin: 'https://www.linkedin.com/company/incubrain',
      twitter: 'https://twitter.com/incubrain',
      discord: 'https://discord.gg/zSGHvNZXAa',
    },
  },

  // Service Authority
  services: {
    categories: [
      'AI Automation',
      'Custom Development',
      'Business Consultation',
    ],
    specialties: [
      'Process Automation',
      'Space Tech Integration',
      'Global-Local Execution',
    ],
  },

  // Repetitive Content/Stats
  stats: {
    deploy_time: '24 hours',
    projects_count: '50+',
    dev_time_saved: '90%',
    seo_ready: '100%',
  },

  // Goals/Conversion
  goals: {
    primary: 'template_download',
    secondary: 'consultation_booking',
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
