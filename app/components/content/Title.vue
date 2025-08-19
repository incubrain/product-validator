<script setup lang="ts">
import titleStyles from '#theme/i/title'
import type { TitleProps } from '#shared/types/components'

const props = withDefaults(defineProps<TitleProps>(), {
  variant: 'center',
})

defineSlots<{
  before(props?: object): any
  after(props?: object): any
}>()

// ✅ NUXT UI PATTERN - TV instance with variants using tvComputed
const ui = tvComputed(() => titleStyles({
  variant: props.variant,
}), props.trackingId)
</script>

<template>
  <div :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })">
    <slot name="before" />

    <UBadge
      v-if="badge?.label"
      v-bind="badge"
      :class="ui.badge({ class: props.ui?.badge })"
    />

    <ContentHeading
      v-if="heading?.text"
      v-bind="heading"
      :class="ui.heading({ class: props.ui?.heading })"
    />

    <ContentText
      v-if="subtitle?.text"
      v-bind="subtitle"
      :class="ui.subtitle({ class: props.ui?.subtitle })"
    />

    <slot name="after" />
  </div>
</template>
