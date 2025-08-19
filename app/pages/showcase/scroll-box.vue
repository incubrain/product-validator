<!-- pages/showcase/scroll-box.vue - CUSTOM CONTENT PER PRESET -->
<script setup lang="ts">
import { ILayoutScrollBox } from '#components'
import { scrollBoxData } from '#theme/layout/scroll-box'

const { createShowcaseConfig, generateShowcaseData, setShowcaseData } = useShowcase()

const demoStyles = {
  container: 'border border-muted rounded bg-elevated/50',
}

const scrollBoxConfig = createShowcaseConfig(ILayoutScrollBox, scrollBoxData, {
  variantDescriptions: {
    variant: 'Scroll behavior and overflow control',
    behavior: 'Scroll animation smoothness',
    overscroll: 'Boundary behavior when reaching scroll limits',
    height: 'Container height constraint',
  },

  presets: [
    {
      name: 'Chat Messages',
      description: 'Vertical scrolling for chat or message lists',
      preset: { variant: 'chat', behavior: 'smooth', overscroll: 'contain', height: 'md' },
      content: { type: 'chat', axis: 'vertical', count: 20 },
    },
    {
      name: 'Horizontal Gallery',
      description: 'Horizontal scrolling with snap points',
      preset: { variant: 'gallery', behavior: 'smooth', overscroll: 'x-contain', height: 'sm' },
      content: { type: 'gallery', axis: 'horizontal', count: 12 },
    },
    {
      name: 'Data Table',
      description: 'Horizontal scroll for wide tables',
      preset: { variant: 'table', behavior: 'auto', overscroll: 'x-contain', height: 'auto' },
      content: { type: 'table', axis: 'horizontal', count: 8 },
    },
    {
      name: 'Carousel Cards',
      description: 'Horizontal carousel with snap behavior',
      preset: { variant: 'carousel', behavior: 'smooth', overscroll: 'x-contain', height: 'sm' },
      content: { type: 'carousel', axis: 'horizontal', count: 10 },
    },
    {
      name: 'Modal Content',
      description: 'Vertical scrolling for modal dialogs',
      preset: { variant: 'modal', behavior: 'smooth', overscroll: 'contain', height: 'lg' },
      content: { type: 'modal', axis: 'vertical', count: 15 },
    },
    {
      name: 'Page Sections',
      description: 'Vertical scroll with section snapping',
      preset: { variant: 'sections', behavior: 'smooth', overscroll: 'y-contain', height: 'xl' },
      content: { type: 'sections', axis: 'vertical', count: 6 },
    },
    {
      name: 'Basic Auto Scroll',
      description: 'Standard auto-scroll behavior',
      preset: { variant: 'auto', behavior: 'auto', overscroll: 'auto', height: 'md' },
      content: { type: 'basic', axis: 'vertical', count: 12 },
    },
  ],
})

// ✅ Generate content based on preset type
const generatePresetContent = (preset) => {
  const { content } = preset

  if (content.axis === 'horizontal') {
    return Array.from({ length: content.count }, (_, i) => ({
      id: i + 1,
      type: content.type,
      axis: 'horizontal',
    }))
  }

  return Array.from({ length: content.count }, (_, i) => ({
    id: i + 1,
    type: content.type,
    axis: 'vertical',
  }))
}

// ✅ Get styling based on content type and axis
const getContentStyling = (type, axis) => {
  const baseClasses = 'transition-all duration-200'

  if (axis === 'horizontal') {
    switch (type) {
      case 'gallery':
        return `${baseClasses} flex-shrink-0 w-40 h-32 bg-blue-500/10 border border-blue-500/30 rounded flex items-center justify-center text-blue-700 text-sm font-medium`
      case 'table':
        return `${baseClasses} flex-shrink-0 w-48 h-20 bg-green-500/10 border border-green-500/30 rounded flex items-center justify-center text-green-700 text-sm px-4`
      case 'carousel':
        return `${baseClasses} flex-shrink-0 w-56 h-40 bg-purple-500/10 border border-purple-500/30 rounded flex items-center justify-center text-purple-700 text-sm font-medium`
      default:
        return `${baseClasses} flex-shrink-0 w-32 h-24 bg-primary/10 border border-primary/30 rounded flex items-center justify-center text-primary text-sm`
    }
  } else {
    switch (type) {
      case 'chat':
        return `${baseClasses} w-full p-3 mb-3 bg-blue-500/10 border-l-4 border-blue-500/50 rounded-r text-blue-700 text-sm`
      case 'modal':
        return `${baseClasses} w-full p-4 mb-4 bg-purple-500/10 border border-purple-500/30 rounded text-purple-700`
      case 'sections':
        return `${baseClasses} w-full h-48 p-6 mb-6 bg-green-500/10 border border-green-500/30 rounded flex items-center justify-center text-green-700 font-medium`
      default:
        return `${baseClasses} w-full p-3 mb-3 bg-muted/30 rounded text-sm`
    }
  }
}

