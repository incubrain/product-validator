<!-- pages/showcase/split.vue -->
<script setup>
import { ILayoutSplit } from '#components'
import { splitData } from '~~/theme/layout/split'

definePageMeta({
  layout: false,
})
// ✅ Complete showcase configuration
const splitConfig = {
  componentName: 'ILayoutSplit',
  title: 'Interactive Split Playground',
  description: 'Experiment with ratios, gaps, and reverse - or try proven real-world presets',
  componentData: splitData,
  variants: [
    {
      name: 'ratio',
      type: 'select',
      options: ['50-50', '60-40', '70-30', '80-20', '40-60', '30-70', '20-80'],
      default: '50-50',
      description: 'Column width ratio distribution',
    },
    {
      name: 'gap',
      type: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      default: 'none',
      description: 'Space between columns',
    },
    {
      name: 'reverse',
      type: 'boolean',
      default: false,
      description: 'Reverse column order on mobile',
    },
  ],
  presets: [
    {
      name: 'Blog Layout',
      description: 'Classic article layout with sidebar for readability and navigation',
      preset: { ratio: '70-30', gap: 'lg', reverse: false },
      firstContent: {
        title: 'Article Content',
        subtitle: 'Main reading area',
        details: 'Optimized 70% width for comfortable reading with proper line length',
      },
      secondContent: {
        title: 'Sidebar',
        subtitle: 'Navigation & related',
        details: '30% width for table of contents, related articles, and CTAs',
      },
    },
    {
      name: 'Dashboard',
      description: 'Admin interface with primary data display and compact controls',
      preset: { ratio: '80-20', gap: 'md', reverse: false },
      firstContent: {
        title: 'Main Dashboard',
        subtitle: 'Data visualization',
        details: '80% width for charts, tables, and primary information display',
      },
      secondContent: {
        title: 'Controls',
        subtitle: 'Quick actions',
        details: '20% narrow panel for filters, settings, and action buttons',
      },
    },
    {
      name: 'Hero Section',
      description: 'Landing page hero with balanced content and visual media',
      preset: { ratio: '50-50', gap: 'xl', reverse: true },
      firstContent: {
        title: 'Hero Content',
        subtitle: 'Messaging & CTA',
        details: '50% width for headlines, value prop, and call-to-action buttons',
      },
      secondContent: {
        title: 'Hero Media',
        subtitle: 'Visual impact',
        details: '50% width for product images, videos, or interactive demos',
      },
    },
  ],
  useCases: [
    {
      icon: '📄',
      title: 'Article Layouts',
      description: 'Use 70-30 or 80-20 for main content with sidebar navigation or related links',
    },
    {
      icon: '🎛️',
      title: 'Dashboard Interfaces',
      description: 'Perfect for admin panels with 60-40 or 70-30 ratios for main data and controls',
    },
    {
      icon: '🏪',
      title: 'E-commerce Pages',
      description: 'Product details (60-40) or checkout flows with form and summary sections',
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Automatically stacks on mobile, splits on desktop with intelligent breakpoints',
    },
  ],
  guidelines: {
    bestPractices: [
      {
        text: 'Use 60-40 or 70-30 for most content + sidebar layouts',
        codes: ['60-40', '70-30'],
      },
      {
        text: 'Choose 50-50 only when both sections have equal importance',
        codes: ['50-50'],
      },
      {
        text: 'Add gap="md" or gap="lg" for visual separation between columns',
        codes: ['gap-md', 'gap-lg'],
      },
      {
        text: 'Use reverse prop for mobile-first content ordering',
        codes: ['reverse'],
      },
    ],
    commonPatterns: [
      {
        text: 'Blog layouts typically use 70-30 or 80-20 ratios for readability',
        codes: ['70-30', '80-20'],
      },
      {
        text: 'Hero sections work well with 50-50 or 60-40 for balanced impact',
        codes: ['50-50', '60-40'],
      },
      {
        text: 'Dashboard sidebars often use 20-80 or 30-70 for maximum data space',
        codes: ['20-80', '30-70'],
      },
    ],
    futureEnhancements: {
      description: 'Planned enhancements include custom breakpoint variants and nested split support.',
      codes: ['custom-breakpoints', 'nested-splits'],
    },
  },
}
</script>

<template>
  <NuxtLayout
    name="showcase"
    title="ILayoutSplit"
    subtitle="Responsive two-column layouts with intelligent ratio control and mobile-first stacking"
    :config="splitConfig"
  >
    <!-- ✅ Only the playground content needed! Everything else auto-rendered -->
    <template #default="{ getTrackingId, config }">
      <ShowcaseDemo
        title="Interactive Playground"
        description="Experiment with custom configurations or try proven real-world presets"
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
          <template #default="{ selectedProps, firstContent, secondContent }">
            <ILayoutSplit
              v-bind="selectedProps"
              class="w-full min-h-[200px]"
            >
              <template #first>
                <ShowcaseDemoBox
                  color="info"
                  :label="firstContent?.title || 'First Column'"
                  label-position="top"
                  min-height="180px"
                  padding="lg"
                  class="h-full"
                >
                  <div class="text-left space-y-2">
                    <h4 class="font-semibold text-sm">
                      {{ firstContent?.subtitle || 'Primary Content' }}
                    </h4>
                    <p class="text-xs opacity-80">
                      {{ firstContent?.details || 'Main content area with flexible width control' }}
                    </p>
                  </div>
                </ShowcaseDemoBox>
              </template>

              <template #second>
                <ShowcaseDemoBox
                  color="warning"
                  :label="secondContent?.title || 'Second Column'"
                  label-position="top"
                  min-height="180px"
                  padding="md"
                  class="h-full"
                >
                  <div class="text-left space-y-2">
                    <h4 class="font-semibold text-sm">
                      {{ secondContent?.subtitle || 'Secondary Content' }}
                    </h4>
                    <p class="text-xs opacity-80">
                      {{ secondContent?.details || 'Supporting content with responsive behavior' }}
                    </p>
                  </div>
                </ShowcaseDemoBox>
              </template>
            </ILayoutSplit>
          </template>
        </ShowcaseDynamic>
      </ShowcaseDemo>
    </template>
  </NuxtLayout>
</template>
