<script setup lang="ts">
// Import the actual component
import ILayoutFloat from '~/components/layout/Float.vue'
import type { FloatVariants } from '~~/theme/index'

// Page header content
const headerContent = {
  title: 'ILayoutFloat Showcase',
  subtitle: 'CSS float utilities for flowing content layouts, quotes, and responsive design',
  badges: [
    { text: '5 Core Variants', variant: 'blue' },
    { text: 'Clear Control', variant: 'green' },
    { text: 'Responsive Stacking', variant: 'purple' },
    { text: 'Interactive Demo', variant: 'orange' },
  ],
}

interface ShowcaseOption<K extends keyof FloatVariants> {
  name: K
  type: 'select'
  options: NonNullable<FloatVariants[K]>[]
  default: NonNullable<FloatVariants[K]>
}

// Interactive demo configuration
const floatConfig = {
  componentName: 'ILayoutFloat',
  variants: [
    {
      name: 'variant',
      type: 'select',
      options: ['text-left', 'text-right', 'left', 'right', 'custom'],
      default: 'text-left',
    },
    {
      name: 'spacing',
      type: 'select',
      options: ['sm', 'md', 'lg'],
      default: 'md',
    },
    {
      name: 'clear',
      type: 'select',
      options: ['none', 'left', 'right', 'both'],
      default: 'none',
    },
    {
      name: 'responsive',
      type: 'select',
      options: ['none', 'stack-mobile'],
      default: 'none',
    },
  ] satisfies ShowcaseOption<keyof FloatVariants>[],
}

// Static examples
const staticExamples = [
  {
    title: 'Text Wrapping',
    description: 'Float media with text flowing around it',
    category: 'examples',
    items: [
      {
        title: 'Image Left',
        description: 'Text flows around a left-floated image',
        componentProps: { variant: 'text-left', spacing: 'md' },
        content: {
          as: 'div',
          props: {
            class: 'w-32 h-24 bg-blue-400 rounded flex items-center justify-center text-white text-sm',
          },
          text: 'Image',
        },
      },
      {
        title: 'Quote Right',
        description: 'Text flows around a pull quote on the right',
        componentProps: { variant: 'text-right', spacing: 'lg' },
        content: {
          as: 'blockquote',
          props: {
            class: 'w-48 p-4 bg-white rounded border-l-4 border-blue-500 text-sm italic',
          },
          text: '“A highlighted pull quote.”',
        },
      },
    ],
  },
]

// Usage guidelines
const usageGuidelines = {
  bestPractices: [
    { text: 'Use text-left or text-right for articles and blog layouts', codes: ['text-left', 'text-right'] },
    { text: 'Add responsive="stack-mobile" for mobile-friendly layouts', codes: ['stack-mobile'] },
    { text: 'Use clear="both" between major sections to reset floats', codes: ['clear="both"'] },
    { text: 'Ensure floated content has enough spacing from text', codes: ['spacing'] },
  ],
  commonPatterns: [
    { text: 'Images: text-left + md spacing', codes: ['text-left', 'md'] },
    { text: 'Quotes: text-right + lg spacing', codes: ['text-right', 'lg'] },
    { text: 'Sidebars: left + manual spacing', codes: ['left'] },
    { text: 'Breaks: clear="both" after floated sections', codes: ['clear="both"'] },
  ],
  futureEnhancements: {
    description: 'Future plans include advanced float variants like inline-callout, media-wrap, and custom breakpoints for greater layout control.',
    codes: ['inline-callout', 'media-wrap'],
  },
}

const useCases = [
  {
    icon: '📝',
    title: 'Article Layouts',
    description: 'Images, diagrams, and media elements that need text to flow around them naturally.',
  },
  {
    icon: '💬',
    title: 'Pull Quotes',
    description: 'Highlighted quotes or testimonials that break up long text blocks and draw attention.',
  },
  {
    icon: '📊',
    title: 'Data Callouts',
    description: 'Statistics, metrics, or key information that needs to stand out within flowing content.',
  },
]
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

        <!-- Manual Testing -->

        <div>
          <ILayoutFloat variant="text-left">
            <div class="w-32 h-24 border-warning-700 border rounded-md flex items-center justify-center text-sm">
              Floated Box
            </div>
          </ILayoutFloat>
          <p class="mt-4 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>

        <!-- Static Examples -->
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
            <ILayoutFloat v-bind="item.componentProps">
              <ShowcaseDemoContent :content="item.content" />
            </ILayoutFloat>
          </ShowcaseDemoCard>
        </ShowcaseDemo>

        <!-- Interactive Demo -->
        <ShowcaseDemo
          title="Interactive Playground"
          description="Experiment with ILayoutFloat options in real-time"
          category="interactive"
        >
          <ShowcaseComponent :config="floatConfig">
            <template #default="{ props: reactiveProps }">
              <ILayoutFloat v-bind="reactiveProps">
                <div class="w-32 h-24 border-warning-700 border rounded-md flex items-center justify-center text-sm">
                  Floated Box
                </div>
              </ILayoutFloat>
              <p class="mt-4 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
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

        <ShowcaseUseCases :items="useCases" />
      </ILayoutStack>
    </ILayoutCenter>
  </UContainer>
</template>
