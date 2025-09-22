<!-- components/Button.vue -->
<script setup lang="ts">
import type { OfferID } from '#shared/config/overview';

interface Props {
  offer: OfferID;
  location: string;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
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
  <UButton
    v-if="selectedOffer"
    :variant="selectedOffer.cta.variant || 'solid'"
    :color="selectedOffer.cta.color || 'primary'"
    :trailing-icon="selectedOffer.cta.icon"
    :to="selectedOffer.cta.to"
    :target="selectedOffer.cta.to?.startsWith('http') ? '_blank' : undefined"
    :disabled="disabled"
    :class="['justify-between', props.class]"
    @click="handleClick"
  >
    {{ selectedOffer.cta.label }}
  </UButton>
</template>
