<!-- ~/components/section/Process.vue -->
<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind);
const smallerThanLg = breakpoints.smaller('lg');
const data = useSectionConfig('process');

const steps = computed(() =>
  (data.value?.steps ?? []).map((step, index) => ({
    ...step,
    _id: `step-${index}`,
    index: index + 1,
  })),
);
</script>

<template>
  <ISectionWrapper id="#process" :intro="data.intro" :bridge="data.bridge">
    <UCarousel
      v-slot="{ item }"
      :arrows="!smallerThanLg"
      loop
      :items="steps"
      :ui="{
        root: 'border-y',
        container: 'gap-4', // Add gap instead of gap-0
        item: 'basis-full sm:basis-1/2 lg:basis-1/3 min-w-0', // Add min-w-0, remove ps-0
      }"
    >
      <ICardMetric v-bind="item" :key="item._id" />
    </UCarousel>
  </ISectionWrapper>
</template>
