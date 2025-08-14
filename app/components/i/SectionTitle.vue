<!-- app/components/layout/SectionTitle.vue -->
<script setup lang="ts">
import sectionTitleStyles from '~~/theme/layout/section-title'
import type { SectionTitleProps } from '#shared/types/components'

const props = withDefaults(defineProps<SectionTitleProps>(), {
  variant: 'left',
  badge: () => ({ color: 'info', variant: 'subtle', size: 'xl' }),
  heading: () => ({ anchor: true, anchorIcon: false, level: 3, variant: 'section' }),
  subtitle: () => ({ variant: 'section' }),
})

defineSlots<{
  before(props?: object): any
  after(props?: object): any
}>()

const ui = computed(() => sectionTitleStyles({
  variant: props.variant,
}))
</script>

<!-- Updated ISectionTitle template section -->
<template>
  <div :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })">
    <slot name="before" />

    <UBadge
      v-if="badge.label"
      v-bind="badge"
    />

    <IHeading
      v-if="heading.text"
      v-bind="heading"
    />

    <IText
      v-if="subtitle.text"
      v-bind="subtitle"
    />

    <slot name="after" />
  </div>
</template>
