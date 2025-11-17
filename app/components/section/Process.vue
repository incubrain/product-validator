<!-- ~/components/section/Process.vue -->
<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind);
const smallerThanLg = breakpoints.smaller('lg');
const data = useSectionConfig('process');
</script>

<template>
  <ISectionWrapper id="#process" :intro="data.intro" :bridge="data.bridge">
    <UCarousel
      v-if="data.steps"
      v-slot="{ item, index }"
      :arrows="!smallerThanLg"
      loop
      :items="data.steps"
      :ui="{
        root: 'border-y',
        item: 'basis-full sm:basis-1/2 lg:basis-1/3',
      }"
    >
      <ICardMetric v-bind="{ ...item, index: index + 1 }" />
    </UCarousel>
  </ISectionWrapper>
</template>
