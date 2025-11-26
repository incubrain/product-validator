// shared/utils/config-resolver.ts
import type { ConfigSource } from '~~/shared/types/config';

export const CONFIG_SOURCES = {
  validator: 'examples/validator/',
  'founder-funnel': 'examples/founder-funnel/',
  root: '',
} as const;

/**
 * Get the active config source from environment
 * 
 * Determines which example configuration to use based on NUXT_PUBLIC_CONFIG_SOURCE.
 * Falls back to 'root' if no source is specified.
 * 
 * @returns The resolved config source ('validator', 'founder-funnel', or 'root')
 * @throws {Error} If an invalid config source is specified
 * 
 * @example
 * ```ts
 * // .env: NUXT_PUBLIC_CONFIG_SOURCE="validator"
 * const source = getActiveConfigSource();
 * // Returns: 'validator'
 * ```
 */
export function getActiveConfigSource(): ConfigSource {
  let source = process.env.NUXT_PUBLIC_CONFIG_SOURCE || '';

  if (import.meta.client) {
    source = useRuntimeConfig().public.configSource;
  }

  if (source && !(source in CONFIG_SOURCES)) {
    const available = Object.keys(CONFIG_SOURCES)
      .filter((k) => k !== 'root')
      .join(', ');
    throw new Error(
      `[config-resolver] Invalid NUXT_PUBLIC_CONFIG_SOURCE: "${source}"\n` +
        `Available: ${available} or leave empty for root config`,
    );
  }

  const resolvedSource = (source || 'root') as ConfigSource;
  console.log(
    '[config-resolver] Resolved to:',
    resolvedSource,
    '→',
    CONFIG_SOURCES[resolvedSource],
  );

  return resolvedSource;
}
