<!-- pages/showcase/split.vue - UPDATED -->
<script setup>
import { ILayoutSplit } from '#components'
import { splitData } from '#theme/layout/split'

const { createShowcaseConfig, generateShowcaseData, setShowcaseData } = useShowcase()

const splitConfig = createShowcaseConfig(ILayoutSplit, splitData, {
  variantDescriptions: {
    ratio: 'Column width ratio distribution',
    gap: 'Space between columns',
    reverse: 'Reverse column order on mobile',
  },

  presets: [
    {
      name: 'Blog Layout',
      description: 'Classic article layout with sidebar',
      preset: { ratio: '70-30', gap: 'lg', reverse: false },
    },
    {
      name: 'Dashboard',
      description: 'Admin interface with primary data display',
      preset: { ratio: '80-20', gap: 'md', reverse: false },
    },
    {
      name: 'Hero Section',
      description: 'Landing page hero with balanced content',
      preset: { ratio: '50-50', gap: 'xl', reverse: true },
    },
  ],
})

setShowcaseData(generateShowcaseData(splitConfig))
</script>

<template>
  <NuxtLayout name="showcase">
    <ShowcaseDemo
      :description="splitConfig.description"
      title="Split Positioning"
      :max-cols="1"
    >
      <ShowcaseDynamic
        v-bind="splitConfig"
      >
        <template #default="{ selectedProps }">
          <ILayoutSplit
            v-bind="selectedProps"
            class="w-full min-h-[200px]"
          >
            <template #first>
              <div class="p-6 rounded bg-info/10 border border-info/30 text-center h-full">
                <h4 class="font-semibold">
                  First Column
                </h4>
                <p class="text-sm opacity-70 mt-1">
                  Primary content area
                </p>
              </div>
            </template>
            <template #second>
              <div class="p-6 rounded bg-warning/10 border border-warning/30 text-center h-full">
                <h4 class="font-semibold">
                  Second Column
                </h4>
                <p class="text-sm opacity-70 mt-1">
                  Secondary content area
                </p>
              </div>
            </template>
          </ILayoutSplit>
        </template>
      </ShowcaseDynamic>
    </ShowcaseDemo>
  </NuxtLayout>
</template>
