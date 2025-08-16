<script setup>
import { ITransform } from '#components'
import { transformData } from '~~/theme/layout/transform'

definePageMeta({
  layout: false,
})

// ✅ Complete transform showcase configuration
const transformConfig = {
  componentName: 'ITransform',
  title: 'Interactive Transform Playground',
  description: 'Experiment with transform effects, timing, and origin points - or try optimized presets',
  componentData: transformData,
  variants: [
    {
      name: 'variant',
      type: 'select',
      options: ['none', 'hover-lift', 'hover-scale', 'center-absolute', 'spin', 'pulse', 'press', 'custom'],
      default: 'hover-lift',
      description: 'Transform effect type',
    },
    {
      name: 'timing',
      type: 'select',
      options: ['fast', 'normal', 'slow'],
      default: 'normal',
      description: 'Animation duration',
    },
    {
      name: 'origin',
      type: 'select',
      options: ['center', 'top', 'bottom', 'left', 'right'],
      default: 'center',
      description: 'Transform origin point',
    },
  ],
  presets: [
    {
      name: 'Card Hover',
      description: 'Standard card interaction with subtle lift effect',
      behavior: 'Lifts card slightly on hover with scale and translate for depth perception. Normal timing provides smooth interaction.',
      preset: { variant: 'hover-lift', timing: 'normal', origin: 'center' },
      content: {
        type: 'card',
        element: 'Product Card',
        elementClass: 'bg-white dark:bg-gray-900 p-4 rounded-lg shadow border dark:border-gray-700 max-w-xs cursor-pointer',
        title: 'Card Hover',
        subtitle: 'Interactive element',
        details: 'Perfect for cards, buttons, and clickable elements requiring hover feedback',
      },
    },
    {
      name: 'Image Scale',
      description: 'Media hover effect with smooth scaling',
      behavior: 'Scales image on hover for zoom effect. Slow timing creates smooth, elegant transition ideal for galleries.',
      preset: { variant: 'hover-scale', timing: 'slow', origin: 'center' },
      content: {
        type: 'image',
        element: 'Image',
        elementClass: 'w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg overflow-hidden cursor-pointer flex items-center justify-center text-white text-xs font-medium',
        title: 'Image Scale',
        subtitle: 'Media effect',
        details: 'Ideal for image galleries, thumbnails, and media previews',
      },
    },
    {
      name: 'Loading Spinner',
      description: 'Continuous rotation for loading states',
      behavior: 'Continuous spin animation with slow timing. Perfect for loading indicators and progress spinners.',
      preset: { variant: 'spin', timing: 'slow', origin: 'center' },
      content: {
        type: 'spinner',
        element: '',
        elementClass: 'w-8 h-8 border-2 border-dashed border-blue-500 dark:border-blue-400 border-t-transparent rounded-full',
        title: 'Loading Spinner',
        subtitle: 'Progress indicator',
        details: 'Essential for loading states and progress indication',
      },
    },
    {
      name: 'Skeleton Pulse',
      description: 'Breathing animation for content placeholders',
      behavior: 'Pulse animation creates breathing effect for skeleton loading states. Draws attention while content loads.',
      preset: { variant: 'pulse', timing: 'normal', origin: 'center' },
      content: {
        type: 'skeleton',
        element: 'Loading Content',
        elementClass: 'w-full space-y-2 p-4',
        title: 'Skeleton Pulse',
        subtitle: 'Loading placeholder',
        details: 'Perfect for skeleton screens and content loading states',
      },
    },
    {
      name: 'Button Press',
      description: 'Tactile feedback for button interactions',
      behavior: 'Quick scale-down on press with fast timing. Provides immediate tactile feedback for button interactions.',
      preset: { variant: 'press', timing: 'fast', origin: 'center' },
      content: {
        type: 'button',
        element: 'Click Me',
        elementClass: 'bg-primary text-primary-foreground px-4 py-2 rounded cursor-pointer font-medium',
        title: 'Button Press',
        subtitle: 'Interactive feedback',
        details: 'Essential for buttons and clickable elements requiring immediate feedback',
      },
    },
  ],
  useCases: [
    {
      icon: '🎯',
      title: 'Interactive Elements',
      description: 'Cards, buttons, and clickable components that need hover and press feedback',
    },
    {
      icon: '🖼️',
      title: 'Media Effects',
      description: 'Images, thumbnails, and media previews with scaling and zoom interactions',
    },
    {
      icon: '⏳',
      title: 'Loading States',
      description: 'Spinners, skeleton screens, and progress indicators with continuous animations',
    },
    {
      icon: '📱',
      title: 'Modal & Overlays',
      description: 'Centered positioning for modals, tooltips, and overlay content',
    },
  ],
  guidelines: {
    bestPractices: [
      {
        text: 'Use hover-lift for cards and interactive elements',
        codes: ['hover-lift', 'normal'],
      },
      {
        text: 'Use hover-scale for images and media with slow timing',
        codes: ['hover-scale', 'slow'],
      },
      {
        text: 'Use fast timing for button press feedback',
        codes: ['press', 'fast'],
      },
      {
        text: 'Use center-absolute for modal and overlay positioning',
        codes: ['center-absolute'],
      },
    ],
    commonPatterns: [
      {
        text: 'Cards work best with hover-lift and normal timing',
        codes: ['hover-lift', 'normal'],
      },
      {
        text: 'Images benefit from hover-scale with slow transitions',
        codes: ['hover-scale', 'slow'],
      },
      {
        text: 'Loading spinners use spin with slow timing',
        codes: ['spin', 'slow'],
      },
      {
        text: 'Buttons need press feedback with fast timing',
        codes: ['press', 'fast'],
      },
    ],
    futureEnhancements: {
      description: 'Planned enhancements include 3D transforms, flip effects, and advanced rotation controls.',
      codes: ['3d-lift', 'flip-x', 'hover-rotate'],
    },
  },
}

