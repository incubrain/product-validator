<script setup lang="ts">
const hypothesis = useFlowSection('hypothesis');
const positioning = useFlowSection('positioning');
const product = useFlowSection('product');

// Get main solution claims
const headline = computed(() => hypothesis?.problem?.solution?.claim ?? '');

// Get primary CTA from first offer
const primaryCta = useFlowOffer('product').value.cta;
const secondaryCta = useFlowOffer('magnet').value.cta;

const magnet = useFlowOffer('magnet');

// Tech affiliations from positioning
const affiliations = computed(() => positioning?.affiliations ?? []);
const media = computed(() => product?.media ?? null);
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
    <!-- Badge - using positioning category -->
    <template #headline>
      <div class="flex justify-center items-center pb-2">
        <ULink
          v-if="magnet"
          :to="magnet.cta.to"
          target="_blank"
          class="group flex items-center gap-2 rounded-full border border-default bg-default/50 px-4 py-2 shadow-sm hover:bg-muted/50 transition"
        >
          <!-- Left side: badge-style -->
          <span class="text-sm font-semibold text-dimmed">
            {{ magnet.description }}
          </span>

          <!-- Divider -->
          <span class="h-4 w-px bg-inverted"></span>

          <!-- Right side: CTA -->
          <span
            class="text-sm font-medium text-secondary group-hover:underline flex items-center gap-1"
          >
            {{ magnet.cta.label }}
            <UIcon name="i-lucide-chevron-right" class="size-4" />
          </span>
        </ULink>
      </div>
    </template>

    <!-- Main Title - Solution Claim -->
    <template #title>
      <h1
        class="text-4xl sm:text-6xl lg:text-7xl text-balance font-bold tracking-tight leading-tight text-center"
      >
        {{ headline }}
      </h1>
    </template>

    <!-- Hypothesis Card - Primary Customer + Promise -->
    <template #description>
      <div class="max-w-3xl mx-auto space-y-4">
        <!-- Main value proposition -->
        <p class="text-xl sm:text-2xl text-dimmed font-medium leading-relaxed">
          {{ hypothesis?.problem?.solution?.pitch }}
        </p>
      </div>
    </template>

    <!-- CTA Buttons -->
    <template #links>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <UButton
          v-if="primaryCta"
          :to="primaryCta.to"
          :trailing-icon="primaryCta.icon"
          variant="solid"
          color="primary"
          size="xl"
          class="text-highlighted font-bold"
        >
          {{ primaryCta.label }}
        </UButton>

        <UButton
          v-if="secondaryCta"
          :to="secondaryCta.to"
          :trailing-icon="secondaryCta.icon"
          variant="ghost"
          color="neutral"
          size="xl"
          class="text-dimmed"
        >
          {{ secondaryCta.label }}
        </UButton>
      </div>
    </template>

    <!-- Media -->
    <div class="relative pt-12">
      <div v-if="media?.src" class="relative">
        <IVideo
          v-if="media.type === 'video'"
          :src="media.src"
          poster="/images/demo/demo-1.jpg"
          :autoplay="true"
          :muted="true"
          :loop="true"
          aspect-ratio="video"
          class="rounded-2xl shadow-2xl border border-white/10"
        />
        <NuxtImg
          v-else-if="media.type === 'image'"
          :src="media.src"
          :alt="media.alt || 'hero media'"
          class="rounded-2xl shadow-2xl border border-white/10 w-full"
        />
      </div>
    </div>

    <!-- Tech Affiliations -->
    <div v-if="affiliations.length" class="flex relative overflow-hidden pt-4">
      <UBadge
        variant="subtle"
        color="info"
        class="whitespace-nowrap px-3 flex-shrink-0 hidden lg:flex"
      >
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
          v-for="affiliation in affiliations"
          :key="affiliation.name"
          class="flex items-center gap-3 px-4 py-2 bg-default backdrop-blur-sm rounded-lg border border-white/10 shrink-0"
        >
          <UIcon
            :name="affiliation.logo"
            class="size-6 text-info flex-shrink-0"
          />
          <span class="font-medium text-sm whitespace-nowrap">
            {{ affiliation.name }}
          </span>
          <span
            v-if="affiliation.note"
            class="text-xs font-mono text-gray-400 bg-black/20 px-2 py-1 rounded whitespace-nowrap"
          >
            {{ affiliation.note }}
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
