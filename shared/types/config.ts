import type { ButtonProps, PricingPlanProps } from '@nuxt/ui';

// ============================================================================
// SHARED PRIMITIVES
// ============================================================================

export type Cta = {
  to: ButtonProps['to'];
  icon?: string;
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
  label: string;
  note?: string;
  modal?: 'window' | 'fullscreen';
  formId?: string;
  captureEmail?: boolean;
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

export type SectionBase = {
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
// PROBLEM SECTION
// ============================================================================

export type CustomerPain = {
  label: string;
  impact: string;
  cost: string;
  reality: string;
};

export type CustomerProfile = {
  id: string;
  label: string;
  description: string;
  context: string[];
  pains: CustomerPain[];
};

export type ProblemSolution = {
  statement: string;
  claim: string;
  pitch: string;
  promise: string;
};

// ============================================================================
// SOLUTION SECTION
// ============================================================================

export type Outcome = {
  title: string;
  description: string;
  icon: string;
};

export type Alternative = {
  id: string;
  title: string;
  problem: string;
  cost: string;
  why_fails: string;
  examples?: string[];
};

export type Affiliations = {
  label: string;
  items: {
    name?: string;
    logo: string;
    note?: string;
  }[]
};

// ============================================================================
// PROCESS SECTION
// ============================================================================

export type ProcessFeature = {
  title: string;
  description: string;
  icon: string;
  class?: string;
};

export type ProcessAction = {
  task: string;
  estimated_time: string;
};

export type FlowContent =
  | { type: 'text'; value: string }
  | { type: 'video'; src: string; alt?: string; poster?: string }
  | { type: 'image'; src: string; alt?: string }
  | {
      type: 'list';
      items: string[];
      style?: 'bullets' | 'numbers' | 'checks';
    }
  | { type: 'code'; language: string; snippet: string; label?: string };

export type ProcessStep = {
  slot: string;
  title: string;
  description: string;
  duration: string;
  actions?: ProcessAction[];
  content?: FlowContent[];
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
  greeting: string;
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

export type OfferStockType = 'spots' | 'hours' | 'units' | 'licenses' | 'seats';

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
  hero: {
    badge: HeroBadge;
    intro: HeroIntro;
    media?: HeroMedia;
  };

  problem: SectionBase & {
    solution: ProblemSolution; // ⚠️ Remove if unused
    customerProfile: CustomerProfile;
  };

  solution: SectionBase & {
    outcomes: Outcome[];
    alternatives: Alternative[];
    affiliations: Affiliations;
  };

  process: SectionBase & {
    features: ProcessFeature[];
    flow: ProcessStep[];
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
  };

  concerns: SectionBase & {
    items: FaqItem[];
  };
};
