// theme/layout/container.ts
import { tv, extractTV } from '../../shared/utils/themev3'
import type { ExtractSlots, ExtractVariants } from '../../shared/utils/themev2'

const containerStyles = tv({
  slots: {
    root: [
      'w-full',
      'mx-auto',
      'box-border',
      'px-4 sm:px-6 lg:px-8',
    ],
  },
  variants: {
    variant: {
      prose: { root: 'max-w-prose' }, // ~65ch - Reading width
      narrow: { root: 'max-w-4xl' }, // ~896px - Forms, articles
      default: { root: 'max-w-(--ui-container)' }, // ~1280px
      wide: { root: 'max-w-[calc(var(--ui-container)+200px)]' }, // 100% - Wide layouts
      full: { root: 'max-w-screen' }, // 100% - Full width (alias)
      screen: { root: 'max-w-screen px-0 sm:px-0 lg:px-0' }, // 100vw - True full width
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const containerData = extractTV(containerStyles, {
  title: 'Responsive Containers',
  description: 'Content containers with reading widths, form layouts, and full-width experiences',
  category: 'layout',
})
export type ContainerVariants = ExtractVariants<typeof containerStyles>
export type ContainerSlots = ExtractSlots<typeof containerStyles>
export default containerStyles
