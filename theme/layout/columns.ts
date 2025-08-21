import { tv, extractTV } from '#shared/utils/theme'
import type { ExtractSlots, ExtractVariants } from '#shared/utils/theme'

const columnsStyles = tv({
  slots: {
    root: ['*:break-inside-avoid block'],
  },
  variants: {
    // STRUCTURAL LAYOUT PATTERNS
    variant: {
      masonry: { root: 'columns-1 sm:columns-2 lg:columns-3' },
      dense: { root: 'columns-1 sm:columns-2 md:columns-3 lg:columns-4' },
      cascade: { root: 'columns-1 md:columns-2 xl:columns-3' },
      narrow: { root: 'columns-sm' },
      balanced: { root: 'columns-md' },
      wide: { root: 'columns-lg' },
      split: { root: 'columns-2' },
      auto: { root: 'columns-3xs' },
    },
    gap: {
      'none': { root: 'gap-0' },
      'xs': { root: 'gap-2' },
      'sm': { root: 'gap-3' },
      'md': { root: 'gap-6' },
      'lg': { root: 'gap-8' },
      'xl': { root: 'gap-12' },
      '2xl': { root: 'gap-16' },
    },

    // Item spacing (within columns)
    spacing: {
      'none': { root: '[&>*]:mb-0' },
      'xs': { root: '[&>*]:mb-2' },
      'sm': { root: '[&>*]:mb-3' },
      'md': { root: '[&>*]:mb-6' },
      'lg': { root: '[&>*]:mb-8' },
      'xl': { root: '[&>*]:mb-12' },
      '2xl': { root: '[&>*]:mb-16' },
    },
  },

  defaultVariants: {
    variant: 'masonry',
    gap: 'md',
    spacing: 'md',
  },
})

export const columnsData = extractTV(columnsStyles, {
  title: 'CSS Columns Layouts',
  description: 'Flowing content layouts for masonry, magazines, and content-width patterns',
  category: 'layout',
})
export type ColumnsVariants = ExtractVariants<typeof columnsStyles>
export type ColumnsSlots = ExtractSlots<typeof columnsStyles>
export default columnsStyles
