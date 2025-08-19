// theme/layout/split.ts
import { tv, extractTV } from '../../shared/utils/themev3'
import { createGapVariants } from '../../shared/config/theme'
import type { ExtractSlots, ExtractVariants } from '../../shared/utils/themev2'

const splitStyles = tv({
  slots: {
    root: ['grid', 'grid-cols-1'],
    first: [''],
    second: [''],
  },
  variants: {
    ...createGapVariants('root'),
    ratio: {
      '50-50': { root: 'lg:grid-cols-[1fr_1fr]' },
      '60-40': { root: 'lg:grid-cols-[3fr_2fr]' },
      '70-30': { root: 'lg:grid-cols-[7fr_3fr]' },
      '80-20': { root: 'lg:grid-cols-[4fr_1fr]' },
      '40-60': { root: 'lg:grid-cols-[2fr_3fr]' },
      '30-70': { root: 'lg:grid-cols-[3fr_7fr]' },
      '20-80': { root: 'lg:grid-cols-[1fr_4fr]' },
    },
    reverse: {
      true: {
        first: 'order-2 lg:order-1',
        second: 'order-1 lg:order-2',
      },
      false: {},
    },
  },

  defaultVariants: {
    ratio: '50-50',
    gap: 'none',
    reverse: false,
  },
})

export const splitData = extractTV(splitStyles, {
  title: 'Two-Column Split Layouts',
  description: 'Responsive two-column layouts with intelligent ratio control and mobile-first stacking',
  category: 'layout',
})
export type SplitVariants = ExtractVariants<typeof splitStyles>
export type SplitSlots = ExtractSlots<typeof splitStyles>
export default splitStyles
