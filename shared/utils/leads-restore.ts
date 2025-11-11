import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import * as readline from 'readline';
import type { ValidationStage } from '~~/shared/types/config';

interface LeadRecord {
  emailHash: string;
  emailEncrypted: string;
  formId: string;
  offer?: string;
  customerStage: string;
  validationStage?: ValidationStage;
  feedback?: string;
  metadata?: Record<string, any>;
  capturedAt: number;
  updatedAt: number;
  email?: string;
}

interface BackupData {
  count: number;
  records: LeadRecord[];
}

interface ImportResponse {
  success: boolean;
  restored: number;
  skipped: number;
  errors: string[];
}

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function question(rl: readline.Interface, query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function findLatestBackup(): Promise<string | null> {
  const backupsDir = join(process.cwd(), 'backups');

  try {
    const files = await readdir(backupsDir);
    const backupFiles = files
      .filter((f) => f.startsWith('leads-') && f.endsWith('.json'))
      .sort()
      .reverse();

    return backupFiles.length > 0 ? join(backupsDir, backupFiles[0]) : null;
  } catch {
    return null;
  }
}

async function restoreLeads() {
  console.log('🔍 Looking for latest backup...');

  const backupPath = await findLatestBackup();

  if (!backupPath) {
    console.error('❌ No backup files found in backups/ directory');
    console.error('   Run: npm run export-leads');
    process.exit(1);
  }

  // Read backup file
  const backupContent = await readFile(backupPath, 'utf-8');
  const data: BackupData = JSON.parse(backupContent);

  console.log(`✅ Found: ${backupPath.split('/').pop()} (${data.count} leads)`);
  console.log('');

  // Get config
  const prodUrl = process.env.PRODUCTION_URL;
  const prodSecret = process.env.PRODUCTION_STORAGE_SECRET;
  const localUrl = 'http://localhost:3000';

  if (!prodUrl || !prodSecret) {
    console.error('❌ Error: Missing production configuration');
    console.error('');
    console.error('Please add to your .env file:');
    console.error('  PRODUCTION_URL=https://your-app.com');
    console.error('  PRODUCTION_STORAGE_SECRET=your-secret');
    process.exit(1);
  }

  const rl = createInterface();

  console.log('Where to restore?');
  console.log(`  1. Production (${prodUrl})`);
  console.log(`  2. Local dev (${localUrl})`);
  console.log('');

  const choice = await question(rl, 'Select (1/2): ');

  let targetUrl: string;
  let targetSecret: string;

  if (choice === '1') {
    targetUrl = prodUrl;
    targetSecret = prodSecret;
  } else if (choice === '2') {
    targetUrl = localUrl;
    targetSecret = prodSecret; // Use same secret for local
  } else {
    console.error('❌ Invalid choice');
    rl.close();
    process.exit(1);
  }

  console.log('');
  console.log(`📦 Restoring ${data.count} leads to ${targetUrl}...`);

  const url = `${targetUrl}/api/v1/admin/leads?secret=${encodeURIComponent(targetSecret)}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('❌ Error: Could not reach server');
    console.error(
      `   ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
    rl.close();
    process.exit(1);
  }

  if (!response.ok) {
    console.error(`❌ Error: Server returned ${response.status}`);
    if (response.status === 401) {
      console.error('   Invalid secret');
    }
    rl.close();
    process.exit(1);
  }

  const result: ImportResponse = await response.json();

  if (result.success) {
    console.log(`✅ Successfully restored ${result.restored} leads`);
    if (result.skipped > 0) {
      console.log(`ℹ️  Skipped ${result.skipped} duplicate leads`);
    }
  } else {
    console.error('❌ Restore failed');
    if (result.errors.length > 0) {
      console.error('Errors:');
      result.errors.forEach((err) => console.error(`  - ${err}`));
    }
  }

  rl.close();
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  restoreLeads().catch((error) => {
    console.error('❌ Restore failed:', error);
    process.exit(1);
  });
}

export { restoreLeads };
