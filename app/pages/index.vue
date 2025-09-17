<script setup lang="ts">
import { businessConfig, getFounderInfo } from '#shared/config/business';
import { actionConfig } from '#shared/config/actions';

// ===============================
// HERO
// ===============================
const heroContent = {
  badge: { icon: 'i-lucide-bolt', text: 'Open-source template' },
  headline: 'START Validating Your Idea TODAY',
  subheadline:
    'A Nuxt template laser-focused on one question: “Should we build it?” Ship a high-signal landing page fast, share it to real people, and learn from A/B tests + open Nuxt events — no vendor lock-in.',
  technologies: [
    { name: 'Nuxt', icon: 'i-logos-nuxt-icon', version: 'v4' },
    { name: 'Nuxt UI', icon: 'i-logos-nuxt-icon', version: 'v4' },
    { name: 'Tailwind', icon: 'i-logos-tailwindcss-icon', version: 'v4' },
    {
      name: 'Tailwind Variants',
      icon: 'i-lucide-trending-up-down',
      version: 'Latest',
    },
    { name: 'TypeScript', icon: 'i-logos-typescript-icon', version: 'v5.8+' },
  ],
};

// ===============================
// PHILOSOPHY (Validation-first)
// ===============================
const philosophyContent = {
  headline: 'Validation-first',
  title: 'Cut scope. Save time. Get evidence.',
  description:
    'Validation is a learning problem, not a features problem. Publish a high-signal page today and get real feedback tomorrow. Target: 25 visits → 5 CTA clicks → 1 signup before you invest more.',
  principles: [
    {
      title: 'Focused speed',
      description:
        'Ship only what produces signal: clear headline, value prop, and CTA.',
      icon: 'i-lucide-flag-triangle-right',
    },
    {
      title: 'Social-first distribution',
      description:
        'SEO is minimal by design; real validation comes from sharing to people and communities now.',
      icon: 'i-lucide-share-2',
    },
    {
      title: 'Evidence over opinions',
      description:
        'A/B variants and lightweight events guide iteration with concrete data.',
      icon: 'i-lucide-bar-chart-3',
    },
    {
      title: 'Open analytics pipeline',
      description:
        'Nuxt events emit structured payloads; connect any analytics or data sink you prefer.',
      icon: 'i-lucide-webhook',
    },
  ],
};

// ===============================
// THE 1-DAY FLOW (repurpose Overview section)
// ===============================
const businessFeaturesContent = {
  title: 'The 1-Day Flow',
  description:
    'A clear path from idea to first signal. Follow the steps, share widely, learn fast.',
  features: [
    {
      title: 'Clone',
      description:
        'Pull the repo, install, and run locally in minutes. Everything is pre-wired.',
      icon: 'i-lucide-download',
      status: 'available',
    },
    {
      title: 'Configure',
      description:
        'Set your headline, value prop, CTA, and email capture. No complex CMS required.',
      icon: 'i-lucide-settings-2',
      status: 'available',
    },
    {
      title: 'Launch & Share',
      description:
        'Deploy to Vercel/Netlify/Railway and push to your social circle, communities, and influencers.',
      icon: 'i-lucide-rocket',
      status: 'available',
    },
    {
      title: 'Measure',
      description:
        'Turn on lightweight analytics and A/B tests. Track clicks, signups, and message resonance.',
      icon: 'i-lucide-activity',
      status: 'available',
    },
    {
      title: 'Iterate',
      description:
        'Refine copy, hero, and CTA based on real signals — not guesswork.',
      icon: 'i-lucide-rotate-cw',
      status: 'available',
    },
  ],
};

