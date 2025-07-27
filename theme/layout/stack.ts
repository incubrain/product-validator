// theme/layout/stack.ts
import { createUIComponent } from '../../shared/utils/theme'

export default createUIComponent(config => ({
  slots: {
    root: [
      'flex', // Base flex class
      config.transitions && 'transition-all duration-200',
    ],
  },
  variants: {
    variant: {
      // Common vertical stacking patterns
      'default': {
        root: 'flex-col gap-4 items-stretch justify-start',
      },
      'centered': {
        root: 'flex-col gap-4 items-center justify-center',
      },
      'compact': {
        root: 'flex-col gap-2 items-start justify-start',
      },
      'spacious': {
        root: 'flex-col gap-8 items-stretch justify-start',
      },

      // Horizontal patterns
      'horizontal': {
        root: 'flex-row gap-4 items-center justify-start flex-wrap',
      },
      'horizontal-between': {
        root: 'flex-row gap-4 items-center justify-between flex-wrap',
      },
      'horizontal-center': {
        root: 'flex-row gap-4 items-center justify-center flex-wrap',
      },

      // Responsive patterns
      'stack-to-row': {
        root: 'flex-col gap-4 items-stretch md:flex-row md:items-center',
      },
      'center-to-between': {
        root: 'flex-col gap-4 items-center justify-center md:flex-row md:justify-between',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
}))
