<!-- app/components/showcase/Demo.vue -->
<script setup lang="ts">
interface Props {
  title: string
  description: string
  category?: string
}

defineProps<Props>()

defineSlots<{
  default(props: object): any
}>()

// Category badge colors
const getCategoryBadgeClasses = (category?: string) => {
  if (!category) return ''

  const variants = {
    interaction: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    layout: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    feedback: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    timing: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200',
    positioning: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
    advanced: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200',
    responsive: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    spacing: 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200',
    content: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200',
  }

  return variants[category as keyof typeof variants] || variants.advanced
}
</script>

<template>
  <div class="space-y-6">
    <!-- Section Header -->
    <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
        {{ title }}
      </h2>
      <p class="text-gray-600 dark:text-gray-300 mt-2">
        {{ description }}
      </p>
      <span
        v-if="category"
        :class="[
          getCategoryBadgeClasses(category),
          'inline-block mt-2 px-2 py-1 text-xs rounded-full',
        ]"
      >
        {{ category }}
      </span>
    </div>

    <!-- 4 Column Grid Layout (4/2/1 responsive) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
      <slot />
    </div>
  </div>
</template>
