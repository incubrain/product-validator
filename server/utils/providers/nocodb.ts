// server/utils/providers/nocodb.ts
import { $fetch } from 'ofetch';
import type { DatabaseProvider } from '../db.handler';

export const nocodbProvider: DatabaseProvider = {
  name: 'nocodb',

  async send({ apiUrl, apiKey, record_id, data }) {
    const method = record_id ? 'PATCH' : 'POST';
    const body = record_id ? { id: record_id, fields: data } : { fields: data };

    const res = await $fetch(apiUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'xc-token': apiKey,
      },
      body,
    });

    const recordId = String(
      res?.records?.[0]?.id ?? res?.records?.[0]?.Id ?? `temp_${Date.now()}`,
    );

    return {
      success: true,
      recordId,
      raw: res,
    };
  },
};
