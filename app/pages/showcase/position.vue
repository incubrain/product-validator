<!-- pages/showcase/layout-position.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { ILayoutPosition } from '#components'
import { layoutPositionData } from '#theme/layout/position'

const { createShowcaseConfig, generateShowcaseData, setShowcaseData } = useShowcase()

// ✅ ADD: Scroll container ref for proper scroll tracking
const scrollContainerRef = ref<HTMLElement>()

const demoStyles = {
  container: 'border border-muted rounded bg-elevated/50 relative min-h-[300px] overflow-hidden',
  viewport: 'relative h-[400px] overflow-auto bg-muted/20 rounded',
}

const layoutPositionConfig = createShowcaseConfig(ILayoutPosition, layoutPositionData, {
  variantDescriptions: {
    variant: 'Positioning method and placement pattern',
    offset: 'Distance from positioning edges',
    zIndex: 'Stacking order and layer management',
    isolation: 'Stacking context control',
    behavior: 'Scroll-based visibility behavior',
  },

  presets: [
    // ✅ UPDATED: Add container-based presets to actually demo in showcase
    {
      name: 'Sticky Header',
      description: 'Header that sticks to top while scrolling',
      preset: { variant: 'sticky-top', zIndex: 'header', behavior: 'default', offset: 'none' },
      content: { type: 'header', placement: 'top', context: 'container' },
    },
    {
      name: 'Absolute Tooltip',
      description: 'Tooltip positioned in top-right corner',
      preset: { variant: 'absolute-tr', zIndex: 'tooltip', isolation: 'isolate', offset: 'sm' },
      content: { type: 'tooltip', placement: 'top-right', context: 'container' },
    },
    {
      name: 'Centered Modal',
      description: 'Modal centered within container',
      preset: { variant: 'absolute-center', zIndex: 'modal', isolation: 'isolate', offset: 'none' },
      content: { type: 'modal', placement: 'center', context: 'container' },
    },
    {
      name: 'Cover Overlay',
      description: 'Full coverage overlay for backgrounds',
      preset: { variant: 'absolute-cover', zIndex: 'base', isolation: 'auto', offset: 'none' },
      content: { type: 'overlay', placement: 'cover', context: 'container' },
    },
    {
      name: 'Corner Button',
      description: 'Action button in bottom-right corner',
      preset: { variant: 'absolute-br', zIndex: 'floating', behavior: 'default', offset: 'md' },
      content: { type: 'cta', placement: 'bottom-right', context: 'container' },
    },
    {
      name: 'Fixed Header (Viewport)',
      description: 'Header fixed to actual viewport - escapes demo',
      preset: { variant: 'fixed-top', zIndex: 'header', behavior: 'hide-on-scroll', offset: 'none' },
      content: { type: 'header', placement: 'bottom', context: 'viewport' },
    },
    {
      name: 'Floating CTA (Viewport)',
      description: 'CTA fixed to viewport - escapes demo',
      preset: { variant: 'floating-br', zIndex: 'floating', behavior: 'default', offset: 'md' },
      content: { type: 'cta', placement: 'bottom', context: 'viewport' },
    },
  ],
})

// ✅ Generate content based on preset type
const generatePresetContent = (preset) => {
  const { content } = preset

  return {
    id: 1,
    type: content.type,
    placement: content.placement,
    context: content.context,
  }
}

// ✅ Get styling based on content type
const getContentStyling = (type, placement) => {
  const baseClasses = 'transition-all duration-200 rounded shadow-sm'

  switch (type) {
    case 'header':
      return `${baseClasses} w-full h-16 bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-700 font-medium`
    case 'cta':
      return `${baseClasses} w-14 h-14 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center text-green-700 font-bold text-lg hover:scale-110`
    case 'modal':
      return `${baseClasses} w-80 h-48 bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-700 font-medium backdrop-blur-sm`
    case 'sidebar':
      return `${baseClasses} w-64 h-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-700 font-medium`
    case 'tooltip':
      return `${baseClasses} w-32 h-12 bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-700 text-xs font-medium`
    case 'notification':
      return `${baseClasses} w-72 h-20 bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-700 text-sm font-medium`
    case 'overlay':
      return `${baseClasses} w-full h-full bg-gray-500/10 border border-gray-500/30 flex items-center justify-center text-gray-700 font-medium`
    default:
      return `${baseClasses} w-32 h-24 bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-sm`
  }
}

