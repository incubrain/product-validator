// server/api/v1/admin/leads.get.ts
import { getAllLeads } from '~~/server/utils/providers/kv';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  // Check if secret is provided
  if (!query.secret) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Missing required query parameter: secret',
    });
  }

  // Check if secret is correct
  if (query.secret !== config.storage.secret) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Invalid secret. Add ?secret=YOUR_SECRET to the URL',
    });
  }

  // Decrypt emails when authorized
  const records = await getAllLeads(true);

  // Sort by most recent first
  const sorted = records.sort((a, b) => b.capturedAt - a.capturedAt);

  return {
    count: sorted.length,
    records: sorted,
  };
});
