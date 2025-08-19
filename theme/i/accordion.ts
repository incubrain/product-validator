// theme/i/accordion.ts - MIGRATED TO THEMEV3
import { tv, extractTV } from '../../shared/utils/themev3'
import type { ExtractSlots, ExtractVariants } from '../../shared/utils/themev2'

const accordionStyles = tv({
  slots: {
    root: [
      'w-full',
      'transition-all duration-200',
    ],
    grid: [
      'grid gap-8',
      'grid-cols-1 lg:grid-cols-2',
    ],
    label: ['transition-colors duration-200'],
    icon: ['transition-all duration-200'],
  },
  variants: {
    intent: {
      neutral: {
        label: 'text-highlighted hover:text-primary',
        icon: 'text-muted group-hover:text-highlighted',
      },
      trust: {
        label: 'text-highlighted hover:text-success-600',
        icon: 'text-success-500 group-hover:text-success-600',
      },
      authority: {
        label: 'text-highlighted hover:text-primary-600',
        icon: 'text-primary-500 group-hover:text-primary-600',
      },
      urgency: {
        label: 'text-highlighted hover:text-warning-600',
        icon: 'text-warning-500 group-hover:text-warning-600',
      },
    },
    variant: {
      single: {
        grid: 'block',
      },
      double: {
        grid: 'grid gap-8 grid-cols-1 lg:grid-cols-2',
      },
    },
  },
  defaultVariants: {
    intent: 'neutral',
    variant: 'double',
  },
})

export const accordionData = extractTV(accordionStyles)
export type AccordionVariants = ExtractVariants<typeof accordionStyles>
export type AccordionSlots = ExtractSlots<typeof accordionStyles>
export default accordionStyles
