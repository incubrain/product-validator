// shared/handlers/webhooks.ts
import type { EventPayload } from '#shared/types/events';

const extractProviderFromUrl = (url: string): string | null => {
  if (url.includes('n8n')) return 'n8n';
  if (url.includes('zapier')) return 'zapier';
  if (url.includes('pipedream')) return 'pipedream';
  return null;
};

const WORKFLOW_ID_MAP: Record<string, string> = {
  default: 'magnet',
  magnet: 'magnet',
  // Add more mappings as needed
};

export function buildWebhookUrl(
  baseUrl: string,
  provider: string,
  workflowId: string,
): string {
  if (!baseUrl || !provider) {
    console.error('Missing webhook base URL or provider');
    return '';
  }

  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  switch (provider.toLowerCase()) {
    // {NOTE}: zapier untested, please verify paths
    case 'zapier':
      return `${cleanBase}${workflowId}/`;

    case 'n8n':
      return `${cleanBase}${workflowId}`;

    case 'pipedream':
      return `${cleanBase}?workflow_id=${encodeURIComponent(workflowId)}`;

    default:
      console.error(`Unknown provider: ${provider}`);
      return cleanBase;
  }
}

export const formSubmissionHandler = async (payload: EventPayload) => {
  if (payload.type !== 'form_submit') return;

  try {
    const pipeBaseURL = useRuntimeConfig().public.dataPipeBaseUrl;

    if (!pipeBaseURL) {
      console.error('Base webhook URL not configured');
      return { status: 500, error: 'Webhook not configured' };
    }

    const pipeProvider = extractProviderFromUrl(String(pipeBaseURL));

    const workflowId =
      WORKFLOW_ID_MAP[payload.data.formId] || WORKFLOW_ID_MAP['default'];
    const webhookUrl = buildWebhookUrl(
      String(pipeBaseURL),
      String(pipeProvider),
      workflowId,
    );

    console.log(
      `🚀 Submitting form to ${pipeProvider}, ${webhookUrl} workflow: ${workflowId}`,
    );
    if (!webhookUrl) {
      console.error('Failed to build webhook URL');
      return { status: 500, error: 'Invalid webhook configuration' };
    }

    try {
      const response = await $fetch(webhookUrl, {
        method: 'POST',
        body: payload.data,
      });

      console.log(
        `✅ Form submitted to ${pipeProvider} workflow: ${workflowId}`,
      );
      console.log('Response:', response);


      payload.response = {
        status: 200,
        data: response,
      };
      return
    } catch (error) {
      console.error('Error during webhook request:', error);
      throw error;
    }
  } catch (error: any) {
    console.error('❌ Form webhook failed:', error);

    // Return error status based on error type
    const status = error.status || error.statusCode || 500;
    return {
      status,
      error: error.message || 'Webhook request failed',
    };
  }
};
