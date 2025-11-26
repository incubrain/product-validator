// server/api/v1/admin/leads.post.ts
import { storage } from '~~/server/utils/providers/kv';
import { nitroFunctionCacheKey } from '~~/server/utils/cache';

interface LeadRecord {
  emailHash: string;
  emailEncrypted: string;
  formId: string;
  offer?: string;
  customerStage: string;
  currentStage?: StageKey;
  feedback?: string;
  metadata?: Record<string, any>;
  capturedAt: number;
  updatedAt: number;
}

interface ImportRequest {
  count: number;
  records: LeadRecord[];
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  // Check authentication
  if (!query.secret) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Missing required query parameter: secret',
    });
  }

  if (query.secret !== config.storage.secret) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Invalid secret',
    });
  }

  // Get request body
  const body = await readBody<ImportRequest>(event);

  if (!body || !body.records || !Array.isArray(body.records)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid request body. Expected { count, records }',
    });
  }



  let restored = 0;
  let skipped = 0;
  const errors: string[] = [];

  // Import each record
  for (const record of body.records) {
    try {
      // Validate required fields
      if (!record.emailHash || !record.emailEncrypted || !record.formId) {
        errors.push(`Invalid record: missing required fields`);
        continue;
      }

      const key = `leads:${record.emailHash}`;

      // Check if already exists
      const existing = await storage.getItem(key);
      if (existing) {
        skipped++;
        continue;
      }

      // Remove the decrypted email field if present (from export)
      const { email, ...recordToStore } = record as LeadRecord & {
        email?: string;
      };

      // Store the record
      await storage.setItem(key, recordToStore);
      restored++;
    } catch (error) {
      console.error('[Import] Error importing record:', error);
      errors.push(
        `Failed to import ${record.emailHash}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  // Invalidate metrics cache
  try {
    const cache = useStorage('cache');
    const funcKey = nitroFunctionCacheKey('metricsLeads', 'default');
    await cache.removeItem(funcKey);
  } catch (err) {
    console.warn('[Import] Failed to invalidate cache:', err);
  }



  return {
    success: errors.length === 0,
    restored,
    skipped,
    errors,
  };
});
