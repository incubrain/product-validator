// theme/spacer.ts
import { createUIComponent } from '../../shared/utils/theme'

export default createUIComponent(config => ({
  slots: {
    root: 'block'
  },
  variants: {
    size: {
      'xs': { root: 'h-2' },
      'sm': { root: 'h-4' },
      'md': { root: 'h-8' },
      'lg': { root: 'h-12' },
      'xl': { root: 'h-16' },
      '2xl': { root: 'h-24' }
    },
    responsive: {
      true: {
        xs: { root: 'h-1 md:h-2' },
        sm: { root: 'h-2 md:h-4' },
        md: { root: 'h-4 md:h-8' },
        lg: { root: 'h-6 md:h-12' },
        xl: { root: 'h-8 md:h-16' },
        '2xl': { root: 'h-12 md:h-24' }
      }
    }
  },
  compoundVariants: [
    { responsive: true, size: 'xs', class: { root: 'h-1 md:h-2' } },
    { responsive: true, size: 'sm', class: { root: 'h-2 md:h-4' } },
    { responsive: true, size: 'md', class: { root: 'h-4 md:h-8' } },
    { responsive: true, size: 'lg', class: { root: 'h-6 md:h-12' } },
    { responsive: true, size: 'xl', class: { root: 'h-8 md:h-16' } },
    { responsive: true, size: '2xl', class: { root: 'h-12 md:h-24' } }
  ],
  defaultVariants: {
    size: 'md',
    responsive: true
  }
}))