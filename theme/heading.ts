// theme/heading.ts - MIGRATED TO TV PATTERN
import { tv } from '../shared/utils/themev2'
import type { ExtractSlots, ExtractVariants } from '../shared/utils/themev2'

const headingStyles = tv({
  slots: {
    root: [
      'font-heading leading-tight',
      'transition-colors duration-200',
    ],
  },
  variants: {
    // IMPROVEMENTS: ADD DECORATIONS - CONSIDER REMOVING LEVEL ADD TO VARIANT
    level: {
      1: { root: 'text-4xl lg:text-5xl font-bold' },
      2: { root: 'text-3xl lg:text-4xl font-bold' },
      3: { root: 'text-2xl lg:text-3xl font-semibold' },
      4: { root: 'text-xl lg:text-2xl font-semibold' },
      5: { root: 'text-lg lg:text-xl font-semibold' },
      6: { root: 'text-base lg:text-lg font-semibold' },
    },
    variant: {
      default: { root: 'text-highlighted' },
      section: { root: 'text-highlighted' },
      hero: { root: 'text-highlighted' },
      card: { root: 'text-highlighted' },
      muted: { root: 'text-muted' },
      accent: { root: 'text-primary' },
      content: { root: 'text-highlighted' },
    },
  },
  compoundVariants: [
    { level: 1, variant: 'hero', class: { root: 'text-5xl lg:text-6xl xl:text-7xl' } },
    { level: 3, variant: 'section', class: { root: 'text-2xl lg:text-4xl' } },
  ],
  defaultVariants: {
    level: 2,
    variant: 'default',
    align: 'left',
  },
})

export type HeadingVariants = ExtractVariants<typeof headingStyles>
export type HeadingSlots = ExtractSlots<typeof headingStyles>
export default headingStyles
