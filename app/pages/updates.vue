<script setup lang="ts">
type FeatureStatus = 'added' | 'changed' | 'removed' | 'deprecated';

interface Feature {
  text: string;
  status: FeatureStatus;
}

interface ChangelogSection {
  title: string;
  features: Feature[];
  freeText?: string; // For prose sections
}

interface Version {
  title: string;
  date: string;
  badge: string;
  authors: typeof authors;
  description: string;
  sections: ChangelogSection[];
}

useHead({
  title: 'Changelog - Product Validator',
  meta: [
    {
      name: 'description',
      content:
        'Track the evolution of the Product Validator — a validation-first Nuxt template focused on shipping signal fast.',
    },
  ],
});

const authors = [
  {
    name: 'Drew MacGibbon',
    avatar: {
      src: '/images/team/founder-avatar.png',
      alt: 'Drew MacGibbon',
    },
    to: 'https://github.com/incubrain',
    target: '_blank',
  },
];

const statusConfig = {
  added: { color: 'success', label: 'Added' },
  changed: { color: 'warning', label: 'Changed' },
  removed: { color: 'error', label: 'Removed' },
  deprecated: { color: 'warning', label: 'Deprecated' },
};

const versions: Version[] = [
  {
    title: 'Unified Data & Conversion Systems 🚀',
    description:
      'v0.2 refines the template into a research-driven, conversion-focused foundation. Unified data structures, analytics, and product strategy make it easier for founders to validate ideas and move toward revenue fast.',
    date: '2025-09-21T00:00:00.000Z',
    badge: 'v0.2.0',
    authors,
    sections: [
      {
        title: 'Unified Data Structure',
        features: [
          {
            text: 'Consolidated all section data into a single, research-driven schema',
            status: 'added',
          },
          {
            text: 'Inspired by product ideation frameworks, sales landing psychology, and validation best practices',
            status: 'added',
          },
          {
            text: 'Guides founders through the right questions in the right order, while mapping seamlessly to section components',
            status: 'added',
          },
          {
            text: 'Multi-file config system split across 8+ separate files',
            status: 'removed',
          },
        ],
      },
      {
        title: 'Product Model',
        features: [
          {
            text: 'Finalized four interconnected product types',
            status: 'added',
          },
          { text: 'Primary Product — core validation tool', status: 'added' },
          { text: 'Magnet Product — free entry offer', status: 'changed' },
          {
            text: 'Direct Revenue Product — immediate monetization option',
            status: 'removed',
          },
          {
            text: 'Social Product — community/engagement driver',
            status: 'removed',
          },
          {
            text: 'All supporting products link back to the primary to accelerate full-time founder paths',
            status: 'added',
          },
        ],
      },
      {
        title: 'Conversion Systems',
        features: [
          {
            text: 'Added Umami Analytics for event tracking and funnel insights',
            status: 'added',
          },
          {
            text: 'Introduced banner CTA above navigation for persistent visibility',
            status: 'added',
          },
          {
            text: 'Implemented exit-intent modal as a last-chance call to action',
            status: 'added',
          },
        ],
      },
      {
        title: 'Visual & UX Refinements',
        features: [
          {
            text: 'Refined color palette for a more professional, focused aesthetic',
            status: 'added',
          },
          {
            text: 'Applied colors strategically across sections to enforce clear visual hierarchy',
            status: 'added',
          },
          {
            text: 'Ensures attention naturally flows to key CTAs and conversion points',
            status: 'added',
          },
        ],
      },
    ],
  },
  {
    title: 'JUST LAUNCH IT!! 🚀🚀',
    description:
      "You'll never get it perfect. The goal is to get it in front of real humans fast, learn, and iterate. I'm certainly releasing this WAY before I feel comfortable. But that's the point, growth happens in discomfort. Let's go!",
    date: '2025-09-15T00:00:00.000Z',
    badge: 'v0.1.0',
    authors,
    sections: [
      {
        title: 'My Motivation',
        freeText: `For years, I confused *being busy* with *making progress*. I'd polish features, perfect designs, and ship "almost ready" products that never reached enough people to matter. Perfectionism became a socially acceptable way to avoid the one thing that actually creates value: **getting the idea in front of real humans** and learning fast.

I've been building businesses since I was 19 and I'm 32 now. I've also spent 6+ years as a full-stack developer. Across my own products and client work, I've seen the same trap: we build first, validate later (or never). That's how ghost products happen—months of effort that no one touches.

This template is my antidote: a **focus tool** that forces the shortest path to evidence. Ship a simple landing page, share it to communities, track interest, and *only then* decide whether to invest. If you can pre-sell, do it. If not, collect real data from the people you want to serve and make an informed call on the MVP.

The goal isn't to "build faster." It's to **decide faster**—with confidence—so you can either double down or walk away early without sunk costs.`,
        features: [],
      },
      {
        title: 'Key Features',
        features: [
          {
            text: 'Landing page design + copy — opinionated structure with easy edit points',
            status: 'added',
          },
          {
            text: 'Tailwind Variants ready — useTV composable and theme/* directory (see IVideo for example usage)',
            status: 'added',
          },
          {
            text: 'Nuxt UI wrapper using UI prefix — ergonomic wrappers (e.g., components/ui/page/Columns is used as UIPageColumns instead of UPageColumns) for consistent layout',
            status: 'added',
          },
          {
            text: 'Minimal focused template — validation-first, no CMS/blog overhead',
            status: 'added',
          },
          {
            text: 'Showcase page — demo gallery of Nuxt UI components for quick reference',
            status: 'removed',
          },
          {
            text: 'Theme / font pairing switcher — fast brand exploration',
            status: 'removed',
          },
        ],
      },
      {
        title: 'Stack',
        features: [
          { text: 'Nuxt 4, Tailwind v4, Nuxt UI, TypeScript', status: 'added' },
          {
            text: 'Tailwind Variants for design tokens and extensible component APIs',
            status: 'added',
          },
        ],
      },
    ],
  },
];
</script>

