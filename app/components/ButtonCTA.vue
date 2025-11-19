<!-- components/ButtonCTA.vue -->
<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';
import {
  LazyIModalFullscreen,
  LazyIModalWindowed,
  LazyIFormMagnet,
} from '#components';

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

const overlay = useOverlay();
const { executeAction } = useEvents();

// Fetch offer from collection by ID
const { getOffer } = useContentCache();
const { data: offer } = await getOffer(props.offerId);

// Map offer IDs to form components
const FORM_COMPONENTS: Record<string, any> = {
  magnet: LazyIFormMagnet,
  // Add more form mappings here
  // 'consultation': LazyIFormConsultation,
};

// Determine if this offer should render a form component
const formComponent = computed(() =>
  props.anchor ? false : FORM_COMPONENTS[props.offerId],
);

// Determine if this triggers a modal (non-form offers)
const isModal = computed(
  () => !!offer.value?.cta.modal && !formComponent.value && !props.anchor,
);

// If not form or modal, pass link to UButton
const to = computed(() => {
  if (formComponent.value || isModal.value) return undefined;
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
  if (formComponent.value || props.anchor) return;

  // Track the click
  await executeAction(props.location, offer.value);

  // Open modal if configured
  if (isModal.value && offer.value) {
    const ModalComponent =
      offer.value.cta.modal === 'fullscreen'
        ? LazyIModalFullscreen
        : LazyIModalWindowed;

    const modal = overlay.create(ModalComponent);
    await modal.open({
      offerId: props.offerId,
      location: props.location,
    });
  }
};
</script>

<template>
  <div>
    <!-- Render form component if offer is form-based -->
    <component
      :is="formComponent"
      v-if="formComponent"
      :location="location"
      :cta-label="offer?.cta.label"
      :cta-note="offer?.cta.note"
    />

    <!-- Standard button for non-form offers -->
    <UButton
      v-else-if="offer"
      :label="offer.cta.label"
      :trailing-icon="offer.cta.icon"
      :color="offer.cta.color || 'primary'"
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
