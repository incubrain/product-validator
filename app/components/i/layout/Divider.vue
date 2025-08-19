<script setup lang="ts">
import dividerStyles from '#theme/layout/divider'
import type { DividerProps } from '#shared/types/components'

const props = withDefaults(defineProps<DividerProps>(), {
  variant: 'line',
  spacing: 'md',
  orientation: 'horizontal',
})

defineOptions({ inheritAttrs: false })

defineSlots<{
  default(props?: object): any
}>()

// ✅ NUXT UI PATTERN - TV instance with variants
const ui = tvComputed(() => dividerStyles({
  variant: props.variant,
  spacing: props.spacing,
  orientation: props.orientation,
}), props.trackingId)
</script>

<template>
  <div
    :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })"
    v-bind="$attrs"
  >
    <div :class="ui.line({ class: props.ui?.line })" />
  </div>
</template>
