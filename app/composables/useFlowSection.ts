import { flowConfig } from '#shared/config/overview';
import type { FlowConfig, OfferID } from '#shared/config/overview';

export function useFlowSection<K extends keyof FlowConfig>(key: K) {
  return flowConfig[key];
}

export function useFlowOffer(offerId: OfferID) {
  const offers = useFlowSection('offers');
  return computed(() => offers?.items.find((offer) => offer.id === offerId));
}

// Add to useFlowSection.ts
export function useProfileData(activeProfileId: Ref<string>) {
  const hypothesis = useFlowSection('hypothesis');

  const selectedProfile = computed(
    () =>
      hypothesis?.customerProfiles?.find(
        (p) => p.id === activeProfileId.value,
      ) ||
      hypothesis?.customerProfiles?.find((p) => p.primary) ||
      hypothesis?.customerProfiles?.[0],
  );

  // ONLY return what's actually reactive
  const profilePains = computed(() => selectedProfile.value?.pains || []);

  return {
    selectedProfile,
    profilePains,
  };
}
