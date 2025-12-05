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
  if (lowerUrl.includes('discord.com/api/webhooks') || lowerUrl.includes('discordapp.com/api/webhooks')) return 'discord';
  
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
        'Choose ONE or MORE platforms for lead notifications:',
        '',
        '• Telegram: https://api.telegram.org/bots/api#sendmessage',
        '• Slack: https://api.slack.com/messaging/webhooks',
        '• Discord: Server Settings → Integrations → Webhooks',
        '',
        'Add to .env file (comma-separated for multiple):',
        'NUXT_WEBHOOK_URL=<url1>,<url2>,<url3>',
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
  
  // Parse multiple webhook URLs (comma-separated)
  const webhookUrls = webhookUrl.split(',').map(url => url.trim()).filter(Boolean);
  
  if (webhookUrls.length === 0) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Webhook Not Configured',
      message: 'No valid webhook URLs found',
    });
  }
  
  const telegramChatId = config.telegramChatId;
  
  // Send to all webhooks in parallel
  const results = await Promise.allSettled(
    webhookUrls.map(async (url) => {
      const platform = detectPlatform(url);
      
      let message;
      try {
        message = formatMessage(platform, parsed.data, telegramChatId);
      } catch (error) {
        logger.error(`[${platform}] Failed to format message:`, {
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        throw error;
      }
      
      try {
        const response = await $fetch(url, {
          method: 'POST',
          body: message,
        });
        
        // Validate Telegram response
        if (platform === 'telegram' && response && typeof response === 'object') {
          const telegramResponse = response as { ok: boolean; description?: string; error_code?: number };
          
          if (!telegramResponse.ok) {
            logger.error('[telegram] API returned error:', {
              ok: telegramResponse.ok,
              error_code: telegramResponse.error_code,
              description: telegramResponse.description,
              sentPayload: message,
            });
            
            throw new Error(telegramResponse.description || 'Telegram API returned ok: false');
          }
        }
        
        logger.success(`[${platform}] Lead delivered:`, parsed.data.email);
        
        return { platform, url: url.substring(0, 30) + '...', success: true };
      } catch (error: any) {
        logger.error(`[${platform}] Delivery failed:`, {
          url: url.substring(0, 10) + '...',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        
        throw error;
      }
    })
  );
  
  // Analyze results
  const successful = results.filter(r => r.status === 'fulfilled');
  const failed = results.filter(r => r.status === 'rejected');
  
  logger.info('Webhook delivery summary:', {
    total: webhookUrls.length,
    successful: successful.length,
    failed: failed.length,
  });
  
  // Return success if at least one webhook succeeded
  if (successful.length > 0) {
    return {
      success: true,
      delivered: successful.length,
      failed: failed.length,
      platforms: successful.map(r => (r as PromiseFulfilledResult<any>).value),
    };
  }
  
  // All failed - throw error
  throw createError({
    statusCode: 500,
    statusMessage: 'All Webhooks Failed',
    message: `Failed to deliver to all ${webhookUrls.length} configured webhook(s)`,
    data: {
      attempted: webhookUrls.length,
      failures: failed.map((r, i) => ({
        url: webhookUrls[i].substring(0, 30) + '...',
        error: (r as PromiseRejectedResult).reason?.message || 'Unknown error',
      })),
    },
  });
});
