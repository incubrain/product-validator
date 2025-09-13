<script setup lang="ts">
interface Props {
  content: {
    title: string;
    description: string;
    features: Array<{ title: string; description: string; icon: string }>;
  };
}

const { content } = defineProps<Props>();
</script>

<template>
  <UPageSection
    :title="content.title"
    :description="content.description"
    :features="content.features"
    orientation="vertical"
    :ui="{
      features: 'sm:grid-cols-2 lg:grid-cols-3 gap-8',
      container: 'py-16 sm:py-24 lg:py-32',
    }"
  />
</template>
