import { tv, extractTV } from '#shared/utils/theme'
import type { ExtractSlots, ExtractVariants } from '#shared/utils/theme'

const createGradientStyles = (baseColor: string) =>
  tv({
    slots: {
      root: ['w-full', 'h-full', 'relative', 'i-gradient'],
    },
    variants: {
      variant: {
        linear: { root: `i-gradient-linear-${baseColor}` },
        radial: { root: `i-gradient-radial-${baseColor}` },
        conic: { root: `i-gradient-conic-${baseColor}` },
        mesh: { root: `i-gradient-mesh-${baseColor}` },
        spotlight: { root: `i-gradient-spotlight-${baseColor}` },
        shimmer: { root: `i-gradient-shimmer-${baseColor}` },
      },

      // write CSS vars using Tailwind v4 arbitrary properties
      intensity: {
        subtle: { root: '[--gradient-opacity:0.08]' },
        medium: { root: '[--gradient-opacity:0.14]' },
        strong: { root: '[--gradient-opacity:0.20]' },
        intense: { root: '[--gradient-opacity:0.32]' },
      },

      angle: {
        start: { root: '[--gradient-angle:0deg]' },
        ne: { root: '[--gradient-angle:45deg]' },
        up: { root: '[--gradient-angle:90deg]' },
        nw: { root: '[--gradient-angle:135deg]' },
        reverse: { root: '[--gradient-angle:180deg]' },
        sw: { root: '[--gradient-angle:225deg]' },
        down: { root: '[--gradient-angle:270deg]' },
        se: { root: '[--gradient-angle:315deg]' },
      },

      // underscore means “space” in Tailwind arbitrary values
      position: {
        'center': { root: '[--gradient-position:center]' },
        'top': { root: '[--gradient-position:top]' },
        'bottom': { root: '[--gradient-position:bottom]' },
        'left': { root: '[--gradient-position:left]' },
        'right': { root: '[--gradient-position:right]' },
        'top-left': { root: '[--gradient-position:top_left]' },
        'top-right': { root: '[--gradient-position:top_right]' },
        'bottom-left': { root: '[--gradient-position:bottom_left]' },
        'bottom-right': { root: '[--gradient-position:bottom_right]' },
      },

      x: {
        'left': { root: '[--gradient-x:0%]' },
        'quarter': { root: '[--gradient-x:25%]' },
        'center': { root: '[--gradient-x:50%]' },
        'three-quarter': { root: '[--gradient-x:75%]' },
        'right': { root: '[--gradient-x:100%]' },
      },
      y: {
        'top': { root: '[--gradient-y:0%]' },
        'quarter': { root: '[--gradient-y:25%]' },
        'center': { root: '[--gradient-y:50%]' },
        'three-quarter': { root: '[--gradient-y:75%]' },
        'bottom': { root: '[--gradient-y:100%]' },
      },
    },

    defaultVariants: {
      variant: 'linear',
      intensity: 'medium',
      position: 'center',
      angle: 'nw',
      x: 'center',
      y: 'center',
    },
  })

const gradientStyles = createGradientStyles('primary')

export const gradientData = extractTV(gradientStyles, {
  title: 'Dynamic Gradient Effects',
  description: 'Customizable gradient backgrounds with dynamic color control',
  category: 'layout',
  propMappings: {
    linear: ['intensity', 'angle', 'from', 'to'],
    radial: ['intensity', 'position', 'from'],
    conic: ['intensity', 'angle', 'from', 'to'],
    spotlight: ['intensity', 'position', 'x', 'y', 'from'],
    mesh: ['intensity', 'from', 'to'],
    shimmer: ['intensity', 'from'],
  },
})

export type GradientVariants = ExtractVariants<typeof gradientStyles>
export type GradientSlots = ExtractSlots<typeof gradientStyles>

export { createGradientStyles }
export default gradientStyles
