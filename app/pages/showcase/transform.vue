<!-- pages/showcase/transform.vue -->
<script setup lang="ts">
import { ITransform } from '#components'
import { transformData } from '#theme/layout/transform'

const { createShowcaseConfig, generateShowcaseData, setShowcaseData } = useShowcase()

const demoStyles = {
  container: 'i-pattern-circuit border-2 border-dashed border-primary/30 p-12 rounded-lg flex items-center justify-center min-h-[300px]',
}

const transformConfig = createShowcaseConfig(ITransform, transformData, {
  variantDescriptions: {
    variant: 'Transform effect type',
    timing: 'Animation duration',
    origin: 'Transform origin point',
  },

  presets: [
    {
      name: 'Card Hover',
      description: 'Standard card interaction with subtle lift effect',
      preset: { variant: 'hover-lift', timing: 'normal', origin: 'center' },
      content: { type: 'card', title: 'Card Hover', subtitle: 'Interactive element' },
    },
    {
      name: 'Image Scale',
      description: 'Media hover effect with smooth scaling',
      preset: { variant: 'hover-scale', timing: 'slow', origin: 'center' },
      content: { type: 'image', title: 'Image Scale', subtitle: 'Media effect' },
    },
    {
      name: 'Loading Spinner',
      description: 'Continuous rotation for loading states',
      preset: { variant: 'spin', timing: 'slow', origin: 'center' },
      content: { type: 'spinner', title: 'Loading Spinner', subtitle: 'Progress indicator' },
    },
    {
      name: 'Skeleton Pulse',
      description: 'Breathing animation for content placeholders',
      preset: { variant: 'pulse', timing: 'normal', origin: 'center' },
      content: { type: 'skeleton', title: 'Skeleton Pulse', subtitle: 'Loading placeholder' },
    },
    {
      name: 'Button Press',
      description: 'Tactile feedback for button interactions',
      preset: { variant: 'press', timing: 'fast', origin: 'center' },
      content: { type: 'button', title: 'Button Press', subtitle: 'Interactive feedback' },
    },
  ],
})

// ✅ Content generator for different types
const getContentElement = (preset, selectedProps) => {
  if (!preset) return { class: 'w-32 h-24 bg-secondary/20 border border-secondary/50 rounded flex items-center justify-center text-secondary text-sm font-medium cursor-pointer', text: 'Transform Box' }

  const { content } = preset

  switch (content.type) {
    case 'card':
      return {
        class: 'bg-white dark:bg-gray-900 p-4 rounded-lg shadow border dark:border-gray-700 max-w-xs cursor-pointer',
        text: content.title,
        subtitle: 'Hover to see the effect',
      }
    case 'image':
      return {
        class: 'w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg overflow-hidden cursor-pointer flex items-center justify-center text-white text-xs font-medium',
        text: 'IMG',
      }
    case 'spinner':
      return {
        class: 'w-8 h-8 border-2 border-dashed border-blue-500 dark:border-blue-400 border-t-transparent rounded-full',
        text: '',
      }
    case 'skeleton':
      return {
        class: 'w-full space-y-2 p-4 max-w-xs',
        text: '',
        skeleton: true,
      }
    case 'button':
      return {
        class: 'bg-primary text-primary-foreground px-4 py-2 rounded cursor-pointer font-medium',
        text: 'Click Me',
      }
    default:
      return {
        class: 'w-32 h-24 bg-primary/10 border border-primary/30 rounded flex items-center justify-center text-primary text-sm font-medium cursor-pointer',
        text: selectedProps.variant,
      }
  }
}

// ✅ Interaction hints
const getInteractionHint = (variant) => {
  switch (variant) {
    case 'hover-lift':
    case 'hover-scale':
      return '💡 Hover over the element to see the effect'
    case 'press':
      return '💡 Click and hold the element to see the press effect'
    case 'spin':
    case 'pulse':
      return '✨ Animation runs continuously'
    case 'center-absolute':
      return '📍 Element is absolutely centered'
    default:
      return `🎯 Transform effect: ${variant}`
  }
}

setShowcaseData(generateShowcaseData(transformConfig))
</script>

<template>
  <NuxtLayout name="showcase">
    <ShowcaseDemo
      :description="transformConfig.description"
      title="Transform Effects"
      :max-cols="1"
    >
      <ShowcaseDynamic
        v-bind="transformConfig"
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
                {{ currentPreset.description }}
              </p>
            </div>

            <!-- Live Transform Demo -->
            <div :class="demoStyles.container">
              <ILayoutTransform
                v-bind="selectedProps"
                class="relative"
              >
                <!-- Dynamic content based on preset -->
                <template v-if="currentPreset">
                  <div
                    v-if="currentPreset.content.type === 'skeleton'"
                    :class="getContentElement(currentPreset, selectedProps).class"
                  >
                    <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2" />
                    <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2" />
                    <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
                  </div>
                  <div
                    v-else-if="currentPreset.content.type === 'card'"
                    :class="getContentElement(currentPreset, selectedProps).class"
                  >
                    <h4 class="font-medium text-sm text-gray-900 dark:text-white">
                      {{ getContentElement(currentPreset, selectedProps).text }}
                    </h4>
                    <p class="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      {{ getContentElement(currentPreset, selectedProps).subtitle }}
                    </p>
                  </div>
                  <div
                    v-else
                    :class="getContentElement(currentPreset, selectedProps).class"
                  >
                    {{ getContentElement(currentPreset, selectedProps).text }}
                  </div>
                </template>

                <!-- Default content -->
                <div
                  v-else
                  :class="getContentElement(null, selectedProps).class"
                >
                  {{ getContentElement(null, selectedProps).text }}
                </div>
              </ILayoutTransform>
            </div>

            <!-- Interaction Hint -->
            <div class="text-center text-sm text-muted-foreground">
              {{ getInteractionHint(selectedProps.variant) }}
            </div>
          </div>
        </template>
      </ShowcaseDynamic>
    </ShowcaseDemo>

    <!-- ✅ DEBUG TEMPLATE -->
    <template #debug="{ variantProps, variant }">
      <div :class="demoStyles.container">
        <ILayoutTransform
          v-bind="variantProps"
          class="relative"
        >
          <div class="w-24 h-24 bg-secondary/10 border border-secondary/30 rounded flex items-center justify-center text-secondary text-sm font-medium cursor-pointer">
            {{ variant.name }}
          </div>
        </ILayoutTransform>
      </div>
    </template>
  </NuxtLayout>
</template>
