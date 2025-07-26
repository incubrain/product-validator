// theme/layout/center.ts
import { createUIComponent } from '../../shared/utils/theme'

export default createUIComponent((config) => ({
  slots: {
    root: ['w-full'],
  },
  variants: {
    variant: {
      'default': {
        root: 'mx-auto px-4 sm:px-6 lg:px-8',
      },
      'narrow': {
        root: 'mx-auto px-4 sm:px-6',
      },
      'prose': {
        root: 'mx-auto px-4 sm:px-6',
      },
      'wide': {
        root: 'mx-auto px-4 sm:px-6 lg:px-8',
      },
      'full': {
        root: 'mx-auto px-4 sm:px-6 lg:px-8',
      },
      'text-only': {
        root: 'mx-auto px-4 sm:px-6 text-center',
      },
      'no-padding': {
        root: 'mx-auto',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
}))
