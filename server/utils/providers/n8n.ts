// server/utils/providers/n8n.ts
import { $fetch } from 'ofetch';
import type { StorageProvider } from '../storage.handler';

export const n8nProvider: StorageProvider = {
  name: 'n8n',
  async send({ storageUrl, data }) {
    try {
      // n8n webhooks don't need an API key unless you added auth
      const res = await $fetch(storageUrl, {
        method: 'POST',
        body: data,
      });

      // The response will depend on your n8n workflow,
      // but we can normalize it here.
      return {
        success: true,
        recordId: res?.id ?? `n8n_${Date.now()}`,
        raw: res,
      };
    } catch (err) {
      console.error('[n8nProvider] Error sending data:', err);
      return { success: false, recordId: `temp_${Date.now()}`, error: err };
    }
  },
};
