// composables/useSectionVisibility.ts
import { flowConfig } from '#build/flow-config.mjs';

export const useSectionVisibility = () => {
  const config = useRuntimeConfig().public;
  const currentStage = config.validationStage as ValidationStage;

  const stageOrder: Record<ValidationStage, number> = {
    attention: 1,
    conversion: 2,
    engagement: 3,
    demand: 4,
    build_prep: 5,
  };

  const currentLevel = stageOrder[currentStage];

  /**
   * Check if section should be visible
   */
  const show = (sectionKey: keyof typeof flowConfig): boolean => {
    const section = flowConfig[sectionKey];

    if (section.enabled === false) return false;

    const minLevel = stageOrder[section.minStage || 'attention'];
    return currentLevel >= minLevel;
  };

  /**
   * Check if we've reached (or passed) a specific stage
   */
  const reachedStage = (stage: ValidationStage): boolean => {
    return currentLevel >= stageOrder[stage];
  };

  /**
   * Check if we've reached (or passed) a specific stage
   */
  const isStage = (stage: ValidationStage): boolean => {
    return currentLevel === stageOrder[stage];
  };

  return { show, reachedStage, isStage };
};
