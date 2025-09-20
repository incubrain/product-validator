// plugins/events.client.ts - CORRECTED VERSION
import type { HookResult } from '@nuxt/schema';

declare module '#app' {
  interface RuntimeNuxtHooks {
    'events:emit': (payload: EventPayload) => HookResult;
  }
}

type EventHandler = (payload: EventPayload) => void;

// Map of event handlers
const eventHandlers = new Map<TrackedEvents, EventHandler[]>();

// Console logger for all environments
const consoleLogger: EventHandler = (payload) => {
  console.log(`📊 Event [${payload.type}]:`, payload);
};

// Generic analytics handler (provider-agnostic)
const analyticsHandler: EventHandler = (payload) => {
  // Only run in production/client
  if (import.meta.dev || import.meta.server) return;

  try {
    // Access the globally configured Umami script
    const { $scripts } = useNuxtApp();
    const umamiScript = $scripts.umamiAnalytics;

    if (umamiScript?.proxy?.track) {
      sendToAnalyticsProvider(payload, umamiScript.proxy);
    }

    // ADD OTHER PROVIDERS HERE:
    // const gaScript = $scripts.googleAnalytics;
    // if (gaScript?.proxy?.gtag) { sendToGA(payload, gaScript.proxy); }
  } catch (error) {
    console.error('Analytics handler failed:', error);
  }
};

// Umami-specific sender (isolated)
function sendToAnalyticsProvider(payload: EventPayload, analyticsProxy: any) {
  const eventName = `${payload.type}`;
  const eventData = {
    event_id: payload.id,
    location: payload.location,
    action: payload.action,
    target: payload.target,
    timestamp: payload.timestamp,
  };

  // Handle different event types
  switch (payload.type) {
    case 'action_click':
      // Track conversions for paid actions
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

    default:
      analyticsProxy.track(eventName, eventData);
  }
}

// Register handlers based on environment
if (import.meta.dev) {
  // Development: console only (scripts are mocked)
  eventHandlers.set('action_click', [consoleLogger]);
  eventHandlers.set('action_view', [consoleLogger]);
  eventHandlers.set('exit_intent', [consoleLogger]);
} else {
  // Production: console + analytics
  eventHandlers.set('action_click', [consoleLogger, analyticsHandler]);
  eventHandlers.set('action_view', [consoleLogger, analyticsHandler]);
  eventHandlers.set('exit_intent', [consoleLogger, analyticsHandler]);
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('events:emit', async (payload) => {
    const handlers = eventHandlers.get(payload.type);

    if (!handlers) {
      if (import.meta.dev)
        console.warn(`No handlers for event: ${payload.type}`);
      return;
    }

    // Execute all handlers
    handlers.forEach((handler) => {
      try {
        handler(payload);
      } catch (error) {
        console.error(`Handler failed for ${payload.type}:`, error);
      }
    });
  });
});
