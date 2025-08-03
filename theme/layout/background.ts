// theme/background.ts - UPDATED
import { createUIComponent } from '../../shared/utils/theme'

export default createUIComponent((config) => ({
  slots: {
    root: [
      'relative',
      config.transitions && 'transition-all duration-300',
    ],
  },
  variants: {
    preset: {
      none: {
        root: '', // No styling when none
      },
      subtle: {
        root: 'bg-muted/20',
      },
      muted: {
        root: 'bg-muted',
      },
      elevated: {
        root: 'bg-elevated',
      },
      circuit: {
        root: 'i-pattern-circuit',
      },
      neural: {
        root: 'i-pattern-network',
      },
      quantum: {
        root: 'i-pattern-dots',
      },
      cyber: {
        root: 'i-gradient-cyber',
      },
    },
    intensity: {
      light: {},
      medium: {},
      strong: {},
    },
    motion: {
      true: { root: 'animate-pulse' },
      false: {},
    },
  },
  compoundVariants: [
    // Circuit intensity variations
    { preset: 'circuit', intensity: 'light', class: { root: 'i-pattern-circuit-light' } },
    { preset: 'circuit', intensity: 'strong', class: { root: 'i-pattern-circuit-strong' } },
  ],
  defaultVariants: {
    preset: 'none',
    intensity: 'medium',
    motion: false,
  },
}))
