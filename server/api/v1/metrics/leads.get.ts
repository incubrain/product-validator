// server/api/v1/metrics/leads.get.ts - WITH CACHING
import { cachedLeadsMetrics } from '~~/server/utils/providers/kv';

export default defineEventHandler(async () => {
  // pass event to support edge-worker environments if needed
  return await cachedLeadsMetrics();
});
