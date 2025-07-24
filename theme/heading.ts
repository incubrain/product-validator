// theme/layout/heading.ts - CLEANED UP
import { createUIComponent } from '../shared/utils/theme'

export default createUIComponent((config) => ({
  slots: {
    root: [
      'font-heading leading-tight',
      config.transitions && 'transition-colors duration-200',
    ],
  },
  variants: {
    level: {
      1: { root: 'text-4xl lg:text-5xl font-bold' },
      2: { root: 'text-3xl lg:text-4xl font-semibold' },
      3: { root: 'text-2xl lg:text-3xl font-semibold' },
      4: { root: 'text-xl lg:text-2xl font-semibold' },
      5: { root: 'text-lg lg:text-xl font-semibold' },
      6: { root: 'text-base lg:text-lg font-semibold' },
    },

    variant: {
      'default': { root: 'text-highlighted' },
      'section': { root: 'text-highlighted' },
      'hero': { root: 'text-highlighted' },
      'hero-subtitle': { root: 'text-muted font-normal' },
      'card': { root: 'text-highlighted' },
      'muted': { root: 'text-muted' },
      'accent': { root: 'text-primary' },
    },

    align: {
      left: { root: 'text-left' },
      center: { root: 'text-center' },
      right: { root: 'text-right' },
    },
  },

  compoundVariants: [
    { level: 1, variant: 'hero', class: { root: 'text-5xl lg:text-6xl xl:text-7xl' } },
    { variant: 'hero-subtitle', class: { root: 'text-xl lg:text-2xl' } },
  ],

  defaultVariants: {
    level: 2,
    variant: 'default',
    align: 'left',
  },
}))
