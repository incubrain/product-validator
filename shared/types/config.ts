import type { ButtonProps, PricingPlanProps, BadgeProps } from '@nuxt/ui';

// ============================================================================
// SHARED PRIMITIVES
// ============================================================================

/**
 * Validation lifecycle stages:
 * - identity: Who are you? What do you stand for? - Decision clarity
 * - attention: Can you grab attention? - social media, direct outreach, guerrilla marketing
 * - traffic: Can you drive consistent visitors? - visitor analytics
 * - conversion: Can you convert visitors into leads? - lead magnet conversion
 * - engagement: Can you keep leads engaged? - magnet engagement / completion rates analysis
 * - demand: Are leads ready to pay? - payment intent analysis
 */

export type ValidationStage =
  | 'identity'
  | 'attention'
  | 'traffic'
  | 'conversion'
  | 'engagement'
  | 'demand';

export type ConfigSource = 'validator' | 'custom';

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

export type ProcessStep = {
  id: string;
  title: string;
  icon: string;
  duration: string;
  description: string;
  result: string;
};

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
  upsells?: OfferUpsell[];
  media?: {
    type: 'video' | 'image';
    src: string;
    alt: string;
  };
};
