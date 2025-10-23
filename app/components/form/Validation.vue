<!-- components/form/ValidationForm.vue -->
<script setup lang="ts">
import type { Offer } from '#types';
import { CONVERSION } from '#shared/config/navigation';
import { IFormFakeDoor, IFormMagnet } from '#components';

interface Props {
  location: string;
  offer: Offer;
}

const props = defineProps<Props>();

// Determine which form to show based on stage + offer
const formComponent = computed(() => {
  // If this is the primary offer and we're in fake door stage
  if (
    CONVERSION.stage === 'fake_door' &&
    props.offer.id === CONVERSION.primary
  ) {
    return IFormFakeDoor;
  }

  // If this is the primary offer and we're in magnet stage
  if (CONVERSION.stage === 'magnet' && props.offer.id === CONVERSION.primary) {
    return IFormMagnet;
  }

  // Default: magnet Iform (backwards compatible)
  return IFormMagnet;
});
</script>

<template>
  <component :is="formComponent" :location="location" :offer="offer" />
</template>
