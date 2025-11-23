import type { ButtonProps, PricingPlanProps, BadgeProps } from '@nuxt/ui';
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
  offers: {
    primary: string;
    secondary: string;
  };
  disableFakeDoorAt: string;
  visibility: {
    unlock: VisibilityConfig;
    lock?: Partial<VisibilityConfig>;
  };
  conversionTarget: Record<string, string>
}

// Infer types
export type StageKey = typeof STAGE_CONFIG.stages[number]['value'];
export type LayoutKey = keyof typeof STAGE_CONFIG.visibility.unlock.layout;
export type SectionKey = keyof typeof STAGE_CONFIG.visibility.unlock.sections;
export type FormType = typeof STAGE_CONFIG.conversionTarget[StageKey];
export type FeatureKey = keyof typeof STAGE_CONFIG.visibility.unlock.features;

export type ConfigSource = 'validator' | 'starter' | 'root';

export type Cta = {
  to: ButtonProps['to'];
  icon?: string;
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
  label: string;
  note?: string;
  modal?: 'window' | 'fullscreen';
  disabled?: boolean;
};

export type Link = {
  platform: string;
  label: string;
  url: string;
};

export type Image = {
  src: string;
  alt: string;
};

// ============================================================================
// PROCESS SECTION
// ============================================================================



export interface ProofItem {
  name: string;
  logo?: string;
  note?: string;
}

export interface SectionCta {
  headline: string;
  message: string;
  button: Cta;
  primary?: boolean;
}

// ============================================================================
// OFFER SECTION
// ============================================================================

export type OfferID = 'magnet' | 'direct' | 'low' | 'medium' | 'high';

export type OfferStockType = 'spots' | 'units';

export type FeatureStatus =
  | 'status-available'
  | 'status-beta'
  | 'status-coming-soon';

export type OfferStock = {
  limit: number;
  claimed: number;
  type?: OfferStockType;
};

export type OfferUpsell = {
  target: OfferID;
  primary?: boolean;
};

export type OfferFeature = {
  title: string;
  icon: FeatureStatus;
};

export type Offer = Pick<
  PricingPlanProps,
  | 'title'
  | 'description'
  | 'badge'
  | 'price'
  | 'discount'
  | 'billingCycle'
  | 'variant'
  | 'highlight'
  | 'tagline'
  | 'terms'
> & {
  features: OfferFeature[];
  slug: OfferID;
  primary?: boolean;
  stock?: OfferStock;
  cta: Cta;
  secondaryCta?: Cta;
  upsells?: OfferUpsell[];
  media?: {
    type: 'video' | 'image';
    src: string;
    alt: string;
  };
};
