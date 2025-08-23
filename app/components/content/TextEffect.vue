<!-- components/content/TextEffect.vue -->
<script setup lang="ts">
import textEffectStyles from '#theme/content/text-effect'
import type { TextEffectVariants } from '#theme/content/text-effect'

interface Props {
  effect?: TextEffectVariants['effect']
  intensity?: TextEffectVariants['intensity']
  color?: TextEffectVariants['color']
  as?: string
  ui?: { root?: string }
  trackingId?: string
}

const props = withDefaults(defineProps<Props>(), {
  effect: 'none',
  intensity: 'medium',
  color: 'primary',
  as: 'span',
})

defineOptions({ inheritAttrs: false })

defineSlots<{
  default(props?: object): any
}>()

const ui = tvComputed(() => textEffectStyles({
  effect: props.effect,
  intensity: props.intensity,
  color: props.color,
}), props.trackingId)
</script>

<template>
  <component
    :is="as"
    :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>
