// server/api/v1/metrics/leads.get.ts - WITH CACHING
import { cachedLeadsMetrics } from '~~/server/utils/providers/kv';

export default defineEventHandler(async (event) => {
  // pass event to support edge-worker environments if needed
    const { provider } = getStorageConfig(event);

  if (provider !== 'kv') {
    return {
      total: 0,
      error: 'Metrics only available for KV provider'
    };
  }
  return await cachedLeadsMetrics();
});