// ===============================
// VALIDATION TOOLS (repurpose Feature Grid)
// ===============================
const featuresContent = {
  headline: 'Validation',
  title: 'Tools that turn visits into learnings',
  description:
    'Built-in levers to get your page in front of people and extract signal quickly — without locking you into a specific analytics vendor.',
  features: [
    {
      title: 'A/B Testing (copy & CTA)',
      description:
        'Swap headlines, subheads, and CTAs with simple flags. Compare performance quickly.',
      icon: 'i-lucide-split',
      class: 'lg:row-span-1',
      component: 'ab-testing',
    },
    {
      title: 'Nuxt Events → Any Analytics',
      description:
        'Structured events for views, clicks, and conversions. Wire them to your preferred analytics or data sink.',
      icon: 'i-lucide-line-chart',
      class: 'lg:col-span-2 lg:row-span-1',
      orientation: 'horizontal',
      component: 'analytics-chart',
    },
    {
      title: 'Share & Feedback Playbook',
      description:
        'Prompts and checklists for X/Twitter, LinkedIn, Reddit, Discord, and DMs to drive fast signal.',
      icon: 'i-lucide-share',
      class: 'lg:row-span-2',
      component: 'playbook-cards',
    },
    {
      title: 'Optional Email Capture',
      description:
        'Collect interest without a backend. Bring your own provider; wire up in the event hook.',
      icon: 'i-lucide-inbox',
      class: 'lg:col-span-1 lg:row-span-1',
      component: 'email-capture',
    },
  ],
};

// ===============================
// HIGHLIGHTS (repurpose Feature Highlight)
// ===============================
const featureHighlightContent = [
  {
    headline: 'DX',
    title: 'Scale if you need. Stay minimal if you don’t.',
    description:
      'Clean structure on a modern, standards-first stack. Extend only after you’ve validated.',
    features: [
      {
        title: 'Nuxt 4 + TypeScript',
        description: 'Fast DX, composables, clear typings.',
        icon: 'i-logos-nuxt-icon',
      },
      {
        title: 'Tailwind v4 + Nuxt UI',
        description:
          'Design tokens via utilities; extend with Tailwind Variants.',
        icon: 'i-lucide-palette',
      },
    ],
    image: 'https://picsum.photos/600/400?random=12',
    orientation: 'horizontal',
  },
  {
    headline: 'Community',
    title: 'Public critiques & optional coaching',
    description:
      'Submit your validation page for a recorded YouTube critique (public). Watch examples and build-in-public updates on our channel.',
    features: [
      {
        title: 'Recorded Public Critiques',
        description: 'Actionable reviews on messaging, clarity, and friction.',
        icon: 'i-lucide-video',
      },
      {
        title: '1:1 Coaching (add-on)',
        description: 'Hands-on work on offer, positioning, and variants.',
        icon: 'i-lucide-user-round',
      },
    ],
    image: 'https://picsum.photos/600/400?random=13',
    orientation: 'horizontal',
    reverse: true,
    // Add a channel URL field if your component supports it; otherwise link inline where rendered:
    channelUrl: 'https://www.youtube.com/@Incubrain',
  },
];

// ===============================
// FOUNDER NOTE
// ===============================
const founder = getFounderInfo();
const founderSectionContent = {
  headline: 'My Promise',
  longMessage: founder.longMessage,
  promise: founder.promise,
  expertise: founder.expertise,
  backgroundStory: founder.backgroundStory,
  user: {
    firstName: founder.firstName,
    lastName: founder.lastName,
    title: founder.title,
    avatar: founder.avatar,
  },
  socials: founder.socials,
};

// ===============================
// GETTING STARTED
// ===============================
const gettingStartedContent = {
  title: 'Validate your idea today',
  subtitle:
    'Clone the template and get the $50 early-bird bundle (50 spots). Shortest path from idea → evidence.',
  codeLabel: 'Quick start:',
  codeSnippet: `git clone ${actionConfig.free.target}
cd your-idea
pnpm install
pnpm dev`,
};

// ===============================
// FAQ (tailored to course + critique + validation tools)
// ===============================
const faqContent = {
  headline: 'Support',
  title: 'Frequently asked questions',
  items: [
    {
      label: 'Is the template free and open-source?',
      content: 'Yes. Free for personal and commercial use (see repo license).',
    },
    {
      label: 'How is the course priced?',
      content:
        '$50 early-bird bundle (template setup + validation strategy). First 50 spots at this price, then it increases.',
    },
    {
      label: 'What’s included in the Validator Bundle?',
      content:
        'Cloning/config, deploy, where to edit copy/CTAs, enabling events and variants, crafting A/B tests, social-first distribution, reading signals, and prioritizing iterations.',
    },
    {
      label: 'How do analytics work?',
      content:
        'The template emits Nuxt events (views, clicks, conversions, variant views). You wire them to any analytics or data sink.',
    },
    {
      label: 'Where can I watch critiques?',
      content:
        'On our YouTube channel: https://www.youtube.com/@Incubrain — critiques are public.',
    },
    {
      label: 'Can I hire you?',
      content: 'Yes. “Hire me” links are available in the nav and footer.',
    },
  ],
};

