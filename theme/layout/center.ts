// theme/layout/center.ts
import { createUIComponent } from '../../shared/utils/theme'

export default createUIComponent(config => ({
  slots: {
    root: ['w-full']
  },
  variants: {
    variant: {
      'default': { 
        root: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8' 
      },
      'narrow': { 
        root: 'max-w-2xl mx-auto px-4 sm:px-6' 
      },
      'prose': { 
        root: 'max-w-prose mx-auto px-4 sm:px-6' 
      },
      'wide': { 
        root: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8' 
      },
      'full': { 
        root: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' 
      },
      'text-only': { 
        root: 'max-w-3xl mx-auto px-4 sm:px-6 text-center' 
      },
      'no-padding': { 
        root: 'max-w-4xl mx-auto' 
      }
    }
  },
  defaultVariants: {
    variant: 'default'
  }
}))