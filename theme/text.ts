// theme/text.ts - NEW
import { createUIComponent } from '../shared/utils/theme'

export default createUIComponent(config => ({
  slots: {
    root: [
      'leading-relaxed',
      config.transitions && 'transition-colors duration-200'
    ]
  },
  variants: {
    variant: {
      'default': { root: 'text-toned' },
      'subtitle': { root: 'text-muted text-xl lg:text-2xl font-medium' },
      'hero-subtitle': { root: 'text-muted text-2xl lg:text-3xl font-normal' },
      'description': { root: 'text-dimmed text-lg' },
      'caption': { root: 'text-dimmed text-sm' },
      'small': { root: 'text-dimmed text-sm' },
      'muted': { root: 'text-muted' },
      'highlighted': { root: 'text-highlighted font-medium' }
    },
    
    size: {
      'xs': { root: 'text-xs' },
      'sm': { root: 'text-sm' },
      'base': { root: 'text-base' },
      'lg': { root: 'text-lg' },
      'xl': { root: 'text-xl' },
      '2xl': { root: 'text-2xl' }
    },
    
    align: {
      'left': { root: 'text-left' },
      'center': { root: 'text-center' },
      'right': { root: 'text-right' },
      'justify': { root: 'text-justify' }
    }
  },
  
  compoundVariants: [
    // Subtitle variants get proper spacing
    { variant: 'subtitle', class: { root: 'mb-4' } },
    { variant: 'hero-subtitle', class: { root: 'mb-6' } },
    { variant: 'description', class: { root: 'mb-4' } },
    { variant: 'caption', class: { root: 'mb-2' } }
  ],
  
  defaultVariants: {
    variant: 'default',
    size: 'base',
    align: 'left'
  }
}))