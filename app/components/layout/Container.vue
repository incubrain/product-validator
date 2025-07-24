<!-- app/components/layout/Container.vue -->
<script setup lang="ts">
import containerStyles from '~~/theme/layout/container'

interface Props {
  size?: 'narrow' | 'default' | 'wide' | 'full'
  align?: 'left' | 'center' | 'right'
  as?: string
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  align: 'center',
  as: 'div'
})

const styles = computed(() => containerStyles(props))
</script>

<template>
  <component 
    :is="as"
    :class="[styles.root(), $attrs.class]"
  >
    <slot />
  </component>
</template>