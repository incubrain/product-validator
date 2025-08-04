<!-- app/components/showcase/DemoCard.vue -->
<script setup lang="ts">
interface Props {
  title: string
  description: string
  config?: Record<string, any>
  span?: 1 | 2 | 4 // Column span for different card sizes
  minHeight?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  span: 1,
  minHeight: 'md',
})

defineSlots<{
  default(props: object): any
  config?(props: object): any
}>()

// Column span classes
const spanClasses = computed(() => {
  const spans = {
    1: 'col-span-1',
    2: 'col-span-1 sm:col-span-2 lg:col-span-2',
    4: 'col-span-1 sm:col-span-2 lg:col-span-4',
  }
  return spans[props.span]
})

// Min height classes
const heightClasses = computed(() => {
  const heights = {
    sm: 'min-h-[100px]',
    md: 'min-h-[120px]',
    lg: 'min-h-[160px]',
    xl: 'min-h-[200px]',
  }
  return heights[props.minHeight]
})

// Extract config entries for display
const configEntries = computed(() => {
  if (!props.config) return []
  return Object.entries(props.config).filter(([key, value]) =>
    value !== undefined && value !== null && value !== '',
  )
})
</script>

<!-- app/components/showcase/DemoCard.vue -->
<template>
  <div :class="[spanClasses, 'flex flex-col h-full']">
    <!-- Card Header - Fixed height -->
    <div class="flex-shrink-0 space-y-2 mb-4">
      <h3 class="font-medium text-gray-900 dark:text-white">
        {{ title }}
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-300">
        {{ description }}
      </p>

      <!-- Config Display -->
      <div
        v-if="configEntries.length || $slots.config"
        class="text-xs space-y-1"
      >
        <slot name="config">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="[key, value] in configEntries"
              :key="key"
              class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300"
            >
              {{ key }}="{{ value }}"
            </span>
          </div>
        </slot>
      </div>
    </div>

    <!-- Demo Container - Grows to fill remaining space -->
    <div
      :class="[
        'relative bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex items-center justify-center flex-grow',
        heightClasses, // Keep for minimum height constraint
      ]"
    >
      <slot />
    </div>
  </div>
</template>
