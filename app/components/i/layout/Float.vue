<!-- app/components/layout/Float.vue -->
<script setup lang="ts">
import floatStyles from '~~/theme/layout/float'
import type { FloatProps } from '#shared/types/components'

const props = withDefaults(defineProps<FloatProps>(), {
  variant: 'left',
  clear: 'none',
  spacing: 'none',
  responsive: 'default',
  as: 'div',
})

defineOptions({ inheritAttrs: false })

defineSlots<{
  default(props?: object): any
}>()

// ✅ NUXT UI PATTERN - TV instance with variants
const ui = tvComputed(() => floatStyles({
  variant: props.variant,
  clear: props.clear,
  spacing: props.spacing,
  responsive: props.responsive,
}))
</script>

<template>
  <component
    :is="as"
    :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })"
  >
    <slot />
  </component>
</template>
