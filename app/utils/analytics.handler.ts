// shared/handlers/analytics.ts
import type { EventPayload } from '#shared/types/events';

export const analyticsHandler = (payload: EventPayload) => {
  // Only run in production/client
  if (import.meta.server) return;

  try {
    const { $scripts } = useNuxtApp();
    const umamiScript = $scripts.umamiAnalytics;

    if (umamiScript.proxy?.track) {
      sendToAnalytics(payload, umamiScript.proxy);
    }
  } catch (error) {
    console.error('Analytics handler failed:', error);
  }
};

function sendToAnalytics(payload: EventPayload, analyticsProxy: any) {
  const eventName = `${payload.type}`;
  const eventData = {
    event_id: payload.id,
    location: payload.location,
    action: payload.action,
    target: payload.target,
    timestamp: payload.timestamp,
  };

  switch (payload.type) {
    case 'action_click':
      if (payload.id.includes('paid') || payload.id.includes('purchase')) {
        analyticsProxy.track('conversion', {
          ...eventData,
          offer_type: 'paid',
          conversion_location: payload.location,
        });
      }
      analyticsProxy.track(eventName, eventData);
      break;

    case 'exit_intent':
      analyticsProxy.track('exit_intent_triggered', {
        ...eventData,
        trigger_location: payload.location,
      });
      break;

    case 'form_submit':
      analyticsProxy.track('form_submission', eventData);
      break;

    case 'form_error':
      analyticsProxy.track('form_validation_error', eventData);
      break;

    default:
      analyticsProxy.track(eventName, eventData);
  }
}