// (Optional) Testimonials — keep if you have real ones; otherwise omit or replace later
const testimonialsContent = {
  headline: 'Community Wins',
  title: 'What early users say',
  highlightCard: {
    title: 'Real-world feedback',
    description:
      'Short, actionable critiques deliver outsized learning. Ship faster with clearer messaging.',
    icon: 'i-lucide-megaphone',
    to: '#',
  },
  testimonials: [
    {
      quote:
        'Launched the same day, got feedback overnight, and iterated the copy by morning. The A/B flags are clutch.',
      user: {
        name: 'Alex P.',
        description: 'Indie hacker',
        avatar: { src: 'https://i.pravatar.cc/150?img=11', alt: 'Alex P.' },
      },
    },
    {
      quote:
        'The critique video pinpointed exactly where my value prop was muddy. Conversion improved with a tighter CTA.',
      user: {
        name: 'Samira K.',
        description: 'Founder',
        avatar: { src: 'https://i.pravatar.cc/150?img=12', alt: 'Samira K.' },
      },
    },
  ],
};

const ctaContent = {
  title: 'Template + Validation Course',
  subtitle: 'Everything you need to validate in a day.',
  price: '$50',
  features: [
    'Setup in minutes (Nuxt 4 + Tailwind v4)',
    'A/B variants for headline & CTA',
    'Social-first distribution playbook',
    'No lock-in (Nuxt events → any analytics)',
    'Optional public YouTube critique',
  ],
};

// ===============================
// SEO
// ===============================
useSeoMeta({
  title: `${businessConfig.business.name} — Validate in a day with Nuxt`,
  description:
    'Open-source Nuxt template plus $50 video course to validate your idea fast. Clone, configure, launch, A/B test, emit events, and iterate — without vendor lock-in.',
  keywords: [
    'Nuxt template',
    'idea validation',
    'A/B testing',
    'Nuxt events',
    'analytics',
    'Tailwind v4',
    'Nuxt UI',
  ],
});
</script>

<template>
  <UPageBody class="mt-0">
    <!-- 1) HERO -->
    <ISectionHero :content="heroContent" />

    <!-- 2) PHILOSOPHY (validation-first) -->
    <ISectionPhilosophy :content="philosophyContent" />

    <!-- 3) THE 1-DAY FLOW -->
    <ISectionOverview :content="businessFeaturesContent" />

    <!-- 4) VALIDATION TOOLS -->
    <ISectionFeatureGrid :content="featuresContent" />

    <!-- 5) DX + 6) COMMUNITY & COACHING -->
    <ISectionFeature :content="featureHighlightContent" />

    <!-- 7) GETTING STARTED -->
    <UPageSection
      :title="gettingStartedContent.title"
      :description="gettingStartedContent.subtitle"
    >
      <template #body>
        <UCard variant="subtle" class="bg-elevated/50">
          <div class="text-sm font-medium mb-3">
            {{ gettingStartedContent.codeLabel }}
          </div>
          <pre class="text-sm bg-muted/30 p-4 rounded overflow-x-auto">
<code>{{ gettingStartedContent.codeSnippet }}</code>
</pre>
        </UCard>
      </template>
      <template #links>
        <IButton action="paid" location="getting-started" />
        <IButton action="free" location="getting-started" />
      </template>
    </UPageSection>

    <!-- 8) FOUNDER NOTE -->
    <ISectionFounder :content="founderSectionContent" />

    <ISectionCTA :content="ctaContent" />

    <!-- Optional: Testimonials (swap with real ones later) -->
    <ISectionTestimonials :content="testimonialsContent" />

    <!-- FAQ -->
    <ISectionFAQ :content="faqContent" />
  </UPageBody>
</template>
