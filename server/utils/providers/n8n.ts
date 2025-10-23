// server/utils/providers/n8n.ts
import { $fetch } from 'ofetch';
import type { DatabaseProvider } from '../db.handler';

export const n8nProvider: DatabaseProvider = {
  name: 'n8n',
  async send({ apiUrl, data }) {
    try {
      // n8n webhooks don't need an API key unless you added auth
      const res = await $fetch(apiUrl, {
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
