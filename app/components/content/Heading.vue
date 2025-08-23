<!-- components/content/Heading.vue -->
<script setup lang="ts">
import headingStyles from '#theme/content/heading'
import type { HeadingVariants } from '#theme/content/heading'

interface Props {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  variant?: HeadingVariants['variant']
  ui?: { root?: string }
}

const props = withDefaults(defineProps<Props>(), {
  level: 2,
  variant: 'default',
})

defineOptions({ inheritAttrs: false })

const htmlElement = computed(() => `h${props.level}`)

const ui = tvComputed(() => headingStyles({
  level: props.level,
  variant: props.variant,
}))
</script>

<template>
  <component
    :is="htmlElement"
    :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>
