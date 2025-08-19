<!-- pages/showcase/grid.vue - UPDATED -->
<script setup>
import { ILayoutGrid } from '#components'
import { gridData } from '#theme/layout/grid'

const { createShowcaseConfig, generateShowcaseData, setShowcaseData } = useShowcase()

const demoStyles = {
  container: 'i-pattern-circuit border-2 border-dashed border-primary/30 p-6 rounded-lg',
}

const gridConfig = createShowcaseConfig(ILayoutGrid, gridData, {
  variantDescriptions: {
    variant: 'Grid layout pattern: auto-sizing, responsive, or advanced layouts',
    flow: 'Grid auto-placement flow direction',
    gap: 'Space between grid items',
    align: 'Grid item alignment and content distribution',
  },

  presets: [
    {
      name: 'Auto-Fit Grid',
      description: 'CSS Grid auto-fit with responsive column sizing',
      preset: { variant: 'auto-fit', flow: 'row', gap: 'md', align: 'stretch' },
    },
    {
      name: 'Team Grid',
      description: 'Three-column grid for team member profiles',
      preset: { variant: 'thirds', flow: 'row', gap: 'lg', align: 'center' },
    },
    {
      name: 'Product Grid',
      description: 'Compact grid for maximum product density',
      preset: { variant: 'compact', flow: 'row', gap: 'md', align: 'stretch' },
    },
    {
      name: 'Sidebar Layout',
      description: 'Fixed sidebar with flexible main content area',
      preset: { variant: 'sidebar', flow: 'row', gap: 'xl', align: 'stretch' },
    },
    {
      name: 'Content Layout',
      description: 'Main content with fixed sidebar on right',
      preset: { variant: 'content', flow: 'row', gap: 'xl', align: 'stretch' },
    },
    {
      name: 'Feature Layout',
      description: 'Feature content with supporting sidebar',
      preset: { variant: 'feature', flow: 'row', gap: 'lg', align: 'start' },
    },
    {
      name: 'Golden Ratio',
      description: 'Golden ratio proportions for balanced layouts',
      preset: { variant: 'golden', flow: 'row', gap: 'lg', align: 'center' },
    },
  ],
})

setShowcaseData(generateShowcaseData(gridConfig))
</script>

<template>
  <NuxtLayout name="showcase">
    <ShowcaseDemo
      title="Grid Positioning"
      :max-cols="1"
    >
      <ShowcaseDynamic
        v-bind="gridConfig"
        :badge-number="1"
      >
        <template #default="{ selectedProps }">
          <div :class="demoStyles.container">
            <ILayoutGrid
              v-bind="selectedProps"
              class="w-full"
            >
              <div
                v-for="i in 8"
                :key="i"
                class="p-4 rounded bg-primary/10 border border-primary/30 text-center h-24"
              >
                Item {{ i }}
              </div>
            </ILayoutGrid>
          </div>
        </template>
      </ShowcaseDynamic>
    </ShowcaseDemo>

    <template #debug="{ variantProps, variant }">
      <div :class="demoStyles.container">
        <ILayoutGrid
          v-bind="variantProps"
          class="w-full"
        >
          <div
            v-for="i in 6"
            :key="i"
            class="p-3 rounded bg-secondary/10 border border-secondary/30 text-center h-20 text-sm"
          >
            {{ variant.name }}
          </div>
        </ILayoutGrid>
      </div>
    </template>
  </NuxtLayout>
</template>
