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
export type FormType = typeof STAGE_CONFIG.conversionTarget[StageKey];
export type FeatureKey = keyof typeof STAGE_CONFIG.visibility.unlock.features;

export type ConfigSource = 'validator' | 'founder-funnel' | 'root';

export type CtaName = 'conversion' | 'funnel' | 'secondary';

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
// PRODUCT SECTION
// ============================================================================

export type ProductId = 'waitlist' | 'direct' | 'low' | 'medium' | 'high';

export type ProductStockType = 'spots' | 'units' | 'hours';

export type FeatureStatus =
  | 'status-available'
  | 'status-beta'
  | 'status-coming-soon';

export type ProductStock = {
  limit: number;
  claimed: number;
  type?: ProductStockType;
};

export type ProductUpsell = {
  target: ProductId;
  primary?: boolean;
};

export type ProductFeature = {
  title: string;
  icon: FeatureStatus;
};

export type Product = Pick<
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
  features: ProductFeature[];
  slug: ProductId;
  type?: 'ebook' | 'course' | 'mentorship';
  seo?: Record<string, any>;
  head?: Record<string, any>;
  ogImage?: Record<string, any>;
  primary?: boolean;
  stock?: ProductStock;
  ctas: Record<CtaName, Cta>;
  upsells?: ProductUpsell[];
  media?: {
    type: 'video' | 'image';
    src: string;
    alt: string;
  };
  
};
