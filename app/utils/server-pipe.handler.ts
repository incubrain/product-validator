// server/handlers/server-pipe.handler.ts
import type { EventPayload } from '#shared/types/events';

/**
 * Pipes event data to server API
 * Only registered for events that need server storage
 */
export async function serverPipeHandler(payload: EventPayload): Promise<any> {
  try {
    const response = await $fetch('/api/v1/events', {
      method: 'POST',
      body: {
        recordId: payload.data?.recordId,
        data: payload.data,
        timestamp: payload.timestamp,
      },
    });

    payload.response = response;
    return response;
  } catch (error) {
    console.error('[ServerPipe] Failed:', error);
    throw error;
  }
}
