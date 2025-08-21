<!-- pages/showcase/gradient.vue -->
<script setup lang="ts">
import { WipGradient } from '#components'
import { gradientData } from '#theme/wip/gradient'

const { createShowcaseConfig, generateShowcaseData, setShowcaseData } = useShowcase()

const demoStyles = {
  container: 'h-80 rounded-lg overflow-hidden relative',
}

const gradientConfig = createShowcaseConfig(WipGradient, gradientData, {
  variantDescriptions: {
    variant: 'Gradient pattern type',
    intensity: 'Visual intensity level',
    direction: 'Linear gradient direction',
    position: 'Radial/spotlight gradient position',
    angle: 'Conic gradient rotation direction',
    x: 'Spotlight horizontal position',
    y: 'Spotlight vertical position',
    from: 'Starting color',
  },

  variants: [
    {
      name: 'variant',
      type: 'select',
      options: ['linear', 'radial', 'conic', 'mesh', 'spotlight', 'shimmer'],
      default: 'linear',
      description: 'Gradient pattern type',
    },
    {
      name: 'intensity',
      type: 'select',
      options: ['subtle', 'medium', 'strong', 'intense'],
      default: 'medium',
      description: 'Visual intensity level',
    },
    {
      name: 'direction',
      type: 'select',
      options: ['diagonal', 'vertical', 'horizontal', 'up', 'down', 'ne', 'nw', 'se', 'sw'],
      default: 'diagonal',
      description: 'Linear gradient direction',
    },
    {
      name: 'position',
      type: 'select',
      options: ['center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
      default: 'center',
      description: 'Radial/spotlight position',
    },
    {
      name: 'angle',
      type: 'select',
      options: ['start', 'ne', 'up', 'nw', 'reverse', 'sw', 'down', 'se'],
      default: 'start',
      description: 'Conic rotation direction',
    },
    {
      name: 'x',
      type: 'select',
      options: ['left', 'quarter', 'center', 'three-quarter', 'right'],
      default: 'center',
      description: 'Spotlight X position',
    },
    {
      name: 'y',
      type: 'select',
      options: ['top', 'quarter', 'center', 'three-quarter', 'bottom'],
      default: 'center',
      description: 'Spotlight Y position',
    },
    {
      name: 'from',
      type: 'select',
      options: [
        'primary-500', 'secondary-500', 'success-500', 'warning-500',
        'error-500', 'info-500', 'neutral-500',
      ],
      default: 'primary-500',
      description: 'Starting color',
    },
  ],

  presets: [
    {
      name: 'Linear Diagonal',
      description: 'Classic diagonal linear gradient for hero sections',
      preset: { variant: 'linear', intensity: 'medium', direction: 'diagonal', from: 'primary-500' },
      content: { type: 'hero', purpose: 'background' },
    },
    {
      name: 'Linear Vertical',
      description: 'Top-to-bottom fade for section backgrounds',
      preset: { variant: 'linear', intensity: 'subtle', direction: 'vertical', from: 'secondary-500' },
      content: { type: 'section', purpose: 'background' },
    },
    {
      name: 'Radial Center',
      description: 'Center radial highlight for content areas',
      preset: { variant: 'radial', intensity: 'medium', position: 'center', from: 'success-500' },
      content: { type: 'spotlight', purpose: 'accent' },
    },
    {
      name: 'Radial Corner',
      description: 'Corner radial accent for cards and panels',
      preset: { variant: 'radial', intensity: 'subtle', position: 'top-right', from: 'info-500' },
      content: { type: 'accent', purpose: 'decoration' },
    },
    {
      name: 'Conic Spin',
      description: 'Rotating conic gradient for dynamic elements',
      preset: { variant: 'conic', intensity: 'strong', angle: 'ne', from: 'warning-500' },
      content: { type: 'accent', purpose: 'decoration' },
    },
    {
      name: 'Spotlight Focus',
      description: 'Positioned spotlight for call-to-action areas',
      preset: { variant: 'spotlight', intensity: 'medium', position: 'center', x: 'quarter', y: 'quarter', from: 'primary-600' },
      content: { type: 'cta', purpose: 'highlight' },
    },
    {
      name: 'Mesh Background',
      description: 'Complex mesh texture for backgrounds',
      preset: { variant: 'mesh', intensity: 'subtle', from: 'neutral-500' },
      content: { type: 'background', purpose: 'texture' },
    },
    {
      name: 'Shimmer Loading',
      description: 'Animated shimmer for loading states',
      preset: { variant: 'shimmer', intensity: 'medium', from: 'info-400' },
      content: { type: 'animation', purpose: 'effect' },
    },
  ],
})

// ✅ USE PROP MAPPINGS FROM GRADIENT DATA
const getRelevantProps = (variant) => {
  return gradientData.coreData.propMappings?.[variant] || ['intensity', 'from']
}

// ✅ SIMPLIFIED CONTENT HELPER
const getSampleContent = (preset) => {
  if (!preset) return { text: 'Gradient Preview', icon: '🎨' }

  const contentMap = {
    hero: { text: 'Hero Section', icon: '🚀' },
    spotlight: { text: 'Spotlight Area', icon: '💡' },
    section: { text: 'Section Background', icon: '📄' },
    accent: { text: 'Accent Decoration', icon: '✨' },
    background: { text: 'Background Texture', icon: '🎭' },
    cta: { text: 'Call to Action', icon: '👆' },
    animation: { text: 'Loading Animation', icon: '⏳' },
  }

  return contentMap[preset.content.type] || { text: 'Gradient Effect', icon: '🎨' }
}

// ✅ SIMPLIFIED DESCRIPTIONS
const getGradientDescription = (variant) => {
  const descriptions = {
    linear: 'Linear gradient with semantic direction control',
    radial: 'Radial gradient with position variants',
    conic: 'Conic gradient with semantic rotation',
    mesh: 'Multi-point gradient mesh',
    spotlight: 'Focused gradient with precise positioning',
    shimmer: 'Animated shimmer effect',
  }
  return descriptions[variant] || 'Custom gradient effect'
}

setShowcaseData(generateShowcaseData(gradientConfig))
</script>

<template>
  <NuxtLayout name="showcase">
    <ShowcaseDemo
      :description="gradientConfig.description"
      title="Complete Gradient System"
      :max-cols="1"
    >
      <ShowcaseDynamic
        v-bind="gradientConfig"
      >
        <template #default="{ selectedProps, currentPreset }">
          <div class="space-y-4">
            <!-- ✅ SIMPLIFIED INFO SECTION -->
            <div
              v-if="currentPreset"
              class="p-4 bg-elevated rounded-lg border border-muted"
            >
              <div class="flex items-center gap-3 mb-2">
                <h4 class="font-semibold text-sm text-primary">
                  {{ currentPreset.name }}
                </h4>
                <UBadge
                  variant="soft"
                  color="secondary"
                  size="sm"
                >
                  {{ selectedProps.variant }}
                </UBadge>
                <UBadge
                  variant="soft"
                  color="neutral"
                  size="sm"
                >
                  {{ selectedProps.intensity }}
                </UBadge>
              </div>
              <p class="text-xs text-muted-foreground mb-3">
                {{ currentPreset.description }}
              </p>

              <!-- ✅ DYNAMIC RELEVANT PROPS -->
              <div class="space-y-2">
                <div class="text-xs font-medium text-muted-foreground">
                  Active Controls:
                </div>
                <div class="flex flex-wrap gap-2 text-xs">
                  <span class="text-muted-foreground">
                    variant: <code class="text-primary">{{ selectedProps.variant }}</code>
                  </span>
                  <template
                    v-for="prop in getRelevantProps(selectedProps.variant)"
                    :key="prop"
                  >
                    <span
                      v-if="selectedProps[prop]"
                      class="text-muted-foreground"
                    >
                      {{ prop }}: <code class="text-primary">{{ selectedProps[prop] }}</code>
                    </span>
                  </template>
                </div>
              </div>
            </div>

            <!-- ✅ GRADIENT PREVIEW -->
            <div :class="demoStyles.container">
              <WipGradient
                v-bind="selectedProps"
                class="w-full h-full flex items-center justify-center"
              >
                <div class="text-center text-white drop-shadow-lg">
                  <div class="text-2xl mb-1">
                    {{ getSampleContent(currentPreset).icon }}
                  </div>
                  <div class="text-sm font-medium">
                    {{ getSampleContent(currentPreset).text }}
                  </div>
                  <div class="text-xs opacity-75 mt-1">
                    {{ selectedProps.variant }} • {{ selectedProps.intensity }}
                  </div>
                </div>
              </WipGradient>
            </div>

            <!-- ✅ VARIANT GUIDANCE -->
            <div class="p-3 bg-secondary/5 rounded-lg border border-secondary/20">
              <div class="text-xs text-secondary font-medium mb-1">
                💡 {{ selectedProps.variant.charAt(0).toUpperCase() + selectedProps.variant.slice(1) }} Gradient
              </div>
              <div class="text-xs text-muted-foreground">
                {{ getGradientDescription(selectedProps.variant) }}
              </div>
            </div>
          </div>
        </template>
      </ShowcaseDynamic>
    </ShowcaseDemo>

    <!-- ✅ SIMPLIFIED DEBUG -->
    <template #debug="{ variantProps, variant }">
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <UBadge
            variant="solid"
            color="primary"
            size="sm"
          >
            {{ variant.name }}
          </UBadge>
          <span class="text-xs text-muted-foreground">
            {{ ['variant', ...getRelevantProps(variantProps.variant)].join(', ') }}
          </span>
        </div>
        <div :class="demoStyles.container">
          <WipGradient
            v-bind="variantProps"
            class="w-full h-full flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity"
          >
            <div class="text-center text-white drop-shadow-lg">
              <div class="text-lg mb-1">
                🎨
              </div>
              <div class="text-xs font-medium">
                {{ variant.name }}
              </div>
              <div class="text-xs opacity-75">
                {{ variantProps.intensity }}
              </div>
            </div>
          </WipGradient>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>
