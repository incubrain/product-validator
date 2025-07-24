<!-- app/components/section/Results.vue -->
<script setup lang="ts">
interface Stat {
  value: string
  title: string
  description?: string
}

interface Props {
  title: string
  subtitle: string
  stats: Stat[]
}

defineProps<Props>()
</script>

<template>
  <section>
    <UContainer>
      <!-- Header -->
      <div class="text-center mb-component max-w-3xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-highlighted mb-4">
          {{ title }}
        </h2>
        <p class="text-xl text-muted">
          {{ subtitle }}
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 grid-spacing">
        <CardStats
          v-for="stat in stats"
          :key="stat.title"
          :value="stat.value"
          :title="stat.title"
          :description="stat.description"
        />
      </div>
    </UContainer>
  </section>
</template>
