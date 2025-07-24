<!-- app/components/card/Skill.vue -->
<script setup lang="ts">
interface Props {
  title: string
  description: string
  icon: string
}

defineProps<Props>()

const cardUI = {
  root: 'bg-elevated border border-muted hover:shadow-lg hover:border-accented transition-all duration-300',
  body: 'p-6 space-y-4 text-center'
}
</script>

<template>
  <UCard :ui="cardUI">
    <div class="w-12 h-12 mx-auto mb-4 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
      <UIcon :name="icon" class="w-6 h-6" />
    </div>
    <h3 class="text-lg font-semibold text-highlighted">{{ title }}</h3>
    <p class="text-muted">{{ description }}</p>
  </UCard>
</template>