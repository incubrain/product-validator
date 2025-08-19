<!-- app/components/layout/Container.vue -->
<script setup lang="ts">
import containerStyles from '#theme/layout/container'
import type { ContainerProps } from '#shared/types/components'

const props = withDefaults(defineProps<ContainerProps>(), {
  variant: 'default',
  as: 'div',
})

defineOptions({ inheritAttrs: false })

defineSlots<{
  default(props?: object): any
}>()

const ui = tvComputed(() => containerStyles({
  variant: props.variant,
}), props.trackingId)
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
