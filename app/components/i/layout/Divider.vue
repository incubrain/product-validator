<!-- app/components/layout/Divider.vue -->
<script setup lang="ts">
import dividerStyles from '~~/theme/layout/divider'

interface Props {
  variant?: 'line' | 'gradient' | 'dotted' | 'branded'
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  orientation?: 'horizontal' | 'vertical'
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'line',
  spacing: 'md',
  orientation: 'horizontal',
})

const styles = computed(() => dividerStyles(props))
</script>

<template>
  <div :class="[styles.root(), $attrs.class]">
    <div :class="styles.line()" />
  </div>
</template>
