// theme/layout/split.ts
import { createUIComponent } from '../../shared/utils/theme'

export default createUIComponent(config => ({
  slots: {
    root: ['grid gap-8 items-center']
  },
  variants: {
    variant: {
      'default': { 
        root: 'lg:grid-cols-2 lg:gap-16' 
      },
      'narrow': { 
        root: 'lg:grid-cols-[1fr_0.8fr] lg:gap-12' 
      },
      'wide': { 
        root: 'lg:grid-cols-[1.2fr_1fr] lg:gap-20' 
      },
      'stack-lg': { 
        root: 'xl:grid-cols-2 xl:gap-16' 
      },
      'reverse': { 
        root: 'lg:grid-cols-2 lg:gap-16 flex flex-col-reverse lg:grid' 
      }
    }
  },
  defaultVariants: {
    variant: 'default'
  }
}))