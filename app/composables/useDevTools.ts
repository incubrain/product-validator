// composables/useDevTools.ts

export const useDevTools = () => {
  const toast = useToast();
  const storagePrefix = useRuntimeConfig().public.configSource;

  const getStorageSnapshot = () => {
    const localStorage_items = Object.keys(localStorage)
      .filter(
        (key) =>
          key.startsWith(storagePrefix) ||
          key.startsWith(`banner-${storagePrefix}`),
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
          key.startsWith(storagePrefix) ||
          key.startsWith(`banner-${storagePrefix}`),
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

    // Take snapshot before clearing
    const before = getStorageSnapshot();

    // Clear localStorage items
    Object.keys(before.localStorage_items).forEach((key) =>
      localStorage.removeItem(key),
    );

    // Clear sessionStorage items
    Object.keys(before.sessionStorage_items).forEach((key) =>
      sessionStorage.removeItem(key),
    );

    const after = getStorageSnapshot();
    console.info('Storage cleared:', { before, after });

    // Show toast with summary
    const totalCleared =
      Object.keys(before.localStorage_items).length +
      Object.keys(before.sessionStorage_items).length;

    toast.add({
      title: 'Development Storage Cleared',
      description: `Cleared ${totalCleared} items. Page will reload in 3 seconds.`,
      color: 'warning',
      duration: 3000,
      actions: [
        {
          label: 'Reload Now',
          onClick: () => window.location.reload(),
        },
      ],
    });

    // Auto-reload after toast duration
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const logCurrentStorage = () => {
    const snapshot = getStorageSnapshot();
    console.table({
      ...snapshot.localStorage_items,
      ...snapshot.sessionStorage_items,
    });

    toast.add({
      title: 'Storage Logged',
      description: 'Check console for storage contents',
      color: 'info',
      duration: 2000,
    });
  };

  // Global dev tools
  if (import.meta.dev && typeof window !== 'undefined') {
    // @ts-expect-error devTools extension
    window.devTools = {
      clearAll: clearAllStorage,
      logStorage: logCurrentStorage,
      snapshot: getStorageSnapshot,
    };
  }

  return {
    clearAllStorage,
    logCurrentStorage,
    getStorageSnapshot,
  };
};
