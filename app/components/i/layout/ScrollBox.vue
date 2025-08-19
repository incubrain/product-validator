<!-- app/components/layout/ScrollBox.vue -->
<script setup lang="ts">
import scrollBoxStyles from '#theme/layout/scroll-box'
import type { ScrollBoxProps } from '#shared/types/components'

const props = withDefaults(defineProps<ScrollBoxProps>(), {
  variant: 'auto',
  behavior: 'auto',
  overscroll: 'auto',
  height: 'xl',
  as: 'div',
})

defineOptions({ inheritAttrs: false })

defineSlots<{
  default(props?: object): any
}>()

const ui = tvComputed(() => scrollBoxStyles({
  variant: props.variant,
  behavior: props.behavior,
  overscroll: props.overscroll,
  height: props.height,
}), props.trackingId)
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
