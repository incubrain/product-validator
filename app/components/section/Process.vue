<!-- ~/components/section/Process.vue -->
<script setup lang="ts">
defineProps<{
  data?: any;
}>();

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
  image?: string;
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
  <ISectionWrapper 
    v-if="showSection('process')" 
    id="#process" 
    :intro="data.intro" 
    :cta="data.cta"
    has-bottom
  >
    <!-- Process Steps Grid -->
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

    <!-- Mobile: Process Carousel -->
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

    <!-- Features Carousel in #bottom slot (full width) -->
    <template #bottom>
      <div v-if="features.length" class="bg-muted/30 py-16 overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Section Header -->
          <div class="flex items-center justify-between mb-8 max-w-(--ui-container) mx-auto">
            <h3 class="text-xl sm:text-2xl font-bold text-highlighted">
              Features
            </h3>
          </div>

          <div class="block relative">
            <UCarousel
              v-slot="{ item }"
              arrows
              loop
              :items="features"
              :prev="{
                size: 'xl',
                square: true,
              }"
              :next="{
                size: 'xl',
                square: true,
              }"
              :ui="{
                item: 'basis-[320px] px-2',
                viewport: 'overflow-visible',
                controls: 'relative mt-12 flex justify-start max-w-(--ui-container) mx-auto',
                arrows: 'flex gap-4',
                prev: 'flex relative rounded-none start-0 sm:start-0 top-0 translate-y-0',
                next: 'flex relative rounded-none end-0 sm:end-0 top-0 translate-y-0',
              }"
            >
              <UPageCard
                variant="outline"
                class="h-full"
                :ui="{
                  root: 'bg-default hover:bg-muted/50 transition-colors h-full',
                  body: 'space-y-4',
                }"
              >
                <template #leading>
                  <!-- Optional Image -->
                  <div v-if="item.image" class="mb-4 -mx-6 -mt-6">
                    <NuxtImg
                      :src="item.image"
                      :alt="item.title"
                      class="w-full h-32 object-cover rounded-t-lg"
                    />
                  </div>
                </template>

                <!-- Title + Icon (justify-between) -->
                <div class="flex items-start justify-between gap-3">
                  <h4 class="text-base font-semibold text-highlighted flex-1">
                    {{ item.title }}
                  </h4>
                  <div class="flex items-center justify-center size-8 rounded-lg bg-primary/10 ring-1 ring-primary/20 shrink-0">
                    <UIcon :name="item.icon" class="size-4 text-secondary" />
                  </div>
                </div>

                <!-- Description (with more spacing) -->
                <p class="text-sm text-muted leading-relaxed">
                  {{ item.description }}
                </p>
              </UPageCard>
            </UCarousel>
          </div>
        </div>
      </div>
    </template>
  </ISectionWrapper>
</template>