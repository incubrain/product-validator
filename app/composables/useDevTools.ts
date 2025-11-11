// composables/useDevTools.ts

interface DevOverrides {
  configSource?: ConfigSource;
  validationStage?: ValidationStage;
}

export const useDevTools = () => {
  const toast = useToast();
  const runtimeConfig = useRuntimeConfig();

  // Use ENV config source as prefix for dev overrides key
  const baseConfigSource = runtimeConfig.public.configSource as ConfigSource;
  const DEV_OVERRIDES_KEY = `${baseConfigSource}_dev_overrides`;

  // ========================================
  // PERSISTENT DEV OVERRIDES
  // ========================================

  // Load persisted overrides from localStorage
  const loadPersistedOverrides = (): DevOverrides => {
    if (!import.meta.client || !import.meta.dev) return {};

    try {
      const stored = localStorage.getItem(DEV_OVERRIDES_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load dev overrides:', error);
      return {};
    }
  };

  // Save overrides to localStorage
  const persistOverrides = (overrides: DevOverrides) => {
    if (!import.meta.client || !import.meta.dev) return;

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

  // Initialize state (empty during SSR)
  const devOverrides = useState<DevOverrides>('dev-overrides', () => ({}));

  // ✅ FIX: Load from localStorage after client mount
  if (import.meta.client && import.meta.dev) {
    onMounted(() => {
      const persisted = loadPersistedOverrides();
      if (Object.keys(persisted).length > 0) {
        devOverrides.value = persisted;
        console.info('Dev overrides loaded:', persisted);
      }
    });
  }

  // Active config source
  const configSource = computed<ConfigSource>(() => {
    if (import.meta.dev && devOverrides.value.configSource) {
      return devOverrides.value.configSource;
    }
    return baseConfigSource;
  });

  // Active validation stage
  const validationStage = computed<ValidationStage>(() => {
    if (import.meta.dev && devOverrides.value.validationStage) {
      return devOverrides.value.validationStage;
    }
    return runtimeConfig.public.validationStage as ValidationStage;
  });

  // Set dev overrides and persist
  const setDevOverrides = (source?: ConfigSource, stage?: ValidationStage) => {
    if (!import.meta.dev) {
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
      toast.add({
        title: 'Dev Override Active',
        description: changes.join(' | '),
        color: 'warning',
        duration: 2000,
      });
    }
  };

  // Reset all dev overrides
  const resetDevOverrides = () => {
    if (!import.meta.dev) {
      console.warn('resetDevOverrides only available in development');
      return;
    }

    const hadOverrides = Object.keys(devOverrides.value).length > 0;

    devOverrides.value = {};
    persistOverrides({});

    if (hadOverrides) {
      toast.add({
        title: 'Overrides Reset',
        description: 'Using .env values',
        color: 'success',
        duration: 2000,
      });
    }
  };

  // Check if any overrides are active
  const hasActiveOverrides = computed(() => {
    if (!import.meta.dev) return false;
    return Object.keys(devOverrides.value).length > 0;
  });

  // Get original .env values
  const envValues = computed(() => ({
    configSource: baseConfigSource,
    validationStage: runtimeConfig.public.validationStage as ValidationStage,
  }));

  // ========================================
  // STORAGE MANAGEMENT
  // ========================================

  const storagePrefix = computed(() => configSource.value);

  const getStorageSnapshot = () => {
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
  };

  const clearAllStorage = () => {
    if (!import.meta.dev) {
      console.warn('clearAllStorage only available in development');
      return;
    }

    const before = getStorageSnapshot();

    Object.keys(before.localStorage_items).forEach((key) =>
      localStorage.removeItem(key),
    );

    Object.keys(before.sessionStorage_items).forEach((key) =>
      sessionStorage.removeItem(key),
    );

    devOverrides.value = {};

    const after = getStorageSnapshot();
    console.info('Storage cleared:', { before, after });

    const totalCleared =
      Object.keys(before.localStorage_items).length +
      Object.keys(before.sessionStorage_items).length;

    toast.add({
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

    setTimeout(() => {
      window.location.reload();
    }, 3000);
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

    toast.add({
      title: 'Storage Logged',
      description: 'Check console for storage contents',
      color: 'info',
      duration: 2000,
    });
  };

  // ========================================
  // GLOBAL DEV TOOLS
  // ========================================

  if (import.meta.dev && typeof window !== 'undefined') {
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
