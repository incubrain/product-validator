// theme/layout/grid.ts - ENHANCED WITH SELECTIVE SPACING
import { tv, extractTV } from '../../shared/utils/themev3'
import { createGapVariants } from '../../shared/config/theme'
import type { ExtractSlots, ExtractVariants } from '../../shared/utils/themev2'

const gridStyles = tv({
  slots: {
    root: ['grid'],
  },
  variants: {
    ...createGapVariants('root'),
    variant: {
      auto: {
        root: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      },
      thirds: {
        root: 'grid-cols-1 md:grid-cols-3',
      },
      halves: {
        root: 'grid-cols-1 md:grid-cols-2',
      },
      quarters: {
        root: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      },
      cards: {
        root: 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3',
      },
      compact: {
        root: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      },
      wide: {
        root: 'grid-cols-1 lg:grid-cols-2',
      },
      masonry: {
        root: 'columns-1 sm:columns-2 lg:columns-3 space-y-6',
      },
    },
  },
  defaultVariants: {
    variant: 'auto',
    gap: 'md',
  },
})

export const gridData = extractTV(gridStyles)
export type GridVariants = ExtractVariants<typeof gridStyles>
export type GridSlots = ExtractSlots<typeof gridStyles>
export default gridStyles
