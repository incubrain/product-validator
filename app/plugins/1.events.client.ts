// plugins/events.client.ts
import type { HookResult } from '@nuxt/schema';

declare module '#app' {
  interface RuntimeNuxtHooks {
    'events:emit': (payload: EventPayload) => HookResult;
  }
}

type EventHandler = (payload: EventPayload) => void | Promise<any>;
const eventHandlers = new Map<TrackedEvents, EventHandler[]>();

export default defineNuxtPlugin((nuxtApp) => {
  // Register handlers
  eventHandlers.set('action_click', [consoleLogger, analyticsHandler]);
  eventHandlers.set('action_view', [consoleLogger, analyticsHandler]);
  eventHandlers.set('exit_intent', [consoleLogger, analyticsHandler]);
  eventHandlers.set('form_submit', [
    consoleLogger,
    analyticsHandler,
    formSubmissionHandler,
  ]);
  eventHandlers.set('form_error', [consoleLogger, analyticsHandler]);

  // Listen for event emissions
  nuxtApp.hook('events:emit', async (payload) => {
    const handlers = eventHandlers.get(payload.type);

    if (!handlers) {
      if (import.meta.dev) {
        console.warn(`No handlers for event: ${payload.type}`);
      }
      return;
    }

    // Execute all handlers
    for (const handler of handlers) {
      try {
        await handler(payload);
      } catch (error) {
        console.error(`Handler failed for ${payload.type}:`, error);
      }
    }
  });
});
