<!-- app/components/layout/Stack.vue - MODERNIZED -->
<script setup lang="ts">
import stackStyles from '~~/theme/layout/stack'
import type { StackProps } from '#shared/types/components'

const props = withDefaults(defineProps<StackProps>(), {
  variant: 'default',
  gap: 'md',
  as: 'div',
})

defineOptions({ inheritAttrs: false })

defineSlots<{
  default(props?: object): any
}>()

const ui = tvComputed(() => stackStyles({
  variant: props.variant,
  gap: props.gap,
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
