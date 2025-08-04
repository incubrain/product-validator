<!-- app/components/layout/Center.vue - ENHANCED IMPLEMENTATION -->
<script setup lang="ts">
import centerStyles from '~~/theme/layout/center'
import type { CenterProps } from '#shared/types/components'

const props = withDefaults(defineProps<CenterProps>(), {
  variant: 'default',
  padding: 'none',
  as: 'div',
})

defineOptions({ inheritAttrs: false })

defineSlots<{
  default(props?: object): any
}>()

// ✅ NUXT UI PATTERN - TV instance with variants
const ui = tvComputed(() => centerStyles({
  variant: props.variant,
  padding: props.padding,
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
