<!-- app/components/layout/Grid.vue - ENHANCED IMPLEMENTATION -->
<script setup lang="ts">
import gridStyles from '~~/theme/layout/grid'
import type { GridProps } from '#shared/types/components'

const props = withDefaults(defineProps<GridProps>(), {
  variant: 'auto',
  gap: 'md',
  as: 'div',
})

defineOptions({ inheritAttrs: false })

defineSlots<{
  default(props?: object): any
}>()

const ui = tvComputed(() => gridStyles({
  variant: props.variant,
  gap: props.gap,
}))
</script>

<template>
  <component
    :is="as"
    :class="ui.root({ class: [props.ui?.root, $attrs.class] })"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>
