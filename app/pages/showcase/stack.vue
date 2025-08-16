<!-- pages/showcase/stack.vue -->
<script setup>
import { ILayoutStack } from '#components'
import { stackData } from '~~/theme/layout/stack'

definePageMeta({
  layout: false,
})

// ✅ Complete stack showcase configuration
const stackConfig = {
  componentName: 'ILayoutStack',
  title: 'Interactive Stack Playground',
  description: 'Experiment with stacking patterns, alignment, and gaps - or try proven layout presets',
  componentData: stackData,
  variants: [
    {
      name: 'variant',
      type: 'select',
      options: ['default', 'centered', 'compact', 'spacious', 'between', 'horizontal', 'horizontal-between', 'horizontal-center', 'stack-to-row', 'center-to-between'],
      default: 'default',
      description: 'Stacking behavior and alignment pattern',
    },
    {
      name: 'gap',
      type: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      default: 'md',
      description: 'Space between stacked items',
    },
  ],
  presets: [
    {
      name: 'Form Layout',
      description: 'Vertical form with consistent field spacing for optimal UX',
      preset: { variant: 'default', gap: 'md' },
      content: {
        type: 'form',
        items: [
          { text: 'Email Field', color: 'primary', description: 'Input field with proper spacing' },
          { text: 'Password Field', color: 'secondary', description: 'Secure input with validation' },
          { text: 'Submit Button', color: 'success', description: 'Call-to-action with visual weight' },
        ],
        title: 'Form Fields',
        subtitle: 'Vertical stacking',
        details: 'Standard vertical layout perfect for forms with medium gaps for readability',
      },
    },
    {
      name: 'Navigation Header',
      description: 'Horizontal navigation with space-between for brand, menu, and actions',
      preset: { variant: 'horizontal-between', gap: 'none' },
      content: {
        type: 'navigation',
        items: [
          { text: 'Brand Logo', color: 'primary', description: 'Company branding' },
          { text: 'Navigation Menu', color: 'secondary', description: 'Main site navigation' },
          { text: 'User Actions', color: 'success', description: 'Login/signup/profile' },
        ],
        title: 'Header Navigation',
        subtitle: 'Space-between layout',
        details: 'Perfect for headers: brand on left, navigation center, actions on right',
      },
    },
    {
      name: 'Action Buttons',
      description: 'Centered button group for forms, modals, and call-to-action sections',
      preset: { variant: 'horizontal-center', gap: 'md' },
      content: {
        type: 'actions',
        items: [
          { text: 'Cancel', color: 'neutral', description: 'Secondary action' },
          { text: 'Save', color: 'primary', description: 'Primary action' },
          { text: 'Save & Continue', color: 'success', description: 'Progress action' },
        ],
        title: 'Action Buttons',
        subtitle: 'Centered horizontally',
        details: 'Ideal for button groups in modals, forms, and decision points',
      },
    },
    {
      name: 'Tag List',
      description: 'Horizontal tags with wrapping for categories, filters, and labels',
      preset: { variant: 'horizontal', gap: 'sm' },
      content: {
        type: 'tags',
        items: [
          { text: 'Vue.js', color: 'success', description: 'Frontend framework' },
          { text: 'TypeScript', color: 'info', description: 'Type safety' },
          { text: 'Nuxt', color: 'primary', description: 'Full-stack framework' },
          { text: 'TailwindCSS', color: 'secondary', description: 'Utility-first CSS' },
        ],
        title: 'Technology Tags',
        subtitle: 'Horizontal wrapping',
        details: 'Perfect for tag lists, categories, and filter chips with natural wrapping',
      },
    },
    {
      name: 'Responsive Cards',
      description: 'Stack on mobile, row on desktop for adaptive card layouts',
      preset: { variant: 'stack-to-row', gap: 'lg' },
      content: {
        type: 'cards',
        items: [
          { text: 'Feature 1', color: 'primary', description: 'Primary feature highlight' },
          { text: 'Feature 2', color: 'secondary', description: 'Secondary benefit' },
          { text: 'Feature 3', color: 'success', description: 'Additional value' },
        ],
        title: 'Feature Cards',
        subtitle: 'Responsive layout',
        details: 'Mobile-first: stacked on small screens, horizontal row on desktop',
      },
    },
    {
      name: 'Dense Content',
      description: 'Compact spacing for information-dense interfaces and dashboards',
      preset: { variant: 'compact', gap: 'xs' },
      content: {
        type: 'data',
        items: [
          { text: 'Metric 1', color: 'info', description: '↗ +12.5% this month' },
          { text: 'Metric 2', color: 'warning', description: '→ No change' },
          { text: 'Metric 3', color: 'success', description: '↗ +8.2% this week' },
          { text: 'Metric 4', color: 'primary', description: '↗ +15.7% this quarter' },
        ],
        title: 'Dashboard Metrics',
        subtitle: 'Compact spacing',
        details: 'Tight spacing for dashboards and information-dense layouts',
      },
    },
  ],
  useCases: [
    {
      icon: '📋',
      title: 'Form Layouts',
      description: 'Stack form fields with consistent spacing using default or compact variants',
    },
    {
      icon: '🧭',
      title: 'Navigation',
      description: 'Use horizontal variants for headers, menus, and navigation bars',
    },
    {
      icon: '🎯',
      title: 'Action Groups',
      description: 'Button groups and call-to-action sections with centered or spaced alignment',
    },
    {
      icon: '📱',
      title: 'Responsive Layouts',
      description: 'Adaptive layouts that stack on mobile and flow horizontally on desktop',
    },
  ],
  guidelines: {
    bestPractices: [
      {
        text: 'Use default for most vertical stacking needs with medium gaps',
        codes: ['default', 'gap-md'],
      },
      {
        text: 'Choose horizontal-between for navigation with brand, menu, and actions',
        codes: ['horizontal-between'],
      },
      {
        text: 'Use horizontal-center for button groups and centered actions',
        codes: ['horizontal-center', 'gap-md'],
      },
      {
        text: 'Choose responsive variants for mobile-first adaptive layouts',
        codes: ['stack-to-row', 'center-to-between'],
      },
    ],
    commonPatterns: [
      {
        text: 'Form sections benefit from default stacking with medium gaps',
        codes: ['default', 'gap-md'],
      },
      {
        text: 'Tag lists work well with horizontal flow and wrapping behavior',
        codes: ['horizontal', 'gap-sm'],
      },
      {
        text: 'Hero sections often use centered alignment for visual impact',
        codes: ['centered', 'gap-lg'],
      },
      {
        text: 'Dashboard layouts benefit from compact spacing for density',
        codes: ['compact', 'gap-xs'],
      },
    ],
    futureEnhancements: {
      description: 'Planned enhancements include custom breakpoint control and animation presets.',
      codes: ['custom-breakpoints', 'animations'],
    },
  },
}
</script>

