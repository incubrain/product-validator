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
  
  // Extract user identity and traffic attribution
  const userId = payload.data?.userId;
  const trafficSource = payload.data?.trafficSource;

  const eventData = {
    event_id: payload.id,
    location: payload.location,
    action: payload.action,
    target: payload.target,
    timestamp: payload.timestamp,
    id: userId,
    ...trafficSource,
  };

  switch (payload.type) {
    case 'element_clicked':
      if (payload.id.includes('paid') || payload.id.includes('purchase')) {
        analyticsProxy.track('conversion', {
          ...eventData,
          product_type: 'paid',
          conversion_location: payload.location,
        });
      }
      analyticsProxy.track(eventName, eventData);
      break;

    case 'exit_intent':
      analyticsProxy.track('exit_intent', {
        ...eventData,
        trigger_location: payload.location,
      });
      break;

    case 'form_submitted':
      analyticsProxy.track('form_submitted', eventData);
      break;

    case 'form_error':
      analyticsProxy.track('form_error', eventData);
      break;

    default:
      analyticsProxy.track(eventName, eventData);
  }
}
