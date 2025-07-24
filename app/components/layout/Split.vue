<!-- app/components/layout/Split.vue -->
<script setup lang="ts">
import splitStyles from '~~/theme/layout/split'

interface Props {
  variant?: 'default' | 'narrow' | 'wide' | 'stack-lg' | 'reverse'
  as?: string
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  as: 'div',
})

const styles = computed(() => splitStyles(props))
</script>

<template>
  <component
    :is="as"
    :class="[styles.root(), $attrs.class]"
    v-bind="$attrs"
  >
    <div>
      <slot name="primary" />
    </div>
    <div>
      <slot name="secondary" />
    </div>
  </component>
</template>
