// server/api/v1/webhook.post.ts
import { z } from 'zod';

const captureSchema = z.object({
  email: z.string().email(),
  formId: z.string(),
  metadata: z.record(z.any()).optional(),
});

type WebhookPlatform = 'telegram' | 'slack' | 'discord' | 'unknown';

/**
 * Detect webhook platform from URL
 */
function detectPlatform(url: string): WebhookPlatform {
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes('api.telegram.org')) return 'telegram';
  if (lowerUrl.includes('hooks.slack.com')) return 'slack';
  if (lowerUrl.includes('discord.com/api/webhooks')) return 'discord';
  
  return 'unknown';
}

/**
 * Format message for specific platform
 */
function formatMessage(platform: WebhookPlatform, data: {
  email: string;
  formId: string;
  metadata?: Record<string, any>;
}, chatId?: string) {
  const location = data.metadata?.location || 'unknown';
  const ctaType = data.metadata?.ctaType || 'unknown';
  
  switch (platform) {
    case 'telegram':
      if (!chatId) {
        throw new Error('NUXT_TELEGRAM_CHAT_ID is required for Telegram webhooks');
      }
      // Simple text format - Markdown requires escaping special characters
      // Using plain text to avoid 400 errors from unescaped characters
      return {
        chat_id: chatId,
        text: [
          '🎉 New Lead',
          '',
          `📧 Email: ${data.email}`,
          `📝 Form: ${data.formId}`,
          `📍 Location: ${location}`,
          `🎯 CTA: ${ctaType}`,
        ].join('\n'),
      };
      
    case 'slack':
      return {
        text: `🎉 New Lead: ${data.email}`,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*New Email Capture*\n📧 \`${data.email}\`\n📝 ${data.formId}`
            }
          },
          {
            type: "context",
            elements: [{
              type: "mrkdwn",
              text: `Location: ${location} | CTA: ${ctaType}`
            }]
          }
        ]
      };
      
    case 'discord':
      return {
        content: `🎉 **New Lead**`,
        embeds: [{
          color: 0x00ff00,
          fields: [
            { name: '📧 Email', value: `\`${data.email}\``, inline: false },
            { name: '📝 Form', value: data.formId, inline: true },
            { name: '📍 Location', value: location, inline: true },
            { name: '🎯 CTA', value: ctaType, inline: true },
          ],
          timestamp: new Date().toISOString(),
        }]
      };
      
    default:
      // Fallback to simple format
      return {
        text: `🎉 New Lead: ${data.email} (Form: ${data.formId})`,
      };
  }
}

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
        'For Telegram, also add:',
        'NUXT_TELEGRAM_CHAT_ID=<your-chat-id>',
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
  
  // Detect platform and format message
  const platform = detectPlatform(webhookUrl);
  const telegramChatId = config.telegramChatId;
  
  let message;
  try {
    message = formatMessage(platform, parsed.data, telegramChatId);
    
    // Debug logging for Telegram
    if (platform === 'telegram') {
      logger.info('Telegram payload:', {
        url: webhookUrl,
        chatId: telegramChatId,
        chatIdType: typeof telegramChatId,
        message: JSON.stringify(message, null, 2),
      });
    }
  } catch (error) {
    logger.error('Failed to format webhook message:', {
      platform,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Webhook Configuration Error',
      message: error instanceof Error ? error.message : 'Failed to format webhook message',
    });
  }
  
  // Send to webhook
  try {
    const response = await $fetch(webhookUrl, {
      method: 'POST',
      body: message,
    });
    
    // Log successful Telegram response
    if (platform === 'telegram') {
      logger.success('[telegram] Response:', response);
    }
    
    logger.success(`[${platform}] Lead captured:`, parsed.data.email);
    
    return { success: true, platform };
  } catch (error: any) {
    // Enhanced Telegram error debugging
    if (platform === 'telegram') {
      logger.error('Telegram API Error Details:', {
        chatId: telegramChatId,
        messagePayload: message,
        error: error?.data || error?.message || error,
        statusCode: error?.statusCode,
      });
    }
    
    logger.error('Failed to send webhook notification:', {
      platform,
      url: webhookUrl.substring(0, 10) + '...',
      error: error instanceof Error ? error.message : 'Unknown error',
      troubleshooting: [
        '• Verify webhook URL is correct',
        '• Check webhook is not revoked',
        platform === 'telegram' ? '• Ensure NUXT_TELEGRAM_CHAT_ID is set' : null,
        '• Test URL manually with curl',
      ].filter(Boolean),
    });
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Webhook Delivery Failed',
      message: `Failed to deliver notification to ${platform}. ${error instanceof Error ? error.message : 'Unknown error'}`,
      data: { 
        platform,
        webhookUrl: webhookUrl.substring(0, 10) + '...',
      },
    });
  }
});
