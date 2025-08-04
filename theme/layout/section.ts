// theme/layout/section.ts
import { tv } from '../../shared/utils/themev2'
import { createHeightVariants } from '../../shared/config/theme'
import type { ExtractSlots, ExtractVariants } from '../../shared/utils/themev2'

const sectionStyles = tv({
  slots: {
    root: ['w-full', 'relative'],
  },
  variants: {
    ...createHeightVariants('root'),

    variant: {
      default: {
        root: 'py-16 lg:py-20',
      },
      compact: {
        root: 'py-8 lg:py-12',
      },
      generous: {
        root: 'py-20 lg:py-32',
      },
      hero: {
        root: 'py-24 lg:py-40',
      },
      minimal: {
        root: 'py-4 lg:py-6',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    height: 'auto',
  },
})

export type SectionVariants = ExtractVariants<typeof sectionStyles>
export type SectionSlots = ExtractSlots<typeof sectionStyles>
export default sectionStyles
