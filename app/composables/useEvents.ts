// composables/useEvents.ts
export const useEvents = () => {
  const nuxtApp = useNuxtApp();
  const { getUserId } = useUserIdentity();
  const { getSource } = useTrafficSource();

  const trackEvent = async (event: EventPayload) => {
    const userId = getUserId();
    const trafficSource = getSource();

    const payload = {
      ...event,
      timestamp: Date.now(),
      data: {
        ...event.data,
        // Auto-inject user identity and traffic attribution
        userId,
        trafficSource,
      },
    } satisfies EventPayload;

    await nuxtApp.callHook('events:emit', payload);

    return payload.response;
  };

  const executeAction = async (location: string, product?: any) => {
    if (!product) return;

    // Track the interaction
    await trackEvent({
      id: `${product.id}_${location}`,
      type: 'element_clicked',
      location,
      action: getActionType(product.cta.to),
      target: product.cta.to,
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
