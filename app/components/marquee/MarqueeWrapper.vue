<!-- ~/components/MarqueeWrapper.vue -->
<script setup lang="ts">
import type { ProofItem } from '#types';

interface Props {
  items: ProofItem[];
  trackIndex: number;
}
const { showFeature } = useSectionVisibility();

const props = defineProps<Props>();

// Dynamic duration calculation
const baseDuration = 8;
const duration = computed(() => {
  return Math.round(props.items.length * baseDuration);
});

// Alternate reverse direction per track
const isReverse = computed(() => props.trackIndex % 2 !== 0);

// Speed multiplier per track
const speedMultiplier = computed(() => 1 + props.trackIndex * 0.3);
const adjustedDuration = computed(() => {
  return `${Math.round(duration.value * speedMultiplier.value)}s`;
});
</script>

<template>
  <div
    v-if="showFeature('marqueeProof')"
    class="flex flex-col justify-center items-center gap-4 relative overflow-hidden"
  >
    <UMarquee
      overlay
      :reverse="isReverse"
      :repeat="2"
      :ui="{
        root: 'i-marquee group relative flex items-center overflow-hidden gap-(--gap) [--gap:--spacing(4)] max-w-full w-full',
        content:
          'flex items-center shrink-0 justify-around gap-(--gap) min-w-max',
      }"
    >
      <ICardMarquee v-for="(item, index) in items" :key="index" v-bind="item" />
    </UMarquee>
  </div>
</template>

<style scoped>
.i-marquee {
  --duration: v-bind(adjustedDuration);
}
</style>
