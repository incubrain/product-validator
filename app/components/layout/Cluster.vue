<!-- app/components/layout/Cluster.vue -->
<script setup lang="ts">
import clusterStyles from '~~/theme/layout/cluster'

interface Props {
  variant?: 'default' | 'centered' | 'between' | 'end' | 'tight' | 'loose' | 'no-wrap' | 'vertical' | 'inline'
  as?: string
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  as: 'div'
})

const styles = computed(() => clusterStyles(props))
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