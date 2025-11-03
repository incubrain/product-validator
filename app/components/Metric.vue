<!-- components/Metric.vue -->
<script setup lang="ts">
interface MetricProps {
  name?: string;
  level: 'weak' | 'average' | 'strong';
  range: string;
  meaning: string;
}

const props = defineProps<MetricProps>();

// Style variants based on level
const variants = {
  weak: {
    bg: 'bg-error/10',
    border: 'border-error/30',
    text: 'text-error',
    label: 'Weak',
  },
  average: {
    bg: 'bg-warning/10',
    border: 'border-warning/30',
    text: 'text-warning',
    label: 'Average',
  },
  strong: {
    bg: 'bg-success/10',
    border: 'border-success/30',
    text: 'text-success',
    label: 'Strong',
  },
};

const variant = computed(() => variants[props.level]);
</script>

<template>
  <div class="space-y-1.5">
    <div
      :class="[
        'flex items-center justify-between p-2 rounded border',
        variant.bg,
        variant.border,
      ]"
    >
      <span :class="['text-xs font-medium', variant.text]">
        {{ variant.label }}
      </span>
      <span :class="['text-xs font-bold', variant.text]">
        {{ range }}
      </span>
    </div>
    <p class="text-xs text-dimmed leading-snug">
      {{ meaning }}
    </p>
  </div>
</template>
