// theme/content/heading.ts
import { tv, extractTV } from '#shared/utils/theme'
import type { ExtractSlots, ExtractVariants } from '#shared/utils/theme'

const headingStyles = tv({
  slots: {
    root: [
      'font-heading leading-tight',
      'transition-colors duration-200 text-balance',
    ],
  },
  variants: {
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
      display: { root: 'text-highlighted' }, // New display variant for hero text
      card: { root: 'text-highlighted' },
      muted: { root: 'text-muted' },
      accent: { root: 'text-primary' },
      content: { root: 'text-highlighted' },
    },
  },
  compoundVariants: [
    // Hero sizing
    { level: 1, variant: 'hero', class: { root: 'text-5xl lg:text-6xl xl:text-7xl' } },
    { level: 1, variant: 'display', class: { root: 'text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl' } },
    { level: 3, variant: 'section', class: { root: 'text-2xl lg:text-4xl' } },
  ],
  defaultVariants: {
    level: 2,
    variant: 'default',
  },
})

export const headingData = extractTV(headingStyles, {
  title: 'Enhanced Content Headings',
  description: 'Semantic headings with sizing and color variants',
  category: 'content',
})
export type HeadingVariants = ExtractVariants<typeof headingStyles>
export type HeadingSlots = ExtractSlots<typeof headingStyles>
export default headingStyles
