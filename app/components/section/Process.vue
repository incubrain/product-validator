<!-- ~/components/section/Process.vue -->
<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

defineProps<{
  data?: any;
}>();

const breakpoints = useBreakpoints(breakpointsTailwind);
const smallerThanMd = breakpoints.smaller('md');
const smallerThanXl = breakpoints.smaller('xl');

const { data: processFile } = await useAsyncData('process', () => 
  queryCollection('features').where('stem', '=', 'features/process').first()
);

const { data: featuresFile } = await useAsyncData('features-grid', () =>
  queryCollection('features').where('stem', '=', 'features/grid').first()
);

type FeatureItem = {
  title: string;
  description: string;
  icon: string;
};

const steps = computed(() => {
  const items = processFile.value?.items || [];
  
  if (items.length > 3) {
    console.error(
      `[Process Section] Maximum 3 steps allowed. Found ${items.length}.\n` +
      `Edit content/features/process.yml to reduce steps.`
    );
  }
  
  return items.slice(0, 3);
});

const features = computed(() => (featuresFile.value?.items || []) as FeatureItem[]);

const { showSection } = useSectionVisibility();
</script>

<template>
  <ISectionWrapper v-if="showSection('process')" id="#process" :intro="data.intro" :bridge="data.bridge">
    <div class="hidden md:grid md:grid-cols-3">
      <div
        v-for="(step, index) in steps"
        :key="step.id"
        class="flex flex-col items-center text-center p-8 bg-card hover:bg-muted/50 transition-colors"
      >
        <!-- Number badge -->
        <div class="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <span class="text-xl font-bold text-primary">{{ index + 1 }}</span>
        </div>
        
        <!-- Icon -->
        <UIcon :name="step.icon" class="size-8 text-secondary mb-4" />
        
        <!-- Title -->
        <h3 class="text-lg font-bold mb-2">{{ step.title }}</h3>
        
        <!-- Result -->
        <p class="text-sm text-muted">{{ step.result }}</p>
      </div>
    </div>

    <!-- Mobile: Carousel -->
    <UCarousel
      v-if="steps.length"
      v-slot="{ item, index }"
      class="md:hidden"
      :arrows="false"
      :dots="true"
      align="start"
      :items="steps"
      :ui="{
        item: 'basis-[90%]',
        dots: 'mt-6',
        dot: 'w-2 h-2'
      }"
    >
      <div class="flex flex-col items-center text-center p-8 border border-default bg-card">
        <div class="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <span class="text-xl font-bold text-primary">{{ index + 1 }}</span>
        </div>
        
        <UIcon :name="item.icon" class="size-8 text-secondary mb-4" />
        
        <h3 class="text-lg font-bold mb-2">{{ item.title }}</h3>
        
        <p class="text-sm text-muted">{{ item.result }}</p>
      </div>
    </UCarousel>

    <UPageGrid v-if="features.length" class="gap-0">
      <UPageCard
        v-for="(item, index) in features"
        :key="index"
        :title="item.title"
        :description="item.description"
        spotlight
        spotlight-color="secondary"
        variant="outline"
        :ui="{
          root: 'rounded-none',
          header: 'pb-2',
          title: 'text-base font-semibold',
          description: 'text-sm text-muted',
        }"
      >
        <template #leading>
          <div class="flex items-center justify-center size-10 rounded-lg bg-primary/10 ring-1 ring-primary/20 mb-4">
            <UIcon :name="item.icon" class="size-5 text-primary" />
          </div>
        </template>
      </UPageCard>
    </UPageGrid>
  </ISectionWrapper>
</template>