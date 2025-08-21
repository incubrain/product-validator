<script setup lang="ts">
type ColorShade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950'
type ColorName = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
type FullColor = `${ColorName}-${ColorShade}` | ColorName

interface Props {
  variant?: 'flow' | 'radial' | 'vertical' | 'horizontal' | 'conic' | 'mesh' | 'spotlight' | 'shimmer'
  from?: FullColor
  to?: FullColor
  opacity?: number
  direction?: string
  intensity?: 'subtle' | 'medium' | 'strong'
  position?: string
  // NEW: Conic gradient angle
  angle?: string
  // NEW: Spotlight positioning
  x?: string
  y?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'flow',
  from: 'primary-500',
  opacity: 0.2,
  direction: '135deg',
  intensity: 'medium',
  position: 'ellipse at center',
  angle: '0deg',
  x: '50%',
  y: '50%',
})

const parseColor = (color: FullColor) => {
  return color.includes('-') ? `var(--ui-color-${color})` : `var(--ui-color-${color}-500)`
}

const generateSmartDefault = (fromColor: FullColor): string => {
  const baseColor = fromColor.includes('-') ? fromColor.split('-')[0] : fromColor
  const fromShade = fromColor.includes('-') ? parseInt(fromColor.split('-')[1]) : 500

  const intensityOffset = {
    subtle: 100,
    medium: 200,
    strong: 300,
  }

  const targetShade = Math.min(950, fromShade + intensityOffset[props.intensity])
  return `var(--ui-color-${baseColor}-${targetShade})`
}

// Computed values for v-bind
const fromColor = computed(() => parseColor(props.from))
const toColor = computed(() => props.to ? parseColor(props.to) : generateSmartDefault(props.from))
const opacity = computed(() => props.opacity)
const direction = computed(() => props.direction)
const position = computed(() => props.position)
const angle = computed(() => props.angle)
const x = computed(() => props.x)
const y = computed(() => props.y)

// Intensity stops
const fromStop = computed(() => {
  const intensityMap = { subtle: '15%', medium: '30%', strong: '50%' }
  return intensityMap[props.intensity]
})
const toStop = computed(() => {
  const intensityMap = { subtle: '10%', medium: '25%', strong: '40%' }
  return intensityMap[props.intensity]
})

const baseClass = computed(() => {
  const baseColor = props.from.includes('-') ? props.from.split('-')[0] : props.from
  return `i-gradient-${props.variant}-${baseColor} w-full h-screen flex justify-center items-center`
})
</script>

<template>
  <div :class="baseClass">
    <slot />
  </div>
</template>

<style scoped>
/* Override with v-bind for component control */
div[class*="i-gradient-"] {
  --gradient-from: v-bind(fromColor);
  --gradient-to: v-bind(toColor);
  --gradient-opacity: v-bind(opacity);
  --gradient-direction: v-bind(direction);
  --gradient-position: v-bind(position);
  --gradient-from-stop: v-bind(fromStop);
  --gradient-to-stop: v-bind(toStop);
  --gradient-angle: v-bind(angle);
  --gradient-x: v-bind(x);
  --gradient-y: v-bind(y);
}
</style>
