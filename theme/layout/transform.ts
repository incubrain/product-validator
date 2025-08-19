// theme/layout/transform.ts
import { tv, extractTV } from '../../shared/utils/themev3'
import type { ExtractSlots, ExtractVariants } from '../../shared/utils/themev2'

const transformStyles = tv({
  slots: {
    root: [''],
  },
  variants: {
    // CORE 60% USE CASES - Most common transform patterns
    variant: {
      'none': {
        root: 'transform-none',
      },

      // Essential hover effects (90% of interactive elements)
      'hover-lift': {
        root: 'transition-transform duration-300 hover:scale-105 hover:-translate-y-1',
      },
      'hover-scale': {
        root: 'transition-transform duration-300 hover:scale-110',
      },

      // Essential positioning (modals, overlays, centering)
      'center-absolute': {
        root: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      },

      // Essential loading states (spinners, loaders)
      'spin': {
        root: 'animate-spin',
      },
      'pulse': {
        root: 'animate-pulse',
      },

      // Essential interaction feedback
      'press': {
        root: 'transition-transform duration-150 active:scale-95',
      },

      // Custom escape hatch
      'custom': {
        root: '', // Styling handled via ui prop
      },
    },

    // SIMPLIFIED CONTROLS - Only essential modifiers
    timing: {
      fast: { root: 'duration-150' },
      normal: { root: 'duration-300' },
      slow: { root: 'duration-500' },
    },

    origin: {
      center: { root: 'origin-center' },
      top: { root: 'origin-top' },
      bottom: { root: 'origin-bottom' },
      left: { root: 'origin-left' },
      right: { root: 'origin-right' },
    },
  },

  // Minimal compound variants for common combinations
  compoundVariants: [
    {
      variant: 'hover-lift',
      timing: 'fast',
      class: { root: 'duration-150' },
    },
  ],

  defaultVariants: {
    variant: 'none',
    timing: 'normal',
    origin: 'center',
  },
})

export const transformData = extractTV(transformStyles, {
  title: 'Transform Utilities',
  description: 'Transform effects for hover states, loading animations, and interactive feedback',
  category: 'layout',
})
export type TransformVariants = ExtractVariants<typeof transformStyles>
export type TransformSlots = ExtractSlots<typeof transformStyles>
export default transformStyles

/*
FUTURE IMPROVEMENTS (when we need more coverage):

// Additional hover effects
'hover-rotate': 'transition-transform duration-300 hover:rotate-3',
'hover-tilt': 'transition-transform duration-300 hover:rotate-1 hover:scale-105',

// Additional animations
'bounce': 'animate-bounce',
'ping': 'animate-ping',

// Media transforms
'zoom': 'transition-transform duration-500 hover:scale-110 overflow-hidden',

// 3D transforms (requires more testing)
'3d-lift': 'transition-all duration-300 hover:translate-z-4 hover:rotate-x-5 transform-3d',
'3d-tilt': 'transition-all duration-300 hover:rotate-x-12 hover:rotate-y-12 transform-3d',

// Mirror effects
'flip-x': 'scale-x-[-1]',
'flip-y': 'scale-y-[-1]',

// Additional positioning
'center-x': 'relative left-1/2 -translate-x-1/2',
'center-y': 'relative top-1/2 -translate-y-1/2',

// Advanced controls (when needed)
perspective: { dramatic: 'perspective-dramatic', normal: 'perspective-normal' },
gpu: { force: 'transform-gpu', cpu: 'transform-cpu' },
easing: { 'in': 'ease-in', 'out': 'ease-out', 'in-out': 'ease-in-out' },
*/
