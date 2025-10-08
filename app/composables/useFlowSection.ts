// ✅ Import from virtual module (created by our module above)
import { flowConfig } from '#build/flow-config.mjs';

export function useFlowSection<K extends keyof FlowConfig>(
  key: K,
): FlowConfig[K] {
  return computed(() => flowConfig[key]).value;
}

export function useFlowOffer(offerId: OfferID) {
  const offer = useFlowSection('offer');
  return computed(() => offer?.items.find((offer) => offer.id === offerId));
}
