<!-- app/components/layout/Split.vue -->
<script setup lang="ts">
import splitStyles from '~~/theme/layout/split'
import type { SplitProps } from '#shared/types/components'

const props = withDefaults(defineProps<SplitProps>(), {
  ratio: '50-50',
  gap: 'none',
  reverse: false,
  as: 'div',
})

defineOptions({ inheritAttrs: false })

defineSlots<{
  first(props?: object): any
  second(props?: object): any
}>()

const ui = tvComputed(() => splitStyles({
  ratio: props.ratio,
  gap: props.gap,
  reverse: props.reverse,
}))
</script>

<template>
  <component
    :is="as"
    :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })"
    v-bind="$attrs"
  >
    <div :class="ui.first({ class: props.ui?.first })">
      <slot name="first" />
    </div>

    <div :class="ui.second({ class: props.ui?.second })">
      <slot name="second" />
    </div>
  </component>
</template>
