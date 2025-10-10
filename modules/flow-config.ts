import { defineNuxtModule, addTemplate, createResolver } from '@nuxt/kit';
import { resolveConfigPath } from '../shared/utils/config-resolver';

export default defineNuxtModule({
  meta: {
    name: 'flow-config',
    configKey: 'flowConfig',
  },
  setup() {
    const resolver = createResolver(import.meta.url);

    const configPath = resolveConfigPath({
      prefix: '../shared/config/',
      suffix: '1.flow.ts',
      resolver,
    });

    console.log('CONFIG_PATH', configPath);

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