<template>
  <NuxtLayout
    name="showcase"
    title="ILayoutStack"
    subtitle="Flexible stacking component for vertical and horizontal layouts with intelligent spacing"
    :config="stackConfig"
  >
    <template #default="{ getTrackingId, config }">
      <ShowcaseDemo
        title="Interactive Playground"
        description="Experiment with stacking variants and spacing - or explore proven layout presets"
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
              <!-- Stack Pattern Info -->
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

              <!-- Live Stack Demo -->
              <div class="i-pattern-circuit border-2 border-dashed border-primary/30 p-6 rounded-lg">
                <ILayoutStack
                  v-bind="selectedProps"
                  class="w-full h-full"
                  :class="selectedProps.variant === 'between' ? 'min-h-[250px]' : ''"
                >
                  <!-- Dynamic content based on preset or default -->
                  <template v-if="currentPreset">
                    <ShowcaseDemoBox
                      v-for="(item, index) in currentPreset.content.items"
                      :key="index"
                      :color="item.color"
                      :label="item.text"
                      label-position="top"
                      :min-height="selectedProps.variant.includes('horizontal') ? '60px' : '80px'"
                      padding="md"
                      :class="[
                        'transition-all duration-200',
                        selectedProps.variant.includes('horizontal') ? 'flex-shrink-0' : 'w-full',
                      ]"
                    >
                      <div class="text-center space-y-1">
                        <span class="font-medium text-sm">{{ item.text }}</span>
                        <p class="text-xs opacity-70">
                          {{ item.description }}
                        </p>
                      </div>
                    </ShowcaseDemoBox>
                  </template>

                  <!-- Default content for custom mode -->
                  <template v-else>
                    <ShowcaseDemoBox
                      v-for="i in (selectedProps.variant === 'horizontal' ? 4 : 3)"
                      :key="i"
                      :color="['primary', 'secondary', 'success', 'warning'][i - 1]"
                      :label="`Item ${i}`"
                      label-position="top"
                      :min-height="selectedProps.variant.includes('horizontal') ? '60px' : '80px'"
                      padding="md"
                      :class="[
                        'transition-all duration-200',
                        selectedProps.variant.includes('horizontal') ? 'flex-shrink-0' : 'w-full',
                      ]"
                    >
                      <div class="text-center">
                        <span class="font-medium">Item {{ i }}</span>
                        <p class="text-xs opacity-70 mt-1">
                          {{ selectedProps.variant }}
                        </p>
                      </div>
                    </ShowcaseDemoBox>
                  </template>
                </ILayoutStack>
              </div>

              <!-- Layout Behavior Description -->
              <div class="p-3 bg-muted/50 rounded text-sm text-muted-foreground">
                <strong>Layout Behavior:</strong>
                {{ selectedProps.variant === 'default' ? 'Standard vertical stacking with medium gaps'
                  : selectedProps.variant === 'centered' ? 'Center-aligned items with consistent gaps'
                    : selectedProps.variant === 'compact' ? 'Tight spacing for dense content'
                      : selectedProps.variant === 'spacious' ? 'Generous spacing for breathing room'
                        : selectedProps.variant === 'between' ? 'Vertical stack with space-between distribution'
                          : selectedProps.variant === 'horizontal' ? 'Horizontal flow with wrapping'
                            : selectedProps.variant === 'horizontal-between' ? 'Space-between horizontal layout'
                              : selectedProps.variant === 'horizontal-center' ? 'Horizontally centered items with gap spacing'
                                : selectedProps.variant === 'stack-to-row' ? 'Responsive: stack on mobile, horizontal on desktop'
                                  : selectedProps.variant === 'center-to-between' ? 'Responsive: centered on mobile, space-between on desktop'
                                    : 'Custom stacking behavior' }}
                <br>
                <em>
                  {{ selectedProps.variant.includes('responsive') || selectedProps.variant.includes('stack-to') || selectedProps.variant.includes('center-to')
                    ? 'Resize your browser to see responsive behavior'
                    : selectedProps.variant.includes('horizontal')
                      ? 'Items flow horizontally and wrap when needed'
                      : 'Items stack vertically with consistent spacing' }}
                </em>
              </div>
            </div>
          </template>
        </ShowcaseDynamic>
      </ShowcaseDemo>
    </template>
  </NuxtLayout>
</template>
