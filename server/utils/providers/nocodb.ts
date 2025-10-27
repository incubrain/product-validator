// server/utils/providers/nocodb.ts
import { $fetch } from 'ofetch';
import type { StorageProvider } from '../storage.handler';

export const nocodbProvider: StorageProvider = {
  name: 'nocodb',

  async send({ storageUrl, storageSecret, recordId, data }) {
    const method = recordId ? 'PATCH' : 'POST';
    const body = recordId ? { id: recordId, fields: data } : { fields: data };

    const res = await $fetch(storageUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'xc-token': storageSecret,
      },
      body,
    });

    const newRecordId = String(
      res?.records?.[0]?.id ?? res?.records?.[0]?.Id ?? `temp_${Date.now()}`,
    );

    return {
      success: true,
      recordId: newRecordId,
      raw: res,
    };
  },
};
