// server/api/v1/webhook.post.ts
import { z } from 'zod';

const captureSchema = z.object({
  email: z.string().email(),
  formId: z.string(),
  metadata: z.record(z.any()).optional(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parsed = captureSchema.safeParse(body);
  
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Data',
      message: 'Email capture validation failed',
      data: parsed.error.errors,
    });
  }
  
  const config = useRuntimeConfig();
  const webhookUrl = config.webhookUrl;
  
  if (!webhookUrl) {
    logger.box({
      title: '❌ Webhook Not Configured',
      message: [
        'Choose ONE platform for lead notifications:',
        '',
        '• Telegram: https://core.telegram.org/bots/api#sendmessage',
        '• Slack: https://api.slack.com/messaging/webhooks',
        '• Discord: Server Settings → Integrations → Webhooks',
        '',
        'Add to .env file:',
        'NUXT_WEBHOOK_URL=<your-webhook-url>',
        '',
        'Then restart dev server',
      ].join('\n'),
      style: {
        borderColor: 'red',
        borderStyle: 'rounded',
      },
    });
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Webhook Not Configured',
      message: 'Webhook URL is missing. Supports Telegram, Slack, or Discord. Add NUXT_WEBHOOK_URL to your .env file. See terminal for setup instructions.',
    });
  }
  
  // Format notification for Slack/Discord
  const message = {
    text: `🎉 New Lead: ${parsed.data.email}`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*New Email Capture*\n📧 \`${parsed.data.email}\`\n📝 ${parsed.data.formId}`
        }
      },
      {
        type: "context",
        elements: [{
          type: "mrkdwn",
          text: `Location: ${parsed.data.metadata?.location || 'unknown'} | CTA: ${parsed.data.metadata?.ctaType || 'unknown'}`
        }]
      }
    ]
  };
  
  // Send to webhook
  try {
    await $fetch(webhookUrl, {
      method: 'POST',
      body: message,
    });
    
    logger.success('Lead captured:', parsed.data.email);
    
    return { success: true };
  } catch (error) {
    logger.error('Failed to send webhook notification:', {
      url: webhookUrl.substring(0, 10) + '...',
      error: error instanceof Error ? error.message : 'Unknown error',
      troubleshooting: [
        '• Verify webhook URL is correct',
        '• Check webhook is not revoked',
        '• Test URL manually with curl',
      ],
    });
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Webhook Delivery Failed',
      message: `Failed to deliver notification to webhook. ${error instanceof Error ? error.message : 'Unknown error'}`,
      data: { webhookUrl: webhookUrl.substring(0, 10) + '...' },
    });
  }
});
