<script setup lang="ts">
type ColorShade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950'
type ColorName = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
type FullColor = `${ColorName}-${ColorShade}` | ColorName

interface Props {
  // SIMPLIFIED: Only 8 core patterns
  variant?: 'dots' | 'grid' | 'plus' | 'diagonal-lines' | 'noise' | 'triangles' | 'pyramids' | 'circuit' | 'hexagon'

  // Enhanced color control (like gradients)
  from?: FullColor
  to?: FullColor

  // Essential positioning and direction
  direction?: string | number // For diagonal patterns
  x?: string | number // X positioning for positioned patterns
  y?: string | number // Y positioning for positioned patterns

  // Size/spacing control
  size?: number | string
  spacing?: number | string
  stroke?: number | string
  dotSize?: number | string

  // Intensity presets (for quick styling)
  intensity?: 'subtle' | 'medium' | 'strong'
  opacity?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'dots',
  from: 'primary',
  to: 'secondary',
  intensity: 'medium',
})

// Parse color to CSS variable
const parseColor = (color: FullColor) => {
  return color.includes('-') ? `var(--ui-color-${color})` : `var(--ui-color-${color}-500)`
}

// Generate smart secondary color default
const generateSmartSecondary = (fromColor: FullColor): string => {
  const baseColor = fromColor.includes('-') ? fromColor.split('-')[0] : fromColor
  const fromShade = fromColor.includes('-') ? parseInt(fromColor.split('-')[1]) : 500

  // Intensity-based secondary generation
  const intensityOffset = {
    subtle: 100,
    medium: 200,
    strong: 300,
  }

  const targetShade = Math.min(950, fromShade + intensityOffset[props.intensity])
  return `var(--ui-color-${baseColor}-${targetShade})`
}

// Intensity-based opacity mapping
const getIntensityOpacity = () => {
  if (typeof props.opacity === 'number') return `${props.opacity}%`
  if (typeof props.opacity === 'string') return props.opacity

  const intensityMap = {
    subtle: '10%',
    medium: '20%',
    strong: '35%',
  }
  return intensityMap[props.intensity]
}

// Format direction value
const formatDirection = (direction: string | number | undefined): string => {
  if (direction === undefined || direction === null) return '45deg'
  if (typeof direction === 'number') return `${direction}deg`
  return direction
}

// Format position values
const formatPosition = (pos: string | number | undefined, fallback: string): string => {
  if (pos === undefined || pos === null) return fallback
  if (typeof pos === 'number') return `${pos}%`
  return pos
}

// Computed CSS variables for dynamic control (consistent with gradients)
const patternFrom = computed(() => parseColor(props.from))
const patternTo = computed(() => props.to ? parseColor(props.to) : generateSmartSecondary(props.from))
const patternOpacity = computed(() => getIntensityOpacity())
const patternSize = computed(() =>
  typeof props.size === 'number' ? `${props.size}px` : (props.size || '60px'),
)
const patternSpacing = computed(() =>
  typeof props.spacing === 'number' ? `${props.spacing}px` : (props.spacing || '24px'),
)
const patternDirection = computed(() => formatDirection(props.direction))
const patternX = computed(() => formatPosition(props.x, '50%'))
const patternY = computed(() => formatPosition(props.y, '50%'))
const patternStroke = computed(() =>
  typeof props.stroke === 'number' ? `${props.stroke}px` : props.stroke,
)
const patternDotSize = computed(() =>
  typeof props.dotSize === 'number' ? `${props.dotSize}px` : props.dotSize,
)

// Generate base CSS class
const baseClass = computed(() => {
  const classes = [`i-pattern-${props.variant} w-full h-80 flex justify-center items-center`]
  return classes.join(' ')
})
</script>

<template>
  <div :class="[baseClass, $attrs.class]">
    <slot />
  </div>
</template>

<style scoped>
/* Override pattern variables with component props - consistent naming */
div[class*="i-pattern-"] {
  --pattern-from: v-bind(patternFrom);
  --pattern-to: v-bind(patternTo);
  --pattern-opacity: v-bind(patternOpacity);
  --pattern-size: v-bind(patternSize);
  --pattern-spacing: v-bind(patternSpacing);
  --pattern-direction: v-bind(patternDirection);
  --pattern-x: v-bind(patternX);
  --pattern-y: v-bind(patternY);
  --pattern-stroke: v-bind(patternStroke);
  --pattern-dot-size: v-bind(patternDotSize);
}
</style>
