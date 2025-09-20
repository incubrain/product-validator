<!-- components/Button.vue -->
<script setup lang="ts">
import type { OfferID } from '#shared/config/overview';

interface Props {
  offer: OfferID;
  location: string;
  disabled?: boolean;
  showGuarantee?: boolean;
  guaranteePosition?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  showGuarantee: false,
  guaranteePosition: 'below',
  class: '',
});

const { executeAction } = useAction();

// Map offer types to actual offers
const selectedOffer = useFlowOffer(props.offer);

const handleClick = async () => {
  if (props.disabled) return;
  await executeAction(props.location, selectedOffer.value);
};
</script>

<template>
  <div
    :class="
      guaranteePosition === 'right'
        ? 'flex items-center gap-3'
        : 'relative inline-block'
    "
  >
    <UButton
      v-if="selectedOffer"
      :variant="selectedOffer.cta.variant || 'solid'"
      :color="selectedOffer.cta.color || 'primary'"
      :trailing-icon="selectedOffer.cta.icon"
      :to="selectedOffer.cta.href"
      :target="
        selectedOffer.cta.href?.startsWith('http') ? '_blank' : undefined
      "
      :disabled="disabled"
      :class="['justify-between', props.class]"
      @click="handleClick"
    >
      {{ selectedOffer.cta.label }}
    </UButton>

    <!-- Guarantee text -->
    <div
      v-if="showGuarantee && selectedOffer?.guarantee"
      :class="[
        'text-xs text-muted whitespace-nowrap',
        guaranteePosition === 'below'
          ? 'absolute top-full left-1/2 transform -translate-x-1/2 mt-2 pointer-events-none'
          : 'flex-shrink-0',
      ]"
    >
      {{ selectedOffer.guarantee }}
    </div>
  </div>
</template>
