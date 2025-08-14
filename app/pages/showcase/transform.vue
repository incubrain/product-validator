<!-- app/pages/showcase/layout/transform.vue -->
<script setup lang="ts">
// Import the actual component
import ITransform from '~/components/i/Transform.vue'
import type { TransformVariants } from '~~/theme/index'

const headerContent = {
  title: 'ITransform Showcase',
  subtitle: 'Essential transform utilities for modern web interfaces with real-time controls',
  badges: [
    { text: '7 Core Variants', variant: 'blue' },
    { text: '3 Timing Options', variant: 'green' },
    { text: '5 Origin Points', variant: 'purple' },
    { text: 'Interactive Demo', variant: 'orange' },
  ],
}

interface ShowcaseOption<K extends keyof TransformVariants> {
  name: K
  type: 'select'
  options: NonNullable<TransformVariants[K]>[]
  default: NonNullable<TransformVariants[K]>
}

// Component configuration for interactive demo
const transformConfig = {
  componentName: 'ITransform',
  variants: [
    {
      name: 'variant',
      type: 'select',
      options: ['none', 'hover-lift', 'hover-scale', 'center-absolute', 'spin', 'pulse', 'press', 'custom'],
      default: 'hover-lift',
    },
    {
      name: 'timing',
      type: 'select',
      options: ['fast', 'normal', 'slow'],
      default: 'normal',
    },
    {
      name: 'origin',
      type: 'select',
      options: ['center', 'top', 'bottom', 'left', 'right'],
      default: 'center',
    },
  ] satisfies ShowcaseOption<keyof TransformVariants>[],
}

// Static examples for reference
const staticExamples = [
  {
    title: 'Common Patterns',
    description: 'Pre-configured examples for typical use cases',
    category: 'examples',
    items: [
      {
        title: 'Card Hover',
        description: 'Standard card interaction pattern',
        componentProps: { variant: 'hover-lift', timing: 'normal' },
        content: {
          as: 'div',
          props: {
            class: 'bg-white dark:bg-gray-900 p-4 rounded-lg shadow border dark:border-gray-700 max-w-xs cursor-pointer',
          },
          children: [
            {
              as: 'h4',
              props: {
                class: 'font-medium text-sm text-gray-900 dark:text-white',
              },
              text: 'Product Card',
            },
            {
              as: 'p',
              props: {
                class: 'text-xs text-gray-600 dark:text-gray-300 mt-1',
              },
              text: 'Hover to see the lift effect',
            },
          ],
        },
      },
      {
        title: 'Image Scale',
        description: 'Media hover effect pattern',
        componentProps: { variant: 'hover-scale', timing: 'slow' },
        content: {
          as: 'div',
          props: {
            class: 'w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg overflow-hidden cursor-pointer',
          },
          children: [
            {
              as: 'div',
              props: {
                class: 'w-full h-full flex items-center justify-center text-white text-xs font-medium',
              },
              text: 'Image',
            },
          ],
        },
      },
      {
        title: 'Loading Spinner',
        description: 'Fast loading animation',
        componentProps: { variant: 'spin', timing: 'slow' },
        content: {
          as: 'div',
          props: {
            class: 'w-8 h-8 border-2 border-dashed border-blue-500 dark:border-blue-400 border-t-transparent rounded-full',
          },
        },
      },
      {
        title: 'Skeleton Pulse',
        description: 'Loading skeleton pattern',
        componentProps: { variant: 'pulse' },
        content: {
          as: 'div',
          props: {
            class: 'w-full space-y-2',
          },
          children: [
            {
              as: 'div',
              props: {
                class: 'h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4',
              },
            },
            {
              as: 'div',
              props: {
                class: 'h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2',
              },
            },
            {
              as: 'div',
              props: {
                class: 'h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3',
              },
            },
          ],
        },
      },
    ],
  },
]

// Usage guidelines
const usageGuidelines = {
  bestPractices: [
    {
      text: 'Use hover-lift for cards and interactive elements',
      codes: ['hover-lift'],
    },
    {
      text: 'Use hover-scale for images and media',
      codes: ['hover-scale'],
    },
    {
      text: 'Use fast timing for small UI elements',
      codes: ['fast'],
    },
    {
      text: 'Use center-absolute for modals and overlays',
      codes: ['center-absolute'],
    },
  ],
  commonPatterns: [
    {
      text: 'Cards: hover-lift + normal timing',
      codes: ['hover-lift', 'normal'],
    },
    {
      text: 'Buttons: press + fast timing',
      codes: ['press', 'fast'],
    },
    {
      text: 'Images: hover-scale + slow timing',
      codes: ['hover-scale', 'slow'],
    },
    {
      text: 'Spinners: spin + fast timing',
      codes: ['spin', 'fast'],
    },
  ],
  futureEnhancements: {
    description: 'Additional variants like hover-rotate, 3d-lift, flip-x, and advanced 3D transforms are planned for future releases when needed. The current set covers 90% of common use cases.',
    codes: ['hover-rotate', '3d-lift', 'flip-x'],
  },
}
</script>

<template>
  <UContainer class="section-spacing">
    <ILayoutCenter variant="full">
      <ILayoutStack variant="spacious">
        <!-- Page Header -->
        <ShowcasePageHeader
          :title="headerContent.title"
          :subtitle="headerContent.subtitle"
          :badges="headerContent.badges"
        />

        <!-- Static Examples for Reference -->
        <ShowcaseDemo
          v-for="section in staticExamples"
          :key="`static-${section.title}`"
          :title="section.title"
          :description="section.description"
          :category="section.category"
        >
          <ShowcaseDemoCard
            v-for="item in section.items"
            :key="item.title"
            :title="item.title"
            :description="item.description"
            :config="item.componentProps"
          >
            <ITransform v-bind="item.componentProps">
              <ShowcaseDemoContent :content="item.content" />
            </ITransform>
          </ShowcaseDemoCard>
        </ShowcaseDemo>

        <!-- Interactive Demo Section -->
        <ShowcaseDemo
          title="Interactive Playground"
          description="Experiment with all ITransform options in real-time"
          category="interactive"
        >
          <ShowcaseComponent
            :config="transformConfig"
            center
          >
            <!-- SLOT: Actual component with reactive props -->
            <template #default="{ props: reactiveProps }">
              <ITransform v-bind="reactiveProps">
                <ShowcaseDemoContent />
              </ITransform>
            </template>
          </ShowcaseComponent>
        </ShowcaseDemo>

        <!-- Usage Guidelines -->
        <ShowcaseGuidelines
          title="Usage Guidelines"
          :best-practices="usageGuidelines.bestPractices"
          :common-patterns="usageGuidelines.commonPatterns"
          :future-enhancements="usageGuidelines.futureEnhancements"
        />
      </ILayoutStack>
    </ILayoutCenter>
  </UContainer>
</template>
