<!-- components/Countdown.vue (UPDATED WITH COMPACT MODE) -->
<script setup lang="ts">
import { useNow } from '@vueuse/core';

interface Props {
  targetDate?: string;
  fallbackMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  targetDate: new Date().toISOString(),
  fallbackMessage: 'Launching Any Day Now',
});

// Reactive current time
const now = useNow({ interval: 1000 });

// Calculate countdown
const countdown = computed(() => {
  const target = new Date(props.targetDate).getTime();
  const current = now.value.getTime();
  const distance = target - current;

  if (distance < 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
    };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
    expired: false,
  };
});

// Adjusted date for display (if expired, show +1 day)
const displayDate = computed(() => {
  if (countdown.value.expired) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow.toISOString();
  }
  return props.targetDate;
});

// Recalculate countdown for adjusted date
const displayCountdown = computed(() => {
  if (!countdown.value.expired) {
    return countdown.value;
  }

  const target = new Date(displayDate.value).getTime();
  const current = now.value.getTime();
  const distance = target - current;

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
    expired: false,
  };
});

const showFallbackMessage = computed(() => countdown.value.expired);
const format = (num: number) => String(num).padStart(2, '0');

// Time units for compact display
const timeUnits = computed(() => [
  { value: displayCountdown.value.days, label: 'D' },
  { value: displayCountdown.value.hours, label: 'H' },
  { value: displayCountdown.value.minutes, label: 'M' },
  { value: displayCountdown.value.seconds, label: 'S' },
]);
</script>

<template>
  <!-- Compact Mode (Horizontal, Smaller) -->
  <div class="flex items-center justify-center gap-2 sm:gap-3">
    <template v-if="!showFallbackMessage">
      <div
        v-for="(unit, index) in timeUnits"
        :key="unit.label"
        class="flex items-baseline gap-1 w-16"
      >
        <span class="text-2xl sm:text-3xl font-bold text-success tabular-nums">
          {{ format(unit.value) }}
        </span>
        <span class="text-xs text-gray-400 uppercase">
          {{ unit.label }}
        </span>
        <span
          v-if="index < timeUnits.length - 1"
          class="text-2xl text-gray-600 mx-1"
        >
          :
        </span>
      </div>
    </template>
    <span v-else class="text-xl font-semibold text-success">
      {{ fallbackMessage }}
    </span>
  </div>
</template>
