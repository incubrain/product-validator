<!-- components/StockProgress.vue -->
<script setup lang="ts">
import { STAGE_CONFIG } from '#stage-config';

interface Props {
  stock: ProductStock;
  productId?: ProductId;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  productId: STAGE_CONFIG.products.primary,
});

const {
  isAvailable,
  percentClaimed,
  label,
  urgencyColor,
  useLiveCount,
} = useProductStock(props.stock, props.productId);

</script>

<template>
  <div v-if="isAvailable" class="space-y-3 w-full flex flex-col">
    <UProgress
      :model-value="percentClaimed"
      :color="urgencyColor"
      size="2xl"
      class="w-full"
    />
    <div class="flex justify-between items-center text-xs">
      <span class="text-muted">{{ label }}</span>
      <span v-if="useLiveCount" class="text-dimmed flex items-center gap-1 pl-2">
        <span class="size-1.5 rounded-full bg-success animate-pulse" />
        Live
      </span>
    </div>
  </div>
</template>
