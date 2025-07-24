<!-- app/components/layout/Stack.vue -->
<script setup lang="ts">
import stackStyles from '~~/theme/layout/stack'

interface Props {
  variant?: 'default' | 'centered' | 'compact' | 'spacious' | 'horizontal' | 'horizontal-between' | 'horizontal-center' | 'stack-to-row' | 'center-to-between'
  as?: string
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  as: 'div'
})

const styles = computed(() => stackStyles(props))

console.log('🐛 Stack theme debug:', {
  default: stackStyles({ variant: 'default' }),
  centered: stackStyles({ variant: 'centered' }),
  horizontal: stackStyles({ variant: 'horizontal' })
})
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