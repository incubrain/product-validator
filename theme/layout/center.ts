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
      'text-only': {
        root: 'text-center',
      },
    },
  },
  defaultVariants: {
    padding: 'none',
  },
})

export type CenterVariants = ExtractVariants<typeof centerStyles>
export type CenterSlots = ExtractSlots<typeof centerStyles>
export default centerStyles
