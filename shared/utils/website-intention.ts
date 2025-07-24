// shared/utils/intent-analytics.ts
export const UNIVERSAL_PURPOSES = {
  primary_service: 'main_business_conversion',
  join_team: 'talent_acquisition',
  get_consultation: 'sales_consultation',
  learn_primary: 'educational_engagement',
  learn_secondary: 'content_discovery',
  contact_support: 'customer_support',
  community_join: 'community_building',
} as const

export type UniversalIntention = keyof typeof UNIVERSAL_PURPOSES
export type BusinessPurposes = (typeof UNIVERSAL_PURPOSES)[UniversalIntention]

export function trackIntentInteraction(
  intent: UniversalIntention,
  component: string,
  context: any,
) {
  const purposeData = {
    intent,
    purpose: UNIVERSAL_PURPOSES[intent],
    component,
    timestamp: Date.now(),
    context: {
      title: context.title,
      page: context.pagePath,
    },
  }

  // Simple logging for now - easy to extend
  console.log('🎯 Intent Interaction:', purposeData)

  // Return for search/AI context
  return {
    searchContext: UNIVERSAL_PURPOSES[intent],
    aiContext: `user_intent_${intent}`,
    conversionFunnel: getConversionFunnel(intent),
  }
}

function getConversionFunnel(intent: UniversalIntention): string {
  const funnels = {
    primary_service: 'awareness_to_purchase',
    join_team: 'interest_to_application',
    get_consultation: 'problem_to_solution',
    learn_primary: 'discovery_to_engagement',
  }
  return funnels[intent] || 'general_engagement'
}
