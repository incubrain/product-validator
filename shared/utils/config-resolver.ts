// shared/utils/config-resolver.ts
import path from 'node:path';
import type { ConfigSource } from '~~/shared/types/config';

export interface ConfigPaths {
  /** The config source name: 'validator' | 'founder-funnel' | 'root' */
  source: ConfigSource;
  /** Relative prefix path for examples (e.g., 'examples/validator') or empty string for root */
  prefix: string;
  /** Absolute path to the public directory */
  publicDir: string;
  /** Absolute path to the content directory */
  contentDir: string;
  /** Absolute path to the config directory */
  configDir: string;
}

/**
 * Get active configuration paths
 * 
 * Determines which example configuration to use based on NUXT_PUBLIC_CONFIG_SOURCE
 * and returns ready-to-use absolute paths for all config-related directories.
 * 
 * @returns Configuration object with source name and absolute paths
 * 
 * @example
 * ```ts
 * // .env: NUXT_PUBLIC_CONFIG_SOURCE="validator"
 * const config = getActiveConfigSource();
 * // Returns: {
 * //   source: 'validator',
 * //   prefix: 'examples/validator',
 * //   publicDir: '/absolute/path/to/examples/validator/public',
 * //   contentDir: '/absolute/path/to/examples/validator/content',
 * //   configDir: '/absolute/path/to/examples/validator/config',
 * // }
 * ```
 */
export function getActiveConfigSource(): ConfigPaths {
  let source = process.env.NUXT_PUBLIC_CONFIG_SOURCE || '';

  if (import.meta.client) {
    source = useRuntimeConfig().public.configSource;
  }

  const resolvedSource = (source || 'root') as ConfigSource;
  const prefix = resolvedSource === 'root' ? '' : `examples/${resolvedSource}`;
  const cwd = process.cwd();

  // Construct absolute paths
  const basePath = resolvedSource === 'root' ? cwd : path.resolve(cwd, prefix);
  
  const config: ConfigPaths = {
    source: resolvedSource,
    prefix,
    publicDir: resolvedSource === 'root' ? 'public' : path.resolve(cwd, prefix, 'public'),
    contentDir: path.resolve(basePath, 'content'),
    configDir: path.resolve(basePath, 'config'),
  };

  console.log('[config-resolver] Resolved to:', {
    source: config.source,
    prefix: config.prefix,
  });

  return config;
}
