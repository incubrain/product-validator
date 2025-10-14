import type {
  ValidationExample,
  SuccessMetric,
  MethodologyFramework,
} from '#types';

// ============================================================================
// VALIDATION EXAMPLES (Social Proof)
// ============================================================================

export const validationExamples: ValidationExample[] = [
  {
    company: 'Buffer',
    year: 2008,
    approach: [
      '2-page landing test',
      '5% conversion rate',
      'Validated demand pre-build',
    ],
    result: '60M+ users',
    url: 'https://buffer.com',
  },
  {
    company: 'Dropbox',
    year: 2008,
    approach: [
      'Video explainer smoke test',
      '5K → 75K signups overnight',
      'Built with customer confidence',
    ],
    result: '$2B+ valuation',
    url: 'https://dropbox.com',
  },
  {
    company: 'Videofruit',
    year: 2017,
    approach: [
      'Pre-sold $10K in 24 hours',
      '25% conversion from email',
      'Funded dev with revenue',
    ],
    result: 'Profitable day one',
  },
];

// ============================================================================
// SUCCESS METRICS (Benchmarks)
// ============================================================================

export const successMetrics: SuccessMetric[] = [
  {
    id: 'signup',
    name: 'Magnet Signup Rate',
    description: 'Visitors → Email Signups',
    icon: 'i-lucide-mail',
    thresholds: {
      weak: {
        range: '<5%',
        meaning: 'Traffic/messaging misaligned → Iterate copy',
      },
      average: {
        range: '5-15%',
        meaning: 'Moderate interest → Test positioning',
      },
      strong: {
        range: '>15%',
        meaning: 'Clear demand → Proceed confidently',
      },
    },
  },
  {
    id: 'completion',
    name: 'Magnet Completion Rate',
    description: 'Signups → Magnet Completed',
    icon: 'i-lucide-check-circle',
    thresholds: {
      weak: {
        range: '<20%',
        meaning: 'Delivery friction → Simplify sequence',
      },
      average: {
        range: '20-40%',
        meaning: 'Standard engagement → Monitor closely',
      },
      strong: {
        range: '>40%',
        meaning: 'High retention → Content resonates',
      },
    },
  },
  {
    id: 'paid-intent',
    name: 'Paid Intent Signal',
    description: 'Completions → Paid Interest',
    icon: 'i-lucide-dollar-sign',
    thresholds: {
      weak: {
        range: '<10%',
        meaning: 'Offer unclear → Refine value prop',
      },
      average: {
        range: '10-25%',
        meaning: 'Some willingness → Test pricing',
      },
      strong: {
        range: '>25%',
        meaning: 'Validated monetization → Scale outreach',
      },
    },
  },
];

// ============================================================================
// METHODOLOGY FRAMEWORK
// ============================================================================

export const methodologyFramework: MethodologyFramework = {
  metrics: successMetrics,

  decisions: {
    build: {
      label: 'Build',
      icon: 'i-lucide-rocket',
      color: 'success',
      threshold: '2+ strong signals',
      action: 'Proceed with confidence',
      description: 'Clear demand validated across multiple metrics',
    },
    refine: {
      label: 'Refine',
      icon: 'i-lucide-rotate-cw',
      color: 'warning',
      threshold: 'Mix of average + strong',
      action: 'Iterate messaging',
      description: 'Some signal present, needs optimization',
    },
    pivot: {
      label: 'Pivot',
      icon: 'i-lucide-x-circle',
      color: 'error',
      threshold: 'Mostly weak',
      action: 'Pivot or abandon',
      description: 'No clear demand, messaging misaligned',
    },
  },

  minViableSignal:
    '100+ visitors, 15%+ magnet conversion, 20%+ completion over 14-30 days',

  whyMatters:
    '42% of startups fail from building without demand validation (CB Insights). Define your threshold now, measure objectively later, decide without emotion.',
};
