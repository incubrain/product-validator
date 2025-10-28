// server/api/v1/events.post.ts
import { z } from 'zod';
import { storeData } from '~~/server/utils/storage.handler';

const eventSchema = z.object({
  recordId: z.string().optional(),
  timestamp: z.number(),
  data: z.object({
    formId: z.string(),
    email: z.string().email().optional(),
    offer: z.string().optional(),
    customerStage: z.enum(['email_captured', 'feedback_submitted']),
    validationStage: z
      .enum(['attention', 'conversion', 'engagement', 'demand', 'build_prep'])
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
    console.error('[Events] Validation failed:', parsed.error.errors);
    throw createError({
      statusCode: 400,
      message: 'Invalid event payload',
      data: parsed.error.errors,
    });
  }

  const { recordId, data } = parsed.data;

  // Default to KV storage, but allow override via env
  const provider = config.storage?.provider ?? 'kv';

  const result = await storeData(provider, {
    storageUrl: config.storage?.url,
    storageSecret: config.storage?.secret,
    recordId,
    data,
  });

  return result;
});
