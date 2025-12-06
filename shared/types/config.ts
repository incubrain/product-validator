import type { ButtonProps } from '@nuxt/ui';
import { STAGE_CONFIG } from '#stage-config'


export interface StageDefinition {
  value: string;
  label: string;
  order: number;
}

export interface VisibilityConfig {
  layout: Record<string, string>;
  sections: Record<string, string>;
  features: Record<string, string>;
}

export interface StageConfig {
  currentStage: string;
  stages: StageDefinition[];
  products: {
    primary: string;
    secondary: string;
  };
  disableWaitlistAt: string;
  visibility: {
    unlock: VisibilityConfig;
    lock?: Partial<VisibilityConfig>;
  };
  conversionTarget: Record<string, string>
}

export type StageKey = typeof STAGE_CONFIG.stages[number]['value'];
export type LayoutKey = keyof typeof STAGE_CONFIG.visibility.unlock.layout;
export type SectionKey = keyof typeof STAGE_CONFIG.visibility.unlock.sections;
export type FeatureKey = keyof typeof STAGE_CONFIG.visibility.unlock.features;

export type ConfigSource = 'validator' | 'founder-funnel' | 'root';

export interface SectionCta {
  headline: string;
  message: string;
  button: {
    to: ButtonProps['to'];
    icon?: ButtonProps['icon'];
    color?: ButtonProps['color'];
    variant?: ButtonProps['variant'];
    label: ButtonProps['label'];
    note?: string;
    disabled?: ButtonProps['disabled'];
  };
  primary?: boolean;
}

