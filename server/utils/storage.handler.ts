// server/utils/storage-handler.ts (renamed from db-handler.ts)
import { nocodbProvider } from './providers/nocodb';
import { n8nProvider } from './providers/n8n';
import { kvProvider } from './providers/kv';

export interface ProviderParams {
  storageUrl?: string;
  storageSecret?: string;
  recordId?: string;
  data: Record<string, any>;
}

export interface ProviderResult {
  success: boolean;
  recordId: string;
  raw?: any;
  error?: any;
}

export interface AuthorizeResult {
  exists: boolean;
  customerStage?: string;
  validationStage?: string;
}

export interface StorageProvider {
  name: string;
  send(params: ProviderParams): Promise<ProviderResult>;
  authorize?(email: string): Promise<AuthorizeResult>; // ← Optional method
}

const providers: Record<string, StorageProvider> = {
  kv: kvProvider,
  nocodb: nocodbProvider,
  n8n: n8nProvider,
  // future: airtable, baserow, zapier, supabase, etc.
};

/**
 * Universal handler that delegates to the right provider
 */
export async function storeData(
  providerName: string,
  params: ProviderParams,
): Promise<ProviderResult> {
  const provider = providers[providerName];

  if (!provider) {
    console.warn(`[StorageHandler] Unknown provider: ${providerName}`);
    return { success: false, recordId: `temp_${Date.now()}` };
  }

  try {
    return await provider.send(params);
  } catch (err) {
    console.error(`[StorageHandler] ${providerName} failed:`, err);
    return { success: false, recordId: `temp_${Date.now()}`, error: err };
  }
}

/**
 * Universal authorization handler
 * Checks if email exists in storage provider
 */
export async function authorizeEmail(
  providerName: string,
  email: string,
): Promise<AuthorizeResult> {
  const provider = providers[providerName];

  if (!provider) {
    console.warn(`[StorageHandler] Unknown provider: ${providerName}`);
    return { exists: false };
  }

  if (!provider.authorize) {
    console.warn(
      `[StorageHandler] ${providerName} does not support authorization`,
    );
    return { exists: false };
  }

  try {
    return await provider.authorize(email);
  } catch (err) {
    console.error(`[StorageHandler] ${providerName} authorize failed:`, err);
    return { exists: false };
  }
}
