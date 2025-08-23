// theme/content/text-effect.ts
import { tv, extractTV } from '#shared/utils/theme'
import type { ExtractSlots, ExtractVariants } from '#shared/utils/theme'

const textEffectStyles = tv({
  slots: {
    root: ['inline'],
  },
  variants: {
    effect: {
      none: { root: '' },

      gradient: {
        root: [
          'bg-clip-text',
          'text-transparent',
          'box-decoration-clone', // Critical for multi-line text
          'bg-gradient-to-r',
        ],
      },

      glow: {
        root: [
          // Removed 'text-white' to inherit parent text color
        ],
      },
    },

    // Intensity controls the strength of the effect
    intensity: {
      subtle: {
        // Gradient: lighter opacity
        // Glow: smaller shadow
      },
      medium: {
        // Default intensity
      },
      strong: {
        // Gradient: more saturation
        // Glow: larger, brighter shadow
      },
    },

    // Color variants for different brand colors
    color: {
      primary: {},
      secondary: {},
      accent: {},
      info: {},
      success: {},
      warning: {},
      error: {},
    },
  },

  // Compound variants for specific effect + color + intensity combinations
  compoundVariants: [
    // GRADIENT COMBINATIONS - PRIMARY
    {
      effect: 'gradient',
      color: 'primary',
      intensity: 'subtle',
      class: { root: 'from-primary/60 to-primary' },
    },
    {
      effect: 'gradient',
      color: 'primary',
      intensity: 'medium',
      class: { root: 'from-primary to-secondary' },
    },
    {
      effect: 'gradient',
      color: 'primary',
      intensity: 'strong',
      class: { root: 'from-primary via-secondary to-accent' },
    },

    // GRADIENT COMBINATIONS - SECONDARY
    {
      effect: 'gradient',
      color: 'secondary',
      intensity: 'subtle',
      class: { root: 'from-secondary/60 to-secondary' },
    },
    {
      effect: 'gradient',
      color: 'secondary',
      intensity: 'medium',
      class: { root: 'from-secondary to-accent' },
    },
    {
      effect: 'gradient',
      color: 'secondary',
      intensity: 'strong',
      class: { root: 'from-secondary via-accent to-primary' },
    },

    // GRADIENT COMBINATIONS - ACCENT
    {
      effect: 'gradient',
      color: 'accent',
      intensity: 'subtle',
      class: { root: 'from-accent/60 to-accent' },
    },
    {
      effect: 'gradient',
      color: 'accent',
      intensity: 'medium',
      class: { root: 'from-accent to-primary' },
    },
    {
      effect: 'gradient',
      color: 'accent',
      intensity: 'strong',
      class: { root: 'from-accent via-primary to-secondary' },
    },

    // GRADIENT COMBINATIONS - INFO (example, extend as needed)
    {
      effect: 'gradient',
      color: 'info',
      intensity: 'subtle',
      class: { root: 'from-info/60 to-info' },
    },
    {
      effect: 'gradient',
      color: 'info',
      intensity: 'medium',
      class: { root: 'from-info to-success' },
    },
    {
      effect: 'gradient',
      color: 'info',
      intensity: 'strong',
      class: { root: 'from-info via-success to-warning' },
    },

    // GRADIENT COMBINATIONS - SUCCESS
    {
      effect: 'gradient',
      color: 'success',
      intensity: 'subtle',
      class: { root: 'from-success/60 to-success' },
    },
    {
      effect: 'gradient',
      color: 'success',
      intensity: 'medium',
      class: { root: 'from-success to-info' },
    },
    {
      effect: 'gradient',
      color: 'success',
      intensity: 'strong',
      class: { root: 'from-success via-info to-primary' },
    },

    // GRADIENT COMBINATIONS - WARNING
    {
      effect: 'gradient',
      color: 'warning',
      intensity: 'subtle',
      class: { root: 'from-warning/60 to-warning' },
    },
    {
      effect: 'gradient',
      color: 'warning',
      intensity: 'medium',
      class: { root: 'from-warning to-error' },
    },
    {
      effect: 'gradient',
      color: 'warning',
      intensity: 'strong',
      class: { root: 'from-warning via-error to-accent' },
    },

    // GRADIENT COMBINATIONS - ERROR
    {
      effect: 'gradient',
      color: 'error',
      intensity: 'subtle',
      class: { root: 'from-error/60 to-error' },
    },
    {
      effect: 'gradient',
      color: 'error',
      intensity: 'medium',
      class: { root: 'from-error to-warning' },
    },
    {
      effect: 'gradient',
      color: 'error',
      intensity: 'strong',
      class: { root: 'from-error via-warning to-secondary' },
    },

    // GLOW COMBINATIONS - PRIMARY
    {
      effect: 'glow',
      color: 'primary',
      intensity: 'subtle',
      class: {
        root: [
          'text-shadow-md',
          '[text-shadow:0_0_8px_hsl(var(--primary)/0.3)]',
        ],
      },
    },
    {
      effect: 'glow',
      color: 'primary',
      intensity: 'medium',
      class: {
        root: [
          'text-shadow-lg',
          '[text-shadow:0_0_16px_hsl(var(--primary)/0.5)]',
        ],
      },
    },
    {
      effect: 'glow',
      color: 'primary',
      intensity: 'strong',
      class: {
        root: [
          'text-shadow-xl',
          '[text-shadow:0_0_24px_hsl(var(--primary)/0.7),0_0_48px_hsl(var(--primary)/0.3)]',
        ],
      },
    },

    // GLOW COMBINATIONS - SECONDARY
    {
      effect: 'glow',
      color: 'secondary',
      intensity: 'subtle',
      class: {
        root: [
          'text-shadow-md',
          '[text-shadow:0_0_8px_hsl(var(--secondary)/0.3)]',
        ],
      },
    },
    {
      effect: 'glow',
      color: 'secondary',
      intensity: 'medium',
      class: {
        root: [
          'text-shadow-lg',
          '[text-shadow:0_0_16px_hsl(var(--secondary)/0.5)]',
        ],
      },
    },
    {
      effect: 'glow',
      color: 'secondary',
      intensity: 'strong',
      class: {
        root: [
          'text-shadow-xl',
          '[text-shadow:0_0_24px_hsl(var(--secondary)/0.7),0_0_48px_hsl(var(--secondary)/0.3)]',
        ],
      },
    },

    // GLOW COMBINATIONS - ACCENT
    {
      effect: 'glow',
      color: 'accent',
      intensity: 'subtle',
      class: {
        root: [
          'text-shadow-md',
          '[text-shadow:0_0_8px_hsl(var(--accent)/0.3)]',
        ],
      },
    },
    {
      effect: 'glow',
      color: 'accent',
      intensity: 'medium',
      class: {
        root: [
          'text-shadow-lg',
          '[text-shadow:0_0_16px_hsl(var(--accent)/0.5)]',
        ],
      },
    },
    {
      effect: 'glow',
      color: 'accent',
      intensity: 'strong',
      class: {
        root: [
          'text-shadow-xl',
          '[text-shadow:0_0_24px_hsl(var(--accent)/0.7),0_0_48px_hsl(var(--accent)/0.3)]',
        ],
      },
    },

    // GLOW COMBINATIONS - INFO (example, extend as needed)
    {
      effect: 'glow',
      color: 'info',
      intensity: 'subtle',
      class: {
        root: [
          'text-shadow-md',
          '[text-shadow:0_0_8px_hsl(var(--info)/0.3)]',
        ],
      },
    },
    {
      effect: 'glow',
      color: 'info',
      intensity: 'medium',
      class: {
        root: [
          'text-shadow-lg',
          '[text-shadow:0_0_16px_hsl(var(--info)/0.5)]',
        ],
      },
    },
    {
      effect: 'glow',
      color: 'info',
      intensity: 'strong',
      class: {
        root: [
          'text-shadow-xl',
          '[text-shadow:0_0_24px_hsl(var(--info)/0.7),0_0_48px_hsl(var(--info)/0.3)]',
        ],
      },
    },

    // GLOW COMBINATIONS - SUCCESS
    {
      effect: 'glow',
      color: 'success',
      intensity: 'subtle',
      class: {
        root: [
          'text-shadow-md',
          '[text-shadow:0_0_8px_hsl(var(--success)/0.3)]',
        ],
      },
    },
    {
      effect: 'glow',
      color: 'success',
      intensity: 'medium',
      class: {
        root: [
          'text-shadow-lg',
          '[text-shadow:0_0_16px_hsl(var(--success)/0.5)]',
        ],
      },
    },
    {
      effect: 'glow',
      color: 'success',
      intensity: 'strong',
      class: {
        root: [
          'text-shadow-xl',
          '[text-shadow:0_0_24px_hsl(var(--success)/0.7),0_0_48px_hsl(var(--success)/0.3)]',
        ],
      },
    },

    // GLOW COMBINATIONS - WARNING
    {
      effect: 'glow',
      color: 'warning',
      intensity: 'subtle',
      class: {
        root: [
          'text-shadow-md',
          '[text-shadow:0_0_8px_hsl(var(--warning)/0.3)]',
        ],
      },
    },
    {
      effect: 'glow',
      color: 'warning',
      intensity: 'medium',
      class: {
        root: [
          'text-shadow-lg',
          '[text-shadow:0_0_16px_hsl(var(--warning)/0.5)]',
        ],
      },
    },
    {
      effect: 'glow',
      color: 'warning',
      intensity: 'strong',
      class: {
        root: [
          'text-shadow-xl',
          '[text-shadow:0_0_24px_hsl(var(--warning)/0.7),0_0_48px_hsl(var(--warning)/0.3)]',
        ],
      },
    },

    // GLOW COMBINATIONS - ERROR
    {
      effect: 'glow',
      color: 'error',
      intensity: 'subtle',
      class: {
        root: [
          'text-shadow-md',
          '[text-shadow:0_0_8px_hsl(var(--error)/0.3)]',
        ],
      },
    },
    {
      effect: 'glow',
      color: 'error',
      intensity: 'medium',
      class: {
        root: [
          'text-shadow-lg',
          '[text-shadow:0_0_16px_hsl(var(--error)/0.5)]',
        ],
      },
    },
    {
      effect: 'glow',
      color: 'error',
      intensity: 'strong',
      class: {
        root: [
          'text-shadow-xl',
          '[text-shadow:0_0_24px_hsl(var(--error)/0.7),0_0_48px_hsl(var(--error)/0.3)]',
        ],
      },
    },
  ],

  defaultVariants: {
    effect: 'none',
    intensity: 'medium',
    color: 'primary',
  },
})

export const textEffectData = extractTV(textEffectStyles, {
  title: 'Text Visual Effects',
  description: 'Inline text effects for gradients, glows, and visual emphasis',
  category: 'content',
})

export type TextEffectVariants = ExtractVariants<typeof textEffectStyles>
export type TextEffectSlots = ExtractSlots<typeof textEffectStyles>
export default textEffectStyles
