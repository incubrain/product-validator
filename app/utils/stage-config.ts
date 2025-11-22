import { STAGE_CONFIG } from '#stage-config';
import type { StageConfig, VisibilityConfig } from '#shared/types/config';

export const useStageConfig = () => {
  // In the future, we can inject this from app.config or runtimeConfig
  // For now, we use the build-time aliased config
  return STAGE_CONFIG;
};

export const getStageOrder = (stage: string): number => {
  const config = useStageConfig();
  const stageDef = config.stages.find(s => s.value === stage);
  return stageDef ? stageDef.order : 999;
};

export const getVisibilityConfig = () => {
  const config = useStageConfig();
  return config.visibility;
};
