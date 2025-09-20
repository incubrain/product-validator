import { flowConfig } from '#shared/config/overview';
import type { FlowConfig, OfferID } from '#shared/config/overview';

export function useFlowSection<K extends keyof FlowConfig>(key: K) {
  return flowConfig[key];
}

export function useFlowOffer(offerId: OfferID) {
  const offers = useFlowSection('offers');
  return computed(() => offers?.find((offer) => offer.id === offerId));
}
