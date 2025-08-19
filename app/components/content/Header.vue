<!-- components/layout/SectionHeader.vue -->
<script setup lang="ts">
interface Props {
  title: string
  badge?: string
  badgeColor?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  dividerClass?: string
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  badge: '',
  badgeColor: 'neutral',
  dividerClass: 'bg-border',
  size: 'md',
})

const sizeClasses = {
  sm: {
    title: 'text-lg font-semibold',
    spacing: 'mb-4',
    badge: 'text-xs px-2 py-1',
  },
  md: {
    title: 'text-xl font-bold',
    spacing: 'mb-6',
    badge: 'text-xs px-3 py-1',
  },
  lg: {
    title: 'text-2xl font-bold',
    spacing: 'mb-8',
    badge: 'text-sm px-4 py-1.5',
  },
}
</script>

<template>
  <div :class="sizeClasses[size].spacing">
    <div class="flex items-center space-x-4">
      <!-- Section Title -->
      <h2 :class="[sizeClasses[size].title, 'text-highlighted']">
        {{ title }}
      </h2>

      <!-- Divider Line -->
      <div :class="['flex-1 h-px', dividerClass]" />

      <!-- Optional Badge -->
      <span
        v-if="badge"
        :class="[
          sizeClasses[size].badge,
          'bg-elevated rounded-full',
          badgeColor === 'primary'
            ? 'text-primary'
            : badgeColor === 'secondary'
              ? 'text-secondary'
              : badgeColor === 'success'
                ? 'text-emerald-500'
                : badgeColor === 'info'
                  ? 'text-blue-500'
                  : badgeColor === 'warning'
                    ? 'text-amber-500'
                    : badgeColor === 'error'
                      ? 'text-red-500'
                      : 'text-muted',
        ]"
      >
        {{ badge }}
      </span>

      <slot name="end" />
    </div>
  </div>
</template>
