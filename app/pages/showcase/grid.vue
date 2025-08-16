<!-- pages/showcase/grid.vue -->
<script setup>
import { ILayoutGrid } from '#components'
import { gridData } from '~~/theme/layout/grid'

definePageMeta({
  layout: false,
})

// ✅ Complete grid showcase configuration
const gridConfig = {
  componentName: 'ILayoutGrid',
  title: 'Interactive Grid Playground',
  description: 'Experiment with responsive grid layouts and gap controls - or try optimized presets',
  componentData: gridData,
  variants: [
    {
      name: 'variant',
      type: 'select',
      options: ['auto', 'thirds', 'halves', 'quarters', 'cards', 'compact', 'wide', 'masonry'],
      default: 'auto',
      description: 'Grid layout pattern with responsive breakpoints',
    },
    {
      name: 'gap',
      type: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      default: 'md',
      description: 'Space between grid items',
    },
  ],
  presets: [
    {
      name: 'Product Grid',
      description: 'E-commerce product grid optimized for cards and mobile browsing',
      behavior: 'Card-optimized layout: 1 column mobile → 2 tablet → 3 desktop with large gaps for breathing room.',
      preset: { variant: 'cards', gap: 'lg' },
      content: {
        type: 'products',
        count: 6,
        title: 'Product Showcase',
        subtitle: 'Card-optimized layout',
        details: 'Perfect for e-commerce: 1 column mobile → 2 tablet → 3 desktop',
      },
    },
    {
      name: 'Team Grid',
      description: 'Team member profiles with consistent three-column layout',
      behavior: 'Clean three-column layout: 1 column mobile → 3 columns desktop with generous spacing between profiles.',
      preset: { variant: 'thirds', gap: 'xl' },
      content: {
        type: 'team',
        count: 6,
        title: 'Team Members',
        subtitle: 'Professional profiles',
        details: 'Clean layout: 1 column mobile → 3 columns desktop with generous spacing',
      },
    },
    {
      name: 'Feature Grid',
      description: 'Feature highlights with responsive four-column progression',
      behavior: 'Progressive scaling: 1 → 2 → 4 columns as screen size increases with medium gaps for balance.',
      preset: { variant: 'quarters', gap: 'md' },
      content: {
        type: 'features',
        count: 8,
        title: 'Features',
        subtitle: 'Progressive disclosure',
        details: 'Scales beautifully: 1 → 2 → 4 columns as screen size increases',
      },
    },
    {
      name: 'Blog Grid',
      description: 'Article cards with space-efficient compact layout',
      behavior: 'Maximum density layout: 1 → 2 → 3 → 4 columns for content discovery with large gaps for readability.',
      preset: { variant: 'compact', gap: 'lg' },
      content: {
        type: 'articles',
        count: 8,
        title: 'Articles',
        subtitle: 'Dense content layout',
        details: 'Maximum density: 1 → 2 → 3 → 4 columns for content discovery',
      },
    },
    {
      name: 'Portfolio Masonry',
      description: 'Creative portfolio with masonry-style irregular heights',
      behavior: 'CSS columns masonry layout with varied content heights and large gaps for visual breathing room.',
      preset: { variant: 'masonry', gap: 'lg' },
      content: {
        type: 'portfolio',
        count: 9,
        title: 'Portfolio',
        subtitle: 'Creative masonry',
        details: 'CSS columns for Pinterest-style layout with varied content heights',
      },
    },
  ],
  useCases: [
    {
      icon: '🛍️',
      title: 'E-commerce Grids',
      description: 'Use cards or thirds variants for product displays with responsive behavior',
    },
    {
      icon: '👥',
      title: 'Team & Profile Grids',
      description: 'Perfect for team pages, testimonials, and user profile galleries',
    },
    {
      icon: '📝',
      title: 'Content Grids',
      description: 'Blog posts, articles, and feature highlights with compact or auto variants',
    },
    {
      icon: '🎨',
      title: 'Portfolio Layouts',
      description: 'Creative showcase with masonry variant for varied content heights',
    },
  ],
  guidelines: {
    bestPractices: [
      {
        text: 'Use cards variant for e-commerce and product displays',
        codes: ['cards', 'gap-lg'],
      },
      {
        text: 'Choose thirds for team grids and equal-importance content',
        codes: ['thirds', 'gap-xl'],
      },
      {
        text: 'Use compact for maximum content density and discovery',
        codes: ['compact', 'gap-md'],
      },
      {
        text: 'Choose masonry for creative portfolios with varied heights',
        codes: ['masonry', 'gap-lg'],
      },
    ],
    commonPatterns: [
      {
        text: 'Product grids benefit from cards variant with large gaps',
        codes: ['cards', 'gap-lg'],
      },
      {
        text: 'Feature highlights work well with quarters progression',
        codes: ['quarters', 'gap-md'],
      },
      {
        text: 'Portfolio pieces shine with masonry and generous spacing',
        codes: ['masonry', 'gap-xl'],
      },
    ],
    futureEnhancements: {
      description: 'Planned enhancements include custom breakpoint control and dynamic aspect ratios.',
      codes: ['custom-breakpoints', 'aspect-ratios'],
    },
  },
}

