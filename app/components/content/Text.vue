<script setup lang="ts">
import textStyles from '#theme/content/text'
import type { TextProps } from '#shared/types/components'

const props = withDefaults(defineProps<TextProps>(), {
  variant: 'default',
  size: 'base',
  as: 'p',
  text: undefined,
})

defineOptions({ inheritAttrs: false })

const { processMockText } = useMock()

const computedText = computed(() => processMockText(props.text))

const ui = tvComputed(() => textStyles({
  variant: props.variant,
  size: props.size,
}), props.trackingId)
</script>

<template>
  <component
    :is="as"
    :class="ui.root({ class: [props.ui?.root, $attrs.class] })"
  >
    <slot>{{ computedText }}</slot>
  </component>
</template>
