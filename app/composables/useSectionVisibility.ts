// composables/useSectionVisibility.ts
import {
  VISIBILITY_UNLOCK_STAGES,
  VISIBILITY_LOCK_STAGES,
  STAGE_ORDER,
} from '#shared/config/settings';
import type {
  SectionKey,
  LayoutKey,
  FeatureKey,
} from '#shared/config/settings';

export const useSectionVisibility = () => {
  const { validationStage } = useDevTools();

  const currentStageLevel = computed(() => STAGE_ORDER[validationStage.value]);

  /**
   * Core visibility check: Has this element unlocked yet?
   */
  const isUnlocked = (unlockStage: ValidationStage): boolean => {
    return currentStageLevel.value >= STAGE_ORDER[unlockStage];
  };

  /**
   * Check if element is locked (hidden after certain stage)
   */
  const isLocked = (lockStage?: ValidationStage): boolean => {
    if (!lockStage) return false;
    return currentStageLevel.value >= STAGE_ORDER[lockStage];
  };

  /**
   * Check if a layout component should be visible
   */
  const showLayout = (layout: LayoutKey): boolean => {
    const unlockStage = VISIBILITY_UNLOCK_STAGES.layout[layout];
    return isUnlocked(unlockStage);
  };

  /**
   * Check if a page section should be visible
   */
  const showSection = (section: SectionKey): boolean => {
    const unlockStage = VISIBILITY_UNLOCK_STAGES.sections[section];
    return isUnlocked(unlockStage);
  };

  /**
   * Check if a feature should be visible
   * Supports both unlock (show after X) and lock (hide after Y)
   */
  const showFeature = (feature: FeatureKey): boolean => {
    const unlockStage = VISIBILITY_UNLOCK_STAGES.features[feature];
    const lockStage = VISIBILITY_LOCK_STAGES.features?.[feature];

    return isUnlocked(unlockStage) && !isLocked(lockStage);
  };

  /**
   * Get all visible sections for current stage
   */
  const visibleSections = computed(() => {
    return Object.entries(VISIBILITY_UNLOCK_STAGES.sections)
      .filter(([_, unlockStage]) => isUnlocked(unlockStage))
      .map(([section]) => section as SectionKey);
  });

  return {
    // New API
    showLayout,
    showSection,
    showFeature,
    visibleSections,
  };
};
