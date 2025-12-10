// composables/useEvents.ts
export const useEvents = () => {
  const nuxtApp = useNuxtApp();
  const { getUserId } = useUserIdentity();

  const trackEvent = async (event: EventPayload) => {
    const userId = getUserId();

    const payload = {
      ...event,
      timestamp: Date.now(),
      data: {
        ...event.data,
        userId,
      },
    } satisfies EventPayload;

    await nuxtApp.callHook('events:emit', payload);

    return payload.response;
  };

  return { trackEvent };
};
