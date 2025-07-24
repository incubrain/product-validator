<!-- app/components/layout/Spacer.vue -->
<script setup lang="ts">
import spacerStyles from '~~/theme/layout/spacer'

interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  responsive?: boolean
  as?: string
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  responsive: true,
  as: 'div'
})

const styles = computed(() => spacerStyles(props))
</script>

<template>
  <component 
    :is="as"
    :class="[styles.root(), $attrs.class]"
  />
</template>