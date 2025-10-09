<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';
import { LazyIModalFullscreen, LazyIModalWindowed } from '#components';

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
const { trackEvent } = useAction();
const offer = useFlowOffer(props.offerId);

// Determine if this triggers a modal
const isModal = computed(() => !!offer.value?.cta.modal);

// If not modal, pass link to UButton
const to = computed(() => {
  if (isModal.value && !props.anchor) return undefined;
  if (props.anchor) return { path: '/', hash: '#offer' };
  return offer.value?.cta.to;
});

const target = computed(() =>
  typeof offer.value.cta.to === 'string' &&
  offer.value.cta.to.startsWith('http')
    ? '_blank'
    : undefined,
);

// Handle modal trigger
const handleClick = async () => {
  if (!isModal.value || !offer.value || props.anchor) return;

  // Track modal open
  await trackEvent({
    id: `${props.offerId}_${props.location}_modal`,
    type: 'action_click',
    location: props.location,
    action: 'modal_opened',
    target: props.offerId,
  });

  // Open appropriate modal
  const ModalComponent =
    offer.value.cta.modal === 'fullscreen'
      ? LazyIModalFullscreen
      : LazyIModalWindowed;

  const modal = overlay.create(ModalComponent);
  await modal.open({
    offerId: props.offerId,
    location: props.location,
  });
};
</script>

<template>
  <UButton
    v-if="offer"
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
</template>
