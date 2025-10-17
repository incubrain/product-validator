import type { EventPayload } from '#shared/types/events';

export const consoleLogger = (payload: EventPayload) => {
  console.info(`📊 Event [${payload.type}]:`, payload);
};
