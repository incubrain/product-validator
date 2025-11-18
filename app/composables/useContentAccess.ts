// composables/useContentAccess.ts
export type StageStatus =
  | 'published'
  | 'draft'
  | 'locked'
  | 'feature_flag'
  | 'beta'
  | 'deprecated';

export const useContentAccess = () => {
  //   const { hasCompletedStage } = useStageProgress(); // Future

  const isContentAccessible = (stage: any): boolean => {
    const status: StageStatus = stage.status || 'draft';

    switch (status) {
      case 'published':
        return true;

      case 'draft':
        return false; // Today: hard-blocked
      // Tomorrow: return isDev || hasAdminAccess()

      case 'locked':
        return false; // Today: hard-blocked
      // Tomorrow: return hasCompletedPreviousStage(stage.order)

      case 'feature_flag':
        return false; // Today: hard-blocked
      // Tomorrow: return useFeatureFlag(stage.featureFlagKey)

      case 'beta':
        return false; // Today: hard-blocked
      // Tomorrow: return hasBetaAccess()

      case 'deprecated':
        return true; // Still accessible, just warn user

      default:
        return false;
    }
  };

  const getContentLabel = (stage: any): string | undefined => {
    const status: StageStatus = stage.status || 'draft';

    switch (status) {
      case 'draft':
        return 'Coming Soon';
      case 'locked':
        return 'Locked';
      case 'beta':
        return 'Beta';
      case 'deprecated':
        return 'Deprecated';
      default:
        return undefined;
    }
  };

  const getContentVariant = (stage: any): 'info' | 'warning' | 'neutral' => {
    const status: StageStatus = stage.status || 'draft';

    switch (status) {
      case 'draft':
        return 'neutral';
      case 'locked':
        return 'warning';
      case 'beta':
        return 'info';
      case 'deprecated':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  return {
    isContentAccessible,
    getContentLabel,
    getContentVariant,
  };
};
