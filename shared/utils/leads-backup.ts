import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
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

interface ExportResponse {
  count: number;
  records: LeadRecord[];
}

async function backupLeads() {
  console.log('🔍 Fetching leads from production...');

  // Get production config from env
  const prodUrl = process.env.PRODUCTION_URL;
  const prodSecret = process.env.PRODUCTION_STORAGE_SECRET;

  if (!prodUrl || !prodSecret) {
    console.error('❌ Error: Missing production configuration');
    console.error('');
    console.error('Please add to your .env file:');
    console.error('  PRODUCTION_URL=https://your-app.com');
    console.error('  PRODUCTION_STORAGE_SECRET=your-secret');
    process.exit(1);
  }

  console.log(`   URL: ${prodUrl}`);

  // Fetch leads from production
  const url = `${prodUrl}/api/v1/admin/leads?secret=${encodeURIComponent(prodSecret)}`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch (error) {
    console.error('❌ Error: Could not reach production server');
    console.error(
      `   ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
    console.error('');
    console.error(
      'Make sure PRODUCTION_URL is correct and server is accessible',
    );
    process.exit(1);
  }

  if (!response.ok) {
    console.error(`❌ Error: Server returned ${response.status}`);
    if (response.status === 401) {
      console.error('   Invalid secret. Check PRODUCTION_STORAGE_SECRET');
    }
    process.exit(1);
  }

  const data: ExportResponse = await response.json();

  if (!data.records || data.count === 0) {
    console.log('ℹ️  No leads found in production');
    console.log('✅ Safe to push');
    process.exit(0);
  }

  console.log(`✅ Found ${data.count} leads in production`);

  // Ensure backups directory exists
  const backupsDir = join(process.cwd(), 'backups');
  if (!existsSync(backupsDir)) {
    await mkdir(backupsDir, { recursive: true });
  }

  // Create timestamped filename
  const timestamp = new Date()
    .toISOString()
    .replace(/:/g, '-')
    .replace(/\..+/, '')
    .replace('T', '-');
  const filename = `leads-${timestamp}.json`;
  const filepath = join(backupsDir, filename);

  // Write backup file
  console.log(`📦 Exporting to backups/${filename}...`);
  await writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅ ${data.count} leads backed up successfully`);

  // Also create a 'latest.json' for easy reference
  const latestPath = join(backupsDir, 'latest.json');
  await writeFile(latestPath, JSON.stringify(data, null, 2), 'utf-8');

  return data.count;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  backupLeads().catch((error) => {
    console.error('❌ Export failed:', error);
    process.exit(1);
  });
}

export { backupLeads };
