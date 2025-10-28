// ✅ Import from virtual module (created by our module above)
import { flowConfig } from '#build/flow-config.mjs';

export function useSectionConfig<K extends keyof FlowConfig>(key: K) {
  return computed(() => flowConfig[key] as FlowConfig[K]);
}

export function useFlowOffer(offerId: OfferID) {
  const offer = useSectionConfig('offer');
  return computed(() =>
    offer.value?.items.find((offer) => offer.id === offerId),
  );
}
