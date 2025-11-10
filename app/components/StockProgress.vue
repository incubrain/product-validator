<!-- components/StockProgress.vue - SIMPLIFIED -->
<script setup lang="ts">
interface Props {
  stock: OfferStock;
  offerId?: OfferID; // ✅ Pass offer ID to detect type
  class?: string;
}

const props = defineProps<Props>();

// ✅ Auto-detect if this is a magnet offer (should use live count)
const useLiveCount = computed(() => {
  return props.offerId === 'magnet';
});

// ✅ Fetch live count if it's a magnet offer
const { data: metrics } = useLiveCount.value
  ? useFetch('/api/v1/metrics/leads')
  : { data: ref(null) };

// ✅ Use live count or static count
const claimed = computed(() => {
  if (useLiveCount.value && metrics.value) {
    return metrics.value.total || 0;
  }
  return props.stock.claimed;
});

// Calculate percentage
const percent = computed(() => {
  if (!props.stock?.limit) return 0;
  return Math.min(100, Math.round((claimed.value / props.stock.limit) * 100));
});

// Format label based on stock type
const label = computed(() => {
  const { limit, type = 'spots' } = props.stock;

  const typeLabels: Record<string, { singular: string; plural: string }> = {
    spots: { singular: 'spot', plural: 'spots' },
    hours: { singular: 'hour', plural: 'hours/month' },
    units: { singular: 'unit', plural: 'units' },
    licenses: { singular: 'license', plural: 'licenses' },
    seats: { singular: 'seat', plural: 'seats' },
  };

  const { singular, plural } = typeLabels[type] || {
    singular: type,
    plural: type,
  };
  const remaining = limit - claimed.value;
  const typeLabel = remaining === 1 ? singular : plural;

  return `${claimed.value}/${limit} ${typeLabel} claimed`;
});

// Urgency color based on availability
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
