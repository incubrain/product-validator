<!-- components/form/Validation.vue -->
<script setup lang="ts">
import type { Offer } from '#types';
import { STAGE_CONFIG } from '#stage-config';
import { IFormFakeDoor, IFormMagnet } from '#components';

interface Props {
  location: string;
  offer: Offer;
}

const props = defineProps<Props>();
const { currentStage } = useDevTools();

// Determine if we're before the fake door disable threshold
const useFakeDoor = computed(() => {
  const disableAtStage = STAGE_CONFIG.stages.find(
    s => s.value === STAGE_CONFIG.disableFakeDoorAt
  );
  const currentStageConfig = STAGE_CONFIG.stages.find(
    s => s.value === currentStage.value
  );
  
  const currentOrder = currentStageConfig?.order ?? 0;
  const disableAtOrder = disableAtStage?.order ?? Infinity;
  
  return currentOrder < disableAtOrder;
});

const formComponent = computed(() => {
  // Secondary offer (direct) doesn't use forms - it's a booking link
  if (props.offer.slug === STAGE_CONFIG.offers.secondary) {
    return null;
  }
  
  // Primary offer: fake door or real form based on stage
  return useFakeDoor.value ? IFormFakeDoor : IFormMagnet;
});
</script>

<template>
  <component 
    v-if="formComponent" 
    :is="formComponent" 
    :location="location" 
    :offer="offer" 
  />
</template>