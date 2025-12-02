import type { StageKey } from './config';

/**
 * Lead record stored in the database
 */
export interface LeadRecord {
  emailHash: string;
  emailEncrypted: string;
  formId: string;
  product?: string;
  customerStage: string;
  currentStage?: StageKey;
  feedback?: string;
  metadata?: Record<string, any>;
  capturedAt: number;
  updatedAt: number;
  email?: string;
}

/**
 * Export response from the leads API
 */
export interface ExportResponse {
  count: number;
  records: LeadRecord[];
}

/**
 * Import response from the leads API
 */
export interface ImportResponse {
  success: boolean;
  restored: number;
  skipped: number;
  errors: string[];
}

/**
 * Backup data structure
 */
export interface BackupData {
  count: number;
  records: LeadRecord[];
}
