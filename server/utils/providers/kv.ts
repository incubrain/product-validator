// server/utils/providers/kv.ts
import { createStorage } from 'unstorage';
import fsDriver from 'unstorage/drivers/fs-lite';
import { hash } from 'ohash';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import type { StorageProvider } from '../storage.handler';
import { nitroFunctionCacheKey, nitroHandlerCacheKey } from '../cache';

export const storage = createStorage({
  driver: fsDriver({ base: './.data' }),
});

interface EmailCapture {
  emailHash: string;
  emailEncrypted: string;
  formId: string;
  offer?: string;
  customerStage: 'email_captured' | 'feedback_submitted';
  validationStage?: ValidationStage;
  feedback?: string;
  metadata?: Record<string, any>;
  capturedAt: number;
  updatedAt: number;
}

/**
 * Get encryption key from env (must be 32 bytes for AES-256)
 */
function getEncryptionKey(): Buffer {
  const config = useRuntimeConfig();
  const secret = config.storage.secret;
  return Buffer.from(secret.padEnd(32, '0').slice(0, 32));
}

/**
 * Encrypt email
 */
function encryptEmail(email: string): string {
  const key = getEncryptionKey();
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-cbc', key, iv);

  let encrypted = cipher.update(email, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;
}

/**
 * Decrypt email
 */
function decryptEmail(encrypted: string): string {
  const key = getEncryptionKey();
  const [ivHex, encryptedHex] = encrypted.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = createDecipheriv('aes-256-cbc', key, iv);

  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

/**
 * Hash email (for key lookup)
 */
export function hashEmail(email: string): string {
  const config = useRuntimeConfig();
  const secret = config.storage.secret;
  return hash({ email, secret });
}

/**
 * Strip sensitive data from metadata
 */
function sanitizeMetadata(
  metadata?: Record<string, any>,
): Record<string, any> | undefined {
  if (!metadata) return undefined;
  const sanitized = { ...metadata };
  delete sanitized.email;
  return sanitized;
}

export const kvProvider: StorageProvider = {
  name: 'kv',

  async send({ recordId, data }) {
    try {
      const email = data.email as string;
      const emailHash = recordId ?? (email ? hashEmail(email) : null);

      if (!emailHash) {
        return {
          success: false,
          recordId: `temp_${Date.now()}`,
          error: 'Email or recordId required',
        };
      }

      const key = `leads:${emailHash}`;
      const timestamp = Date.now();

      // Check if record exists
      const existing = await storage.getItem<EmailCapture>(key);

      // Sanitize metadata
      const cleanMetadata = sanitizeMetadata(data.metadata);

      let record: EmailCapture;

      if (existing) {
        // Update existing record
        record = {
          ...existing,
          formId: data.formId ?? existing.formId,
          offer: data.offer ?? existing.offer,
          customerStage: data.customerStage ?? existing.customerStage,
          validationStage: data.validationStage ?? existing.validationStage,
          feedback: data.feedback ?? existing.feedback,
          metadata: cleanMetadata
            ? { ...existing.metadata, ...cleanMetadata }
            : existing.metadata,
          updatedAt: timestamp,
        };
      } else {
        // Create new record
        if (!email) {
          return {
            success: false,
            recordId: `temp_${Date.now()}`,
            error: 'Email required for new record',
          };
        }

        record = {
          emailHash,
          emailEncrypted: encryptEmail(email),
          formId: data.formId,
          offer: data.offer,
          customerStage: data.customerStage || 'email_captured',
          validationStage: data.validationStage,
          feedback: data.feedback,
          metadata: cleanMetadata,
          capturedAt: timestamp,
          updatedAt: timestamp,
        };
      }

      await storage.setItem(key, record);

      try {
        const cache = useStorage('cache');
        const funcKey = nitroFunctionCacheKey('metricsLeads', 'default');
        const handlerKey = nitroHandlerCacheKey('metricsLeads', 'default');

        // Invalidate both possible keys; ignore errors individually
        await cache.removeItem(funcKey).catch((e) => {
          // no-op but log at debug level
          console.debug(
            '[kvProvider] removeItem failed for funcKey',
            funcKey,
            e?.message || e,
          );
        });
        await cache.removeItem(handlerKey).catch((e) => {
          console.debug(
            '[kvProvider] removeItem failed for handlerKey',
            handlerKey,
            e?.message || e,
          );
        });

        console.log('[kvProvider] invalidated metrics cache', {
          funcKey,
          handlerKey,
        });
      } catch (err) {
        console.warn('[kvProvider] cache invalidation failed', err);
      }

      return {
        success: true,
        recordId: emailHash,
        raw: record,
      };
    } catch (err) {
      console.error('[kvProvider] Error storing data:', err);
      return {
        success: false,
        recordId: `temp_${Date.now()}`,
        error: err,
      };
    }
  },

  async authorize(email: string): Promise<{
    exists: boolean;
    customerStage?: string;
    validationStage?: ValidationStage;
  }> {
    try {
      const emailHash = hashEmail(email);
      const key = `leads:${emailHash}`;

      const record = await storage.getItem<EmailCapture>(key);

      if (!record) {
        return { exists: false };
      }

      return {
        exists: true,
        customerStage: record.customerStage,
        validationStage: record.validationStage,
      };
    } catch (error) {
      console.error('[KV Provider] Verify email error:', error);
      return { exists: false };
    }
  },
};

/**
 * Get all email captures with optional decryption
 */
export async function getAllLeads(decrypt = false): Promise<any[]> {
  const keys = await storage.getKeys('leads:');
  const records = await Promise.all(
    keys.map((key) => storage.getItem<EmailCapture>(key)),
  );

  const filtered = records.filter(Boolean) as EmailCapture[];

  if (!decrypt) {
    return filtered;
  }

  // Decrypt leads for admin view
  return filtered.map((record) => ({
    ...record,
    email: decryptEmail(record.emailEncrypted),
  }));
}

export const cachedLeadsMetrics = defineCachedFunction(
  async () => {
    try {
      const keys = await storage.getKeys('leads:');
      const totalLeads = keys.length;

      const records = await Promise.all(keys.map((k) => storage.getItem(k)));
      const filtered = records.filter(Boolean);

      const byStage = filtered.reduce(
        (acc: Record<string, number>, record: any) => {
          const stage = record.customerStage || 'unknown';
          acc[stage] = (acc[stage] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      const byForm = filtered.reduce(
        (acc: Record<string, number>, record: any) => {
          const form = record.formId || 'unknown';
          acc[form] = (acc[form] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      const byValidationStage = filtered.reduce(
        (acc: Record<string, number>, record: any) => {
          const stage = record.validationStage || 'unknown';
          acc[stage] = (acc[stage] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      return {
        total: totalLeads,
        byStage,
        byForm,
        byValidationStage,
        lastUpdated: Date.now(),
      };
    } catch (err) {
      console.error('[metrics] error computing metrics', err);
      return {
        total: 0,
        byStage: {},
        byForm: {},
        byValidationStage: {},
        lastUpdated: Date.now(),
        error: 'failed to compute metrics',
      };
    }
  },
  {
    maxAge: 60 * 10, // 10 minutes, tweak as desired
    name: 'metricsLeads',
    getKey: () => 'default',
  },
);
