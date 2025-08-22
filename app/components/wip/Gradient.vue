<script setup lang="ts">
import { createGradientStyles, gradientData } from '#theme/wip/gradient'
import type { GradientVariants } from '#theme/wip/gradient'

type ColorShade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950'
type ColorName = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
type FullColor = `${ColorName}-${ColorShade}` | ColorName

interface Props {
  variant?: GradientVariants['variant']
  intensity?: GradientVariants['intensity']
  position?: GradientVariants['position']
  angle?: GradientVariants['angle']
  x?: GradientVariants['x']
  y?: GradientVariants['y']
  from?: FullColor
  to?: FullColor
  ui?: { root?: string }
  trackingId?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'linear',
  intensity: 'medium',
  position: 'center',
  angle: 'start',
  x: 'center',
  y: 'center',
  from: 'primary-500',
  to: undefined,
})

// ✅ SIMPLE: Dev feedback using validateProps
const { $development } = useNuxtApp()
const isDev = computed(() => $development || import.meta.dev)

const propValidation = computed(() => {
  if (!isDev.value) return { unused: [], hasIssues: false, relevantProps: [] }

  return validateProps(
    props,
    props.variant,
    gradientData.coreData.propMappings || {},
  )
})

const baseColor = computed(() =>
  props.from.includes('-') ? props.from.split('-')[0] : props.from,
)

// ✅ TV WITH ALL VARIANTS
const ui = tvComputed(() => createGradientStyles(baseColor.value)({
  variant: props.variant,
  intensity: props.intensity,
  position: props.position,
  angle: props.angle,
  x: props.x,
  y: props.y,
}), props.trackingId)

const toCssToken = (c: FullColor) =>
  c.includes('-') ? `var(--ui-color-${c})` : `var(--ui-color-${c}-500)`

const fromColor = computed(() => toCssToken(props.from as FullColor))

const toColor = computed(() => {
  if (props.to) return toCssToken(props.to as FullColor)
  const base = props.from.includes('-') ? props.from.split('-')[0] : props.from
  const fromShade = props.from.includes('-') ? parseInt(props.from.split('-')[1] ?? '700') : 700
  const targetShade = Math.min(950, fromShade + 300)
  return `var(--ui-color-${base}-${targetShade})`
})

const rootElement = ref<HTMLElement>()
</script>

<template>
  <div
    ref="rootElement"
    :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })"
  >
    <!-- ✅ SIMPLE DEV FEEDBACK -->
    <slot />
  </div>
</template>

<style scoped>
div[class*="i-gradient-"] {
  --gradient-from: v-bind(fromColor);
  --gradient-to: v-bind(toColor);
}
</style>
