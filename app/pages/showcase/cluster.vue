<!-- pages/showcase/cluster.vue - UPDATED -->
<script setup>
import { ILayoutCluster } from '#components'
import { clusterData } from '#theme/layout/cluster'

const { createShowcaseConfig, generateShowcaseData, setShowcaseData } = useShowcase()

const demoStyles = {
  container: 'i-pattern-circuit border-2 border-dashed border-primary/30 p-6 rounded-lg',
  element: 'px-3 py-1.5 rounded text-sm font-medium transition-all duration-200',
}

const clusterConfig = createShowcaseConfig(ILayoutCluster, clusterData, {
  variantDescriptions: {
    variant: 'Cluster layout pattern: alignment and flow behavior',
  },

  presets: [
    {
      name: 'Navigation Cluster',
      description: 'Standard horizontal navigation with balanced spacing',
      preset: { variant: 'default' },
    },
    {
      name: 'Centered Actions',
      description: 'Center-aligned action buttons and controls',
      preset: { variant: 'centered' },
    },
    {
      name: 'Tag Cloud',
      description: 'Tight spacing for tags and compact elements',
      preset: { variant: 'tight' },
    },
    {
      name: 'Inline Controls',
      description: 'No-wrap inline layout for control groups',
      preset: { variant: 'no-wrap' },
    },
    {
      name: 'Vertical Stack',
      description: 'Vertical stacking for sidebar navigation',
      preset: { variant: 'vertical' },
    },
    {
      name: 'Inline Elements',
      description: 'Inline-flex for text-level elements',
      preset: { variant: 'inline' },
    },
  ],
})

setShowcaseData(generateShowcaseData(clusterConfig))
</script>

<template>
  <NuxtLayout name="showcase">
    <ShowcaseDemo
      :description="clusterConfig.description"
      title="Cluster Positioning"
      :max-cols="1"
    >
      <ShowcaseDynamic
        v-bind="clusterConfig"
        :badge-number="1"
      >
        <template #default="{ selectedProps }">
          <div :class="demoStyles.container">
            <ILayoutCluster
              v-bind="selectedProps"
              class="w-full"
            >
              <div
                v-for="i in 6"
                :key="i"
                :class="demoStyles.element + ' bg-primary/10 text-primary border border-primary/30'"
              >
                Item {{ i }}
              </div>
            </ILayoutCluster>
          </div>
        </template>
      </ShowcaseDynamic>
    </ShowcaseDemo>

    <template #debug="{ variantProps, variant }">
      <div :class="demoStyles.container">
        <ILayoutCluster
          v-bind="variantProps"
          class="w-full"
        >
          <div
            v-for="i in 4"
            :key="i"
            :class="demoStyles.element + ' bg-secondary/10 text-secondary border border-secondary/30'"
          >
            {{ variant.name }}
          </div>
        </ILayoutCluster>
      </div>
    </template>
  </NuxtLayout>
</template>
