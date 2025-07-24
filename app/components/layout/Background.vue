<!-- app/components/layout/Background.vue - UPDATED -->
<script setup lang="ts">
import backgroundStyles from '~~/theme/layout/background'

interface Props {
  preset?: 'none' | 'circuit' | 'neural' | 'quantum' | 'cyber' | 'subtle' | 'muted' | 'elevated'
  pattern?: 'circuit' | 'dots' | 'grid' | 'neural-network' | 'quantum-dots' | 'none'
  intensity?: 'light' | 'medium' | 'strong'
  gradient?: 'neural' | 'quantum' | 'cyber' | 'none'
  motion?: boolean
  as?: string
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  preset: 'none',
  pattern: 'none',
  intensity: 'medium',
  gradient: 'none',
  motion: false,
  as: 'div',
})

const styles = computed(() => backgroundStyles(props))

// Only apply effects when preset is not 'none'
const shouldApplyEffects = computed(() => props.preset !== 'none')
</script>

<template>
  <component
    :is="as"
    :class="[styles.root(), $attrs.class]"
  >
    <slot />
  </component>
</template>
