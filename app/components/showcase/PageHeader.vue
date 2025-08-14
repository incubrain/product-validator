<!-- app/components/showcase/PageHeader.vue -->
<script setup lang="ts">
interface FeatureBadge {
  text: string
  variant?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray'
}

interface Props {
  title: string
  subtitle: string
  badges?: FeatureBadge[]
}

defineProps<Props>()

defineSlots<{
  default?(props: object): any
  badges?(props: object): any
}>()

// Badge color variants
const getBadgeClasses = (variant: FeatureBadge['variant'] = 'blue') => {
  const variants = {
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    green: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    orange: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200',
    red: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
    gray: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200',
  }

  return variants[variant]
}
</script>

<template>
  <div class="text-left space-y-4">
    <!-- Main Title -->
    <IHeading
      variant="hero"
      :level="1"
      :text="title"
      class="text-4xl font-bold text-gray-900 dark:text-white"
    />

    <!-- Subtitle -->
    <IText
      variant="subtitle"
      :text="subtitle"
      class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl"
    />

    <!-- Custom content slot -->
    <slot />

    <!-- Feature Badges -->
    <div
      v-if="badges?.length || $slots.badges"
      class="flex flex-wrap gap-2 text-sm"
    >
      <slot name="badges">
        <span
          v-for="badge in badges"
          :key="badge.text"
          :class="[
            getBadgeClasses(badge.variant),
            'px-3 py-1 rounded-full',
          ]"
        >
          {{ badge.text }}
        </span>
      </slot>
    </div>
  </div>
</template>
