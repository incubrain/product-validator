// theme/layout/section.ts
import { createUIComponent } from '../../shared/utils/theme'

export default createUIComponent((config) => ({
  slots: {
    root: ['w-full relative'],
  },
  variants: {
    variant: {
      default: {
        root: 'py-16 lg:py-20',
      },
      compact: {
        root: 'py-8 lg:py-12',
      },
      generous: {
        root: 'py-20 lg:py-32',
      },
      hero: {
        root: 'py-24 lg:py-40',
      },
      minimal: {
        root: 'py-4 lg:py-6',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
}))
