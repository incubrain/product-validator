// composables/useSectionVisibility.ts
import { STAGE_CONFIG } from '#stage-config';

export const useSectionVisibility = () => {
  const { currentStage } = useDevTools();

  // Build stage order from config
  const stageOrder = computed(() => {
    const order: Record<string, number> = {};
    STAGE_CONFIG.stages.forEach((stage) => {
      order[stage.value] = stage.order;
    });
    return order;
  });

  const currentStageLevel = computed(() => stageOrder.value[currentStage.value] || 1);

  const isUnlocked = (unlockStage: string): boolean => {
    const unlockLevel = stageOrder.value[unlockStage];
    if (unlockLevel === undefined) return true; // Unknown stage = always show
    return currentStageLevel.value >= unlockLevel;
  };

  const isLocked = (lockStage?: string): boolean => {
    if (!lockStage) return false;
    const lockLevel = stageOrder.value[lockStage];
    if (lockLevel === undefined) return false;
    return currentStageLevel.value >= lockLevel;
  };

  const showLayout = (layout: string): boolean => {
    const unlockStage = STAGE_CONFIG.visibility?.unlock?.layout?.[layout];
    if (!unlockStage) return true;
    return isUnlocked(unlockStage);
  };

  const showSection = (section: string): boolean => {
    const unlockStage = STAGE_CONFIG.visibility?.unlock?.sections?.[section];
    if (!unlockStage) return true;
    return isUnlocked(unlockStage);
  };

  const showFeature = (feature: string): boolean => {
    const unlockStage = STAGE_CONFIG.visibility?.unlock?.features?.[feature];
    const lockStage = STAGE_CONFIG.visibility?.lock?.features?.[feature];

    if (!unlockStage) return true;
    return isUnlocked(unlockStage) && !isLocked(lockStage);
  };

  const visibleSections = computed(() => {
    const sections = STAGE_CONFIG.visibility?.unlock?.sections || {};
    return Object.entries(sections)
      .filter(([_, unlockStage]) => isUnlocked(unlockStage))
      .map(([section]) => section);
  });

  return {
    showLayout,
    showSection,
    showFeature,
    visibleSections,
    currentStage,
    stageOrder,
  };
};