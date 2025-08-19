// theme/layout/scroll-box.ts - FIXED VERSION
import { tv, extractTV } from '#shared/utils/theme'
import type { ExtractSlots, ExtractVariants } from '#shared/utils/theme'

const scrollBoxStyles = tv({
  slots: {
    root: ['relative', 'w-full'],
  },
  variants: {
    height: {
      'auto': { root: 'h-auto' },
      'xs': { root: 'h-[200px]' },
      'sm': { root: 'h-[300px]' },
      'md': { root: 'h-[400px]' },
      'lg': { root: 'h-[500px]' },
      'xl': { root: 'h-[600px]' },
      '2xl': { root: 'h-[700px]' },
      'screen': { root: 'h-screen' },
      'half': { root: 'h-[50vh]' },
      'section': { root: 'h-[60vh]' },
    },

    variant: {
      // Basic overflow patterns
      'auto': {
        root: 'overflow-auto',
      },
      'hidden': {
        root: 'overflow-hidden',
      },
      'scroll': {
        root: 'overflow-scroll',
      },

      // Directional patterns
      'x-auto': {
        root: 'overflow-x-auto overflow-y-hidden',
      },
      'y-auto': {
        root: 'overflow-y-auto overflow-x-hidden',
      },
      'x-scroll': {
        root: 'overflow-x-scroll overflow-y-hidden',
      },
      'y-scroll': {
        root: 'overflow-y-scroll overflow-x-hidden',
      },

      // Common use-case patterns
      'carousel': {
        root: 'overflow-x-auto overflow-y-hidden snap-x snap-proximity scroll-px-4',
      },
      'gallery': {
        root: 'overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-px-6',
      },
      'chat': {
        root: 'overflow-y-auto overflow-x-hidden',
      },
      'table': {
        root: 'overflow-x-auto overflow-y-hidden',
      },
      'modal': {
        root: 'overflow-y-auto overflow-x-hidden',
      },
      'sections': {
        root: 'overflow-y-auto overflow-x-hidden snap-y snap-proximity scroll-py-4',
      },

      // ✅ FIXED: Advanced snap patterns - allows vertical scrolling
      'snap-x': {
        root: 'overflow-x-auto snap-x snap-proximity',
      },
      'snap-y': {
        root: 'overflow-y-auto snap-y snap-proximity',
      },
      'snap-x-mandatory': {
        root: 'overflow-x-auto snap-x snap-mandatory',
      },
      'snap-y-mandatory': {
        root: 'overflow-y-auto snap-y snap-mandatory',
      },
    },

    // Scroll animation behavior
    behavior: {
      auto: {
        root: 'scroll-auto',
      },
      smooth: {
        root: 'scroll-smooth',
      },
    },

    // Overscroll boundary behavior
    overscroll: {
      'auto': {
        root: 'overscroll-auto',
      },
      'contain': {
        root: 'overscroll-contain',
      },
      'none': {
        root: 'overscroll-none',
      },
      'x-contain': {
        root: 'overscroll-x-contain',
      },
      'y-contain': {
        root: 'overscroll-y-contain',
      },
      'x-none': {
        root: 'overscroll-x-none',
      },
      'y-none': {
        root: 'overscroll-y-none',
      },
    },
  },

  defaultVariants: {
    variant: 'auto',
    behavior: 'auto',
    overscroll: 'auto',
    height: 'md',
  },
})

export const scrollBoxData = extractTV(scrollBoxStyles, {
  title: 'Scroll Container Utilities',
  description: 'Scroll containers with overflow control, snap behavior, and smooth scrolling',
  category: 'layout',
})

export type ScrollBoxVariants = ExtractVariants<typeof scrollBoxStyles>
export type ScrollBoxSlots = ExtractSlots<typeof scrollBoxStyles>
export default scrollBoxStyles
