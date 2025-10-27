<!-- ~/components/section/Process.vue -->
<script setup lang="ts">
const data = useFlowSection('process');
const features = computed(() => data.value?.features ?? []);
const steps = computed(() => data.value?.steps ?? []);
</script>

<template>
  <ISectionWrapper id="#process" :intro="data.intro" :bridge="data.bridge">
    <!-- Features Grid -->
    <UPageGrid>
      <UPageCard
        v-for="(feature, index) in features"
        :key="index"
        spotlight
        spotlight-color="secondary"
        :ui="{ leadingIcon: 'text-secondary' }"
        v-bind="feature"
      />
    </UPageGrid>

    <!-- Separator -->
    <ISeparator
      v-if="data.separators?.[0]"
      :label="data.separators[0].label"
      :description="data.separators[0].description"
    />

    <!-- Carousel -->
    <UCarousel
      v-slot="{ item }"
      :items="steps"
      arrows
      :ui="{
        item: 'basis-full min-w-0 lg:basis-[calc(33.333%---spacing(5))] [&:first-child]:ps-8 py-1',
        container: 'flex items-start gap-4',
        prev: 'start-4 sm:-start-12 top-1/2 -translate-y-1/2',
        next: 'end-4 sm:-end-12 top-1/2 -translate-y-1/2',
      }"
    >
      <IMetricCard v-bind="item" />
    </UCarousel>
  </ISectionWrapper>
</template>
