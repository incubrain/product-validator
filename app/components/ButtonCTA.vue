<!-- components/ButtonCTA.vue -->
<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

interface Props {
  offerId: OfferID;
  location: string;

  // Pass-through to UButton
  class?: string;
  size?: ButtonProps['size'];
  block?: boolean;
  anchor?: boolean;
}

const props = defineProps<Props>();

const { executeAction } = useEvents();

// Fetch offer from collection by ID
const { getOffer } = useContentCache();
const { data: offer } = await getOffer(props.offerId);

// If not form or modal, pass link to UButton
const to = computed(() => {
  if (props.anchor) return { path: '/', hash: '#offer' };
  return offer.value?.cta.to;
});

const target = computed(() =>
  typeof offer.value?.cta.to === 'string' &&
  offer.value.cta.to.startsWith('http')
    ? '_blank'
    : undefined,
);

// Handle click for non-form offers
const handleClick = async () => {
  if (props.anchor) return;

  // Track the click
  await executeAction(props.location, offer.value);
};
</script>

<template>
  <div>
    <UButton
      :label="offer.cta.label"
      :leading-icon="offer.cta.icon"
      :color="(offer.cta.color || 'primary') as any"
      :variant="offer.cta.variant || 'solid'"
      :size="size"
      :block="block"
      :class="props.class"
      :to="to"
      :target="target"
      :disabled="offer.cta.disabled"
      @click="handleClick"
    />
  </div>
</template>
