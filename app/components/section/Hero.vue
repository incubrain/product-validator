<script setup lang="ts">
interface Props {
  content: {
    badge: { icon: string; text: string };
    headline: string;
    subheadline: string;
    primaryCta: { text: string; icon: string };
    secondaryCta: { text: string; icon: string };
    technologies: Array<{ name: string; icon: string; version: string }>;
  };
}

const { content } = defineProps<Props>();
</script>

<template>
  <UPageHero
    orientation="vertical"
    class="bg-gradient-to-b from-default via-muted to-default text-white relative overflow-hidden"
  >
    <!-- Badge -->
    <template #headline>
      <div class="flex justify-center items-center pb-2">
        <UAlert
          variant="subtle"
          color="neutral"
          class="w-auto px-3 py-2"
          :title="content.badge.text"
          :icon="content.badge.icon"
        />
      </div>
    </template>

    <!-- Main Title -->
    <template #title>
      <h1
        class="text-4xl sm:text-6xl lg:text-8xl text-balance font-bold tracking-tight leading-tight text-center"
      >
        {{ content.headline }}
      </h1>
    </template>

    <!-- Description -->
    <template #description>
      <p
        class="text-lg sm:text-xl text-gray-300 text-center max-w-4xl mx-auto leading-relaxed"
      >
        {{ content.subheadline }}
      </p>
    </template>

    <!-- CTA Buttons -->
    <template #links>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <IButton action="paid" location="hero" />
        <IButton action="free" location="hero" />
      </div>
    </template>

    <!-- Main Content: Video Showcase -->
    <div class="relative w-full max-w-6xl mx-auto z-10 space-y-4">
      <!-- Video Component -->
      <IVideo
        src="/videos/demo.mp4"
        poster="/images/demo/demo-1.jpg"
        :autoplay="true"
        :muted="true"
        :loop="true"
        aspect-ratio="video"
        class="rounded-2xl shadow-2xl border border-white/10"
      />

      <div class="flex gap-4">
        <UBadge variant="subtle" color="warning" class="whitespace-nowrap px-3">
          Powered By
        </UBadge>
        <UMarquee
          pause-on-hover
          :ui="{
            root: '[--gap:--spacing(4)] [--duration:60s]',
            content: 'w-auto',
          }"
        >
          <div
            v-for="tech in content.technologies"
            :key="tech.name"
            class="flex items-center gap-3 px-4 py-2 bg-default backdrop-blur-sm rounded-lg border border-white/10"
          >
            <UIcon
              :name="tech.icon"
              class="size-6 text-primary flex-shrink-0"
            />
            <span class="font-medium text-sm">{{ tech.name }}</span>
            <span
              class="text-xs font-mono text-gray-400 bg-black/20 px-2 py-1 rounded"
            >
              {{ tech.version }}
            </span>
          </div>
        </UMarquee>
      </div>
    </div>

    <!-- Background Effects -->
    <template #bottom>
      <!-- Subtle grid pattern -->
      <div
        class="absolute top-0 inset-0 bg-grid-white/[0.02] pointer-events-none"
      ></div>

      <!-- Gradient orbs -->
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
