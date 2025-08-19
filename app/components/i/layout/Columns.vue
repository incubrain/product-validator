<script setup lang="ts">
import columnsStyles from '#theme/layout/columns'
import type { ColumnsProps } from '#shared/types/components'

const props = withDefaults(defineProps<ColumnsProps>(), {
  variant: 'masonry',
  gap: 'md',
  spacing: 'md',
  as: 'div',
})

defineOptions({ inheritAttrs: false })

defineSlots<{
  default(props?: object): any
}>()

// ✅ SIMPLE TV COMPUTED
const ui = tvComputed(() => columnsStyles({
  variant: props.variant,
  gap: props.gap,
  spacing: props.spacing,
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
