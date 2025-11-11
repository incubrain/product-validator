// composables/useSectionVisibility.ts
import { flowConfig } from '#build/flow-config.mjs';

export const useSectionVisibility = () => {
  const { validationStage } = useDevTools()

  const stageOrder: Record<ValidationStage, number> = {
    identity: 1,
    attention: 2,
    traffic: 3,
    conversion: 4,
    engagement: 5,
    demand: 6,
    build_prep: 7,
  };

  const currentLevel = computed(() => stageOrder[validationStage.value]);

  /**
   * Check if section should be visible
   */
  const show = (sectionKey: keyof typeof flowConfig): boolean => {
    const section = flowConfig[sectionKey];

    if (section.enabled === false) return false;

    const minLevel = stageOrder[section.minStage || 'identity'];
    return currentLevel.value >= minLevel;
  };

  /**
   * Check if we've reached (or passed) a specific stage
   */
  const reachedStage = (stage: ValidationStage): boolean => {
    return currentLevel.value >= stageOrder[stage];
  };

  /**
   * Check if we've reached (or passed) a specific stage
   */
  const isStage = (stage: ValidationStage): boolean => {
    return currentLevel.value === stageOrder[stage];
  };

  return { show, reachedStage, isStage };
};
