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

export type SectionIntro = {
  icon: string;
  headline: string;
  title: string;
  description: string;
};

export type SectionBridge = {
  headline: string;
  message: string;
  cta: Cta;
};

export type SectionSeparator = {
  label: string;
  description?: string;
};

export type BaseSectionConfig = {
  enabled?: boolean;
  minStage?: ValidationStage;
};

export type SectionBase = BaseSectionConfig & {
  intro: SectionIntro;
  separators?: SectionSeparator[];
  bridge?: SectionBridge;
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

export type Metric = {
  label: string;
  value: string | number;
  sub?: string;
};

// ============================================================================
// HERO SECTION
// ============================================================================

export type HeroBadge = {
  title: string;
  description: string;
  to: string;
};

export type HeroIntro = {
  title: string;
  description: string;
};

export type HeroMedia = {
  type: 'video' | 'image';
  src: string | null;
  alt: string | null;
  poster?: string;
};

// ============================================================================
// PROBLEM/SOLUTION SECTION
// ============================================================================

export interface ProblemSolutionCard {
  id: string;
  title: string;
  icon: string;
  description: string;
}

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
// FOUNDER SECTION
// ============================================================================

export type FounderProfile = {
  role: string;
  title?: string;
  given_name: string;
  surname: string;
  avatar: Image;
  portrait?: Image;
  video?: {
    src: string;
    alt: string;
  };
};

export type BusinessInfo = {
  name: string;
  legal_name: string;
  founding_year: number;
  location: string;
  logo: string;
};

export type FounderStory = {
  background: string[];
  mission: string;
  challenge: string;
};

export type FounderAccessibility = {
  availability: string;
  links: Link[];
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
  id: OfferID;
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

// ============================================================================
// RESULTS SECTION
// ============================================================================

export interface ProofItem {
  name: string;
  logo?: string;
  note?: string;
}

export interface ProofTrack {
  label: string;
  badgeColor: BadgeProps['color'];
  items: ProofItem[];
}

export type Testimonial = {
  type: 'testimonial';
  quote: string;
  name: string;
  role: string;
  avatarUrl?: string;
  link?: string;
  highlight?: boolean;
};

export type CaseStudyFounder = {
  name: string;
  productType?: string;
  websiteUrl?: string;
};

export type CaseStudyTimeline = {
  start?: string;
  duration?: string;
  milestones?: Array<{
    date: string;
    event: string;
  }>;
};

export type CaseStudyEvidence = {
  screenshot?: string;
  videoUrl?: string;
};

export type CaseStudy = {
  type: 'case-study';
  title: string;
  status: 'validated' | 'in-progress' | 'example';
  highlight?: boolean;
  founder: CaseStudyFounder;
  description: string;
  metrics: Metric[];
  timeline: CaseStudyTimeline;
  evidence?: CaseStudyEvidence;
  link?: string;
};

export type SocialProofItem = Testimonial | CaseStudy;

// ============================================================================
// CONCERNS SECTION
// ============================================================================

export type FaqType = 'warning' | 'objection' | 'support' | 'general';

export type FaqItem = {
  q: string;
  a: string;
  type: FaqType;
};

// ============================================================================
// FLOW CONFIG
// ============================================================================

export type FlowConfig = {
  hero: BaseSectionConfig & {
    badge: HeroBadge;
    intro: HeroIntro;
    media?: HeroMedia;
    countdown?: {
      enabled: boolean;
      launchDate: string; // ISO 8601
      message: string;
      fallbackMessage?: string;
      showTimer?: boolean; // Show compact countdown timer
    };
  };

  problemSolution: SectionBase & {
    cards: ProblemSolutionCard[];
    statement?: string;
  };

  process: SectionBase & {
    steps: ProcessStep[];
  };

  founder: SectionBase & {
    profile: FounderProfile;
    business: BusinessInfo;
    story: FounderStory;
    accessibility: FounderAccessibility;
  };

  offer: SectionBase & {
    items: Offer[];
  };

  results: SectionBase & {
    testimonials: Testimonial[];
    caseStudies: CaseStudy[];
    proof: ProofTrack[];
  };

  concerns: SectionBase & {
    items: FaqItem[];
  };
};
