// shared/utils/config-resolver.ts

export const CONFIG_SOURCES = {
  validator: 'examples/validator/',
  custom: '',
} as const;

export type ConfigSource = keyof typeof CONFIG_SOURCES;

/**
 * Get the active config source from environment
 */
export function getActiveConfigSource(): ConfigSource {
  const source = process.env.NUXT_PUBLIC_CONFIG_SOURCE || '';

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
