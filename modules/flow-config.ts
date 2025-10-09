import { defineNuxtModule, addTemplate, createResolver } from '@nuxt/kit';
import { getConfigPath } from '../shared/utils/config-resolver';

export default defineNuxtModule({
  meta: {
    name: 'flow-config',
    configKey: 'flowConfig',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    const configPath = getConfigPath({
      prefix: '../shared/config/',
      suffix: '1.flow.ts',
      resolver,
    });

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
