import { tv, extractTV } from '#shared/utils/theme'
import type { ExtractSlots, ExtractVariants } from '#shared/utils/theme'

const gridStyles = tv({
  slots: {
    root: ['grid'],
  },
  variants: {
    variant: {
      // CORE RESPONSIVE PATTERNS
      'auto-fit': { root: 'grid-cols-[repeat(auto-fit,minmax(250px,1fr))]' },
      'auto-fill': { root: 'grid-cols-[repeat(auto-fill,minmax(250px,1fr))]' },
      'halves': { root: 'grid-cols-1 md:grid-cols-2' },
      'thirds': { root: 'grid-cols-1 md:grid-cols-3' },
      'quarters': { root: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' },
      'compact': { root: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' },

      // ADVANCED LAYOUT PATTERNS
      'sidebar': { root: 'grid-cols-[250px_1fr]' },
      'content': { root: 'grid-cols-[1fr_250px]' },
      'feature': { root: 'grid-cols-[2fr_1fr]' },
      'golden': { root: 'grid-cols-[1.618fr_1fr]' },

      // CUSTOM ESCAPE HATCH
      'custom': { root: '' }, // Use ui prop for full control
    },

    // FLOW CONTROL
    flow: {
      'row': { root: 'grid-flow-row' },
      'col': { root: 'grid-flow-col' },
      'dense': { root: 'grid-flow-dense' },
      'row-dense': { root: 'grid-flow-row-dense' },
      'col-dense': { root: 'grid-flow-col-dense' },
    },

    // GAP CONTROL
    gap: {
      'none': { root: 'gap-0' },
      'xs': { root: 'gap-2' },
      'sm': { root: 'gap-3' },
      'md': { root: 'gap-6' },
      'lg': { root: 'gap-8' },
      'xl': { root: 'gap-12' },
      '2xl': { root: 'gap-16' },
    },

    // ✅ UNIFIED ALIGNMENT - Covers items, justify-items, and content
    align: {
      // Items alignment (vertical in grid)
      start: { root: 'items-start justify-items-start content-start' },
      center: { root: 'items-center justify-items-center content-center' },
      end: { root: 'items-end justify-items-end content-end' },
      stretch: { root: 'items-stretch justify-items-stretch content-start' },

      // Content distribution
      between: { root: 'items-start justify-items-stretch content-between' },
      around: { root: 'items-start justify-items-stretch content-around' },
      evenly: { root: 'items-start justify-items-stretch content-evenly' },
    },
  },

  defaultVariants: {
    variant: 'auto-fit',
    flow: 'row',
    gap: 'md',
    align: 'start',
  },
})

export const gridData = extractTV(gridStyles, {
  title: 'CSS Grid Layouts',
  description: 'Responsive grid patterns, auto-sizing, and advanced grid control',
  category: 'layout',
})
export type GridVariants = ExtractVariants<typeof gridStyles>
export type GridSlots = ExtractSlots<typeof gridStyles>
export default gridStyles
