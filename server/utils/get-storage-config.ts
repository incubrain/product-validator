// server/utils/get-storage-config.ts
import type { H3Event } from 'h3';

export interface StorageConfig {
  provider: string;
  url?: string;
  secret?: string;
}

/**
 * Get storage configuration with safe defaults
 * 
 * Always call this instead of raw useRuntimeConfig() in handlers
 * to ensure fallback values are applied consistently
 */
export function getStorageConfig(event: H3Event): StorageConfig {
  const config = useRuntimeConfig(event);
  
  return {
    provider: config.storage?.provider || 'kv',
    url: config.storage?.url,
    secret: config.storage?.secret,
  };
}