// composables/useAppStorage.ts
/**
 * Centralized storage abstraction with configSource prefix
 * Enables future migration to database storage with minimal changes
 */
export const useAppStorage = () => {
  const config = useRuntimeConfig();
  const prefix = config.public.configSource;

  /**
   * Get prefixed storage key
   */
  const getKey = (key: string): string => {
    return `${prefix}_${key}`;
  };

  /**
   * localStorage operations (SSR-safe)
   */
  const local = {
    get: (key: string): string | null => {
      if (import.meta.server) return null;
      return localStorage.getItem(getKey(key));
    },

    set: (key: string, value: string): void => {
      if (import.meta.server) return;
      localStorage.setItem(getKey(key), value);
    },

    remove: (key: string): void => {
      if (import.meta.server) return;
      localStorage.removeItem(getKey(key));
    },
  };

  /**
   * sessionStorage operations (SSR-safe)
   */
  const session = {
    get: (key: string): string | null => {
      if (import.meta.server) return null;
      return sessionStorage.getItem(getKey(key));
    },

    set: (key: string, value: string): void => {
      if (import.meta.server) return;
      sessionStorage.setItem(getKey(key), value);
    },

    remove: (key: string): void => {
      if (import.meta.server) return;
      sessionStorage.removeItem(getKey(key));
    },
  };

  return { local, session, getKey };
};
