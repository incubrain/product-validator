<script setup lang="ts">
interface Props {
  stock: OfferStock;
  class?: string;
}

const props = defineProps<Props>();

// Calculate percentage
const percent = computed(() => {
  if (!props.stock?.limit) return 0;
  return Math.min(
    100,
    Math.round((props.stock.claimed / props.stock.limit) * 100),
  );
});

// Format label based on stock type
const label = computed(() => {
  const { claimed, limit, type = 'spots' } = props.stock;

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
  const remaining = limit - claimed;
  const typeLabel = remaining === 1 ? singular : plural;

  return `${claimed}/${limit} ${typeLabel} claimed`;
});

// Urgency color based on availability
const urgencyColor = computed(() => {
  if (percent.value >= 90) return 'error';
  if (percent.value >= 70) return 'warning';
  return 'success';
});
</script>

<template>
  <div :class="['space-y-3 w-full', props.class]">
    <UProgress :model-value="percent" :color="urgencyColor" size="xl" />
    <div class="flex justify-between items-center text-xs">
      <span class="font-medium text-dimmed"> {{ percent }}% claimed </span>
      <span class="text-muted">
        {{ label }}
      </span>
    </div>
  </div>
</template>
