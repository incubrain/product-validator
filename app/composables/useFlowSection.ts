// app/composables/useFlowSection.ts
let cachedConfig: FlowConfig | null = null;

const CONFIG_SOURCES = {
  'validator': () => import('#shared/config/examples/validator/1.flow'),
  '': () => import('#shared/config/1.flow'),
} as const;

async function loadFlowConfig(): Promise<FlowConfig> {
  if (cachedConfig) return cachedConfig;

  const configSource = useRuntimeConfig().public
    .configSource as keyof typeof CONFIG_SOURCES;
  const loader = CONFIG_SOURCES[configSource];

  if (!loader) {
    const available = Object.keys(CONFIG_SOURCES)
      .filter((k) => k)
      .join(', ');
    throw new Error(
      `Unknown config source: "${configSource}"\nAvailable: ${available}, "" (custom)`,
    );
  }

  const module = await loader();
  cachedConfig = module.flowConfig;
  return cachedConfig;
}

export async function useFlowSection<K extends keyof FlowConfig>(
  key: K,
): Promise<FlowConfig[K]> {
  const config = await loadFlowConfig();
  return config[key];
}

export async function useFlowOffer(offerId: OfferID) {
  const offer = await useFlowSection('offer');
  return computed(() => offer?.items.find((offer) => offer.id === offerId));
}

// For plugin
export { loadFlowConfig };
