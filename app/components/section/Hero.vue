<script setup lang="ts">
// Updated data access
const data = await useFlowSection('solution');
const hero = await useFlowSection('hero');

// Tech affiliations from solution data
const affiliations = computed(() => data?.credibility?.affiliations ?? []);
</script>

<template>
  <UPageHero
    orientation="vertical"
    class="bg-gradient-to-b from-default via-muted to-default text-white relative overflow-hidden"
    :ui="{
      wrapper: 'text-center',
      container:
        'flex flex-col lg:grid py-24 sm:py-32 lg:py-24 gap-0 sm:gap-y-0',
      footer: 'mt-10',
    }"
  >
    <!-- Badge - using magnet offer -->
    <template #headline>
      <div class="flex justify-center items-center pb-2">
        <ULink
          v-if="hero.badge"
          :to="hero.badge.to"
          target="_blank"
          class="group flex items-center gap-2 rounded-full border border-default bg-default/50 px-4 py-2 shadow-sm hover:bg-muted/50 transition"
        >
          <!-- Left side: badge-style -->
          <span class="text-sm font-semibold text-dimmed">
            {{ hero.badge.title }}
          </span>

          <!-- Divider -->
          <span class="h-4 w-px bg-inverted"></span>

          <!-- Right side: CTA -->
          <span
            class="text-sm font-medium text-secondary group-hover:underline flex items-center gap-1"
          >
            {{ hero.badge.description }}
            <UIcon name="i-lucide-star" class="size-4" />
          </span>
        </ULink>
      </div>
    </template>

    <!-- Main Title - Solution Claim -->
    <template #title>
      <h1
        class="text-4xl sm:text-6xl lg:text-7xl text-balance font-bold tracking-tight leading-tight text-center"
      >
        {{ hero.intro.title }}
      </h1>
    </template>

    <!-- Value proposition -->
    <template #description>
      <div class="max-w-3xl mx-auto space-y-4">
        <p class="text-xl sm:text-2xl text-dimmed font-medium leading-relaxed">
          {{ hero.intro.description }}
        </p>
      </div>
    </template>

    <!-- Media -->
    <div class="relative pt-12">
      <div v-if="hero.media?.src" class="relative">
        <!-- {EXTRACT} poster -->
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

    <!-- Tech Stack Showcase -->
    <div v-if="affiliations.length" class="flex relative overflow-hidden pt-4">
      <UBadge
        variant="subtle"
        color="info"
        class="whitespace-nowrap px-3 flex-shrink-0 hidden lg:flex"
      >
        <!-- {EXTRACT} -->
        Powered By
      </UBadge>
      <UMarquee
        pause-on-hover
        overlay
        :repeat="2"
        :ui="{
          root: 'group relative flex items-center overflow-hidden gap-(--gap) [--gap:--spacing(4)] [--duration:20s] max-w-full',
          content:
            'flex items-center shrink-0 justify-around gap-(--gap) min-w-max',
        }"
      >
        <div
          v-for="affil in affiliations"
          :key="affil.name"
          class="flex items-center gap-3 px-4 py-2 bg-default backdrop-blur-sm rounded-lg border border-white/10 shrink-0"
        >
          <UIcon :name="affil.logo" class="size-6 text-info flex-shrink-0" />
          <span class="font-medium text-sm whitespace-nowrap">
            {{ affil.name }}
          </span>
          <span
            v-if="affil.note"
            class="text-xs font-mono text-gray-400 bg-black/20 px-2 py-1 rounded whitespace-nowrap"
          >
            {{ affil.note }}
          </span>
        </div>
      </UMarquee>
    </div>

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
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.02) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
}
</style>
