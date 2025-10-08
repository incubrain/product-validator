import { defineNuxtModule, addTemplate, createResolver } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'flow-config',
    configKey: 'flowConfig',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Get config source from runtime config
    const configSource = process.env.NUXT_PUBLIC_CONFIG_SOURCE || '';

    // Map config source to file path
    const configPaths: Record<string, string> = {
      'validator': resolver.resolve(
        '../shared/config/examples/validator/1.flow.ts',
      ),
      '': resolver.resolve('../shared/config/1.flow.ts'),
    };

    const configPath = configPaths[configSource];

    if (!configPath) {
      const available = Object.keys(configPaths)
        .filter((k) => k)
        .join(', ');
      throw new Error(
        `[flow-config] Unknown config source: "${configSource}"\nAvailable: ${available}, "" (custom)`,
      );
    }

    // Add virtual module that re-exports the selected config
    addTemplate({
      filename: 'flow-config.mjs',
      getContents: () => {
        // Use relative import from .nuxt/flow-config.mjs to actual config file
        return `export { flowConfig } from '${configPath}'`;
      },
    });
  },
});
