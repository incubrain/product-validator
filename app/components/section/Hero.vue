<!-- components/section/Hero.vue -->
<script setup lang="ts">
import { STAGE_CONFIG } from '#stage-config';
// Accept data as prop (from MDC)
const props = defineProps<{
  data?: any;
}>();

const { showFeature, showSection } = useSectionVisibility();

// Use prop data from MDC
const hero = computed(() => props.data);

// ✅ Explicit feature flags
const showCountdown = computed(() => showFeature('heroCountdown'));
const showMedia = computed(
  () => showFeature('heroMedia') && hero.value?.media?.src,
);
const showCTA = computed(() => showFeature('heroCTA'));

// Fetch primary product from collection
const { getPrimaryProduct } = useContentCache();
const { data: primaryProduct } = await getPrimaryProduct();
</script>

<template>
  <UPageHero
    v-if="showSection('hero')"
    orientation="vertical"
    class="bg-linear-to-b from-default via-muted to-default text-white relative overflow-hidden min-h-[calc(100vh-var(--ui-banner-height)-var(--ui-header-height))]"
    :ui="{
      root: 'px-0',
      body: 'px-0',
      wrapper: 'text-center px-0',
      container:
        'flex flex-col lg:grid py-12 sm:py-24 lg:pt-12 lg:pb-0 gap-0 sm:gap-y-0 lg:px-0',
      footer: 'mt-10',
    }"
  >
    <!-- Badge (Same across all stages) -->
    <template #headline>
      <div class="flex justify-center items-center pb-8">
        <ULink
          v-if="hero.badge"
          :to="hero.badge.to"
          target="_blank"
          class="group flex items-center gap-2 rounded-full border border-default bg-default/50 px-4 py-2 shadow-sm hover:bg-muted/50 transition"
        >
          <span class="text-sm font-semibold text-dimmed">
            {{ hero.badge.title }}
          </span>
          <span class="h-4 w-px bg-inverted" />
          <span
            class="text-sm font-medium text-secondary group-hover:underline flex items-center gap-1"
          >
            {{ hero.badge.description }}
            <UIcon name="i-lucide-star" class="size-4" />
          </span>
        </ULink>
      </div>
    </template>

    <!-- Title (Same size across all stages) -->
    <template #title>
      {{ hero.intro.title }}
    </template>

    <!-- Description Area (Conditional content based on stage) -->
    <template #description>
      <div class="max-w-3xl mx-auto space-y-6">
        <!-- Description Text (All stages) -->
        <p class="text-xl sm:text-2xl text-dimmed font-medium leading-relaxed">
          {{ hero.intro.description }}
        </p>

        <!-- Countdown Timer (Identity + Attention only) -->
        <div
          v-if="showCountdown && hero.countdown.showTimer"
          class="flex flex-col lg:flex-row gap-3 mx-auto justify-center"
        >
          <div class="flex items-center justify-center gap-2">
            <UIcon name="i-lucide-calendar" class="size-6 text-success" />
            <span class="text-base font-semibold text-success uppercase">
              {{ hero.countdown.message }}
            </span>
          </div>
          <ICountdown
            :target-date="hero.countdown.launchDate"
            :fallback-message="hero.countdown.fallbackMessage"
            compact
            class="lg:min-w-xs"
          />
        </div>

        <div v-if="showCountdown && primaryProduct" class="max-w-2xl mx-auto">
          <IConvertEmail
            location="hero-countdown"
            :product="primaryProduct"
            layout="horizontal"
          />
        </div>

        <IConvertButton
          v-if="showCTA"
          :product-id="STAGE_CONFIG.products.primary"
          cta-name="funnel"
          location="hero"
          size="xl"
        />
      </div>
    </template>

    <!-- Media with overlapping label -->
    <div v-if="showMedia" class="relative pt-12 max-w-4xl mx-auto -mb-12">
      <div class="relative">
        <IVideo
          v-if="hero.media.type === 'video'"
          :src="hero.media.src"
          :poster="hero.media.poster"
          :autoplay="true"
          :muted="true"
          :loop="true"
          aspect-ratio="video"
          class="rounded-2xl shadow-2xl border border-white/10"
        />
        <NuxtImg
          v-else-if="hero.media.type === 'image'"
          :src="hero.media.src"
          :alt="hero.media.alt"
          class="rounded-t-2xl shadow-2xl border-t border-x border-default/50 w-full"
        />
      </div>
    </div>

  
<!-- Background Effects -->
<div
  class="absolute top-0 inset-0 bg-grid-white/[0.02] pointer-events-none -z-10"
/>
<div
  class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl pointer-events-none -z-10"
/>
<div
  class="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl pointer-events-none -z-10"
/>
  </UPageHero>
</template>

<style scoped>
.bg-grid-white\/\[0\.02\] {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
}
</style>