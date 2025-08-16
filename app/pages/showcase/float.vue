<!-- pages/showcase/float.vue -->
<script setup>
import { ILayoutFloat } from '#components'
import { floatData } from '~~/theme/layout/float'

definePageMeta({
  layout: false,
})

// ✅ Complete float showcase configuration with behavior descriptions
const floatConfig = {
  componentName: 'ILayoutFloat',
  title: 'Interactive Float Playground',
  description: 'Experiment with float positioning, spacing, and clearing - or try content-focused presets',
  componentData: floatData,
  variants: [
    {
      name: 'variant',
      type: 'select',
      options: ['left', 'right', 'none', 'start', 'end', 'text-left', 'text-right', 'text-center', 'custom'],
      default: 'text-left',
      description: 'Float positioning and text-wrap behavior',
    },
    {
      name: 'clear',
      type: 'select',
      options: ['none', 'left', 'right', 'both', 'start', 'end'],
      default: 'none',
      description: 'Clear floating elements',
    },
    {
      name: 'spacing',
      type: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      default: 'md',
      description: 'Margin spacing around floated element',
    },
    {
      name: 'responsive',
      type: 'select',
      options: ['default', 'sm-none', 'md-none', 'lg-none', 'stack-mobile'],
      default: 'stack-mobile',
      description: 'Responsive float behavior',
    },
  ],
  presets: [
    {
      name: 'Article Image',
      description: 'Left-floated image with text wrapping for blog posts and articles',
      behavior: 'Image floats left with medium spacing. Text wraps around naturally. Stacks normally on mobile devices.',
      preset: { variant: 'text-left', spacing: 'md', clear: 'none', responsive: 'stack-mobile' },
      content: {
        type: 'image',
        element: 'Image Placeholder',
        elementClass: 'w-32 h-24 bg-primary/20 border border-primary/50 rounded flex items-center justify-center text-primary text-sm font-medium',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        title: 'Article Image',
        subtitle: 'Left-floated media',
        details: 'Perfect for blog posts: image floats left, text wraps around naturally',
      },
    },
    {
      name: 'Pull Quote',
      description: 'Right-floated highlighted quote that draws attention within content',
      behavior: 'Quote floats right with generous spacing. Text flows around the left side. Stacks normally on mobile devices.',
      preset: { variant: 'text-right', spacing: 'lg', clear: 'none', responsive: 'stack-mobile' },
      content: {
        type: 'quote',
        element: '"Design is not just what it looks like. Design is how it works."',
        elementClass: 'w-48 p-4 bg-elevated border-l-4 border-secondary rounded text-secondary text-sm italic font-medium',
        text: 'In the world of user experience design, functionality trumps aesthetics every time. Steve Jobs famously emphasized that great design isn\'t just about visual appeal—it\'s about creating something that works intuitively and serves its purpose effectively. This principle has guided countless successful products and continues to influence modern design thinking across all industries.',
        title: 'Pull Quote',
        subtitle: 'Right-floated callout',
        details: 'Highlights key quotes or testimonials within flowing text content',
      },
    },
    {
      name: 'Data Callout',
      description: 'Statistics or metrics that stand out while maintaining content flow',
      behavior: 'Metric floats right with medium spacing. Text flows naturally around the left side. Stacks normally on mobile devices.',
      preset: { variant: 'text-right', spacing: 'md', clear: 'none', responsive: 'stack-mobile' },
      content: {
        type: 'metric',
        element: '85% User Satisfaction',
        elementClass: 'w-40 p-6 bg-success/10 border border-success/30 rounded text-center',
        text: 'Our latest user research shows significant improvements in customer experience across all touchpoints. The implementation of our new design system has led to more intuitive interactions and clearer information hierarchy. Users report faster task completion times and higher overall satisfaction with the platform\'s usability and visual design.',
        title: 'Data Callout',
        subtitle: 'Statistical highlight',
        details: 'Perfect for metrics, stats, and key data points within content',
      },
    },
    {
      name: 'Sidebar Widget',
      description: 'Simple left-float for sidebars and supplementary content',
      behavior: 'Widget floats left with large spacing and clears both sides. Creates clean section breaks. Stacks normally on mobile devices.',
      preset: { variant: 'left', spacing: 'lg', clear: 'both', responsive: 'stack-mobile' },
      content: {
        type: 'widget',
        element: 'Related Links',
        elementClass: 'w-48 p-4 bg-info/10 border border-info/30 rounded',
        text: 'Main content continues here with important information and detailed explanations. The sidebar widget provides supplementary information, related links, or additional context without interrupting the main content flow. This pattern works well for documentation, help articles, and informational pages.',
        title: 'Sidebar Widget',
        subtitle: 'Left-float with clear',
        details: 'Useful for related content, navigation aids, and supplementary widgets',
      },
    },
    {
      name: 'Inline Diagram',
      description: 'Center-positioned diagrams and illustrations within content',
      behavior: 'Diagram is centered with large spacing and clears both sides. Creates visual breaks with balanced layout.',
      preset: { variant: 'text-center', spacing: 'lg', clear: 'both', responsive: 'default' },
      content: {
        type: 'diagram',
        element: 'Flow Diagram',
        elementClass: 'w-64 h-32 bg-warning/10 border border-warning/30 rounded flex items-center justify-center text-warning font-medium',
        text: 'Content flows naturally around centered elements when using the text-center variant. This approach works particularly well for diagrams, illustrations, and other visual elements that need to break up long sections of text while maintaining visual balance and readability.',
        title: 'Inline Diagram',
        subtitle: 'Centered content',
        details: 'Great for diagrams, charts, and illustrations that need visual prominence',
      },
    },
  ],
  useCases: [
    {
      icon: '📝',
      title: 'Article Layouts',
      description: 'Images, diagrams, and media elements that need text to flow around them naturally',
    },
    {
      icon: '💬',
      title: 'Pull Quotes',
      description: 'Highlighted quotes or testimonials that break up long text blocks and draw attention',
    },
    {
      icon: '📊',
      title: 'Data Callouts',
      description: 'Statistics, metrics, or key information that needs to stand out within flowing content',
    },
    {
      icon: '🔗',
      title: 'Sidebar Content',
      description: 'Related links, widgets, and supplementary information alongside main content',
    },
  ],
  guidelines: {
    bestPractices: [
      {
        text: 'Use text-left or text-right for content that should have text wrapping',
        codes: ['text-left', 'text-right'],
      },
      {
        text: 'Always add responsive="stack-mobile" for mobile-friendly layouts',
        codes: ['stack-mobile'],
      },
      {
        text: 'Use clear="both" between major sections to reset float behavior',
        codes: ['clear-both'],
      },
      {
        text: 'Ensure adequate spacing between floated elements and surrounding text',
        codes: ['spacing-md', 'spacing-lg'],
      },
    ],
    commonPatterns: [
      {
        text: 'Article images work best with text-left and medium spacing',
        codes: ['text-left', 'spacing-md'],
      },
      {
        text: 'Pull quotes shine with text-right and generous spacing',
        codes: ['text-right', 'spacing-lg'],
      },
      {
        text: 'Sidebar widgets need left float with clearing and large spacing',
        codes: ['left', 'clear-both', 'spacing-lg'],
      },
      {
        text: 'Diagrams benefit from center positioning with clear breaks',
        codes: ['text-center', 'clear-both'],
      },
    ],
    futureEnhancements: {
      description: 'Planned enhancements include shape-outside support and advanced text-wrap controls.',
      codes: ['shape-outside', 'text-wrap'],
    },
  },
}

