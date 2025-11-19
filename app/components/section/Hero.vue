<!-- components/section/Hero.vue -->
<script setup lang="ts">
import { CONVERSION } from '#shared/config/navigation'
// Accept data as prop (from MDC)
const props = defineProps<{
  data?: any;
}>();

const { showFeature } = useSectionVisibility();

// Use prop data from MDC
const hero = computed(() => props.data);

console.log('HERO', hero.value)

// Fetch proof from results collection (customers.yml)
const { data: proofData } = await useAsyncData('customers-proof', () => 
  queryCollection('results').where('label', 'IS NOT NULL').first()
);
const proof = computed(() => proofData.value ? [proofData.value] : []);

// ✅ Explicit feature flags
const showCountdown = computed(() => showFeature('heroCountdown'));
const showMedia = computed(
  () => showFeature('heroMedia') && hero.value?.media?.src,
);
const showMarquees = computed(() => showFeature('heroMarquees'));
const showCTA = computed(() => showFeature('heroCTA'));

// Fetch primary offer from collection
const { getPrimaryOffer } = useContentCache();
const { data: primaryOffer } = await getPrimaryOffer();
</script>

<template>
  <UPageHero
    orientation="vertical"
    class="bg-linear-to-b from-default via-muted to-default text-white relative overflow-hidden min-h-[calc(100vh-var(--ui-banner-height)-var(--ui-header-height))]"
    :ui="{
      root: 'px-0',
      body: 'px-0',
      wrapper: 'text-center px-0',
      container:
        'flex flex-col lg:grid py-12 sm:py-24 lg:py-12 gap-0 sm:gap-y-0 lg:px-0',
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

        <!-- Countdown Email Form (Identity + Attention only) -->
        <div v-if="showCountdown && primaryOffer" class="max-w-2xl mx-auto">
          <IFormFakeDoor
            location="hero-countdown"
            :offer="primaryOffer"
            layout="horizontal"
          />
        </div>

        <!-- Normal CTA (Traffic stage onward) -->
        <IButtonCTA
          v-if="showCTA"
          size="xl"
          :offer-id="CONVERSION.primary"
          location="hero"
          anchor
          class="hidden md:inline-flex text-toned font-black"
        />
      </div>
    </template>

    <!-- Media (Traffic stage onward) -->
    <template #body>
      <div v-if="showMedia" class="relative pt-12">
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
            class="rounded-2xl shadow-2xl border border-white/10 w-full"
          />
        </div>
      </div>
    </template>

    <!-- ✅ Bottom slot: Full-width marquees + background effects -->
    <template #bottom>
      <!-- Marquees (Full-width, outside container) -->
      <div v-if="showMarquees" class="space-y-8 pb-24">
        <IMarqueeWrapper
          v-for="(track, index) in proof"
          :key="track.label"
          :label="track.label"
          :badge-color="track.badgeColor"
          :items="track.items"
          :track-index="index"
        />
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
    </template>
  </UPageHero>
</template>

<style scoped>
.bg-grid-white\/\[0\.02\] {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}
</style>
