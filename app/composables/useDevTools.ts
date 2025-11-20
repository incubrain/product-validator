// composables/useDevTools.ts

interface DevOverrides {
  validationStage?: ValidationStage; // ✅ Remove configSource
}

const stages: ValidationStage[] = [
  'identity',
  'attention',
  'traffic',
  'conversion',
  'engagement',
  'demand',
];

export const useDevTools = () => {
  const env = useRuntimeConfig().public;
  const isClient = import.meta.client;
  const isDev = import.meta.dev;
  const configSource = env.configSource as ConfigSource; // ✅ Just read from ENV

  // SSR-safe reduced API
  if (!isClient || !isDev) {
    return {
      validationStage: computed(() => env.validationStage as ValidationStage),
      configSource,
      setDevOverrides: () => {},
      resetDevOverrides: () => {},
      cycleStage: () => {},
      hasActiveOverrides: computed(() => false),
      stages,
      envValues: computed(() => ({
        validationStage: env.validationStage as ValidationStage,
      })),
      clearAllStorage: () => {},
      logCurrentStorage: () => {},
      getStorageSnapshot: () => ({}),
    };
  }

  const toast = useToast();
  
  const DEV_OVERRIDES_KEY = `${configSource}_dev_overrides`;

  const devOverrides = useState<DevOverrides>('dev-overrides', () => {
    if (import.meta.server) return

    try {
      const stored = localStorage.getItem(DEV_OVERRIDES_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  });

  const persistOverrides = (overrides: DevOverrides) => {
    if (import.meta.server) return

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

  const validationStage = computed<ValidationStage>(() => {
    if (import.meta.server) {
      return env.validationStage as ValidationStage;
    }

    if (isDev) {
      return (
        devOverrides.value.validationStage ||
        (env.validationStage as ValidationStage)
      );
    }

    return env.validationStage as ValidationStage;
  });

  const setDevOverrides = (stage: ValidationStage) => {
    // ✅ Simplified signature
    if (!isDev) {
      console.warn('setDevOverrides only available in development');
      return;
    }

    devOverrides.value = { validationStage: stage };
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
    const currentIndex = stages.indexOf(validationStage.value);
    const nextIndex = (currentIndex + 1) % stages.length;
    setDevOverrides(stages[nextIndex]);
  };

  const hasActiveOverrides = computed(() => {
    return Object.keys(devOverrides.value).length > 0;
  });

  const envValues = computed(() => ({
    validationStage: env.validationStage as ValidationStage,
  }));

  const storagePrefix = computed(() => configSource); // ✅ Now just reads ENV

  const getStorageSnapshot = () => {
    if (import.meta.server) return

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
      description: `Cleared ${totalCleared} items (including dev overrides). Page will reload in 3 seconds.`,
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
    console.log('Config Source (ENV):', configSource);
    console.log('Active Stage:', validationStage.value);
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
      setStage: setDevOverrides, // ✅ Simplified
      cycleStage,
      resetOverrides: resetDevOverrides,
      status: () => {
        console.table({
          'Storage Key': DEV_OVERRIDES_KEY,
          'Config Source (ENV)': configSource,
          'Validation Stage (ENV)': envValues.value.validationStage,
          'Validation Stage (Active)': validationStage.value,
          'Validation Stage (Override)':
            devOverrides.value.validationStage || 'none',
          'Has Overrides': hasActiveOverrides.value,
        });
      },
    };
  }

  return {
    validationStage,
    setDevOverrides,
    resetDevOverrides,
    cycleStage,
    hasActiveOverrides,
    stages,
    configSource,
    envValues,
    clearAllStorage,
    logCurrentStorage,
    getStorageSnapshot,
  };
};
