<!-- app/components/layout/Transform.vue -->
<script setup lang="ts">
import transformStyles from '~~/theme/layout/transform'
import type { TransformProps } from '#shared/types/components'

const props = withDefaults(defineProps<TransformProps>(), {
  variant: 'none',
  timing: 'normal',
  origin: 'center',
  as: 'div',
})

defineOptions({ inheritAttrs: false })

defineSlots<{
  default(props?: object): any
}>()

// ✅ NUXT UI PATTERN - TV instance with variants
const ui = tvComputed(() => transformStyles({
  variant: props.variant,
  timing: props.timing,
  origin: props.origin,
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
