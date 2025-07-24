// theme/layout/grid.ts
import { createUIComponent } from '../../shared/utils/theme'

export default createUIComponent((config) => ({
  slots: {
    root: ['grid'],
  },
  variants: {
    variant: {
      auto: {
        root: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
      },
      thirds: {
        root: 'grid-cols-1 md:grid-cols-3 gap-6',
      },
      halves: {
        root: 'grid-cols-1 md:grid-cols-2 gap-6',
      },
      quarters: {
        root: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4',
      },
      cards: {
        root: 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6',
      },
      compact: {
        root: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
      },
      wide: {
        root: 'grid-cols-1 lg:grid-cols-2 gap-8',
      },
      masonry: {
        root: 'columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6',
      },
    },
  },
  defaultVariants: {
    variant: 'auto',
  },
}))
