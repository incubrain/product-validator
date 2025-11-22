// composables/useDevTools.ts
import { STAGE_CONFIG } from '#stage-config';

interface DevOverrides {
  stage?: StageKey;
}

export const useDevTools = () => {
  const env = useRuntimeConfig().public;
  const isClient = import.meta.client;
  const isDev = import.meta.dev;
  const configSource = env.configSource as ConfigSource;

  // Get stages from dynamic config
  const stages = STAGE_CONFIG.stages.map(s => s.value);
  const defaultStage = STAGE_CONFIG.currentStage;

  // SSR-safe reduced API
  if (!isClient || !isDev) {
    return {
      currentStage: computed(() => defaultStage),
      configSource,
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
      logCurrentStorage: () => {},
      getStorageSnapshot: () => ({}),
    };
  }

  const toast = useToast();
  const DEV_OVERRIDES_KEY = `${configSource}_dev_overrides`;

  const devOverrides = useState<DevOverrides>('dev-overrides', () => {
    if (import.meta.server) return {};

    try {
      const stored = localStorage.getItem(DEV_OVERRIDES_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  });

  const persistOverrides = (overrides: DevOverrides) => {
    if (import.meta.server) return;

    try {
      if (Object.keys(overrides).length === 0) {
        localStorage.removeItem(DEV_OVERRIDES_KEY);
      } else {
        localStorage.setItem(DEV_OVERRIDES_KEY, JSON.stringify(overrides));
      }
    } catch (error) {
      console.error('Failed to persist dev overrides:', error);
    }
  };

  const currentStage = computed<StageKey>(() => {
    if (import.meta.server) {
      return defaultStage;
    }

    if (isDev && devOverrides.value.stage) {
      return devOverrides.value.stage;
    }

    return defaultStage;
  });

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

  const storagePrefix = computed(() => configSource);

  const getStorageSnapshot = () => {
    if (import.meta.server) return { localStorage_items: {}, sessionStorage_items: {} };

    try {
      const localStorage_items = Object.keys(localStorage)
        .filter(
          (key) =>
            key.startsWith(storagePrefix.value) ||
            key.startsWith(`banner-${storagePrefix.value}`) ||
            key === DEV_OVERRIDES_KEY,
        )
        .reduce(
          (acc, key) => {
            acc[key] = localStorage.getItem(key);
            return acc;
          },
          {} as Record<string, string | null>,
        );

      const sessionStorage_items = Object.keys(sessionStorage)
        .filter(
          (key) =>
            key.startsWith(storagePrefix.value) ||
            key.startsWith(`banner-${storagePrefix.value}`),
        )
        .reduce(
          (acc, key) => {
            acc[key] = sessionStorage.getItem(key);
            return acc;
          },
          {} as Record<string, string | null>,
        );

      return { localStorage_items, sessionStorage_items };
    } catch (e) {
      return { localStorage_items: {}, sessionStorage_items: {} };
    }
  };

  const clearAllStorage = () => {
    if (!isDev) return;
    const before = getStorageSnapshot();
    Object.keys(before.localStorage_items).forEach((k) =>
      localStorage.removeItem(k),
    );
    Object.keys(before.sessionStorage_items).forEach((k) =>
      sessionStorage.removeItem(k),
    );
    devOverrides.value = {};
    persistOverrides({});

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

  const logCurrentStorage = () => {
    const snapshot = getStorageSnapshot();
    console.group('📦 Storage Snapshot');
    console.log('Config Source:', configSource);
    console.log('Active Stage:', currentStage.value);
    console.log('Available Stages:', stages);
    console.log('Dev Overrides Key:', DEV_OVERRIDES_KEY);
    console.table({
      ...snapshot.localStorage_items,
      ...snapshot.sessionStorage_items,
    });
    console.groupEnd();

    toast.add?.({
      title: 'Storage Logged',
      description: 'Check console for storage contents',
      color: 'info',
      duration: 2000,
    });
  };

  if (typeof window !== 'undefined') {
    // @ts-expect-error devTools extension
    window.devTools = {
      clearAll: clearAllStorage,
      logStorage: logCurrentStorage,
      snapshot: getStorageSnapshot,
      setStage: setDevOverrides,
      cycleStage,
      resetOverrides: resetDevOverrides,
      stages: () => console.log('Available stages:', stages),
      status: () => {
        console.table({
          'Storage Key': DEV_OVERRIDES_KEY,
          'Config Source': configSource,
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
    configSource,
    envValues,
    clearAllStorage,
    logCurrentStorage,
    getStorageSnapshot,
  };
};