// ✅ Generate appropriate demo text for different content types
const generateFloatContent = (content, selectedProps) => {
  const baseText = content.text || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

  return {
    ...content,
    displayText: baseText,
    shouldShowWrapping: ['text-left', 'text-right', 'left', 'right'].includes(selectedProps.variant),
  }
}
</script>

<template>
  <NuxtLayout
    name="showcase"
    title="ILayoutFloat"
    subtitle="CSS float utilities for flowing content layouts, pull quotes, and responsive text wrapping"
    :config="floatConfig"
  >
    <template #default="{ getTrackingId, config }">
      <ShowcaseDemo
        title="Interactive Playground"
        description="Experiment with float positioning and spacing - see how text flows around elements"
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
              <!-- Float Pattern Info -->
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

              <!-- Live Float Demo with Text Wrapping -->
              <div class="i-pattern-circuit border-2 border-dashed border-primary/30 p-6 rounded-lg min-h-[300px]">
                <div class="relative">
                  <!-- Floated Element -->
                  <ILayoutFloat
                    v-bind="selectedProps"
                    class="relative z-10"
                  >
                    <div
                      v-if="currentPreset"
                      :class="currentPreset.content.elementClass"
                    >
                      {{ currentPreset.content.element }}
                    </div>
                    <div
                      v-else
                      class="w-32 h-24 bg-secondary/20 border border-secondary/50 rounded flex items-center justify-center text-secondary text-sm font-medium"
                    >
                      Floated Box
                    </div>
                  </ILayoutFloat>

                  <!-- Flowing Text Content -->
                  <div class="text-sm text-muted leading-relaxed">
                    <template v-if="currentPreset">
                      {{ generateFloatContent(currentPreset.content, selectedProps).displayText }}
                    </template>
                    <template v-else>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </ShowcaseDynamic>
      </ShowcaseDemo>
    </template>
  </NuxtLayout>
</template>
