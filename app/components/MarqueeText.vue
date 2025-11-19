<script setup lang="ts">
interface Props {
  text: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  baseSpeed?: number; // characters per second
}

const props = withDefaults(defineProps<Props>(), {
  reverse: false,
  pauseOnHover: false,
  baseSpeed: 3, // Default: 50 characters per second
});

// Calculate duration based on text length and base speed
const duration = computed(() => {
  const chars = props.text.length;
  return Math.round(chars / props.baseSpeed);
});

const adjustedDuration = computed(() => `${duration.value}s`);
</script>

<template>
  <div class="relative overflow-hidden w-full py-6">
    <UMarquee
      :pause-on-hover="pauseOnHover"
      :reverse="reverse"
      :repeat="2"
      :overlay="false"
      :ui="{
        root: 'marquee-root group [--gap:--spacing(5)] relative flex items-center overflow-hidden max-w-full w-full',
        content: 'flex items-center shrink-0 min-w-max',
      }"
    >
      <span class="text-5xl lg:text-6xl font-bold whitespace-nowrap uppercase">
        {{ text }}
      </span>
    </UMarquee>
  </div>
</template>

<style scoped>
.marquee-root {
  --duration: v-bind(adjustedDuration);
}
</style>
