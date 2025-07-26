// composables/useConfig.ts
export const useConfig = (configName: string) => {
  const configs = {
    business: {
      // Core Business Identity
      business_name: 'IncuBrain Ltd',
      business_tagline: 'AI-Native Development Team',
      business_description: 'We build AI automation that pays for itself',

      // Founder Data
      founder_name: 'Drew MacGibbon',
      founder_title: 'AI Automation Expert',
      founder_bio: '13 years business building, 6 years SaaS development',
      founder_experience: '6 years SaaS development',

      // Contact Info
      contact_email: 'hello@incubrain.org',
      contact_phone: '+91-123-456-7890',
      contact_primary: 'https://wa.me/1234567890',
      contact_secondary: 'https://github.com/incubrain/nuxt-launch-kit',

      // Social Links
      social_github: 'https://github.com/incubrain',
      social_linkedin: 'https://www.linkedin.com/company/incubrain',
      social_twitter: 'https://twitter.com/incubrain',
      social_discord: 'https://discord.gg/zSGHvNZXAa',

      // Stats & Metrics
      stats_deploy_time: '24 hours',
      stats_projects_count: '50+',
      stats_dev_time_saved: '90%',
      stats_seo_ready: '100%',

      // Goals
      goals_primary: 'template_download',
      goals_secondary: 'consultation_booking',
    },
  }

  return configs[configName as keyof typeof configs] || {}
}
