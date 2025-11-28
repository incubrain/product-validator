// composables/useContentUnlock.ts
export type StageStatus =
  | 'published'
  | 'draft'
  | 'locked'
  | 'feature_flag'
  | 'beta'
  | 'deprecated';

export const useContentUnlock = () => {
  const isContentAccessible = (stage: any): boolean => {
    const status: StageStatus = stage.status;

    switch (status) {
      case 'published':
        return true;
      case 'draft':
        return false;
      case 'locked':
        return false;
      case 'feature_flag':
        return false;
      case 'beta':
        return false;
      case 'deprecated':
        return true;
      default:
        return false;
    }
  };

  const getContentLabel = (stage: any): string | undefined => {
    const status: StageStatus = stage.status;

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
    const status: StageStatus = stage.status;

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

  // ✅ NEW: Get status icon
  const getContentIcon = (stage: any): string | undefined => {
    const status: StageStatus = stage.status;

    console.log('Getting icon for status:', status, stage);

    switch (status) {
      case 'draft':
        return 'i-lucide-clock';
      case 'locked':
        return 'i-lucide-lock';
      case 'beta':
        return 'i-lucide-flask-conical';
      case 'deprecated':
        return 'i-lucide-alert-triangle';
      case 'feature_flag':
        return 'i-lucide-flag';
      default:
        return undefined;
    }
  };

  // ✅ NEW: Get icon color
  const getContentIconColor = (stage: any): string => {
    const status: StageStatus = stage.status;

    switch (status) {
      case 'draft':
        return 'text-muted';
      case 'locked':
        return 'text-warning';
      case 'beta':
        return 'text-info';
      case 'deprecated':
        return 'text-error';
      case 'feature_flag':
        return 'text-primary';
      default:
        return 'text-muted';
    }
  };

  return {
    isContentAccessible,
    getContentLabel,
    getContentVariant,
    getContentIcon,
    getContentIconColor,
  };
};
