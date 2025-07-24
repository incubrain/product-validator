<!-- app/components/layout/Wrapper.vue -->
<script setup lang="ts">
import { useSlots } from 'vue'

interface Props {
  spacing?: 'compact' | 'standard' | 'generous'
}

withDefaults(defineProps<Props>(), {
  spacing: 'standard',
})

const slots = useSlots()

const spacingClasses = {
  compact: 'section-spacing-compact',
  standard: 'section-spacing',
  generous: 'section-spacing-generous',
}

// Extract actual components from fragment
const getComponents = () => {
  const slotContent = slots.default?.()
  if (!slotContent) return []

  // Handle fragment case
  const firstSlot = slotContent[0]
  if (firstSlot?.children && Array.isArray(firstSlot.children)) {
    return firstSlot.children
  }

  // Fallback to direct slots
  return slotContent
}
</script>

<template>
  <div>
    <section
      v-for="(child, index) in getComponents()"
      :key="child?.key || index"
    >
      <component
        :is="child"
        :class="spacingClasses[spacing]"
      />
    </section>
  </div>
</template>
