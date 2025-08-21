<script setup lang="ts">
import { useElementSize } from '@vueuse/core'

interface Props {
  minWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  minWidth: 240,
})

const wrapperRef = ref<HTMLElement>()
const containerRef = ref<HTMLElement>()
const width = ref(600) // temporary default
const maxWidth = ref(1200) // will be set to parent width
const isDragging = ref(false)

// Read-only size observation for display purposes
const { width: actualWidth } = useElementSize(containerRef)

onMounted(async () => {
  await nextTick()
  if (wrapperRef.value) {
    const parentWidth = wrapperRef.value.offsetWidth
    width.value = parentWidth
    maxWidth.value = parentWidth

    // Apply initial width
    if (containerRef.value) {
      containerRef.value.style.width = `${parentWidth}px`
    }
  }
})

const updateContainerWidth = (newWidth: number) => {
  width.value = newWidth
  nextTick(() => {
    if (containerRef.value) {
      containerRef.value.style.width = `${newWidth}px`
    }
  })
}

let startX = 0
let startWidth = 0

const handleMouseDown = (e: MouseEvent) => {
  isDragging.value = true
  startX = e.clientX
  startWidth = width.value

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
  e.preventDefault()
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return

  const deltaX = e.clientX - startX
  const newWidth = Math.max(props.minWidth, Math.min(maxWidth.value, startWidth + deltaX))
  updateContainerWidth(newWidth)
}

const handleMouseUp = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}
</script>

<template>
  <div
    ref="wrapperRef"
    class="relative w-full bg-elevated border border-default rounded-lg p-2 flex"
  >
    <div
      ref="containerRef"
      class="relative flex justify-between rounded-l-lg bg-muted @container py-6 pl-6 max-h-[640px] overflow-hidden"
      :class="{ 'border-primary/50': isDragging }"
    >
      <div class="w-full">
        <slot />
      </div>
      <!-- Drag handle -->
    </div>
    <div class="pointer-events-none flex min-h-full w-10 bg-muted justify-center items-center rounded-r-lg">
      <div
        title="Drag to resize"
        class="pointer-events-auto h-15 w-3 cursor-ew-resize rounded-full bg-secondary/20 hover:bg-secondary/40 transition-colors"
        :class="{ 'bg-primary/40': isDragging }"
        @mousedown="handleMouseDown"
      />
    </div>

    <div class="absolute -top-6 left-0 text-xs text-muted font-mono">
      {{ Math.round(actualWidth) }}px
    </div>
  </div>
</template>
