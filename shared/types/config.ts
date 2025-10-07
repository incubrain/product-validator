// shared/types/config.ts
import type { ButtonProps } from '@nuxt/ui';

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

// ✅ BASE TYPE - All sections extend this
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
  src: string;
  alt: string;
  poster?: string;
};

// ============================================================================
// PROBLEM SECTION (2.problem.ts)
// ============================================================================

export type CustomerPain = {
  label: string;
  severity: string;
  cost: string;
};

export type CustomerOutcome = {
  label: string;
  target: number;
  unit: string;
  value: string;
};

export type CustomerObjection = {
  label: string;
  rebuttal: string;
};

export type CustomerProfile = {
  id: string;
  label: string;
  primary?: boolean;
  description: string;
  context: Record<string, string>;
  pains: CustomerPain[];
};

// ============================================================================
// SOLUTION SECTION (3.solution.ts)
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

export type Affiliation = {
  name?: string;
  logo: string;
  note?: string;
};

// ============================================================================
// PROCESS SECTION (4.process.ts)
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
// FOUNDER SECTION (5.founder.ts)
// ============================================================================

export type FounderProfile = {
  role: string;
  title?: string;
  first: string;
  surname: string;
  hook_intro: string;
  avatar: Image;
  portrait?: Image;
  videos?: {
    src: string;
    alt: string;
  };
};

export type BusinessInfo = {
  name: string;
  legal_name: string;
  founding_year: number;
  location: string;
};

export type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  icon: string;
  value: string;
};

export type FounderLearning = {
  title: string;
  description: string;
  icon: string;
};

export type FounderStory = {
  greeting: string;
  mission: string;
  challenge: string;
};

export type FounderAccessibility = {
  availability: string;
  links: Link[];
};

// ============================================================================
// OFFER SECTION (6.offer.ts)
// ============================================================================

export type OfferID = 'magnet' | 'direct' | 'low' | 'medium' | 'high';

export type OfferBenefit = {
  text: string;
  value?: number;
  status: 'available' | 'coming-soon' | 'beta';
};

export type OfferPrice = {
  current: string;
  future?: string;
  recurrence: 'never' | 'hour' | 'month' | 'year';
};

export type OfferStockType =
  | 'spots' // Course/program enrollment spots
  | 'hours' // Service hours available
  | 'units' // Physical/digital product units
  | 'licenses' // Software licenses
  | 'seats'; // Subscription seats

export type OfferStock = {
  limit: number;
  claimed: number;
  type?: OfferStockType;
};

export type OfferUpsell = {
  target: OfferID;
  primary?: boolean;
};

export type Offer = {
  id: OfferID;
  primary?: boolean;
  name: string;
  description: string;
  price: OfferPrice | null;
  benefits: OfferBenefit[];
  cta: Cta;
  stock?: OfferStock;
  upsells?: OfferUpsell[];
  media?: {
    type: 'video' | 'image';
    src: string;
    alt: string;
  };
};

// ============================================================================
// RESULTS SECTION (7.results.ts)
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
  duration: string;
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
// CONCERNS SECTION (8.concerns.ts)
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
    statement: string;
    solution: {
      claim: string;
      pitch: string;
      promise: string;
    };
    customerProfile: CustomerProfile;
  };
  solution: SectionBase & {
    outcomes: Outcome[];
    alternatives: Alternative[];
    credibility?: {
      affiliations: Affiliation[];
    };
  };
  process: SectionBase & {
    features: ProcessFeature[];
    flow: ProcessStep[];
  };
  founder: SectionBase & {
    me: FounderProfile;
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
