<!-- pages/showcase/float.vue - CLEAN & AUTO-GENERATED -->
<script setup>
import { ILayoutFloat } from '#components'
import { floatData } from '#theme/layout/float' // Contains explicit title/description

const { createShowcaseConfig, generateShowcaseData, setShowcaseData } = useShowcase()

const demoStyles = {
  container: 'relative min-h-[300px]',
  element: 'w-80 aspect-video bg-secondary/20 border border-secondary/50 rounded flex items-center justify-center text-secondary text-sm font-medium',
  text: 'lorem_400',
}

const floatConfig = createShowcaseConfig(ILayoutFloat, floatData, {
  variantDescriptions: {
    variant: 'Float left or right - that\'s it',
    clear: 'Clear floating elements',
    responsive: 'Stack on mobile or keep floating',
  },

  presets: [
    {
      name: 'Article Image',
      description: 'Left-floated image with text wrapping - the classic blog post pattern',
      behavior: 'Image floats left with spacing. Text wraps around the right side. Stacks on mobile.',
      preset: { variant: 'left', clear: 'none', responsive: 'stack-mobile' },
    },
    {
      name: 'Pull Quote',
      description: 'Right-floated quote that draws attention within flowing content',
      behavior: 'Quote floats right with spacing. Text flows around the left side. Stacks on mobile.',
      preset: { variant: 'right', clear: 'none', responsive: 'stack-mobile' },
    },
    {
      name: 'Sidebar Widget',
      description: 'Left-floated sidebar content with section clearing',
      behavior: 'Widget floats left and clears previous floats. Creates clean section breaks.',
      preset: { variant: 'left', clear: 'both', responsive: 'stack-mobile' },
    },
  ],
})

setShowcaseData(generateShowcaseData(floatConfig))
</script>

<template>
  <div>
    <NuxtLayout
      name="showcase"
      :title="floatConfig.title"
      :subtitle="'CSS float utilities for left/right positioning and text wrapping'"
      :config="floatConfig"
    >
      <ShowcaseDemo
        title="Float Positioning"
        description="CSS float only supports left and right positioning"
        :max-cols="1"
      >
        <ShowcaseDynamic
          v-bind="floatConfig"
        >
          <template #default="{ selectedProps, currentPreset }">
            <div class="space-y-4">
              <div
                v-if="currentPreset"
                class="p-4 bg-elevated rounded-lg border border-muted"
              >
                <h4 class="font-semibold text-sm text-primary mb-2">
                  {{ currentPreset.name }}
                </h4>
                <p class="text-xs text-muted-foreground">
                  {{ currentPreset.description }}
                </p>
              </div>

              <div :class="demoStyles.container">
                <div class="relative">
                  <ILayoutFloat
                    v-bind="selectedProps"
                    class="relative z-10"
                  >
                    <div :class="demoStyles.element">
                      Floated Box
                    </div>
                  </ILayoutFloat>

                  <ContentText
                    variant="justified"
                    :text="demoStyles.text"
                  />
                </div>
              </div>
            </div>
          </template>
        </ShowcaseDynamic>
      </ShowcaseDemo>

      <template #debug="{ variantProps, variant }">
        <div :class="demoStyles.container">
          <div class="relative">
            <ILayoutFloat
              v-bind="variantProps"
              class="relative z-10"
            >
              <div :class="demoStyles.element">
                {{ variant.name }}
              </div>
            </ILayoutFloat>

            <ContentText
              variant="justified"
              :text="demoStyles.text"
            />
          </div>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>
