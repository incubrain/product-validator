<!-- components/layout/LayoutPosition.vue -->
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import layoutPositionStyles from '#theme/layout/position'
import type { LayoutPositionVariants } from '#theme/layout/position'

interface Props {
  trackingId?: string
  variant?: LayoutPositionVariants['variant']
  offset?: LayoutPositionVariants['offset']
  zIndex?: LayoutPositionVariants['zIndex']
  isolation?: LayoutPositionVariants['isolation']
  behavior?: LayoutPositionVariants['behavior']
  hideThreshold?: number
  scrollContainer?: HTMLElement | Window
  ui?: { root?: string }
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'relative',
  offset: 'none',
  zIndex: 'auto',
  isolation: 'auto',
  behavior: 'default',
  hideThreshold: 100,
})

const elementRef = ref<HTMLElement>()
const isVisible = ref(true)

// ✅ FIXED: Use prop or fallback to window
const scrollTarget = computed(() => props.scrollContainer || window)
const { y: scrollY } = useScroll(scrollTarget)
const lastScrollY = ref(0)

// Smart scroll behavior logic
watch(scrollY, (newY) => {
  if (props.behavior === 'hide-on-scroll') {
    isVisible.value = newY < lastScrollY.value || newY < props.hideThreshold
  } else if (props.behavior === 'show-on-scroll') {
    isVisible.value = newY > lastScrollY.value && newY > props.hideThreshold
  }
  lastScrollY.value = newY
})

// Generate theme classes
const ui = tvComputed(() => layoutPositionStyles({
  variant: props.variant,
  offset: props.offset,
  zIndex: props.zIndex,
  isolation: props.isolation,
  behavior: props.behavior,
}), props.trackingId)

// Dynamic transform styles for scroll behaviors
const dynamicStyles = computed(() => {
  if (props.behavior === 'hide-on-scroll' && !isVisible.value) {
    return { transform: 'translateY(-100%)' }
  }
  if (props.behavior === 'show-on-scroll' && !isVisible.value) {
    return { transform: 'translateY(100%)' }
  }
  return {}
})
</script>

<template>
  <div
    ref="elementRef"
    :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })"
    :style="dynamicStyles"
  >
    <slot />
  </div>
</template>
