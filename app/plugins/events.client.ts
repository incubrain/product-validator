// plugins/events.client.ts
import type { HookResult } from '@nuxt/schema';

declare module '#app' {
  interface RuntimeNuxtHooks {
    'events:emit': (payload: EventPayload) => HookResult;
  }
}

type EventHandler = (payload: EventPayload) => void;

// Map of event handlers
const eventHandlers = new Map<TrackedEvents, EventHandler[]>();

// Simple console logger for now
const consoleLogger: EventHandler = (payload) => {
  console.log(`📊 Event [${payload.type}]:`, payload);
};

// Register handlers
eventHandlers.set('action_click', [consoleLogger]);
eventHandlers.set('action_view', [consoleLogger]);
eventHandlers.set('exit_intent', [consoleLogger]);

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
