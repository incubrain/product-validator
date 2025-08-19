<script setup lang="ts">
import frameStyles from '#theme/layout/frame'
import type { FrameProps } from '#shared/types/components'

const props = withDefaults(defineProps<FrameProps>(), {
  variant: 'video',
  as: 'div',
})

defineOptions({ inheritAttrs: false })

defineSlots<{
  default(props?: object): any
}>()

// ✅ NUXT UI PATTERN - TV instance with variants
const ui = tvComputed(() => frameStyles({
  variant: props.variant,
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
