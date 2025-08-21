import { tv, extractTV } from '#shared/utils/theme'
import type { ExtractSlots, ExtractVariants } from '#shared/utils/theme'

const createGradientStyles = (baseColor: string) => tv({
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

    intensity: {
      subtle: { root: 'data-[intensity="subtle"]' },
      medium: { root: 'data-[intensity="medium"]' },
      strong: { root: 'data-[intensity="strong"]' },
      intense: { root: 'data-[intensity="intense"]' },
    },

    position: {
      'center': { root: 'data-[position="center"]' },
      'top': { root: 'data-[position="top"]' },
      'bottom': { root: 'data-[position="bottom"]' },
      'left': { root: 'data-[position="left"]' },
      'right': { root: 'data-[position="right"]' },
      'top-left': { root: 'data-[position="top-left"]' },
      'top-right': { root: 'data-[position="top-right"]' },
      'bottom-left': { root: 'data-[position="bottom-left"]' },
      'bottom-right': { root: 'data-[position="bottom-right"]' },
    },

    angle: {
      start: { root: 'data-[angle="0"]' },
      ne: { root: 'data-[angle="45"]' },
      up: { root: 'data-[angle="90"]' },
      nw: { root: 'data-[angle="135"]' },
      reverse: { root: 'data-[angle="180"]' },
      sw: { root: 'data-[angle="225"]' },
      down: { root: 'data-[angle="270"]' },
      se: { root: 'data-[angle="315"]' },
    },

    x: {
      'left': { root: 'data-[x="0"]' },
      'quarter': { root: 'data-[x="25"]' },
      'center': { root: 'data-[x="50"]' },
      'three-quarter': { root: 'data-[x="75"]' },
      'right': { root: 'data-[x="100"]' },
    },

    y: {
      'top': { root: 'data-[y="0"]' },
      'quarter': { root: 'data-[y="25"]' },
      'center': { root: 'data-[y="50"]' },
      'three-quarter': { root: 'data-[y="75"]' },
      'bottom': { root: 'data-[y="100"]' },
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
    linear: ['intensity', 'angle', 'from'],
    radial: ['intensity', 'position', 'from'],
    conic: ['intensity', 'angle', 'from'],
    spotlight: ['intensity', 'position', 'x', 'y', 'from'],
    mesh: ['intensity', 'from'],
    shimmer: ['intensity', 'from'],
  },
})

export type GradientVariants = ExtractVariants<typeof gradientStyles>
export type GradientSlots = ExtractSlots<typeof gradientStyles>

export { createGradientStyles }
export default gradientStyles
