<!-- pages/showcase/stack.vue - UPDATED -->
<script setup>
import { ILayoutStack } from '#components'
import { stackData } from '#theme/layout/stack'

const { createShowcaseConfig, generateShowcaseData, setShowcaseData } = useShowcase()

const demoStyles = {
  container: 'i-pattern-circuit border-2 border-dashed border-primary/30 p-6 rounded-lg',
}

const stackConfig = createShowcaseConfig(ILayoutStack, stackData, {
  variantDescriptions: {
    variant: 'Stacking behavior and alignment pattern',
    gap: 'Space between stacked items',
  },

  presets: [
    {
      name: 'Form Layout',
      description: 'Vertical form with consistent field spacing',
      preset: { variant: 'default', gap: 'md' },
    },
    {
      name: 'Navigation Header',
      description: 'Horizontal navigation with space-between',
      preset: { variant: 'horizontal-between', gap: 'none' },
    },
    {
      name: 'Action Buttons',
      description: 'Centered button group for forms and modals',
      preset: { variant: 'horizontal-center', gap: 'md' },
    },
    {
      name: 'Space Between Layout',
      description: 'Vertical distribution with space-between for full height layouts',
      preset: { variant: 'between', gap: 'none' },
    },
    {
      name: 'Responsive Cards',
      description: 'Stack on mobile, row on desktop for adaptive card layouts',
      preset: { variant: 'stack-to-row', gap: 'lg' },
    },
    {
      name: 'Adaptive Header',
      description: 'Center on mobile, space-between on desktop for responsive headers',
      preset: { variant: 'center-to-between', gap: 'md' },
    },
  ],
})

setShowcaseData(generateShowcaseData(stackConfig))
</script>

<template>
  <NuxtLayout name="showcase">
    <ShowcaseDemo
      title="Stack Positioning"
      :max-cols="1"
    >
      <ShowcaseDynamic
        v-bind="stackConfig"
        :badge-number="1"
      >
        <template #default="{ selectedProps }">
          <div :class="demoStyles.container">
            <ILayoutStack
              v-bind="selectedProps"
              class="w-full min-h-[200px]"
            >
              <div
                v-for="i in 3"
                :key="i"
                class="p-4 rounded bg-primary/10 border border-primary/30 text-center"
              >
                Item {{ i }}
              </div>
            </ILayoutStack>
          </div>
        </template>
      </ShowcaseDynamic>
    </ShowcaseDemo>

    <template #debug="{ variantProps, variant }">
      <div :class="demoStyles.container">
        <ILayoutStack
          v-bind="variantProps"
          class="w-full min-h-[150px]"
        >
          <div
            v-for="i in 3"
            :key="i"
            class="p-3 rounded bg-secondary/10 border border-secondary/30 text-center text-sm"
          >
            {{ variant.name }}
          </div>
        </ILayoutStack>
      </div>
    </template>
  </NuxtLayout>
</template>
