<!-- pages/showcase/columns.vue -->
<script setup>
import { ILayoutColumns } from '#components'
import { columnsData } from '#theme/layout/columns'

const { createShowcaseConfig, generateShowcaseData, setShowcaseData } = useShowcase()

const demoStyles = {
  container: 'i-pattern-circuit border-2 border-dashed border-primary/30 p-6 rounded-lg',
}

const columnsConfig = createShowcaseConfig(ILayoutColumns, columnsData, {
  variantDescriptions: {
    variant: 'Column layout pattern: responsive flow or width-based',
    gap: 'Space between columns',
    spacing: 'Space between items within columns',
  },

  presets: [
    {
      name: 'Portfolio Masonry',
      description: 'Pinterest-style masonry layout for portfolio pieces',
      preset: { variant: 'masonry', gap: 'lg', spacing: 'lg' },
    },
    {
      name: 'Magazine Layout',
      description: 'Dense magazine-style layout for maximum content density',
      preset: { variant: 'dense', gap: 'sm', spacing: 'sm' },
    },
    {
      name: 'Content Cascade',
      description: 'Gentle cascade layout with delayed column introduction',
      preset: { variant: 'cascade', gap: 'xl', spacing: 'lg' },
    },
    {
      name: 'Reading Layout',
      description: 'Narrow columns optimized for comfortable reading',
      preset: { variant: 'narrow', gap: 'lg', spacing: 'md' },
    },
    {
      name: 'Balanced Layout',
      description: 'Balanced column width for general content',
      preset: { variant: 'balanced', gap: 'md', spacing: 'md' },
    },
    {
      name: 'Wide Feature Layout',
      description: 'Wide columns for feature content and large media',
      preset: { variant: 'wide', gap: 'xl', spacing: 'xl' },
    },
    {
      name: 'Simple Split',
      description: 'Two-column split for comparisons and pairs',
      preset: { variant: 'split', gap: 'lg', spacing: 'lg' },
    },
    {
      name: 'Auto Layout',
      description: 'Automatic column sizing based on content',
      preset: { variant: 'auto', gap: 'md', spacing: 'md' },
    },
  ],
})

setShowcaseData(generateShowcaseData(columnsConfig))
</script>

<template>
  <NuxtLayout name="showcase">
    <ShowcaseDemo
      title="CSS Columns"
    :description="columnsConfig.description"
      :max-cols="1"
    >
      <ShowcaseDynamic
        v-bind="columnsConfig"
      >
        <template #default="{ selectedProps }">
          <div :class="demoStyles.container">
            <ILayoutColumns
              v-bind="selectedProps"
              class="w-full"
            >
              <div
                v-for="i in 12"
                :key="i"
                :class="[
                  'p-4 rounded text-center transition-all duration-200',
                  'bg-primary/10 border border-primary/30 hover:bg-primary/20',
                  'break-inside-avoid mb-4',
                ]"
                :style="{ height: `${(20 + (i % 5) * 12) * 4}px` }"
              >
                <div class="flex flex-col items-center justify-center h-full">
                  <span class="text-primary font-medium">Item {{ i }}</span>
                  <span class="text-xs text-muted-foreground mt-1">{{ selectedProps.variant }}</span>
                </div>
              </div>
            </ILayoutColumns>
          </div>
        </template>
      </ShowcaseDynamic>
    </ShowcaseDemo>
  </NuxtLayout>
</template>
