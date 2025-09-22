<!-- components/SectionSeparator.vue -->
<script setup lang="ts">
interface Props {
  label?: string;
  description?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="text-center space-y-6 py-4">
    <USeparator 
      :label="label" 
      color="neutral"
      :ui="{
        label: 'text-sm font-bold uppercase tracking-wider px-4 py-2 bg-default border border-primary/20 rounded-full',
        container: 'mx-6'
      }"
    />
    <div v-if="description" class="max-w-4xl mx-auto px-4">
      <p class="text-lg sm:text-xl text-muted leading-relaxed">
        {{ description }}
      </p>
    </div>
  </div>
</template>