// ✅ Get content text based on type
const getContentText = (item) => {
  switch (item.type) {
    case 'chat':
      return `Message ${item.id}: This is a chat message with some content...`
    case 'gallery':
      return `Photo ${item.id}`
    case 'table':
      return `Column ${item.id}`
    case 'carousel':
      return `Card ${item.id}`
    case 'modal':
      return `Modal Section ${item.id}: Content for modal dialog scrolling...`
    case 'sections':
      return `Section ${item.id}`
    default:
      return `Content ${item.id}`
  }
}

// Add to your component methods
const getPresetForVariant = (variantName: string) => {
  return scrollBoxConfig.presets?.find((preset) => preset.preset.variant === variantName)
}

setShowcaseData(generateShowcaseData(scrollBoxConfig))
</script>

<template>
  <NuxtLayout name="showcase">
    <ShowcaseDemo
      :description="scrollBoxConfig.description"
      title="Scroll Containers"
      :max-cols="1"
    >
      <ShowcaseDynamic
        v-bind="scrollBoxConfig"
      >
        <template #default="{ selectedProps, currentPreset }">
          <ILayoutScrollBox
            v-bind="selectedProps"
            :class="demoStyles.container"
          >
            <!-- ✅ CUSTOM CONTENT BASED ON PRESET -->
            <template v-if="currentPreset">
              <!-- Horizontal Content -->
              <div
                v-if="currentPreset.content.axis === 'horizontal'"
                class="flex gap-4 p-4"
              >
                <div
                  v-for="item in generatePresetContent(currentPreset)"
                  :key="item.id"
                  :class="getContentStyling(item.type, item.axis)"
                >
                  {{ getContentText(item) }}
                </div>
              </div>

              <!-- Vertical Content -->
              <div
                v-else
                class="p-4"
              >
                <div
                  v-for="item in generatePresetContent(currentPreset)"
                  :key="item.id"
                  :class="getContentStyling(item.type, item.axis)"
                >
                  {{ getContentText(item) }}
                </div>
              </div>
            </template>

            <!-- Default content for custom mode -->
            <template v-else>
              <div
                v-if="selectedProps.variant === 'gallery' || selectedProps.variant === 'carousel' || selectedProps.variant === 'table'"
                class="flex gap-4 p-4"
              >
                <div
                  v-for="i in 10"
                  :key="i"
                  class="flex-shrink-0 w-32 h-24 bg-primary/10 border border-primary/30 rounded flex items-center justify-center"
                >
                  Item {{ i }}
                </div>
              </div>
              <div
                v-else
                class="space-y-2 p-4"
              >
                <div
                  v-for="i in 15"
                  :key="i"
                  class="p-3 bg-muted/30 rounded"
                >
                  Content item {{ i }} - {{ selectedProps.variant }}
                </div>
              </div>
            </template>
          </ILayoutScrollBox>
        </template>
      </ShowcaseDynamic>
    </ShowcaseDemo>

    <!-- ✅ DEBUG TEMPLATE WITH CUSTOM CONTENT -->
    <template #debug="{ variantProps, variant }">
      <div :class="demoStyles.container">
        <ILayoutScrollBox v-bind="variantProps">
          <!-- ✅ DYNAMIC CONTENT BASED ON PRESET -->
          <template v-if="getPresetForVariant(variant.name)">
            <!-- Horizontal Content -->
            <div
              v-if="getPresetForVariant(variant.name).content.axis === 'horizontal'"
              class="flex gap-4 p-4"
            >
              <div
                v-for="item in generatePresetContent(getPresetForVariant(variant.name))"
                :key="item.id"
                :class="getContentStyling(item.type, item.axis)"
              >
                {{ getContentText(item) }}
              </div>
            </div>

            <!-- Vertical Content -->
            <div
              v-else
              class="p-4"
            >
              <div
                v-for="item in generatePresetContent(getPresetForVariant(variant.name))"
                :key="item.id"
                :class="getContentStyling(item.type, item.axis)"
              >
                {{ getContentText(item) }}
              </div>
            </div>
          </template>

          <!-- Fallback for variants without presets -->
          <template v-else>
            <div
              v-if="variant.name === 'gallery' || variant.name === 'carousel' || variant.name === 'table'"
              class="flex gap-4 p-4"
            >
              <div
                v-for="i in 8"
                :key="i"
                class="flex-shrink-0 w-32 h-20 bg-secondary/10 border border-secondary/30 rounded flex items-center justify-center text-xs"
              >
                {{ variant.name }}
              </div>
            </div>
            <div
              v-else
              class="space-y-2 p-4"
            >
              <div
                v-for="i in 10"
                :key="i"
                class="p-2 bg-secondary/10 border border-secondary/30 rounded text-center text-sm"
              >
                {{ variant.name }}
              </div>
            </div>
          </template>
        </ILayoutScrollBox>
      </div>
    </template>
  </NuxtLayout>
</template>
