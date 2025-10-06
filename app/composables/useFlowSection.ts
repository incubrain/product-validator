// {CONFIG}:1 remove 'examples/validator/' from import
import { flowConfig } from '#shared/config/examples/validator/1.flow';

// app/composables/useFlowSection.ts
export function useFlowSection<K extends keyof FlowConfig>(
  key: K,
): FlowConfig[K] {
  return flowConfig[key];
}

// Update offer composable for new structure
export function useFlowOffer(offerId: OfferID) {
  const offer = useFlowSection('offer'); // This now returns the array directly
  return computed(() => offer?.items.find((offer) => offer.id === offerId));
}
