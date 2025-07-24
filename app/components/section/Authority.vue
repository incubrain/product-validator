<!-- app/components/section/Authority.vue -->
<script setup lang="ts">
interface Skill {
  title: string
  description: string
  icon: string
}

interface Props {
  title: string
  subtitle: string
  skills: Skill[]
}

defineProps<Props>()
</script>

<template>
  <section>
    <UContainer>
      <!-- Header -->
      <div class="text-center mb-component max-w-3xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-highlighted mb-4">{{ title }}</h2>
        <p class="text-xl text-muted">{{ subtitle }}</p>
      </div>

      <!-- Skills Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 grid-spacing">
        <CardSkill
          v-for="skill in skills"
          :key="skill.title"
          :title="skill.title"
          :description="skill.description"
          :icon="skill.icon"
        />
      </div>
    </UContainer>
  </section>
</template>