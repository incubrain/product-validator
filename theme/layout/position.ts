// theme/layout/position.ts
import { tv, extractTV } from '#shared/utils/theme'
import type { ExtractSlots, ExtractVariants } from '#shared/utils/theme'

const layoutPositionStyles = tv({
  slots: {
    root: ['relative'],
  },
  variants: {
    variant: {
      // Static/Relative positioning
      'static': {
        root: 'static',
      },
      'relative': {
        root: 'relative',
      },

      // Sticky positioning patterns
      'sticky-top': {
        root: 'sticky top-0',
      },
      'sticky-bottom': {
        root: 'sticky bottom-0',
      },
      'sticky-center': {
        root: 'sticky top-1/2 -translate-y-1/2',
      },

      // Fixed positioning patterns
      'fixed-top': {
        root: 'fixed top-0 left-0 right-0',
      },
      'fixed-bottom': {
        root: 'fixed bottom-0 left-0 right-0',
      },
      'fixed-left': {
        root: 'fixed top-0 left-0 bottom-0',
      },
      'fixed-right': {
        root: 'fixed top-0 right-0 bottom-0',
      },
      'fixed-cover': {
        root: 'fixed inset-0',
      },

      // Floating corner positions
      'floating-tl': {
        root: 'fixed top-4 left-4',
      },
      'floating-tr': {
        root: 'fixed top-4 right-4',
      },
      'floating-bl': {
        root: 'fixed bottom-4 left-4',
      },
      'floating-br': {
        root: 'fixed bottom-4 right-4',
      },
      'floating-center': {
        root: 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      },

      // Absolute positioning patterns
      'absolute-tl': {
        root: 'absolute top-0 left-0',
      },
      'absolute-tr': {
        root: 'absolute top-0 right-0',
      },
      'absolute-bl': {
        root: 'absolute bottom-0 left-0',
      },
      'absolute-br': {
        root: 'absolute bottom-0 right-0',
      },
      'absolute-center': {
        root: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      },
      'absolute-cover': {
        root: 'absolute inset-0',
      },

      // Edge spanning patterns
      'absolute-top': {
        root: 'absolute inset-x-0 top-0',
      },
      'absolute-bottom': {
        root: 'absolute inset-x-0 bottom-0',
      },
      'absolute-left': {
        root: 'absolute inset-y-0 left-0',
      },
      'absolute-right': {
        root: 'absolute inset-y-0 right-0',
      },
    },

    // ✅ FIXED: Simplified offset classes that actually work
    offset: {
      'none': {},
      'px': { root: 'top-px' },
      'xs': { root: 'top-1' },
      'sm': { root: 'top-2' },
      'md': { root: 'top-4' },
      'lg': { root: 'top-6' },
      'xl': { root: 'top-8' },
      '2xl': { root: 'top-12' },
    },

    // Z-index management with semantic names
    zIndex: {
      auto: { root: 'z-auto' },
      base: { root: 'z-0' },
      above: { root: 'z-10' },
      sticky: { root: 'z-20' },
      header: { root: 'z-30' },
      floating: { root: 'z-40' },
      modal: { root: 'z-50' },
      popover: { root: 'z-[60]' },
      tooltip: { root: 'z-[70]' },
      max: { root: 'z-[9999]' },
    },

    // Isolation control
    isolation: {
      auto: { root: 'isolation-auto' },
      isolate: { root: 'isolate' },
    },

    // Scroll behavior for sticky/fixed elements
    behavior: {
      'default': {},
      'hide-on-scroll': {
        root: 'transition-transform duration-300 ease-in-out',
      },
      'show-on-scroll': {
        root: 'transition-transform duration-300 ease-in-out',
      },
      'slide-down': {
        root: 'transition-all duration-500 ease-out',
      },
    },
  },

  defaultVariants: {
    variant: 'relative',
    offset: 'none',
    zIndex: 'auto',
    isolation: 'auto',
    behavior: 'default',
  },
})

export const layoutPositionData = extractTV(layoutPositionStyles, {
  title: 'Advanced Element Positioning',
  description: 'Comprehensive positioning system for sticky headers, floating elements, overlays and complex layouts',
  category: 'layout',
})

export type LayoutPositionVariants = ExtractVariants<typeof layoutPositionStyles>
export type LayoutPositionSlots = ExtractSlots<typeof layoutPositionStyles>
export default layoutPositionStyles
