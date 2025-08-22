import { tv, extractTV } from '#shared/utils/theme'
import type { ExtractSlots, ExtractVariants } from '#shared/utils/theme'

export const patternStyles = tv({
  slots: {
    root: ['w-full', 'h-full', 'relative', 'i-pattern'],
  },
  variants: {
    variant: {
      'dots': { root: `i-pattern-dots` },
      'grid': { root: `i-pattern-grid` },
      'plus': { root: `i-pattern-plus` },
      'diagonal-lines': { root: `i-pattern-diagonal-lines` },
      'noise': { root: `i-pattern-noise` },
      'triangles': { root: `i-pattern-triangles` },
      'pyramids': { root: `i-pattern-pyramids` },
      'circuit': { root: `i-pattern-circuit` },
      'hexagon': { root: `i-pattern-hexagon` },
    },

    // Intensity presets using CSS vars
    intensity: {
      subtle: { root: '[--pattern-opacity:8%]' },
      medium: { root: '[--pattern-opacity:15%]' },
      strong: { root: '[--pattern-opacity:25%]' },
    },

    // Direction control for diagonal patterns
    direction: {
      ne: { root: '[--pattern-direction:45deg]' },
      nw: { root: '[--pattern-direction:135deg]' },
      se: { root: '[--pattern-direction:315deg]' },
      sw: { root: '[--pattern-direction:225deg]' },
      vertical: { root: '[--pattern-direction:90deg]' },
      horizontal: { root: '[--pattern-direction:0deg]' },
    },

    // Size presets
    size: {
      'xs': { root: '[--pattern-size:16px]' },
      'sm': { root: '[--pattern-size:24px]' },
      'md': { root: '[--pattern-size:32px]' },
      'lg': { root: '[--pattern-size:48px]' },
      'xl': { root: '[--pattern-size:64px]' },
      '2xl': { root: '[--pattern-size:96px]' },
    },

    // Spacing control
    spacing: {
      tight: { root: '[--pattern-spacing:12px]' },
      normal: { root: '[--pattern-spacing:20px]' },
      relaxed: { root: '[--pattern-spacing:32px]' },
      loose: { root: '[--pattern-spacing:48px]' },
    },

    // Stroke width for line-based patterns
    stroke: {
      thin: { root: '[--pattern-stroke:0.5px]' },
      normal: { root: '[--pattern-stroke:1.5px]' }, // Bumped from 1px
      thick: { root: '[--pattern-stroke:2px]' }, //
      bold: { root: '[--pattern-stroke:3px]' }, // Bumped from 2px
    },

    // Dot size for dot-based patterns
    dotSize: {
      xs: { root: '[--pattern-dot-size:1px]' }, // Bumped from 0.5px
      sm: { root: '[--pattern-dot-size:1.5px]' }, //
      md: { root: '[--pattern-dot-size:2px]' }, //
      lg: { root: '[--pattern-dot-size:3px]' }, // Bumped from 2px
      xl: { root: '[--pattern-dot-size:4px]' }, //
    },

    // X positioning
    x: {
      'left': { root: '[--pattern-x:0%]' },
      'quarter': { root: '[--pattern-x:25%]' },
      'center': { root: '[--pattern-x:50%]' },
      'three-quarter': { root: '[--pattern-x:75%]' },
      'right': { root: '[--pattern-x:100%]' },
    },

    // Y positioning
    y: {
      'top': { root: '[--pattern-y:0%]' },
      'quarter': { root: '[--pattern-y:25%]' },
      'center': { root: '[--pattern-y:50%]' },
      'three-quarter': { root: '[--pattern-y:75%]' },
      'bottom': { root: '[--pattern-y:100%]' },
    },
  },

  defaultVariants: {
    variant: 'dots',
    intensity: 'medium',
    direction: 'ne',
    size: 'md',
    spacing: 'normal',
    stroke: 'normal',
    dotSize: 'sm',
    x: 'center',
    y: 'center',
  },
})

export const patternData = extractTV(patternStyles, {
  title: 'Dynamic Pattern Effects',
  description: 'Customizable pattern backgrounds with dynamic color control',
  category: 'layout',
  propMappings: {
    'dots': ['intensity', 'size', 'dotSize', 'from'],
    'grid': ['intensity', 'size', 'stroke', 'from'],
    'plus': ['intensity', 'size', 'stroke', 'from'],
    'diagonal-lines': ['intensity', 'direction', 'spacing', 'stroke', 'from'],
    'noise': ['intensity', 'from'],
    'triangles': ['intensity', 'size', 'stroke', 'from'],
    'pyramids': ['intensity', 'size', 'from'],
    'circuit': ['intensity', 'size', 'stroke', 'dotSize', 'from'],
    'hexagon': ['intensity', 'size', 'stroke', 'from'],
  },
})

export type PatternVariants = ExtractVariants<typeof patternStyles>
export type PatternSlots = ExtractSlots<typeof patternStyles>

export default patternStyles
