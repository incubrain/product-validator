// theme/divider.ts
import { createUIComponent } from '../../shared/utils/theme'

export default createUIComponent(config => ({
  slots: {
    root: 'flex items-center justify-center',
    line: 'border-default'
  },
  variants: {
    variant: {
      'line': { line: 'border-t' },
      'gradient': { line: 'h-px bg-gradient-to-r from-transparent via-default to-transparent' },
      'dotted': { line: 'border-t border-dotted' },
      'branded': { line: 'h-px bg-gradient-to-r from-transparent via-primary to-transparent' }
    },
    spacing: {
      'sm': { root: 'my-4' },
      'md': { root: 'my-6' },
      'lg': { root: 'my-8' },
      'xl': { root: 'my-12' }
    },
    orientation: {
      'horizontal': { 
        root: 'w-full',
        line: 'w-full' 
      },
      'vertical': { 
        root: 'h-full flex-col',
        line: 'h-full border-l border-t-0' 
      }
    }
  },
  defaultVariants: {
    variant: 'line',
    spacing: 'md',
    orientation: 'horizontal'
  }
}))