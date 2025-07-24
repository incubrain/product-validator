<!-- app/components/layout/Grid.vue -->
<script setup lang="ts">
import gridStyles from '~~/theme/layout/grid'

interface Props {
  variant?: 'auto' | 'thirds' | 'halves' | 'quarters' | 'cards' | 'compact' | 'wide' | 'masonry'
  as?: string
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'auto',
  as: 'div',
})

const styles = computed(() => gridStyles(props))
</script>

<template>
  <component
    :is="as"
    :class="[styles.root(), $attrs.class]"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>
