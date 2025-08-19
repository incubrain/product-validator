<!-- app/components/layout/Anchor.vue - MODERN ARCHITECTURE -->
<script setup lang="ts">
import anchorStyles from '#theme/anchor'
import type { AnchorProps } from '#shared/types/components'

const props = withDefaults(defineProps<AnchorProps>(), {
  as: 'div',
  showIcon: true,
})

defineOptions({ inheritAttrs: false })

defineSlots<{
  default(props?: object): any
}>()

const route = useRoute()

const isActive = computed(() => {
  const currentHash = route.hash.replace('#', '')
  return currentHash === props.id
})

// ✅ NUXT UI PATTERN - TV instance with variants
const ui = computed(() => anchorStyles({
  element: props.as,
  showIcon: props.showIcon,
  isActive: isActive.value,
}))
</script>

<template>
  <component
    :is="as"
    :id="id"
    :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })"
    v-bind="$attrs"
  >
    <ULink
      :to="`#${id}`"
      :class="ui.link({ class: props.ui?.link })"
      :aria-label="`Link to ${id} section`"
      raw
    >
      <slot />

      <UIcon
        v-if="showIcon"
        name="i-lucide-hash"
        :class="ui.icon({ class: props.ui?.icon })"
      />
    </ULink>
  </component>
</template>
