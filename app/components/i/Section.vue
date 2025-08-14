<!-- app/components/layout/Section.vue -->
<script setup lang="ts">
import sectionStyles from '~~/theme/layout/section'
import type { SectionProps } from '#shared/types/components'

const props = withDefaults(defineProps<SectionProps>(), {
  variant: 'default',
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
}))
</script>

<template>
  <IBackground
    :as="as"
    :preset="background"
    :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })"
    v-bind="$attrs"
  >
    <UContainer>
      <slot />
    </UContainer>
  </IBackground>
</template>
