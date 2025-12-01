// plugins/events.client.ts
import type { HookResult } from '@nuxt/schema';
import { EVENT_CHAINS, applyFallbacks } from '#shared/config/events';

declare module '#app' {
  interface RuntimeNuxtHooks {
    'events:emit': (payload: EventPayload) => HookResult;
    'devtools:event-executed': (event: {
      eventId: string;
      eventType: TrackedEvents;
      data?: Record<string, any>;
    }) => HookResult;
    'devtools:event-error': (event: {
      eventId: string;
      eventType: TrackedEvents;
      error: any;
    }) => HookResult;
  }
}

type EventHandler = (payload: EventPayload) => void | Promise<any>;
const eventHandlers = new Map<TrackedEvents, EventHandler[]>();

export default defineNuxtPlugin((nuxtApp) => {
  eventHandlers.set('element_clicked', [consoleLogger, analyticsHandler]);
  eventHandlers.set('element_viewed', [consoleLogger, analyticsHandler]);
  eventHandlers.set('exit_intent', [consoleLogger, analyticsHandler]);
  eventHandlers.set('form_submitted', [
    consoleLogger,
    analyticsHandler,
    serverPipeHandler,
  ]);
  eventHandlers.set('form_error', [consoleLogger, analyticsHandler]);
  eventHandlers.set('form_success', [consoleLogger]);
  eventHandlers.set('modal_open', [consoleLogger, modalHandler]);
  eventHandlers.set('modal_close', [consoleLogger]);

  // Listen for event emissions
  nuxtApp.hook('events:emit', async (payload) => {
    if (payload._devToolsTriggered) {
      const chainConfig = EVENT_CHAINS[payload.type];
      if (chainConfig?.requiredFields) {
        payload.data = applyFallbacks(payload.data, chainConfig.requiredFields);
      }
    }

    const handlers = eventHandlers.get(payload.type);

    if (!handlers) {
      if (import.meta.dev) {
        console.warn(`No handlers for event: ${payload.type}`);
      }
      return;
    }

    // Execute handlers
    for (const handler of handlers) {
      try {
        const result = await handler(payload);
        
        // ✅ Store handler response for event chains
        if (result !== undefined) {
          payload.response = result;
        }
      } catch (error) {
        console.error(`Handler failed for ${payload.type}:`, error);
        
        // ✅ Store error for event chains
        payload.error = error;

        // ✅ Track error in DevTools visualizer
        if (payload._devToolsTriggered && import.meta.dev) {
          nuxtApp.callHook('devtools:event-error', {
            eventId: payload.id,
            eventType: payload.type,
            error,
          });
        }
      }
    }

    // ✅ Track successful execution in DevTools
    if (payload._devToolsTriggered && import.meta.dev) {
      nuxtApp.callHook('devtools:event-executed', {
        eventId: payload.id,
        eventType: payload.type,
        data: payload.data,
      });
    }

    // Event chaining
    const chainConfig = EVENT_CHAINS[payload.type];
    if (chainConfig) {
      if (chainConfig.condition && !chainConfig.condition(payload)) {
        return;
      }

      for (const triggeredEventType of chainConfig.triggers) {
        const triggeredPayload: EventPayload = {
          id: `${payload.id}_chain_${triggeredEventType}`,
          type: triggeredEventType,
          location: payload.location,
          action: 'chain_trigger',
          target: triggeredEventType,
          timestamp: Date.now(),
          data: chainConfig.data ? chainConfig.data(payload) : payload.data,
          _devToolsTriggered: payload._devToolsTriggered, // ✅ Propagate flag
        };

        await nuxtApp.callHook('events:emit', triggeredPayload);
      }
    }
  });
});
