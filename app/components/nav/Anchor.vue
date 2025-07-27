<!-- app/components/layout/Anchor.vue - SIMPLIFIED -->
<script setup lang="ts">
import anchorStyles from '~~/theme/anchor'

interface Props {
  id: string // Required - the anchor ID
  as?: string
  showIcon?: boolean
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  showIcon: true,
})

const route = useRoute()
const styles = computed(() => anchorStyles({
  ...props,
  element: props.as,
}))

const isActive = computed(() => {
  const currentHash = route.hash.replace('#', '')
  return currentHash === props.id
})
</script>

<template>
  <component
    :is="as"
    :id="id"
    :class="[styles.root(), $attrs.class]"
    v-bind="$attrs"
  >
    <ULink
      :to="`#${id}`"
      :class="styles.link()"
      :aria-label="`Link to ${id} section`"
      raw
      class="block relative"
    >
      <slot />

      <UIcon
        v-if="showIcon"
        name="i-lucide-hash"
        :class="[styles.icon(), isActive && 'opacity-70']"
      />
    </ULink>
  </component>
</template>
