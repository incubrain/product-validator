<!-- app/components/layout/Center.vue -->
<script setup lang="ts">
import centerStyles from '~~/theme/layout/center'

interface Props {
  variant?: 'default' | 'narrow' | 'prose' | 'wide' | 'full' | 'text-only' | 'no-padding'
  as?: string
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  as: 'div'
})

const styles = computed(() => centerStyles(props))
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