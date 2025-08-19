<!-- pages/showcase/container.vue - UPDATED -->
<script setup>
import { ILayoutContainer } from '#components'
import { containerData } from '#theme/layout/container'

const { createShowcaseConfig, generateShowcaseData, setShowcaseData } = useShowcase()

const containerConfig = createShowcaseConfig(ILayoutContainer, containerData, {
  variantDescriptions: {
    variant: 'Container width and content optimization',
  },

  presets: [
    {
      name: 'Reading Content',
      description: 'Optimal reading width for articles and documentation',
      preset: { variant: 'prose' },
    },
    {
      name: 'Form Layout',
      description: 'Narrow width perfect for forms and focused content',
      preset: { variant: 'narrow' },
    },
    {
      name: 'Standard Layout',
      description: 'Default width for general content and layouts',
      preset: { variant: 'default' },
    },
    {
      name: 'Feature Showcase',
      description: 'Wide layout for feature content and media',
      preset: { variant: 'wide' },
    },
    {
      name: 'Full Width',
      description: 'Complete width utilization for immersive content',
      preset: { variant: 'full' },
    },
    {
      name: 'True Fullscreen',
      description: 'Screen-edge layout for maximum utilization',
      preset: { variant: 'screen' },
    },
  ],
})

setShowcaseData(generateShowcaseData(containerConfig))
</script>

<template>
  <NuxtLayout name="showcase">
    <ShowcaseDemo
      :description="containerConfig.description"
      title="All Variants Comparison"
      :max-cols="1"
    >
      <div class="space-y-6">
        <div
          v-for="preset in containerConfig.presets"
          :key="preset.name"
          class="space-y-3"
        >
          <div class="flex items-center justify-center gap-3 text-sm">
            <strong>{{ preset.name }}</strong>
            <span class="px-2 py-1 bg-muted rounded text-xs font-mono">{{ preset.preset.variant }}</span>
          </div>
          <ILayoutContainer
            :variant="preset.preset.variant"
            class="border border-muted bg-muted/10 min-h-[80px]"
          >
            <div class="text-center py-6">
              <div class="text-sm font-medium">
                {{ preset.name }}
              </div>
              <div class="text-xs text-muted-foreground">
                {{ preset.description }}
              </div>
            </div>
          </ILayoutContainer>
        </div>
      </div>
    </ShowcaseDemo>
  </NuxtLayout>
</template>
