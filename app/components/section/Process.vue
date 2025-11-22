<!-- ~/components/section/Process.vue -->
<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

defineProps<{
    data?: any;
}>();

const breakpoints = useBreakpoints(breakpointsTailwind);
const smallerThanXl = breakpoints.smaller('xl');

// Fetch steps from features collection (benefits.yml)
const { data: benefitsFile } = await useAsyncData('process', () => 
  queryCollection('features').where('stem', '=', 'features/process').first()
);

const steps = computed(() => benefitsFile.value?.items || []);

const { showSection } = useSectionVisibility();
</script>

<template>
  <ISectionWrapper v-if="showSection('process')" id="#process" :intro="data.intro" :bridge="data.bridge">
    <UCarousel
      v-if="steps.length"
      v-slot="{ item, index }"
      :arrows="!smallerThanXl"
      loop
      align="start"
      :items="steps"
      :ui="{
        root: 'border-y',
        item: 'basis-full sm:basis-1/2 lg:basis-1/3',
      }"
    >
      <ICardMetric v-bind="{ ...item, index: index + 1 }" />
    </UCarousel>
  </ISectionWrapper>
</template>
