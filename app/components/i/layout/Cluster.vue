<script setup lang="ts">
import clusterStyles from '#theme/layout/cluster'
import type { ClusterProps } from '#shared/types/components'

const props = withDefaults(defineProps<ClusterProps>(), {
  variant: 'default',
  as: 'div',
})

defineOptions({ inheritAttrs: false })

defineSlots<{
  default(props?: object): any
}>()

// ✅ NUXT UI PATTERN - TV instance with variants
const ui = tvComputed(() => clusterStyles({
  variant: props.variant,
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
