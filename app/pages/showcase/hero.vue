<!-- app/pages/showcase/hero.vue - UPDATED TO USE NEW VARIANTS -->
<script setup lang="ts">
// Sample data
const sampleCards = [
  {
    title: 'Template Creator',
    description: '6 years building SaaS products and Nuxt templates',
    icon: 'i-lucide-code',
    iconColor: 'primary',
  },
  {
    title: 'Standards-Driven',
    description: 'Opinionated architecture for maximum velocity',
    icon: 'i-lucide-zap',
    iconColor: 'blue',
  },
  {
    title: 'Batteries Included',
    description: 'SEO, analytics, components - everything ready',
    icon: 'i-lucide-rocket',
    iconColor: 'amber',
  },
]

const heroVariants = [
  {
    name: 'Split Layout - Cards',
    description: 'Traditional 2-column: text left, cards right',
    props: {
      layout: 'split',
      mediaType: 'cards',
      hasBackground: true,
      title: 'Built in 24 Hours with Nuxt Launch Kit',
      subtitle: 'The same template powering this site is <strong>yours to download</strong>',
      description: 'Deploy professional personal brands with opinionated architecture and maximum velocity.',
      cards: sampleCards,
      showCta: true,
      ctaText: 'Get the Template',
      ctaDescription: 'Free download • Full documentation • Deploy in 24 hours',
      backgroundPreset: 'circuit',
    },
  },
  {
    name: 'Centered Layout - Cards',
    description: 'Center-aligned with cards grid below',
    props: {
      layout: 'centered',
      mediaType: 'cards',
      hasBackground: false,
      title: 'Professional Personal Brands',
      subtitle: 'The template that <strong>powers this site</strong>',
      description: 'Everything you need to launch your personal brand with maximum velocity.',
      cards: sampleCards,
      showCta: true,
      ctaText: 'Download Now',
      ctaDescription: 'Free forever • MIT License',
    },
  },
  {
    name: 'Fullscreen Layout - Image',
    description: 'Hero-sized with large image',
    props: {
      layout: 'fullscreen',
      mediaType: 'image',
      hasBackground: true,
      title: 'Launch Your Brand',
      subtitle: 'Professional templates for <strong>makers and builders</strong>',
      description: 'Skip the design phase and focus on what matters - building your audience.',
      mediaSrc: 'https://picsum.photos/800/500?random=1',
      mediaAlt: 'Brand launch visualization',
      showCta: true,
      ctaText: 'Get Started',
      backgroundPreset: 'neural',
    },
  },
  {
    name: 'Minimal Layout - No Media',
    description: 'Clean text-only approach',
    props: {
      layout: 'minimal',
      mediaType: 'none',
      hasBackground: false,
      title: 'Less is More',
      subtitle: 'Sometimes <strong>simplicity wins</strong>',
      description: 'Clean, minimal design that lets your content speak for itself.',
      showCta: true,
      ctaText: 'Learn More',
      ctaDescription: 'Minimal approach • Maximum impact',
    },
  },
  {
    name: 'Compact Layout - Video',
    description: 'Compact spacing with video content',
    props: {
      layout: 'compact',
      mediaType: 'video',
      hasBackground: true,
      title: 'See It In Action',
      subtitle: 'Watch the <strong>24-hour deployment</strong>',
      description: 'From git clone to live site in record time.',
      mediaSrc: '/default.mp4',
      mediaPoster: 'https://picsum.photos/800/450?random=2',
      showCta: true,
      ctaText: 'Watch Demo',
      backgroundPreset: 'quantum',
    },
  },
]
</script>

<template>
  <LayoutCenter variant="full">
    <LayoutStack variant="spacious">
      <!-- Page Header -->
      <LayoutCenter variant="text-only">
        <LayoutStack variant="default">
          <LayoutHeading
            variant="hero"
            :text="'Hero Section Showcase'"
          />
          <LayoutText
            variant="subtitle"
            :text="'Explore different hero layouts and configurations using our primitive-based system.'"
          />
        </LayoutStack>
      </LayoutCenter>

      <!-- Hero Variants -->
      <LayoutStack variant="spacious">
        <div
          v-for="(variant, index) in heroVariants"
          :key="variant.name"
          class="space-y-4"
        >
          <!-- Variant Info -->
          <LayoutCenter variant="prose">
            <LayoutStack variant="compact">
              <div class="flex items-center gap-3">
                <UBadge
                  :label="String(index + 1)"
                  color="primary"
                  variant="solid"
                />
                <LayoutHeading
                  variant="section"
                  :text="variant.name"
                />
              </div>
              <LayoutText
                variant="description"
                :text="variant.description"
              />
            </LayoutStack>
          </LayoutCenter>

          <!-- Hero Component -->
          <SectionHero
            v-bind="variant.props"
            class="py-section"
          />

          <!-- Divider -->
          <LayoutDivider
            v-if="index < heroVariants.length - 1"
            variant="gradient"
            spacing="xl"
          />
        </div>
      </LayoutStack>
    </LayoutStack>
  </LayoutCenter>
</template>
