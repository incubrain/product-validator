// composables/useConfig.ts
import { businessConfig } from '#shared/config/business'

export const useConfig = (configName: string) => {
  const configs = {
    business: {
      // Core Business Identity
      business_name: businessConfig.business.name,
      business_tagline: businessConfig.business.tagline,
      business_description: businessConfig.business.description,
      business_url: businessConfig.business.url,
      business_legal_name: businessConfig.business.legal_name,

      // Founder Data
      founder_name: businessConfig.business.founder.name,
      founder_title: businessConfig.business.founder.title,
      founder_bio: businessConfig.business.founder.bio,
      founder_experience: businessConfig.business.founder.experience,

      // Contact Info
      contact_email: businessConfig.contact.email,
      contact_phone: businessConfig.contact.phone,
      contact_hours: businessConfig.contact.business_hours,
      contact_primary: businessConfig.contact.primary,
      contact_secondary: businessConfig.contact.secondary,

      // Social Links
      social_github: businessConfig.contact.social.github,
      social_linkedin: businessConfig.contact.social.linkedin,
      social_twitter: businessConfig.contact.social.twitter,
      social_community: businessConfig.contact.social.community,

      // Stats & Metrics
      stats_setup_time: businessConfig.stats.setup_time,
      stats_launch_ready: businessConfig.stats.launch_ready,
      stats_components_included: businessConfig.stats.components_included,
      stats_time_saved: businessConfig.stats.time_saved,

      // Goals
      goals_primary: businessConfig.goals.primary,
      goals_secondary: businessConfig.goals.secondary,

      // Location
      location_city: businessConfig.business.location.city,
      location_state: businessConfig.business.location.state,
      location_country: businessConfig.business.location.country,
      location_timezone: businessConfig.business.location.timezone,

      // Services
      service_categories: businessConfig.services.categories,
      service_specialties: businessConfig.services.specialties,
    },
  }

  return configs[configName as keyof typeof configs] || {}
}
