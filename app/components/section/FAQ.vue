<script setup lang="ts">
interface Props {
  content: {
    headline: string;
    title: string;
    items: Array<{ label: string; content: string }>;
  };
}

const { content } = defineProps<Props>();
</script>

<template>
  <UPageSection
    :headline="content.headline"
    :title="content.title"
    orientation="vertical"
    :ui="{
      container: 'py-16 sm:py-24 lg:py-32 max-w-4xl mx-auto',
    }"
  >
    <UAccordion
      :items="content.items"
      type="single"
      :collapsible="true"
      :default-value="['0']"
      :ui="{
        trigger: 'text-base font-medium py-4',
        body: 'text-base text-gray-300 pb-4',
        item: 'border-b border-gray-700 last:border-b-0',
      }"
    />
  </UPageSection>
</template>
