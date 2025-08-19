<!-- pages/showcase/divider.vue -->
<script setup>
import { ILayoutDivider } from '#components'
import { dividerData } from '#theme/layout/divider'

const { createShowcaseConfig, generateShowcaseData, setShowcaseData } = useShowcase()

const demoStyles = {
  container: 'space-y-8 p-6',
}

const dividerConfig = createShowcaseConfig(ILayoutDivider, dividerData, {
  variantDescriptions: {
    variant: 'Divider visual style and appearance',
    spacing: 'Vertical spacing around divider',
    orientation: 'Horizontal or vertical orientation',
  },

  presets: [
    {
      name: 'Section Break',
      description: 'Standard section divider with medium spacing',
      preset: { variant: 'line', spacing: 'md', orientation: 'horizontal' },
    },
    {
      name: 'Subtle Separator',
      description: 'Gradient divider for subtle content separation',
      preset: { variant: 'gradient', spacing: 'lg', orientation: 'horizontal' },
    },
    {
      name: 'Branded Divider',
      description: 'Primary color gradient for branded sections',
      preset: { variant: 'branded', spacing: 'xl', orientation: 'horizontal' },
    },
    {
      name: 'Dotted Break',
      description: 'Dotted line for informal content separation',
      preset: { variant: 'dotted', spacing: 'md', orientation: 'horizontal' },
    },
    {
      name: 'Tight Spacing',
      description: 'Minimal spacing for dense content layouts',
      preset: { variant: 'line', spacing: 'sm', orientation: 'horizontal' },
    },
    {
      name: 'Generous Spacing',
      description: 'Extra large spacing for dramatic section breaks',
      preset: { variant: 'line', spacing: 'xl', orientation: 'horizontal' },
    },
    {
      name: 'Vertical Sidebar',
      description: 'Vertical divider for sidebar layouts',
      preset: { variant: 'line', spacing: 'md', orientation: 'vertical' },
    },
  ],
})

setShowcaseData(generateShowcaseData(dividerConfig))
</script>

<template>
  <NuxtLayout name="showcase">
    <ShowcaseDemo
      title="Divider Styles"
      :max-cols="1"
    >
      <ShowcaseDynamic
        v-bind="dividerConfig"
      >
        <template #default="{ selectedProps }">
          <div :class="demoStyles.container">
            <div class="p-4 bg-muted/20 rounded">
              Content Above
            </div>
            <ILayoutDivider v-bind="selectedProps" />
            <div class="p-4 bg-muted/20 rounded">
              Content Below
            </div>
          </div>
        </template>
      </ShowcaseDynamic>
    </ShowcaseDemo>
  </NuxtLayout>
</template>
