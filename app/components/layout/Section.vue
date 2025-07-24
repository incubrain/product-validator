<!-- app/components/layout/Section.vue -->
<script setup lang="ts">
import sectionStyles from '~~/theme/layout/section'

interface Props {
  variant?: 'default' | 'compact' | 'generous' | 'hero' | 'minimal'
  background?: 'none' | 'circuit' | 'neural' | 'quantum' | 'cyber'
  as?: string
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  background: 'none',
  as: 'section',
})

const styles = computed(() => sectionStyles(props))
</script>

<template>
  <LayoutBackground
    :as="as"
    :preset="background"
    :class="[styles.root(), $attrs.class]"
  >
    <slot />
  </LayoutBackground>
</template>
