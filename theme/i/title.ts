// theme/i/title.ts - MIGRATED TO THEMEV3
import { tv, extractTV } from '#shared/utils/theme'
import type { ExtractSlots, ExtractVariants } from '#shared/utils/theme'

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

export const titleData = extractTV(sectionTitleStyles)
export type TitleVariants = ExtractVariants<typeof sectionTitleStyles>
export type TitleSlots = ExtractSlots<typeof sectionTitleStyles>
export default sectionTitleStyles
