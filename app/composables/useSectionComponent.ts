// app/composables/useSectionComponents.ts - COMPLETE VERSION
import type { EmotionalTrigger } from '#shared/types/website-intention'

// Direct imports for tree-shaking
import SectionHeroTrust from '~/components/section/hero/Trust.vue'
import SectionHeroAuthority from '~/components/section/hero/Authority.vue'
import SectionHeroUrgency from '~/components/section/hero/Urgency.vue'

import SectionResultsTrust from '~/components/section/results/Trust.vue'
import SectionResultsAuthority from '~/components/section/results/Authority.vue'
import SectionResultsUrgency from '~/components/section/results/Urgency.vue'

import SectionWorkTrust from '~/components/section/work/Trust.vue'
import SectionWorkAuthority from '~/components/section/work/Authority.vue'
import SectionWorkUrgency from '~/components/section/work/Urgency.vue'

import SectionAboutTrust from '~/components/section/about/Trust.vue'
import SectionAboutAuthority from '~/components/section/about/Authority.vue'
import SectionAboutUrgency from '~/components/section/about/Urgency.vue'

import SectionCtaTrust from '~/components/section/cta/Trust.vue'
import SectionCtaAuthority from '~/components/section/cta/Authority.vue'
import SectionCtaUrgency from '~/components/section/cta/Urgency.vue'

import SectionFaqTrust from '~/components/section/faq/Trust.vue'
import SectionFaqAuthority from '~/components/section/faq/Authority.vue'
import SectionFaqUrgency from '~/components/section/faq/Urgency.vue'

const SECTION_COMPONENTS = {
  hero: {
    trust: SectionHeroTrust,
    authority: SectionHeroAuthority,
    urgency: SectionHeroUrgency,
  },
  results: {
    trust: SectionResultsTrust,
    authority: SectionResultsAuthority,
    urgency: SectionResultsUrgency,
  },
  work: {
    trust: SectionWorkTrust,
    authority: SectionWorkAuthority,
    urgency: SectionWorkUrgency,
  },
  about: {
    trust: SectionAboutTrust,
    authority: SectionAboutAuthority,
    urgency: SectionAboutUrgency,
  },
  cta: {
    trust: SectionCtaTrust,
    authority: SectionCtaAuthority,
    urgency: SectionCtaUrgency,
  },
  faq: {
    trust: SectionFaqTrust,
    authority: SectionFaqAuthority,
    urgency: SectionFaqUrgency,
  },
} as const

export type SectionType = keyof typeof SECTION_COMPONENTS

export const useSectionComponents = () => {
  const { getSectionIntent } = useIntentConfig()

  const getComponent = (
    sectionType: SectionType,
    variant?: EmotionalTrigger,
    sectionIndex: number = 0,
  ) => {
    const effectiveVariant = variant || getSectionIntent(sectionIndex)

    const sectionMap = SECTION_COMPONENTS[sectionType]
    if (!sectionMap) {
      throw new Error(`Unknown section type: ${sectionType}`)
    }

    const component = sectionMap[effectiveVariant]
    if (!component) {
      throw new Error(`Unknown variant '${effectiveVariant}' for section '${sectionType}'`)
    }

    return component
  }

  return { getComponent }
}
