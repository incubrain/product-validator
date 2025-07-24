<!-- app/components/card/Stats.vue -->
<script setup lang="ts">
interface Props {
  value: string
  title: string
  description?: string
}

defineProps<Props>()

const cardUI = {
  root: 'bg-elevated border border-muted text-center hover:shadow-lg hover:border-accented transition-all duration-300',
  body: 'p-6 space-y-2'
}
</script>

<template>
  <UCard :ui="cardUI">
    <div class="text-3xl font-bold text-highlighted">{{ value }}</div>
    <div class="text-base font-medium text-muted">{{ title }}</div>
    <p v-if="description" class="text-sm text-dimmed">{{ description }}</p>
  </UCard>
</template>