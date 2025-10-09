// ✅ Import from virtual module (created by our module above)
import { flowConfig } from '#build/flow-config.mjs';

export function useFlowSection<K extends keyof FlowConfig>(key: K) {
  return computed(() => flowConfig[key]);
}

export function useFlowOffer(offerId: OfferID) {
  const offer = useFlowSection('offer');
  return computed(() => offer.value?.items.find((offer) => offer.id === offerId));
}
