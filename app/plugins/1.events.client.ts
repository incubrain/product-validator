// plugins/events.client.ts
type EventHandler = (payload: EventPayload) => void | Promise<any>;

// Global handlers that run for ALL events (initialized in setup)
const globalHandlers: EventHandler[] = [analyticsHandler];

// Event-specific handlers
const EVENT_HANDLER_CONFIG: Record<TrackedEvents, EventHandler[]> = {
  element_viewed: [],
  form_submitted: [webhookHandler],
  form_error: [],
  section_view: [],
  cta_click: [],
};

// Handler map (built once in setup)
let eventHandlers: Map<TrackedEvents, EventHandler[]>;

export default defineNuxtPlugin({
  name: 'events',
  enforce: 'pre',
  setup() {
    const config = useRuntimeConfig();

    // Add console logger conditionally
    if (config.public.debug) {
      globalHandlers.push(consoleLogger);
    }

    // Build handler map once
    eventHandlers = new Map<TrackedEvents, EventHandler[]>();
    for (const [eventType, specificHandlers] of Object.entries(EVENT_HANDLER_CONFIG)) {
      eventHandlers.set(eventType as TrackedEvents, [
        ...globalHandlers,
        ...specificHandlers,
      ]);
    }

    return {};
  },
  hooks: {
    'events:emit': async (payload) => {
      const handlers = eventHandlers.get(payload.type);
      const nuxtApp = useNuxtApp();


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

          if (result !== undefined) {
            payload.response = result;
          }
        } catch (error) {
          console.error(`Handler failed for ${payload.type}:`, error);
          payload.error = error;

          if (payload._devToolsTriggered && import.meta.dev) {
            nuxtApp.callHook('events:dev', {
              eventId: payload.id,
              eventType: payload.type,
              status: 'error',
              error,
            });
          }
        }
      }

      if (payload._devToolsTriggered && import.meta.dev) {
        nuxtApp.callHook('events:dev', {
          eventId: payload.id,
          eventType: payload.type,
          status: 'success',
          data: payload.data,
        });
      }
    },
  },
  env: {
    islands: false,
  },
});
