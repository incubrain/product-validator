<script setup lang="ts">
import { CONVERSION } from '#shared/config/navigation';
const hero = useSectionConfig('hero');
const results = useSectionConfig('results');
const { isStage } = useSectionVisibility();

const proof = computed(() => results?.value.proof ?? []);
</script>

<template>
  <UPageHero
    orientation="vertical"
    class="bg-gradient-to-b from-default via-muted to-default text-white relative overflow-hidden min-h-[calc(100vh-var(--ui-banner-height)-var(--ui-header-height))]"
    :ui="{
      wrapper: 'text-center',
      container:
        'flex flex-col lg:grid py-24 sm:py-32 lg:py-24 gap-0 sm:gap-y-0',
      footer: 'mt-10',
    }"
  >
    <!-- Badge -->
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
          <span class="h-4 w-px bg-inverted"></span>
          <span
            class="text-sm font-medium text-secondary group-hover:underline flex items-center gap-1"
          >
            {{ hero.badge.description }}
            <UIcon name="i-lucide-star" class="size-4" />
          </span>
        </ULink>
      </div>
    </template>

    <!-- Main Title -->
    <template #title>
      {{ hero.intro.title }}
    </template>

    <!-- Value proposition -->
    <template #description>
      <div class="max-w-3xl mx-auto space-y-4">
        <p class="text-xl sm:text-2xl text-dimmed font-medium leading-relaxed">
          {{ hero.intro.description }}
        </p>
        <IButtonCTA
          v-if="isStage('attention')"
          size="xl"
          :offer-id="CONVERSION.primary"
          location="hero"
          anchor
          class="hidden md:inline-flex text-toned font-black"
        />
      </div>
    </template>

    <!-- Media -->
    <div class="relative pt-12">
      <div v-if="hero.media?.src" class="relative">
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

    <!-- Dynamic Marquees -->
    <IMarqueeWrapper
      v-for="(track, index) in proof"
      :key="track.label"
      :label="track.label"
      :badge-color="track.badgeColor"
      :items="track.items"
      :track-index="index"
    />

    <!-- Background Effects -->
    <template #bottom>
      <div
        class="absolute top-0 inset-0 bg-grid-white/[0.02] pointer-events-none"
      ></div>
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl pointer-events-none"
      ></div>
      <div
        class="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl pointer-events-none"
      ></div>
    </template>
  </UPageHero>
</template>

<style scoped>
.bg-grid-white\/\[0\.02\] {
  z-index: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
}
</style>
