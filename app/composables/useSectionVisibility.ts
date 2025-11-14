// composables/useSectionVisibility.ts
import { SECTIONS } from '#shared/config/settings';

export const useSectionVisibility = () => {
  const { validationStage } = useDevTools();

  const stageOrder: Record<ValidationStage, number> = {
    identity: 1,
    attention: 2,
    traffic: 3,
    conversion: 4,
    engagement: 5,
    demand: 6,
  };

  const currentLevel = computed(() => stageOrder[validationStage.value]);

  /**
   * Check if section should be visible
   */
  const show = (sectionKey: keyof typeof SECTIONS): boolean => {
    const section = SECTIONS[sectionKey];

    if (!section.enabled) return false;

    const minLevel = stageOrder[section.minStage];
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
