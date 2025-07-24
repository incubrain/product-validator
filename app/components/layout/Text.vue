<!-- app/components/layout/Text.vue - PROPS-BASED -->
<script setup lang="ts">
import textStyles from '~~/theme/text'

interface Props {
  text: string
  variant?: 'default' | 'subtitle' | 'hero-subtitle' | 'description' | 'caption' | 'small' | 'muted' | 'highlighted'
  as?: string
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  as: 'p'
})

const styles = computed(() => textStyles(props))
</script>

<template>
  <component 
    :is="as"
    :class="[styles.root(), $attrs.class]"
    v-bind="$attrs"
  >
    {{ text }}
  </component>
</template>