<!-- app/components/showcase/UseCases.vue -->
<script setup lang="ts">
interface UseCaseItem {
  icon: string
  title: string
  description: string
}

interface Props {
  title?: string
  items: UseCaseItem[]
}

withDefaults(defineProps<Props>(), {
  title: 'Common Use Cases',
})
</script>

<template>
  <div class="bg-gray-900 rounded-xl p-8 space-y-6 border border-gray-700">
    <h2 class="text-2xl font-semibold text-gray-100">
      {{ title }}
    </h2>

    <div class="grid md:grid-cols-3 gap-6">
      <div
        v-for="(item, i) in items"
        :key="i"
        class="bg-gray-800 rounded-lg p-4 border border-gray-700"
      >
        <h3 class="font-medium text-gray-100 mb-2">
          {{ item.icon }} {{ item.title }}
        </h3>
        <p class="text-sm text-gray-400">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>