<template>
  <UPage>
    <UPageHero
      icon="i-lucide-book-open"
      title="Dev Changelog"
      description="Track the evolution of the Product Validator"
      headline="Weekly FOCUSED updates"
      :links="[
        {
          label: 'Follow on YouTube',
          to: 'https://www.youtube.com/@Incubrain',
          color: 'primary',
          icon: 'i-lucide-youtube',
          target: '_blank',
        },
        {
          label: 'Follow on GitHub',
          color: 'neutral',
          variant: 'ghost',
          to: 'https://github.com/incubrain/product-validator',
          icon: 'i-lucide-github',
          target: '_blank',
        },
      ]"
      class="bg-muted border-b"
    />

    <UPageBody>
      <UContainer>
        <UChangelogVersions :indicator="false">
          <UChangelogVersion
            v-for="(version, vIndex) in versions"
            :key="vIndex"
            :title="version.title"
            :description="version.description"
            :date="version.date"
            :authors="version.authors"
            :badge="undefined"
            :ui="{
              indicator:
                'sticky top-(--ui-header-height) pt-4 -mt-4 flex flex-col items-end',
            }"
          >
            <template #title>
              <h2 class="text-3xl font-bold underline underline-offset-8 pb-4">
                {{ version.title }}
              </h2>
            </template>

            <template #indicator>
              <UBadge :label="version.badge" variant="soft" />
              <span class="text-sm text-muted">
                {{
                  new Date(version.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                }}
              </span>
            </template>

            <template #body>
              <div class="space-y-8 pt-10">
                <div
                  v-for="(section, sIndex) in version.sections"
                  :key="sIndex"
                  class="space-y-3"
                >
                  <h3 class="text-xl font-semibold">{{ section.title }}</h3>

                  <!-- Free text prose (for My Motivation section) -->
                  <div
                    v-if="section.freeText"
                    class="prose prose-invert max-w-none"
                  >
                    <MDC :value="section.freeText" />
                  </div>

                  <!-- Feature list -->
                  <ul
                    v-if="section.features.length"
                    class="space-y-2 list-decimal"
                  >
                    <li
                      v-for="(feature, fIndex) in section.features"
                      :key="fIndex"
                      class="flex items-start justify-between gap-3"
                    >
                      <span class="flex-1">{{ feature.text }}</span>
                      <UBadge
                        :label="statusConfig[feature.status].label"
                        :color="statusConfig[feature.status].color"
                        variant="subtle"
                        size="xs"
                        class="flex-shrink-0 mt-0.5"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </UChangelogVersion>
        </UChangelogVersions>
      </UContainer>
    </UPageBody>
  </UPage>
</template>
