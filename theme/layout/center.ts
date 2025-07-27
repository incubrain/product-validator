// theme/layout/center.ts
import { createUIComponent } from '../../shared/utils/theme'

export default createUIComponent(config => ({
  slots: {
    root: ['w-full'],
  },
  variants: {
    variant: {
      'default': {
        root: 'mx-auto',
      },
      'narrow': {
        root: 'mx-auto',
      },
      'prose': {
        root: 'mx-auto',
      },
      'wide': {
        root: 'mx-auto',
      },
      'full': {
        root: 'mx-auto',
      },
      'text-only': {
        root: 'mx-auto text-center',
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
