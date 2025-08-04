// theme/layout/center.ts - ENHANCED WITH MODERN TV APPROACH
import { tv } from '../../shared/utils/themev2'
import { createPaddingVariants } from '../../shared/config/theme'
import type { ExtractSlots, ExtractVariants } from '../../shared/utils/themev2'

const centerStyles = tv({
  slots: {
    root: ['w-full mx-auto'],
  },
  variants: {
    ...createPaddingVariants('root'),
    variant: {
      'default': {
        root: 'max-w-4xl',
      },
      'narrow': {
        root: 'max-w-2xl',
      },
      'prose': {
        root: 'max-w-prose',
      },
      'wide': {
        root: 'max-w-6xl',
      },
      'full': {
        root: 'max-w-full',
      },
      'text-only': {
        root: 'max-w-2xl text-center',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'none',
  },
})

export type CenterVariants = ExtractVariants<typeof centerStyles>
export type CenterSlots = ExtractSlots<typeof centerStyles>
export default centerStyles
