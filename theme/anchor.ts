// theme/layout/anchor.ts - ELEMENT-BASED POSITIONING
import { createUIComponent } from '../shared/utils/theme'

export default createUIComponent(config => ({
  slots: {
    root: [
      'group relative scroll-mt-20',
      config.transitions && 'transition-colors duration-200',
    ],
    link: [
      'text-inherit no-underline relative',
      'focus-visible:outline-secondary focus-visible:outline-2 focus-visible:outline-offset-2',
      config.transitions && 'transition-colors duration-200',
    ],
    icon: [
      'absolute opacity-0 group-hover:opacity-70 text-secondary',
      config.transitions && 'transition-opacity duration-200',
    ],
  },
  variants: {
    element: {
      h1: {
        icon: 'w-8 h-8 -left-8 top-2',
      },
      h2: {
        icon: 'w-6 h-6 -left-7 top-2',
      },
      h3: {
        icon: 'w-5 h-5 -left-6 top-1.5',
      },
      h4: {
        icon: 'w-4 h-4 -left-6 top-1',
      },
      h5: {
        icon: 'w-3 h-3 -left-5 top-0',
      },
      h6: {
        icon: 'w-3 h-3 -left-5 top-0',
      },
      div: {
        icon: 'w-4 h-4 -left-6 top-0.5', // Default for non-headings
      },
    },
    active: {
      true: {
        link: 'text-secondary',
        icon: 'opacity-70 text-secondary',
      },
    },
  },
  defaultVariants: {
    element: 'h2',
    active: false,
  },
}))
