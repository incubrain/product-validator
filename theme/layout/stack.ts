// theme/layout/stack.ts - MODERNIZED
import { tv, extractTV } from '../../shared/utils/themev3'
import { createGapVariants } from '../../shared/config/theme'
import type { ExtractSlots, ExtractVariants } from '../../shared/utils/themev2'

export const stackStyles = tv({
  slots: {
    root: ['flex'],
  },
  variants: {
    ...createGapVariants('root'),

    variant: {
      // Vertical stacking patterns
      'default': {
        root: 'flex-col items-stretch justify-start',
      },
      'centered': {
        root: 'flex-col items-center justify-center',
      },
      'compact': {
        root: 'flex-col items-start justify-start gap-2',
      },
      'spacious': {
        root: 'flex-col items-stretch justify-start gap-8',
      },
      'between': { // 🔥 NEW - For the reference image layout
        root: 'flex-col items-stretch justify-between h-full',
      },

      // Horizontal patterns
      'horizontal': {
        root: 'flex-row items-center justify-start flex-wrap',
      },
      'horizontal-between': {
        root: 'flex-row items-center justify-between flex-wrap',
      },
      'horizontal-center': {
        root: 'flex-row items-center justify-center flex-wrap',
      },

      // Responsive patterns
      'stack-to-row': {
        root: 'flex-col items-stretch md:flex-row md:items-center',
      },
      'center-to-between': {
        root: 'flex-col items-center justify-center md:flex-row md:justify-between',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    gap: 'md',
  },
})
export const stackData = extractTV(stackStyles)
export type StackVariants = ExtractVariants<typeof stackStyles>
export type StackSlots = ExtractSlots<typeof stackStyles>
export default stackStyles
