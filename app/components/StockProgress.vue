<!-- components/StockProgress.vue -->
<script setup lang="ts">
import { CONVERSION } from '~~/shared/config/navigation';

interface Props {
  stock: OfferStock;
  offerId?: OfferID;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  offerId: CONVERSION.primary,
});

// Auto-detect if this is a magnet offer (should use live count)
const useLiveCount = computed(() => {
  return props.offerId === 'magnet';
});

// Fetch live count if it's a magnet offer
const { data: metrics } = useLiveCount.value
  ? useFetch('/api/v1/metrics/leads')
  : { data: ref(null) };

// Use live count or static count
const claimed = computed(() => {
  if (useLiveCount.value && metrics.value) {
    return metrics.value.total || 0;
  }
  return props.stock.claimed;
});

// Calculate remaining
const remaining = computed(() => {
  return props.stock.limit - claimed.value;
});

// Calculate percentage
const percent = computed(() => {
  if (!props.stock?.limit) return 0;
  return Math.min(100, Math.round((claimed.value / props.stock.limit) * 100));
});

// Format label based on stock type
const label = computed(() => {
  const { type = 'spots' } = props.stock;

  const typeLabels: Record<string, { singular: string; plural: string }> = {
    spots: { singular: 'spot', plural: 'spots' },
    hours: { singular: 'hour', plural: 'hours' },
    units: { singular: 'unit', plural: 'units' },
    licenses: { singular: 'license', plural: 'licenses' },
    seats: { singular: 'seat', plural: 'seats' },
  };

  const { singular, plural } = typeLabels[type] || {
    singular: type,
    plural: type,
  };

  const typeLabel = remaining.value === 1 ? singular : plural;

  return `${remaining.value} ${typeLabel} remaining`;
});

// Urgency color based on remaining availability
const urgencyColor = computed(() => {
  if (percent.value >= 70) return 'error';
  if (percent.value >= 50) return 'warning';
  return 'info';
});
</script>

<template>
  <div class="space-y-3 w-full flex flex-col">
    <UProgress
      :model-value="percent"
      :color="urgencyColor"
      size="2xl"
      class="w-full"
    />
    <div class="flex justify-between items-center text-xs">
      <span class="text-muted">
        {{ label }}
      </span>
      <span
        v-if="useLiveCount"
        class="text-dimmed flex items-center gap-1 pl-2"
      >
        <span class="size-1.5 rounded-full bg-success animate-pulse" />
        Live
      </span>
    </div>
  </div>
</template>