// ✅ Get content text based on type
const getContentText = (item) => {
  switch (item.type) {
    case 'header':
      return 'Header Navigation'
    case 'cta':
      return '+'
    case 'modal':
      return 'Modal Dialog'
    case 'sidebar':
      return 'Sidebar Menu'
    case 'tooltip':
      return 'Tooltip'
    case 'notification':
      return 'Notification Panel'
    case 'overlay':
      return 'Background Overlay'
    default:
      return `${item.type} Element`
  }
}

// ✅ Get demo content for positioning context
const getDemoContent = (variant) => {
  if (variant?.includes('sticky') || variant?.includes('hide-on-scroll')) {
    // ✅ ADD MORE CONTENT: Need lots of content to see sticky behavior
    return Array.from({ length: 40 }, (_, i) =>
      `Scroll content item ${i + 1} - Keep scrolling to see positioning behavior...`,
    )
  }
  return Array.from({ length: 20 }, (_, i) => `Demo content item ${i + 1}`)
}

setShowcaseData(generateShowcaseData(layoutPositionConfig))
</script>

<template>
  <NuxtLayout name="showcase">
    <ShowcaseDemo
      :description="layoutPositionConfig.description"
      title="Layout Positioning"
      :max-cols="1"
    >
      <ShowcaseDynamic
        v-bind="layoutPositionConfig"
      >
        <template #default="{ selectedProps, currentPreset }">
          <div
            ref="scrollContainerRef"
            :class="demoStyles.viewport"
          >
            <!-- ✅ MOVE: Positioned element FIRST, before content -->
            <ILayoutPosition
              v-bind="selectedProps"
              :scroll-container="scrollContainerRef"
            >
              <template v-if="currentPreset">
                <div
                  :class="getContentStyling(
                    generatePresetContent(currentPreset).type,
                    generatePresetContent(currentPreset).placement,
                  )"
                >
                  {{ getContentText(generatePresetContent(currentPreset)) }}
                </div>
              </template>

              <!-- Default content for custom mode -->
              <template v-else>
                <div class="w-32 h-24 bg-primary/10 border border-primary/30 rounded flex items-center justify-center text-primary text-sm font-medium">
                  {{ selectedProps.variant }}
                </div>
              </template>
            </ILayoutPosition>

            <!-- Demo content AFTER positioned element -->
            <div class="p-6 space-y-4">
              <div
                v-for="(content, i) in getDemoContent(selectedProps.variant)"
                :key="i"
                class="p-4 bg-muted/50 rounded text-sm"
              >
                {{ content }}
              </div>
            </div>
          </div>
        </template>
      </ShowcaseDynamic>
    </ShowcaseDemo>

    <template #debug="{ selectedProps, currentPreset }">
      <div
        ref="scrollContainerRef"
        :class="demoStyles.viewport"
      >
        <!-- ✅ MOVE: Positioned element FIRST, before content -->
        <ILayoutPosition
          v-bind="selectedProps"
          :scroll-container="scrollContainerRef"
        >
          <template v-if="currentPreset">
            <div
              :class="getContentStyling(
                generatePresetContent(currentPreset).type,
                generatePresetContent(currentPreset).placement,
              )"
            >
              {{ getContentText(generatePresetContent(currentPreset)) }}
            </div>
          </template>

          <!-- Default content for custom mode -->
          <template v-else>
            <div class="w-32 h-24 bg-primary/10 border border-primary/30 rounded flex items-center justify-center text-primary text-sm font-medium">
              {{ selectedProps.variant }}
            </div>
          </template>
        </ILayoutPosition>

        <!-- Demo content AFTER positioned element -->
        <div class="p-6 space-y-4">
          <div
            v-for="(content, i) in getDemoContent(selectedProps.variant)"
            :key="i"
          >
            {{ content }}
          </div>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>
