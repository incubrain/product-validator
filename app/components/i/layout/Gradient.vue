<script setup lang="ts">
import { createGradientStyles, gradientData } from '#theme/layout/gradient'
import type { GradientVariants } from '#theme/layout/gradient'

type ColorShade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950'
type ColorName = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
type FullColor = `${ColorName}-${ColorShade}` | ColorName

interface Props {
  variant?: GradientVariants['variant']
  intensity?: GradientVariants['intensity']
  direction?: GradientVariants['direction']
  position?: GradientVariants['position']
  angle?: GradientVariants['angle']
  x?: GradientVariants['x']
  y?: GradientVariants['y']
  from?: FullColor
  ui?: { root?: string }
  trackingId?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'linear',
  intensity: 'medium',
  direction: 'diagonal',
  position: 'center',
  angle: 'start',
  x: 'center',
  y: 'center',
  from: 'primary-500',
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
  direction: props.direction, // ✅ RESTORED
  position: props.position,
  angle: props.angle,
  x: props.x, // ✅ NEW
  y: props.y, // ✅ NEW
}), props.trackingId)

// Color logic stays the same...
const fromColor = computed(() =>
  props.from.includes('-') ? `var(--ui-color-${props.from})` : `var(--ui-color-${props.from}-500)`,
)

const toColor = computed(() => {
  const baseColorName = props.from.includes('-') ? props.from.split('-')[0] : props.from
  const fromShade = props.from.includes('-') ? parseInt(props.from.split('-')[1] ?? '500') : 500
  const targetShade = Math.min(950, fromShade + 300)
  return `var(--ui-color-${baseColorName}-${targetShade})`
})
</script>

<template>
  <div :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })">
    <!-- ✅ SIMPLE DEV FEEDBACK -->
    <div
      v-if="isDev && propValidation.hasIssues"
      class="absolute top-2 right-2 z-50 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 shadow-lg text-xs max-w-sm"
    >
      <div class="flex items-center gap-1 text-yellow-700 dark:text-yellow-300 font-medium mb-2">
        ⚠️ Gradient Props
      </div>

      <!-- Unused Props -->
      <div
        v-if="propValidation.unused.length > 0"
        class="space-y-1 mb-3"
      >
        <div class="text-orange-600 dark:text-orange-400 font-medium">
          Unused for {{ props.variant }}:
        </div>
        <div
          v-for="prop in propValidation.unused"
          :key="prop"
          class="flex items-center gap-1 text-orange-700 dark:text-orange-300"
        >
          <code class="font-mono">{{ prop }}: {{ props[prop as keyof Props] }}</code>
        </div>
      </div>

      <!-- Relevant Props -->
      <div class="pt-2 border-t border-yellow-200 dark:border-yellow-700">
        <div class="text-yellow-600 dark:text-yellow-400 font-medium text-xs mb-1">
          {{ props.variant }} uses:
        </div>
        <div class="flex flex-wrap gap-1">
          <code
            v-for="prop in ['variant', ...propValidation.relevantProps]"
            :key="prop"
            class="text-xs bg-yellow-100 dark:bg-yellow-800 px-1 rounded"
          >
            {{ prop }}
          </code>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped>
div[class*="i-gradient-"] {
  --gradient-from: v-bind(fromColor);
  --gradient-to: v-bind(toColor);
}
</style>
