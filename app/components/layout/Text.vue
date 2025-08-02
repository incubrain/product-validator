<!-- app/components/layout/Text.vue -->
<script setup lang="ts">
import textStyles from '~~/theme/text'
import type { TextProps } from '#shared/types/components'

const props = withDefaults(defineProps<TextProps>(), {
  variant: 'default',
  size: 'base',
  as: 'p',
})

defineOptions({ inheritAttrs: false })

const ui = computed(() => textStyles({
  variant: props.variant,
  size: props.size,
}))
</script>

<template>
  <component
    :is="as"
    :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })"
    v-bind="$attrs"
  >
    {{ text }}
  </component>
</template>
