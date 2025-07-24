// theme/cta.ts
import { createUIComponent } from '../shared/utils/theme'

export default createUIComponent(config => ({
  slots: {
    root: [
      'relative rounded-2xl',
      config.transitions && 'transition-all duration-300 hover:shadow-lg'
    ],
    content: 'space-y-4',
    title: 'font-bold text-highlighted',
    subtitle: 'text-muted',
    actions: 'flex flex-col gap-3'
  },
  variants: {
    variant: {
      'inline': {
        root: 'flex gap-4 lg:gap-8 p-4 lg:p-8 justify-between items-center border border-muted bg-gradient-to-br from-primary/5 to-primary/10',
        content: 'flex-1'
      },
      'featured': {
        root: 'p-6 h-full flex flex-col justify-between border border-muted bg-elevated',
        content: 'flex-1'
      },
      'compact': {
        root: 'p-4 text-center border border-primary/20 hover:border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10',
        title: 'text-lg',
        subtitle: 'text-sm'
      }
    }
  },
  defaultVariants: {
    variant: 'inline'
  }
}))