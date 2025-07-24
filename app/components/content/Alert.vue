<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'info' | 'warning' | 'success' | 'error'
  title?: string
  variant?: 'solid' | 'outline' | 'soft' | 'subtle'
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Alert Title Missing',
  type: 'info',
  variant: 'outline'
})

const alertConfig = {
  info: { color: 'info', icon: 'i-lucide-info' },
  warning: { color: 'warning', icon: 'i-lucide-alert-triangle' },
  success: { color: 'success', icon: 'i-lucide-check-circle' },
  error: { color: 'error', icon: 'i-lucide-x-circle' },
} as const

const config = computed(() => alertConfig[props.type])
</script>

<template>
  <UAlert
    :title="title"
    :color="config.color"
    :icon="config.icon"
    :variant="variant"
    class="my-6"
  >
    <template #description>
      <div class="prose prose-sm dark:prose-invert max-w-none [&_p:last-child]:mb-0">
        <slot />
      </div>
    </template>
  </UAlert>
</template>