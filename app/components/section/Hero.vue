<script setup lang="ts">
const hypothesis = useFlowSection('hypothesis');
const positioning = useFlowSection('positioning');
const offers = useFlowSection('offers');
const product = useFlowSection('product');

// Get primary customer profile
const primaryCustomer = computed(
  () =>
    hypothesis?.customerProfiles?.find((profile) => profile.primary) ||
    hypothesis?.customerProfiles?.[0],
);

// Get main solution claims
const headline = computed(() => hypothesis?.problem?.solution?.claim ?? '');
const promise = computed(() => hypothesis?.problem?.solution?.promise ?? '');
const problemStatement = computed(() => hypothesis?.problem?.statement ?? '');

// Get primary CTA from first offer
const primaryCta = computed(() => offers?.[0]?.cta ?? null);
const secondaryCta = computed(() => offers?.[1]?.cta ?? null);

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
      container: 'relative',
      footer: 'mt-10',
    }"
  >
    <!-- Badge - using positioning category -->
    <template #headline>
      <div class="flex justify-center items-center pb-2">
        <UAlert
          variant="subtle"
          color="neutral"
          class="w-auto px-3 py-2"
          :title="positioning?.category || 'Validation Template'"
          icon="i-lucide-bolt"
        />
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
      <UCard
        v-if="primaryCustomer"
        variant="solid"
        class="border border-primary/20 max-w-2xl mx-auto mb-6"
      >
        <div class="space-y-4">
          <!-- Target audience and problem -->
          <div class="text-center">
            <div class="text-sm font-medium text-primary mb-1">For</div>
            <div class="text-lg font-semibold">{{ primaryCustomer.label }}</div>
            <div class="text-sm text-muted mt-1">{{ problemStatement }}</div>
          </div>

          <!-- Solution Promise -->
          <div class="text-center border-t border-default/50 pt-4">
            <div class="text-xs text-muted">Our Promise</div>
            <div class="font-medium text-sm">{{ promise }}</div>
          </div>
        </div>
      </UCard>
    </template>

    <!-- CTA Buttons -->
    <template #links>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <UButton
          v-if="primaryCta"
          :to="primaryCta.href"
          :icon="primaryCta.icon"
          variant="solid"
          color="primary"
          size="xl"
        >
          {{ primaryCta.label }}
        </UButton>

        <UButton
          v-if="secondaryCta"
          :to="secondaryCta.href"
          :icon="secondaryCta.icon"
          variant="outline"
          color="neutral"
          size="xl"
        >
          {{ secondaryCta.label }}
        </UButton>
      </div>
    </template>

    <!-- Media -->
    <div class="relative">
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
    <div v-if="affiliations.length" class="flex relative overflow-hidden">
      <UBadge
        variant="subtle"
        color="warning"
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
            class="size-6 text-primary flex-shrink-0"
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
