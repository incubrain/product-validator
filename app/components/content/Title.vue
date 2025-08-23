<script setup lang="ts">
import titleStyles from '#theme/i/title'
import type { TitleProps } from '#shared/types/components'

const props = withDefaults(defineProps<TitleProps>(), {
  variant: 'left',
  badge: () => ({
    variant: 'subtle',
    ui: {
      base: 'uppercase',
    },
  }),
})

defineSlots<{
  default(props?: object): any // Default slot for heading content
  badge(props?: object): any // Slot for badge content
  subtitle(props?: object): any // Slot for subtitle content
  before(props?: object): any
  after(props?: object): any
}>()

const ui = tvComputed(() => titleStyles({
  variant: props.variant,
}), props.trackingId)
</script>

<template>
  <div :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })">
    <slot name="before" />

    <UBadge
      v-if="$slots.badge || badge?.label"
      v-bind="badge"
      :class="ui.badge({ class: props.ui?.badge })"
    >
      <slot
        v-if="$slots.badge"
        name="badge"
      />
    </UBadge>

    <ContentHeading
      v-if="$slots.default || heading?.text"
      v-bind="heading"
      :class="ui.heading({ class: props.ui?.heading })"
    >
      <slot v-if="$slots.default" />
    </ContentHeading>

    <ContentText
      v-if="$slots.subtitle || subtitle?.text"
      v-bind="subtitle"
      :class="ui.subtitle({ class: props.ui?.subtitle })"
    >
      <slot
        v-if="$slots.subtitle"
        name="subtitle"
      />
    </ContentText>

    <slot name="after" />
  </div>
</template>
