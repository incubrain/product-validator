<!-- app/components/section/About.vue -->
<script setup lang="ts">
interface Stat {
  value: string
  label: string
}

interface Props {
  title: string
  story: string
  image: string
  stats: Stat[]
}

defineProps<Props>()
</script>

<template>
  <LayoutBackground pattern="neural" intensity="light" as="section">
    <UContainer>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Image -->
        <div class="relative">
          <NuxtImg
            :src="image"
            :alt="title"
            class="w-full aspect-square object-cover rounded-2xl shadow-lg"
            loading="lazy"
            format="webp"
          />
          
          <!-- Floating stats -->
          <div class="absolute -bottom-6 -right-6 bg-elevated border border-muted rounded-xl p-4 shadow-lg">
            <div class="grid grid-cols-2 gap-6">
              <div
                v-for="stat in stats.slice(0, 2)"
                :key="stat.label"
                class="text-center"
              >
                <div class="text-2xl font-bold text-primary">{{ stat.value }}</div>
                <div class="text-sm text-muted uppercase tracking-wide">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="space-y-6">
          <h2 class="text-3xl md:text-4xl font-bold text-highlighted">{{ title }}</h2>
          <div class="prose prose-lg prose-zinc dark:prose-invert max-w-none" v-html="story" />
          
          <!-- Additional stats -->
          <div v-if="stats.length > 2" class="grid grid-cols-2 gap-6 mt-8">
            <div
              v-for="stat in stats.slice(2)"
              :key="stat.label"
              class="text-center"
            >
              <div class="text-2xl font-bold text-primary">{{ stat.value }}</div>
              <div class="text-sm text-muted uppercase tracking-wide">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </LayoutBackground>
</template>