<script setup lang="ts">
defineProps<{
  title?: string;
}>();

const { data: valuesSection } = await useAsyncData('content-values', () =>
  queryCollection('faq').where('type', '=', 'values').first(),
);
</script>

<template>
  <div
    v-if="valuesSection?.items?.length"
    class="max-w-3xl mx-auto pb-8 lg:pb-0 px-4 bg-default"
  >
    <h2 v-if="title" class="text-3xl font-bold text-center mb-12">
      {{ title }}
    </h2>
    <UAccordion
      default-value="0"
      :items="valuesSection.items"
      :ui="{
        trigger: 'text-base font-semibold px-2',
        body: 'text-sm text-muted text-left px-4',
      }"
    />
  </div>
</template>
