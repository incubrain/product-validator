// theme/layout/float.ts
import { tv } from '../../shared/utils/themev2'
import type { ExtractSlots, ExtractVariants } from '../../shared/utils/themev2'

const floatStyles = tv({
  slots: {
    root: [''],
  },
  variants: {
    // Float positioning variants - covers 80% of use cases
    variant: {
      // Common float patterns
      'left': {
        root: 'float-left',
      },
      'right': {
        root: 'float-right',
      },
      'none': {
        root: 'float-none',
      },

      // Modern alternatives using flexbox/grid (better for responsive)
      'start': {
        root: 'float-left [&+*]:clear-left',
      },
      'end': {
        root: 'float-right [&+*]:clear-right',
      },

      // Text wrap patterns (common content layouts)
      'text-left': {
        root: 'float-left mr-4 mb-2',
      },
      'text-right': {
        root: 'float-right ml-4 mb-2',
      },
      'text-center': {
        root: 'float-none mx-auto block',
      },

      // Custom - for arbitrary float values
      'custom': {
        root: '', // Styling handled via ui prop
      },
    },

    // Clear behavior
    clear: {
      none: { root: '' },
      left: { root: 'clear-left' },
      right: { root: 'clear-right' },
      both: { root: 'clear-both' },
      start: { root: 'clear-start' },
      end: { root: 'clear-end' },
    },

    // Common spacing patterns for floated elements
    spacing: {
      none: { root: '' },
      sm: { root: 'm-2' },
      md: { root: 'm-4' },
      lg: { root: 'm-6' },
      xl: { root: 'm-8' },
    },

    // Responsive behavior
    responsive: {
      'default': { root: '' },
      'sm-none': { root: 'sm:float-none' },
      'md-none': { root: 'md:float-none' },
      'lg-none': { root: 'lg:float-none' },
      'stack-mobile': { root: 'max-sm:float-none max-sm:w-full max-sm:mb-4' },
    },
  },

  // Compound variants for common combinations
  compoundVariants: [
    // Text wrap + spacing combinations
    {
      variant: 'text-left',
      spacing: 'lg',
      class: { root: 'float-left mr-6 mb-4' },
    },
    {
      variant: 'text-right',
      spacing: 'lg',
      class: { root: 'float-right ml-6 mb-4' },
    },

    // Responsive float with clear
    {
      variant: 'left',
      responsive: 'stack-mobile',
      class: { root: 'float-left max-sm:float-none max-sm:w-full max-sm:clear-both' },
    },
  ],

  defaultVariants: {
    variant: 'left',
    clear: 'none',
    spacing: 'none',
    responsive: 'default',
  },
})

export type FloatVariants = ExtractVariants<typeof floatStyles>
export type FloatSlots = ExtractSlots<typeof floatStyles>
export default floatStyles
