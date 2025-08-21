<!-- app/components/layout/ScrollBox.vue -->
<script setup lang="ts">
import scrollBoxStyles from '#theme/layout/scroll-box'
import type { ScrollBoxProps } from '#shared/types/components'

const props = withDefaults(defineProps<ScrollBoxProps>(), {
  direction: 'x',
  height: 'md',
  snap: 'none',
  gap: 'md',
  padding: 'md',
  as: 'div',
})

const ui = tvComputed(() => scrollBoxStyles({
  direction: props.direction,
  height: props.height,
  snap: props.snap,
  gap: props.gap,
  padding: props.padding,
}))
</script>

<template>
  <component
    :is="as"
    :class="ui.root({ class: [props.ui?.root, $attrs.class] })"
    v-bind="$attrs"
  >
    <div :class="ui.content({ class: props.ui?.content })">
      <slot />
    </div>
  </component>
</template>
