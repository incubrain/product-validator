// composables/useAction.ts
export const useAction = () => {
  const nuxtApp = useNuxtApp();

  const trackEvent = async (event: EventPayload) => {
    const payload = {
      ...event,
      timestamp: Date.now(),
    } satisfies EventPayload;

    await nuxtApp.callHook('events:emit', payload);
  };

  const executeAction = async (
    offerType: 'paid' | 'free' | 'social',
    location: string,
    offer?: any,
  ) => {
    if (!offer) return;

    // Track the interaction
    await trackEvent({
      id: `${offer.id}_${offerType}`,
      type: 'action_click',
      location,
      action: getActionType(offer.cta.href),
      target: offer.cta.href,
    });
  };

  const getActionType = (target: string): string => {
    if (target?.startsWith('#')) return 'scroll';
    if (target?.startsWith('tel:')) return 'phone';
    if (target?.startsWith('mailto:')) return 'email';
    if (target?.startsWith('http')) return 'external';
    return 'modal';
  };

  return { executeAction, trackEvent };
};
