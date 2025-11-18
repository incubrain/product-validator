<!-- components/form/Validation.vue -->
<script setup lang="ts">
import type { Offer } from '#types';
import { CONVERSION } from '#shared/config/navigation';
import type { FormType } from '#shared/config/navigation';
import { IFormFakeDoor, IFormMagnet } from '#components';

interface Props {
  location: string;
  offer: Offer;
}

const props = defineProps<Props>();
const { validationStage } = useDevTools();

const FORM_COMPONENTS: Record<FormType, any> = {
  fake_door: IFormFakeDoor,
  magnet: IFormMagnet,
};

const formComponent = computed(() => {
  // Only primary offer uses stage-based form switching
  if (props.offer.id !== CONVERSION.primary) {
    return IFormMagnet; // Default for non-primary offers
  }

  // Look up form type for current stage
  const formType = CONVERSION.conversionTarget[validationStage.value];
  return FORM_COMPONENTS[formType];
});
</script>

<template>
  <component :is="formComponent" :location="location" :offer="offer" />
</template>