// ✅ Content generators for different preset types
const generateGridContent = (content, selectedProps) => {
  const items = Array.from({ length: content.count }, (_, i) => ({
    id: i + 1,
    type: content.type,
    isMasonry: selectedProps.variant === 'masonry',
  }))

  return {
    items,
    ...content,
  }
}
</script>

<template>
  <NuxtLayout
    name="showcase"
    title="ILayoutGrid"
    subtitle="Multi-column grid systems with intelligent responsive breakpoint behavior"
    :config="gridConfig"
  >
    <template #default="{ getTrackingId, config }">
      <ShowcaseDemo
        title="Interactive Playground"
        description="Experiment with grid variants and gaps - or explore curated layout presets"
        :max-cols="1"
      >
        <ShowcaseDynamic
          :component-name="config.componentName"
          :title="config.title"
          :description="config.description"
          :variants="config.variants"
          :presets="config.presets"
          :badge-number="1"
          :tracking-id="getTrackingId('playground')"
        >
          <template #default="{ selectedProps, currentPreset }">
            <div class="space-y-4">
              <!-- Grid Pattern Info -->
              <div
                v-if="currentPreset"
                class="p-4 bg-elevated rounded-lg border border-muted"
              >
                <div class="flex items-center gap-3 mb-2">
                  <h4 class="font-semibold text-sm text-primary">
                    {{ currentPreset.content.title }}
                  </h4>
                  <UBadge
                    variant="soft"
                    color="secondary"
                    size="sm"
                  >
                    {{ currentPreset.content.subtitle }}
                  </UBadge>
                </div>
                <p class="text-xs text-muted-foreground">
                  {{ currentPreset.content.details }}
                </p>
              </div>

              <!-- Live Grid Demo -->
              <div class="i-pattern-circuit border-2 border-dashed border-primary/30 p-6 rounded-lg">
                <ILayoutGrid
                  v-bind="selectedProps"
                  class="w-full"
                >
                  <!-- Dynamic content based on preset or default -->
                  <template v-if="currentPreset">
                    <div
                      v-for="item in generateGridContent(currentPreset.content, selectedProps).items"
                      :key="item.id"
                      :class="[
                        'p-4 rounded text-center transition-all duration-200',
                        'bg-primary/10 border border-primary/30 hover:bg-primary/20',
                        // Masonry height variation
                        selectedProps.variant === 'masonry'
                          ? `h-${24 + (item.id % 4) * 8}` : 'h-24',
                      ]"
                    >
                      <div class="flex flex-col items-center justify-center h-full">
                        <span class="text-primary font-medium text-sm">
                          {{ currentPreset.content.type === 'team' ? `Member ${item.id}`
                            : currentPreset.content.type === 'products' ? `Product ${item.id}`
                              : currentPreset.content.type === 'features' ? `Feature ${item.id}`
                                : currentPreset.content.type === 'articles' ? `Article ${item.id}`
                                  : currentPreset.content.type === 'portfolio' ? `Work ${item.id}`
                                    : `Item ${item.id}` }}
                        </span>
                        <span class="text-xs text-muted-foreground mt-1">
                          {{ selectedProps.variant }}
                        </span>
                      </div>
                    </div>
                  </template>

                  <!-- Default content for custom mode -->
                  <template v-else>
                    <div
                      v-for="i in 8"
                      :key="i"
                      :class="[
                        'p-4 rounded text-center transition-all duration-200',
                        'bg-secondary/10 border border-secondary/30 hover:bg-secondary/20',
                        selectedProps.variant === 'masonry'
                          ? `h-${20 + (i % 3) * 12}` : 'h-24',
                      ]"
                    >
                      <div class="flex flex-col items-center justify-center h-full">
                        <span class="text-secondary font-medium">{{ i }}</span>
                        <span class="text-xs text-muted-foreground mt-1">
                          {{ selectedProps.variant }}
                        </span>
                      </div>
                    </div>
                  </template>
                </ILayoutGrid>
              </div>
            </div>
          </template>
        </ShowcaseDynamic>
      </ShowcaseDemo>
    </template>
  </NuxtLayout>
</template>
