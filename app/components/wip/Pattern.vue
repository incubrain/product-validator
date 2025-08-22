<script setup lang="ts">
import { patternStyles, patternData } from '#theme/wip/pattern'
import type { PatternVariants } from '#theme/wip/pattern'

type ColorShade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950'
type ColorName = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
type FullColor = `${ColorName}-${ColorShade}` | ColorName

interface Props {
  variant?: PatternVariants['variant']
  intensity?: PatternVariants['intensity']
  direction?: PatternVariants['direction']
  size?: PatternVariants['size']
  spacing?: PatternVariants['spacing']
  stroke?: PatternVariants['stroke']
  dotSize?: PatternVariants['dotSize']
  x?: PatternVariants['x']
  y?: PatternVariants['y']
  from?: FullColor
  to?: FullColor
  ui?: { root?: string }
  trackingId?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'dots',
  intensity: 'medium',
  direction: 'ne',
  size: 'md',
  spacing: 'normal',
  stroke: 'normal',
  dotSize: 'sm',
  x: 'center',
  y: 'center',
  from: 'primary-500',
  to: undefined,
})

// Dev feedback using validateProps
const { $development } = useNuxtApp()
const isDev = computed(() => $development || import.meta.dev)

const propValidation = computed(() => {
  if (!isDev.value) return { unused: [], hasIssues: false, relevantProps: [] }

  return validateProps(
    props,
    props.variant,
    patternData.coreData.propMappings || {},
  )
})

// TV with all variants
const ui = tvComputed(() => patternStyles({
  variant: props.variant,
  intensity: props.intensity,
  direction: props.direction,
  size: props.size,
  spacing: props.spacing,
  stroke: props.stroke,
  dotSize: props.dotSize,
  x: props.x,
  y: props.y,
}), props.trackingId)

const toCssToken = (c: FullColor) =>
  c.includes('-') ? `var(--ui-color-${c})` : `var(--ui-color-${c}-500)`

const fromColor = computed(() => toCssToken(props.from as FullColor))

const toColor = computed(() => {
  if (props.to) return toCssToken(props.to as FullColor)
  const base = props.from.includes('-') ? props.from.split('-')[0] : props.from
  const fromShade = props.from.includes('-') ? parseInt(props.from.split('-')[1] ?? '500') : 500
  const targetShade = Math.min(950, fromShade + 200)
  return `var(--ui-color-${base}-${targetShade})`
})

const rootElement = ref<HTMLElement>()
</script>

<template>
  <div
    ref="rootElement"
    :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })"
  >
    <slot />
  </div>
</template>

<style scoped>
div[class*="i-pattern-"] {
  --pattern-from: v-bind(fromColor);
  --pattern-to: v-bind(toColor);
}
</style>