// ✅ Generate content for different preset types
const generateTransformContent = (content) => {
  return {
    ...content,
  }
}
</script>

<template>
  <NuxtLayout
    name="showcase"
    title="ITransform"
    subtitle="Essential transform utilities for modern web interfaces with real-time controls"
    :config="transformConfig"
  >
    <template #default="{ getTrackingId, config }">
      <ShowcaseDemo
        title="Interactive Playground"
        description="Experiment with transform effects, timing, and origin points - see real-time changes"
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
          center
        >
          <template #default="{ selectedProps, currentPreset }">
            <div class="space-y-4">
              <!-- Transform Pattern Info -->
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

              <!-- Live Transform Demo -->
              <div class="i-pattern-circuit border-2 border-dashed border-primary/30 p-12 rounded-lg flex items-center justify-center min-h-[300px]">
                <ITransform
                  v-bind="selectedProps"
                  class="relative"
                >
                  <!-- Dynamic content based on preset or default -->
                  <div
                    v-if="currentPreset"
                    :class="currentPreset.content.elementClass"
                  >
                    <template v-if="currentPreset.content.type === 'skeleton'">
                      <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2" />
                      <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2" />
                      <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
                    </template>
                    <template v-else-if="currentPreset.content.type === 'card'">
                      <h4 class="font-medium text-sm text-gray-900 dark:text-white">
                        {{ currentPreset.content.element }}
                      </h4>
                      <p class="text-xs text-gray-600 dark:text-gray-300 mt-1">
                        Hover to see the effect
                      </p>
                    </template>
                    <template v-else>
                      {{ currentPreset.content.element }}
                    </template>
                  </div>
                  <div
                    v-else
                    class="w-32 h-24 bg-secondary/20 border border-secondary/50 rounded flex items-center justify-center text-secondary text-sm font-medium cursor-pointer"
                  >
                    Transform Box
                  </div>
                </ITransform>
              </div>

              <!-- Interaction Hint -->
              <div class="text-center text-sm text-muted-foreground">
                <template v-if="selectedProps.variant === 'hover-lift' || selectedProps.variant === 'hover-scale'">
                  💡 <strong>Hover</strong> over the element to see the effect
                </template>
                <template v-else-if="selectedProps.variant === 'press'">
                  💡 <strong>Click and hold</strong> the element to see the press effect
                </template>
                <template v-else-if="selectedProps.variant === 'spin' || selectedProps.variant === 'pulse'">
                  ✨ Animation runs <strong>continuously</strong>
                </template>
                <template v-else-if="selectedProps.variant === 'center-absolute'">
                  📍 Element is <strong>absolutely centered</strong>
                </template>
                <template v-else>
                  🎯 Transform effect: <strong>{{ selectedProps.variant }}</strong>
                </template>
              </div>
            </div>
          </template>
        </ShowcaseDynamic>
      </ShowcaseDemo>
    </template>
  </NuxtLayout>
</template>
