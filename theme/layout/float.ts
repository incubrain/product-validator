// theme/layout/float.ts - HONEST CSS FLOAT API
import { tv, extractTV } from '#shared/utils/theme'
import type { ExtractSlots, ExtractVariants } from '#shared/utils/theme'

export const floatStyles = tv({
  slots: {
    root: [''],
  },
  variants: {
    // ✅ ONLY WHAT MATTERS - LEFT OR RIGHT
    variant: {
      left: { root: 'float-left mr-4 mb-2' },
      right: { root: 'float-right ml-4 mb-2' },
      custom: { root: '' }, // For ui prop control
    },

    // Clear behavior
    clear: {
      none: { root: '' },
      left: { root: 'clear-left' },
      right: { root: 'clear-right' },
      both: { root: 'clear-both' },
    },

    // Responsive behavior
    responsive: {
      'default': { root: '' },
      'stack-mobile': { root: 'max-sm:float-none max-sm:w-full max-sm:mb-4' },
    },
  },

  compoundVariants: [
    {
      variant: 'left',
      clear: 'both',
      class: { root: 'float-left mr-6 mb-4 clear-both' },
    },
    {
      variant: 'right',
      clear: 'both',
      class: { root: 'float-right ml-6 mb-4 clear-both' },
    },
  ],

  defaultVariants: {
    variant: 'left',
    clear: 'none',
    responsive: 'stack-mobile',
  },
})

export const floatData = extractTV(floatStyles, {
  title: 'CSS Float Utilities',
  description: 'Pure CSS float behavior for text wrapping around elements',
  category: 'layout',
})

export type FloatVariants = ExtractVariants<typeof floatStyles>
export type FloatSlots = ExtractSlots<typeof floatStyles>
export default floatStyles
