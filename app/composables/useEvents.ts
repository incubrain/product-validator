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

  return { trackEvent };
};
