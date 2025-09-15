<!-- pages/changelog.vue -->
<script setup lang="ts">
useHead({
  title: 'Changelog - Nuxt Launch Kit',
  meta: [
    {
      name: 'description',
      content:
        'Track the evolution of the Nuxt Launch Kit — a validation-first Nuxt template focused on shipping signal fast.',
    },
  ],
});

/**
 * Single authoritative v0.1.0 entry.
 * All content is rendered on this page via the #body slot.
 * If @nuxt/content or @nuxtjs/mdc is installed, <MDC> will render markdown.
 * Otherwise we fall back to v-html.
 */
const versions = [
  {
    title: 'JUST LAUNCH IT!! 🚀🚀',
    description:
      "You'll never get it perfect. The goal is to get it in front of real humans fast, learn, and iterate. I'm certainly releasing this WAY before I feel comfortable. But that's the point, growth happens in discomfort. Let's go!",
    date: '2025-09-15T00:00:00.000Z',
    badge: 'v0.1.0',
    authors: [
      {
        name: 'Drew MacGibbon',
        avatar: {
          src: 'https://github.com/Drew-MacGibbon.png',
          alt: 'Drew MacGibbon',
        },
        to: 'https://github.com/incubrain',
        target: '_blank',
      },
    ],
    // Full inline markdown body (rendered via the #body slot)
    content: `
### My Motivation

For years, I confused *being busy* with *making progress*. I’d polish features, perfect designs, and ship “almost ready” products that never reached enough people to matter. Perfectionism became a socially acceptable way to avoid the one thing that actually creates value: **getting the idea in front of real humans** and learning fast.

I’ve been building businesses since I was 19 and I’m 32 now. I’ve also spent 6+ years as a full-stack developer. Across my own products and client work, I’ve seen the same trap: we build first, validate later (or never). That’s how ghost products happen—months of effort that no one touches.

This template is my antidote: a **focus tool** that forces the shortest path to evidence. Ship a simple landing page, share it to communities, run A/B tests, capture interest, and *only then* decide whether to invest. If you can pre-sell, do it. If not, collect real data from the people you want to serve and make an informed call on the MVP.

The goal isn’t to “build faster.” It’s to **decide faster**—with confidence—so you can either double down or walk away early without sunk costs.

### Key Features

- **Landing page design + copy** — opinionated structure with easy edit points
- **Tailwind Variants ready** — \`useTV\` composable and \`theme/*\` directory (see \`ISurround\` for example usage)
- **Nuxt UI wrapper** — ergonomic wrappers (e.g., \`PageColumns\`) for consistent layout
- **Minimal focused template** — validation-first, no CMS/blog overhead
- **Showcase page** — demo gallery of Nuxt UI components for quick reference
- **Theme / font pairing switcher** — fast brand exploration
- **SVG-ready** — \`ISVG\` component for scalable, consistent icons

### Stack

- **Nuxt 4**, **Tailwind v4**, **Nuxt UI**, **TypeScript**
- **Tailwind Variants** for design tokens and extensible component APIs
    `,
  },
];
</script>

<template>
  <UPage>
    <UPageHero
      title="Dev Changelog"
      description="Track the evolution of the Nuxt Launch Kit"
      headline="Weekly FOCUSED updates"
      :links="[
        {
          label: 'Follow on YouTube',
          to: 'https://www.youtube.com/@Incubrain',
          color: 'error',
          icon: 'i-lucide-youtube',
          target: '_blank',
        },
        {
          label: 'Follow on GitHub',
          color: 'neutral',
          variant: 'ghost',
          to: 'https://github.com/incubrain/nuxt-launch-kit',
          icon: 'i-lucide-github',
          target: '_blank',
        },
      ]"
      class="bg-muted border-b"
    />

    <UPageBody>
      <UContainer>
        <!-- Single-page timeline. Using versions prop + forwarded slots to render full content inline. -->
        <UChangelogVersions :indicator="false">
          <UChangelogVersion
            v-for="(version, index) in versions"
            :key="index"
            v-bind="version"
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

              <span class="text-sm text-muted">{{
                new Date(version.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              }}</span>
            </template>

            <template #date>
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

            <!-- Inline body: prefer MDC when available; fall back to v-html -->
            <template #body>
              <MDC v-if="version.content" :value="version.content" />
            </template>
          </UChangelogVersion>
        </UChangelogVersions>
      </UContainer>
    </UPageBody>
  </UPage>
</template>
