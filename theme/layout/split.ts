// theme/layout/split.ts
import { tv } from '../../shared/utils/themev2'
import { createGapVariants } from '../../shared/config/theme'
import type { ExtractSlots, ExtractVariants } from '../../shared/utils/themev2'

const splitStyles = tv({
  slots: {
    root: ['grid', 'grid-cols-'],
    first: [''],
    second: [''],
  },
  variants: {
    ...createGapVariants('root'),
    ratio: {
      '50-50': { root: 'lg:grid-cols-[50fr_50fr]' },
      '60-40': { root: 'lg:grid-cols-[60fr_40fr]' },
      '70-30': { root: 'lg:grid-cols-[70fr_30fr]' },
      '80-20': { root: 'lg:grid-cols-[80fr_20fr]' },
      '40-60': { root: 'lg:grid-cols-[40fr_60fr]' },
      '30-70': { root: 'lg:grid-cols-[30fr_70fr]' },
      '20-80': { root: 'lg:grid-cols-[20fr_80fr]' },
    },
    reverse: {
      true: { root: '[&>:nth-child(2)]:order-first lg:[&>:nth-child(2)]:order-none' },
      false: {},
    },
  },

  defaultVariants: {
    ratio: '50-50',
    gap: 'none',
    reverse: false,
  },
})

export type SplitVariants = ExtractVariants<typeof splitStyles>
export type SplitSlots = ExtractSlots<typeof splitStyles>
export default splitStyles
