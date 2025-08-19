<script setup lang="ts">
import { sectionStyles } from '#theme/layout/section'
import type { SectionProps } from '#shared/types/components'

const props = withDefaults(defineProps<SectionProps>(), {
  variant: 'default',
  height: 'auto',
  background: 'none',
  as: 'section',
})

defineOptions({ inheritAttrs: false })

defineSlots<{
  default(props?: object): any
}>()

// ✅ NUXT UI PATTERN - TV instance with variants
const ui = tvComputed(() => sectionStyles({
  variant: props.variant,
  height: props.height,
}), props.trackingId)
</script>

<template>
  <IBackground
    :preset="background"
  >
    <ILayoutContainer
      :as="as"
      :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })"
    >
      <slot />
    </ILayoutContainer>
  </IBackground>
</template>
