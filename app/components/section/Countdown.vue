<!-- components/section/Countdown.vue (WITH TIMER) -->
<script setup lang="ts">
const countdownConfig = useSectionConfig('hero').value.countdown;

// Create a fake offer for the FakeDoor form
const countdownOffer = computed(() => ({
  id: 'countdown' as const,
  title: 'Get Notified',
  description: "We'll email you when we launch",
  status: 'status-available' as const,
  cta: {
    label: 'Notify Me',
    note: 'No spam. Just launch updates.',
    to: '#',
  },
}));
</script>

<template>
  <div
    class="relative flex items-center justify-center w-full overflow-hidden bg-default"
  >
    <!-- Subtle grid background -->
    <div class="absolute inset-0 bg-grid-white/[0.02]" />

    <!-- Content container -->
    <div class="relative z-10 w-full max-w-8xl mx-auto px-6 py-16">
      <div class="flex flex-col items-center text-center space-y-10">
        <!-- Top Badge -->
        <UBadge
          color="secondary"
          variant="outline"
          size="lg"
          class="uppercase tracking-wide font-semibold"
        >
          <UIcon name="i-lucide-rocket" class="size-4" />
          <span>{{ countdownConfig.brandName }}</span>
        </UBadge>

        <!-- Main Headline (Largest Element) -->
        <div class="space-y-6 max-w-4xl">
          <h1
            class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
          >
            {{ countdownConfig.headline }}
          </h1>
        </div>

        <!-- Compact Countdown Timer -->
        <div class="flex flex-col items-center gap-3">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-calendar" class="size-4 text-success" />
            <span
              class="text-sm sm:text-base font-semibold text-success uppercase tracking-wider"
            >
              Launching In
            </span>
          </div>
          <ICountdown
            :target-date="countdownConfig.launchDate"
            :fallback-message="countdownConfig.fallbackMessage"
          />
        </div>

        <!-- Subheadline -->
        <p
          class="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl"
        >
          {{ countdownConfig.subheadline }}
        </p>

        <!-- Email Capture Form (using FakeDoor) -->
        <div v-if="countdownConfig.showEmailCapture" class="w-full max-w-2xl">
          <IFormFakeDoor
            layout="horizontal"
            location="countdown"
            :offer="countdownOffer"
          />
        </div>
      </div>
    </div>
  </div>
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
