// composables/useDevTools.ts
import { STAGE_CONFIG } from '#stage-config';

interface DevOverrides {
  stage?: StageKey;
}

export const useDevTools = () => {
  const isClient = import.meta.client;
  const isDev = import.meta.dev;

  // Get stages from dynamic config
  const stages = STAGE_CONFIG.stages.map(s => s.value);
  const defaultStage = STAGE_CONFIG.currentStage;

  // SSR-safe reduced API
  if (!isClient || !isDev) {
    return {
      currentStage: computed(() => defaultStage),
      stages,
      stageConfig: STAGE_CONFIG,
      setDevOverrides: () => {},
      resetDevOverrides: () => {},
      cycleStage: () => {},
      hasActiveOverrides: computed(() => false),
      envValues: computed(() => ({
        stage: defaultStage,
      })),
      clearAllStorage: () => {},
      getStorageSnapshot: () => ({}),
    };
  }

  const toast = useToast();
  const { local } = useAppStorage();
  const DEV_OVERRIDES_KEY = 'dev_overrides';

  const devOverrides = useState<DevOverrides>('dev-overrides', () => ({}));

  onMounted(() => {
    if (import.meta.server || !isDev) return;
    try {
      const stored = local.get(DEV_OVERRIDES_KEY);
      if (stored) {
        devOverrides.value = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load dev overrides:', e);
    }
  });

  const persistOverrides = (overrides: DevOverrides) => {
    if (import.meta.server) return;

    try {
      if (Object.keys(overrides).length === 0) {
        local.remove(DEV_OVERRIDES_KEY);
      } else {
        local.set(DEV_OVERRIDES_KEY, JSON.stringify(overrides));
      }
    } catch (error) {
      console.error('Failed to persist dev overrides:', error);
    }
  };

  const currentStage = computed<StageKey>(() => {
    if (import.meta.server) {
      return defaultStage
    }

    if (isDev && import.meta.client && devOverrides.value.stage) {
      return devOverrides.value.stage
    }

    return defaultStage
  })

  const setDevOverrides = (stage: StageKey) => {
    if (!isDev) {
      console.warn('setDevOverrides only available in development');
      return;
    }

    // Validate stage exists in config
    if (!stages.includes(stage)) {
      console.warn(`Invalid stage: ${stage}. Available: ${stages.join(', ')}`);
      return;
    }

    devOverrides.value = { stage };
    persistOverrides(devOverrides.value);
  };

  const resetDevOverrides = () => {
    if (!isDev) return;
    const hadOverrides = Object.keys(devOverrides.value).length > 0;
    devOverrides.value = {};
    persistOverrides({});

    if (hadOverrides) {
      toast.add?.({
        title: 'Overrides Reset',
        description: 'Using .env values',
        color: 'success',
        duration: 2000,
      });
    }
  };

  const cycleStage = () => {
    if (!isDev) return;
    const currentIndex = stages.indexOf(currentStage.value);
    const nextIndex = (currentIndex + 1) % stages.length;
    setDevOverrides(stages[nextIndex]);
  };

  const hasActiveOverrides = computed(() => {
    return Object.keys(devOverrides.value).length > 0;
  });

  const envValues = computed(() => ({
    stage: defaultStage,
  }));


  const getStorageSnapshot = () => {
    if (import.meta.server) return { localStorage_items: {}, sessionStorage_items: {} };

    try {
      const { local, session } = useAppStorage();
      
      // Much simpler with all() method!
      const localStorage_items = local.all();
      const sessionStorage_items = session.all();

      return { localStorage_items, sessionStorage_items };
    } catch (e) {
      return { localStorage_items: {}, sessionStorage_items: {} };
    }
  };

  const clearAllStorage = async () => {
    if (!isDev) return;
    const before = getStorageSnapshot();
    
    // Use useAppStorage clear methods to remove all prefixed items
    const { local: localStorage, session: sessionStorage } = useAppStorage();
    localStorage.clear();
    sessionStorage.clear();
    
    devOverrides.value = {};

    const after = getStorageSnapshot();
    console.info('Storage cleared:', { before, after });

    const totalCleared =
      Object.keys(before.localStorage_items).length +
      Object.keys(before.sessionStorage_items).length;

    toast.add?.({
      title: 'Development Storage Cleared',
      description: `Cleared ${totalCleared} items. Page will reload in 3 seconds.`,
      color: 'warning',
      duration: 3000,
      actions: [
        {
          label: 'Reload Now',
          onClick: () => window?.location.reload(),
        },
      ],
    });

    setTimeout(() => window?.location.reload(), 3000);
  };

  if (typeof window !== 'undefined') {
    // @ts-expect-error devTools extension
    window.devTools = {
      clearAll: clearAllStorage,
      snapshot: getStorageSnapshot,
      setStage: setDevOverrides,
      cycleStage,
      resetOverrides: resetDevOverrides,
      stages: () => console.log('Available stages:', stages),
      status: () => {
        console.table({
          'Storage Key': DEV_OVERRIDES_KEY,
          'Stage (ENV)': envValues.value.stage,
          'Stage (Active)': currentStage.value,
          'Stage (Override)': devOverrides.value.stage || 'none',
          'Has Overrides': hasActiveOverrides.value,
          'Available Stages': stages.join(', '),
        });
      },
    };
  }

  return {
    currentStage,
    stages,
    stageConfig: STAGE_CONFIG,
    setDevOverrides,
    resetDevOverrides,
    cycleStage,
    hasActiveOverrides,
    envValues,
    clearAllStorage,
    getStorageSnapshot,
  };
};