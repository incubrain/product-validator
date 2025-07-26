// composables/useIntentConfig.ts - HARD-CODED & SIMPLE
import type { WebsiteIntentConfig, EmotionalTrigger, WebsiteGoal } from '#shared/types/website-intention'

export const useIntentConfig = () => {
  // Hard-coded website intent config
  const websiteConfig: WebsiteIntentConfig = {
    primaryIntent: 'trust',
    secondaryIntent: 'authority',
    primaryGoal: 'convert',
    secondaryGoal: 'credibility',
  }

  // Simple alternating pattern: Primary -> Secondary -> Primary -> Secondary
  const getSectionIntent = (sectionIndex: number): EmotionalTrigger => {
    const pattern = ['primary', 'primary', 'secondary', 'secondary', 'primary', 'secondary'] as const
    const patternIndex = sectionIndex % pattern.length
    const intentType = pattern[patternIndex]

    return intentType === 'primary'
      ? websiteConfig.primaryIntent
      : websiteConfig.secondaryIntent
  }

  return {
    websiteConfig,
    getSectionIntent,
  }
}
