<!-- app/components/layout/Frame.vue -->
<script setup lang="ts">
import frameStyles from '~~/theme/layout/frame'

interface Props {
  variant?: 'video' | 'square' | 'portrait' | 'wide' | 'golden' | 'tall' | 'cinema' | 'card'
  as?: string
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'video',
  as: 'div'
})

const styles = computed(() => frameStyles(props))
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