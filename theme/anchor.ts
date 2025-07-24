// theme/layout/anchor.ts - ENHANCED WITH ACTIVE STATES
import { createUIComponent } from '../shared/utils/theme'

export default createUIComponent(config => ({
  slots: {
    root: [
      'group relative scroll-mt-20',
      config.transitions && 'transition-colors duration-200'
    ],
    link: [
      'text-inherit no-underline block group-hover:text-primary',
      'relative focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2',
      config.transitions && 'transition-colors duration-200'
    ],
    icon: [
      'absolute opacity-0 group-hover:opacity-70 text-primary',
      'w-4 h-4 -left-6 top-0.5',
      config.transitions && 'transition-opacity duration-200'
    ],
    iconRight: [
      'absolute opacity-0 group-hover:opacity-70 text-primary',
      'w-3 h-3 -right-4 top-1',
      config.transitions && 'transition-opacity duration-200'
    ]
  },
  variants: {
    active: {
      true: { 
        link: 'text-primary',
        icon: 'opacity-100 text-primary',
        iconRight: 'opacity-100 text-primary'
      }
    }
  },
  defaultVariants: {
    active: false
  }
}))