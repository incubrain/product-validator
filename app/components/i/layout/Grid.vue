<script setup lang="ts">
import gridStyles from '#theme/layout/grid'
import type { GridProps } from '#shared/types/components'

const props = withDefaults(defineProps<GridProps>(), {
  variant: 'auto-fit',
  flow: 'row',
  gap: 'md',
  align: 'start',
  as: 'div',
})

defineOptions({ inheritAttrs: false })

defineSlots<{
  default(props?: object): any
}>()

// ✅ SIMPLE AND FOCUSED
const ui = tvComputed(() => gridStyles({
  variant: props.variant,
  flow: props.flow,
  gap: props.gap,
  align: props.align,
}))
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
