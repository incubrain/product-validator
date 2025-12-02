// server/api/v1/events.post.ts
import { z } from 'zod';
import { storeData } from '~~/server/utils/storage.handler';

const eventSchema = z.object({
  timestamp: z.number(),
  data: z.object({
    formId: z.string(),
    email: z.string().email().optional(),
    productId: z.string().optional(),
    currentStage: z.string().optional(),
    metadata: z.record(z.any()).optional(),
  }),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parsed = eventSchema.safeParse(body);

  if (!parsed.success) {
    console.error('[Events] Validation failed:', parsed.error.errors);
    throw createError({
      statusCode: 400,
      message: 'Invalid event payload',
      data: parsed.error.errors,
    });
  }

  const { data } = parsed.data;
  const { provider, url, secret } = getStorageConfig(event);

  const result = await storeData(provider, {
    storageUrl: url,
    storageSecret: secret,
    data,
  });

  return result;
});
