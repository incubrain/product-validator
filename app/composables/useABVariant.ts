// composables/useABVariant.ts
import type { ActionVariant } from '#shared/config/actions';

const STORAGE_PREFIX = 'nuxt_launch_kit';

export const useABVariant = () => {
    const userVariants = useLocalStorage(`${STORAGE_PREFIX}_ab_variants`, {} as Record<string, string>)


  const selectVariant = (
    configId: string,
    variants: ActionVariant[],
  ): ActionVariant => {
    // Return consistent variant for returning users
    if (userVariants.value[configId]) {
      const existing = variants.find(
        (v) => v.id === userVariants.value[configId],
      );
      if (existing) return existing;
    }

    // Simple random selection for new users
    const selected = variants[Math.floor(Math.random() * variants.length)];
    userVariants.value[configId] = selected.id;

    return selected;
  };

  const getCurrentVariant = (configId: string): string | null => {
    return userVariants.value[configId] || null;
  };

  return { selectVariant, getCurrentVariant };
};
