<script setup lang="ts">
import backgroundStyles from '#theme/wip/background'
import type { BackgroundProps } from '#shared/types/components'

const props = withDefaults(defineProps<BackgroundProps>(), {
  preset: 'none',
  pattern: 'none',
  intensity: 'medium',
  gradient: 'none',
  motion: false,
  as: 'div',
})

defineOptions({ inheritAttrs: false })

defineSlots<{
  default(props?: object): any
}>()

// ✅ NUXT UI PATTERN - TV instance with variants
const ui = tvComputed(() => backgroundStyles({
  preset: props.preset,
  pattern: props.pattern,
  intensity: props.intensity,
  gradient: props.gradient,
  motion: props.motion,
}))

// Only apply effects when preset is not 'none'
const shouldApplyEffects = computed(() => props.preset !== 'none')
</script>

<template>
  <component
    :is="as"
    :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>
