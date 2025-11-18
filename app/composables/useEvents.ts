// composables/useEvents.ts
export const useEvents = () => {
  const nuxtApp = useNuxtApp();

  const trackEvent = async (event: EventPayload) => {
    const payload = {
      ...event,
      timestamp: Date.now(),
    } satisfies EventPayload;

    await nuxtApp.callHook('events:emit', payload);

    return payload.response;
  };

  const executeAction = async (location: string, offer?: any) => {
    if (!offer) return;

    // Track the interaction
    await trackEvent({
      id: `${offer.id}_${location}`,
      type: 'element_clicked',
      location,
      action: getActionType(offer.cta.to),
      target: offer.cta.to,
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
