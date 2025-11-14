// composables/useDevTools.ts

interface DevOverrides {
  configSource?: ConfigSource;
  validationStage?: ValidationStage;
}

export const useDevTools = () => {
  const env = useRuntimeConfig().public;

  const isClient = import.meta.client;
  const isDev = import.meta.dev;

  // SSR-safe reduced API (no access to localStorage, no lifecycle, no toast)
  if (!isClient || !isDev) {
    return {
      configSource: computed(() => env.configSource as ConfigSource),
      validationStage: computed(() => env.validationStage as ValidationStage),
      setDevOverrides: () => {},
      resetDevOverrides: () => {},
      hasActiveOverrides: computed(() => false),
      envValues: computed(() => ({
        configSource: env.configSource as ConfigSource,
        validationStage: env.validationStage as ValidationStage,
      })),
      clearAllStorage: () => {},
      logCurrentStorage: () => {},
      getStorageSnapshot: () => ({}),
    };
  }

  // Use ENV config source as prefix for dev overrides key
  const toast = useToast();
  const baseConfigSource = env.configSource as ConfigSource;
  const DEV_OVERRIDES_KEY = `${baseConfigSource}_dev_overrides`;

  // Persisted overrides are read synchronously only on client/dev in the initializer.
  // This avoids using onMounted or lifecycle hooks.
  const devOverrides = useState<DevOverrides>('dev-overrides', () => {
    try {
      const stored = localStorage.getItem(DEV_OVERRIDES_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      // corrupted localStorage or access error -> return empty
      return {};
    }
  });

  const persistOverrides = (overrides: DevOverrides) => {
    try {
      if (Object.keys(overrides).length === 0) {
        localStorage.removeItem(DEV_OVERRIDES_KEY);
      } else {
        localStorage.setItem(DEV_OVERRIDES_KEY, JSON.stringify(overrides));
      }
    } catch (error) {
      // swallow errors; dev only
      console.error('Failed to persist dev overrides:', error);
    }
  };

  // Active config source
  const configSource = computed<ConfigSource>(() => {
    if (isDev && devOverrides.value.configSource) {
      return devOverrides.value.configSource!;
    }
    return baseConfigSource;
  });

  // Active validation stage (dev override wins on client)
  const validationStage = computed<ValidationStage>(() => {
    if (isDev && devOverrides.value.validationStage) {
      return devOverrides.value.validationStage!;
    }
    return env.validationStage as ValidationStage;
  });

  const setDevOverrides = (source?: ConfigSource, stage?: ValidationStage) => {
    if (!isDev) {
      console.warn('setDevOverrides only available in development');
      return;
    }

    const changes: string[] = [];
    const newOverrides = { ...devOverrides.value };

    if (source !== undefined) {
      newOverrides.configSource = source;
      changes.push(`Config: ${source}`);
    }

    if (stage !== undefined) {
      newOverrides.validationStage = stage;
      changes.push(`Stage: ${stage}`);
    }

    devOverrides.value = newOverrides;
    persistOverrides(newOverrides);

    if (changes.length > 0) {
      // toast might be no-op if not available
      toast.add?.({
        title: 'Dev Override Active',
        description: changes.join(' | '),
        color: 'warning',
        duration: 2000,
      });
    }
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

  const hasActiveOverrides = computed(() => {
    return Object.keys(devOverrides.value).length > 0;
  });

  const envValues = computed(() => ({
    configSource: baseConfigSource,
    validationStage: env.validationStage as ValidationStage,
  }));

  // Storage helpers (client-only)
  const storagePrefix = computed(() => configSource.value);

  const getStorageSnapshot = () => {
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
          onClick: () => window.location.reload(),
        },
      ],
    });

    setTimeout(() => window.location.reload(), 3000);
  };

  const logCurrentStorage = () => {
    const snapshot = getStorageSnapshot();
    console.group('📦 Storage Snapshot');
    console.log('Base Config (ENV):', baseConfigSource);
    console.log('Active Config:', configSource.value);
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

  // Expose a global helper for dev (safe to assign on client)
  if (typeof window !== 'undefined') {
    // safe assignment, no lifecycle hooks
    // @ts-expect-error devTools extension
    window.devTools = {
      clearAll: clearAllStorage,
      logStorage: logCurrentStorage,
      snapshot: getStorageSnapshot,
      setConfig: (source: ConfigSource) => setDevOverrides(source, undefined),
      setStage: (stage: ValidationStage) => setDevOverrides(undefined, stage),
      setOverrides: setDevOverrides,
      resetOverrides: resetDevOverrides,
      status: () => {
        console.table({
          'Storage Key': DEV_OVERRIDES_KEY,
          'Config Source (ENV)': baseConfigSource,
          'Config Source (Active)': configSource.value,
          'Config Source (Override)': devOverrides.value.configSource || 'none',
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
    configSource,
    validationStage,
    setDevOverrides,
    resetDevOverrides,
    hasActiveOverrides,
    envValues,
    clearAllStorage,
    logCurrentStorage,
    getStorageSnapshot,
  };
};
