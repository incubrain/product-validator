// app/utils/webhook.handler.ts
import type { EventPayload } from '#shared/types/events';

/**
 * Sends form submission data to webhook endpoint
 * Replaces server-pipe.handler with simpler webhook approach
 */
export async function webhookHandler(payload: EventPayload): Promise<any> {
  if (payload.type !== 'form_submitted') return;
  
  try {
    const response = await $fetch('/api/v1/webhook', {
      method: 'POST',
      body: {
        email: payload.data.email,
        formId: payload.data.formId,
        metadata: payload.data.metadata,
        antiSpam: payload.data.antiSpam,
      },
    });

    payload.response = response;
    return response;
  } catch (error) {
    console.error('[Webhook] Failed:', error);
    throw error;
  }
}
