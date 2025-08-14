// theme/layout/row-grid.ts
import { tv } from '../../shared/utils/themev2'
import { createSpacingVariants, createGapVariants } from '../../shared/config/theme'
import type { ExtractSlots, ExtractVariants } from '../../shared/utils/themev2'

const rowGridStyles = tv({
  slots: {
    root: [],
    row: ['grid', 'items-start'],
  },
  variants: {
    ...createSpacingVariants('root'),
    ...createGapVariants('row'),
    alignRows: {
      start: { row: 'items-start' },
      center: { row: 'items-center' },
      end: { row: 'items-end' },
      stretch: { row: 'items-stretch' },
    },
    responsive: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    spacing: 'md',
    gap: 'md',
    alignRows: 'start',
    responsive: true,
  },
})

export type GridRowVariants = ExtractVariants<typeof rowGridStyles>
export type GridRowSlots = ExtractSlots<typeof rowGridStyles>
export default rowGridStyles
