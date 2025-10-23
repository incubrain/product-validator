import { z } from 'zod';
import { sendToDatabase } from '~~/server/utils/db.handler';

const eventSchema = z.object({
  record_id: z.string().optional(),
  timestamp: z.number(),
  data: z.object({
    form_id: z.string(),
    email: z.string().email().optional(),
    offer: z.string().optional(),
    customer_stage: z.enum(['email_captured', 'feedback_submitted']),
    validation_stage: z
      .enum(['fake_door', 'magnet', 'monetization'])
      .optional(),
    feedback: z.string().optional(),
    metadata: z.record(z.any()).optional(),
  }),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) {
    console.error('[Events] Validation failed:', JSON.stringify({
      errors: parsed.error.format ? parsed.error.format() : parsed.error.errors,
      received: body,
    }));

    // Return full error details (safe for dev). In prod, redact before returning.
    throw createError({
      statusCode: 400,
      message: 'Invalid event payload',
      data: parsed.error.errors,
    });
  }

  const { record_id, data } = parsed.data;
  const provider = config.db?.provider ?? 'nocodb';

  const result = await sendToDatabase(provider, {
    apiUrl: config.db?.apiUrl,
    apiKey: config.db?.secret,
    record_id,
    data,
  });

  return result;
});
