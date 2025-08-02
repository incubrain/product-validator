// theme/layout/section-title.ts
import { tv } from '../../shared/utils/themev2'
import type { ExtractSlots, ExtractVariants } from '../../shared/utils/themev2'

const sectionTitleStyles = tv({
  slots: {
    root: ['space-y-6'],
    badge: ['inline-flex'],
    heading: ['max-w-4xl'],
    subtitle: ['max-w-3xl'],
  },
  variants: {
    variant: {
      left: {
        root: 'text-left',
        heading: '',
        subtitle: '',
      },
      center: {
        root: 'text-center',
        badge: 'justify-center',
        heading: 'mx-auto',
        subtitle: 'mx-auto',
      },
    },
  },
  defaultVariants: {
    variant: 'center',
  },
})

export type SectionTitleVariants = ExtractVariants<typeof sectionTitleStyles>
export type SectionTitleSlots = ExtractSlots<typeof sectionTitleStyles>
export default sectionTitleStyles
