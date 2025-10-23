// server/utils/db-handler.ts
import { nocodbProvider } from './providers/nocodb';
import { n8nProvider } from './providers/n8n';

export interface ProviderParams {
  apiUrl: string;
  apiKey: string;
  record_id?: string;
  data: Record<string, any>;
}

export interface ProviderResult {
  success: boolean;
  recordId: string;
  raw?: any;
  error?: any;
}

export interface DatabaseProvider {
  name: string;
  send(params: ProviderParams): Promise<ProviderResult>;
}

const providers: Record<string, DatabaseProvider> = {
  nocodb: nocodbProvider,
  n8n: n8nProvider,
  // future: airtable, baserow, zapier, etc.
};

/**
 * Universal handler that delegates to the right provider
 */
export async function sendToDatabase(
  providerName: string,
  params: ProviderParams,
): Promise<ProviderResult> {
  const provider = providers[providerName];

  if (!provider) {
    console.warn(`[DBHandler] Unknown provider: ${providerName}`);
    return { success: false, recordId: `temp_${Date.now()}` };
  }

  try {
    return await provider.send(params);
  } catch (err) {
    console.error(`[DBHandler] ${providerName} failed:`, err);
    return { success: false, recordId: `temp_${Date.now()}`, error: err };
  }
}
