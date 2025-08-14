// theme/container.ts
import { createUIComponent } from '../../shared/utils/theme'

export default createUIComponent((config) => ({
  slots: {
    root: [
      'w-full',
      config.transitions && 'transition-all duration-200',
    ],
  },
  variants: {
    size: {
      narrow: { root: 'max-w-2xl' },
      default: { root: 'max-w-4xl' },
      wide: { root: 'max-w-6xl' },
      prose: { root: 'max-w-prose' },
      full: { root: 'max-w-none' },
    },
    align: {
      left: { root: 'mr-auto' },
      center: { root: 'mx-auto' },
      right: { root: 'ml-auto' },
    },
  },
  defaultVariants: {
    size: 'default',
    align: 'center',
  },
}))
