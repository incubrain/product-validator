// composables/useAction.ts
import type { ActionKey } from '#shared/config/actions';
import type { EventPayload } from '#shared/config/events';
import { getActionType, actionConfig } from '#shared/config/actions';

export const useAction = () => {
  const nuxtApp = useNuxtApp();
  const { selectVariant } = useABVariant();

  const trackEvent = async (event: EventPayload) => {
    const payload = {
      ...event,
      timestamp: Date.now(),
    } satisfies EventPayload;

    await nuxtApp.callHook('events:emit', payload);
  };

  const executeAction = async (actionKey: ActionKey, location: string) => {
    const baseAction = actionConfig[actionKey];
    const selectedVariant = selectVariant(baseAction.id, baseAction.variants);

    // Track the interaction
    await trackEvent({
      id: `${baseAction.id}_${selectedVariant.id}`,
      type: 'action_click',
      location,
      action: getActionType(baseAction.target),
      target: baseAction.target,
    });
  };

  return { executeAction, trackEvent };
};
