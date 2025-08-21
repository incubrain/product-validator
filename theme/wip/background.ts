import { tv, extractTV } from '#shared/utils/theme'
import type { ExtractSlots, ExtractVariants } from '#shared/utils/theme'

const backgroundStyles = tv({
  slots: {
    root: ['relative'],
  },
  variants: {
    preset: {
      none: {
        root: '',
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
    pattern: {
      'none': {},
      'circuit': { root: 'i-pattern-circuit' },
      'dots': { root: 'i-pattern-dots' },
      'grid': { root: 'i-pattern-grid' },
      'neural-network': { root: 'i-pattern-neural-network' },
      'quantum-dots': { root: 'i-pattern-dots-quantum' },
    },
    intensity: {
      light: {},
      medium: {},
      strong: {},
    },
    gradient: {
      none: {},
      neural: { root: 'i-gradient-neural' },
      quantum: { root: 'i-gradient-quantum' },
      cyber: { root: 'i-gradient-cyber' },
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
    // Pattern intensity variations
    { pattern: 'circuit', intensity: 'light', class: { root: 'i-pattern-circuit-light' } },
    { pattern: 'circuit', intensity: 'strong', class: { root: 'i-pattern-circuit-strong' } },
  ],
  defaultVariants: {
    preset: 'none',
    pattern: 'none',
    intensity: 'medium',
    gradient: 'none',
    motion: false,
  },
})

export const backgroundData = extractTV(backgroundStyles)
export type BackgroundVariants = ExtractVariants<typeof backgroundStyles>
export type BackgroundSlots = ExtractSlots<typeof backgroundStyles>
export default backgroundStyles
