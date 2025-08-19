// theme/anchor.ts - MIGRATED TO TV PATTERN
import { tv } from '#shared/utils/theme'
import type { ExtractSlots, ExtractVariants } from '#shared/utils/theme'

const anchorStyles = tv({
  slots: {
    root: [
      'relative group',
      'transition-colors duration-200',
    ],
    link: [
      'block relative',
      'no-underline',
      'hover:no-underline',
    ],
    icon: [
      'absolute -left-6 top-1/2 -translate-y-1/2',
      'w-4 h-4',
      'text-gray-400 dark:text-gray-500',
      'opacity-0',
      'group-hover:opacity-100',
      'transition-opacity duration-200',
    ],
  },
  variants: {
    element: {
      h1: {
        icon: 'top-3',
      },
      h2: {
        icon: 'top-2',
      },
      h3: {
        icon: 'top-2',
      },
      h4: {
        icon: 'top-1.5',
      },
      h5: {
        icon: 'top-1',
      },
      h6: {
        icon: 'top-1',
      },
      div: {
        icon: 'top-1/2 -translate-y-1/2',
      },
    },
    showIcon: {
      true: {},
      false: {
        icon: 'hidden',
      },
    },
    isActive: {
      true: {
        icon: 'opacity-70 text-primary',
      },
      false: {},
    },
  },
  defaultVariants: {
    element: 'div',
    showIcon: true,
    isActive: false,
  },
})

export type AnchorVariants = ExtractVariants<typeof anchorStyles>
export type AnchorSlots = ExtractSlots<typeof anchorStyles>
export default anchorStyles
