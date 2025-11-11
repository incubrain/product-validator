// shared/utils/config-resolver.ts
import type { ConfigSource } from '~~/shared/types/config';

export const CONFIG_SOURCES = {
  validator: 'examples/validator/',
  custom: '',
} as const;

/**
 * Get the active config source from environment
 */
export function getActiveConfigSource(): ConfigSource {
  let source = process.env.NUXT_PUBLIC_CONFIG_SOURCE || '';

  if (import.meta.client) {
    source = useRuntimeConfig().public.configSource;
  }

  if (source && !(source in CONFIG_SOURCES)) {
    const available = Object.keys(CONFIG_SOURCES)
      .filter((k) => k !== 'custom')
      .join(', ');
    throw new Error(
      `[config-resolver] Invalid NUXT_PUBLIC_CONFIG_SOURCE: "${source}"\n` +
        `Available: ${available} or leave empty for custom config`,
    );
  }

  const resolvedSource = (source || 'custom') as ConfigSource;
  console.log(
    '[config-resolver] Resolved to:',
    resolvedSource,
    '→',
    CONFIG_SOURCES[resolvedSource],
  );

  return resolvedSource;
}

/**
 * Build a config path based on active source
 *
 * @param prefix - Path before the source (e.g., 'shared/config/')
 * @param suffix - Path after the source (e.g., '1.flow.ts' or 'updates/*.md')
 * @param resolver - If passed, uses Nuxt Kit resolver.resolve() for absolute paths
 *
 * @example
 * // Content config (relative paths)
 * resolveConfigPath({ suffix: 'updates/*.md' })
 * // NUXT_PUBLIC_CONFIG_SOURCE=validator => 'examples/validator/updates/*.md'
 * // NUXT_PUBLIC_CONFIG_SOURCE='' => 'updates/*.md'
 *
 * @example
 * // Flow config (absolute paths with resolver)
 * resolveConfigPath({
 *   prefix: '../shared/config/',
 *   suffix: '1.flow.ts',
 *   resolver
 * })
 */
export function resolveConfigPath(options: {
  prefix?: string;
  suffix?: string;
  resolver?: { resolve: (path: string) => string };
}): string {
  const { prefix = '', suffix = '', resolver } = options;
  const activeSource = getActiveConfigSource();
  const sourcePath = CONFIG_SOURCES[activeSource];

  const fullPath = `${prefix}${sourcePath}${suffix}`;

  return resolver ? resolver.resolve(fullPath) : fullPath;
}

/**
 * Remove config source prefix from content paths
 * Ensures URLs are clean regardless of source location
 *
 * @example
 * // NUXT_PUBLIC_CONFIG_SOURCE=validator
 * normalizeContentPath('/examples/validator/magnet/step-1')
 * // Returns: '/magnet/step-1'
 *
 * @example
 * // NUXT_PUBLIC_CONFIG_SOURCE=custom
 * normalizeContentPath('/magnet/step-1')
 * // Returns: '/magnet/step-1'
 */
/**
 * Normalize or add config source prefix to content paths
 *
 * @param path - The content path to transform
 * @param addPrefix - If true, adds prefix; if false (default), removes it
 *
 * @example
 * // Remove prefix (default behavior)
 * normalizeContentPath('/examples/validator/magnet/step-1')
 * // Returns: '/magnet/step-1'
 *
 * @example
 * // Add prefix
 * normalizeContentPath('/magnet/step-1', true)
 * // Returns: '/examples/validator/magnet/step-1'
 */
export function normalizeContentPath(path: string, addPrefix = true): string {
  if (path.startsWith('http')) {
    return path;
  }

  const source = getActiveConfigSource();
  const sourcePrefix = CONFIG_SOURCES[source];

  if (!sourcePrefix) {
    return path;
  }

  const prefix = `/${sourcePrefix.replace(/\/$/, '')}`;

  if (addPrefix) {
    // Add prefix if not already present
    if (!path.startsWith(prefix)) {
      return `${prefix}${path.startsWith('/') ? path : `/${path}`}`;
    }
    return path;
  }

  // Remove prefix (original behavior)
  if (path.startsWith(prefix)) {
    return path.slice(prefix.length) || '/';
  }

  return path;
}
