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
        root: 'ai-circuit-pattern',
      },
      neural: {
        root: 'neural-network-pattern',
      },
      quantum: {
        root: 'quantum-dots-pattern',
      },
      cyber: {
        root: 'bg-gradient-cyber',
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
    { preset: 'circuit', intensity: 'light', class: { root: 'ai-circuit-light' } },
    { preset: 'circuit', intensity: 'strong', class: { root: 'ai-circuit-strong' } },
  ],
  defaultVariants: {
    preset: 'none',
    intensity: 'medium',
    motion: false,
  },
}))
