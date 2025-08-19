<!-- pages/showcase/frame.vue -->
<script setup>
import { ILayoutFrame } from '#components'
import { frameData } from '#theme/layout/frame'

const { createShowcaseConfig, generateShowcaseData, setShowcaseData } = useShowcase()

const frameConfig = createShowcaseConfig(ILayoutFrame, frameData, {
  variantDescriptions: {
    variant: 'Aspect ratio for different content types',
  },

  presets: [
    {
      name: 'Video Frame',
      description: '16:9 aspect ratio perfect for video content',
      preset: { variant: 'video' },
    },
    {
      name: 'Square Frame',
      description: '1:1 aspect ratio for profile images and icons',
      preset: { variant: 'square' },
    },
    {
      name: 'Portrait Frame',
      description: '3:4 aspect ratio for portrait photography',
      preset: { variant: 'portrait' },
    },
    {
      name: 'Wide Frame',
      description: '21:9 ultra-wide aspect ratio for panoramic content',
      preset: { variant: 'wide' },
    },
    {
      name: 'Golden Ratio',
      description: '1.618:1 mathematically pleasing proportions',
      preset: { variant: 'golden' },
    },
    {
      name: 'Tall Frame',
      description: '9:16 vertical aspect ratio for mobile and stories',
      preset: { variant: 'tall' },
    },
    {
      name: 'Cinema Frame',
      description: '2.35:1 cinematic widescreen format',
      preset: { variant: 'cinema' },
    },
    {
      name: 'Card Frame',
      description: '4:3 traditional photo and card proportions',
      preset: { variant: 'card' },
    },
  ],
})

setShowcaseData(generateShowcaseData(frameConfig))
</script>

<template>
  <NuxtLayout name="showcase">
    <ShowcaseDemo
      title="Aspect Ratio Frames"
      :max-cols="1"
    >
      <ShowcaseDynamic
        v-bind="frameConfig"
      >
        <template #default="{ selectedProps }">
          <div class="max-w-md mx-auto">
            <ILayoutFrame
              v-bind="selectedProps"
              class="bg-gradient-to-br from-primary/20 to-secondary/20 border border-muted rounded"
            >
              <div class="flex items-center justify-center h-full">
                <div class="text-center">
                  <div class="text-lg font-medium">
                    {{ selectedProps.variant }}
                  </div>
                  <div class="text-sm text-muted-foreground">
                    Aspect Ratio Frame
                  </div>
                </div>
              </div>
            </ILayoutFrame>
          </div>
        </template>
      </ShowcaseDynamic>
    </ShowcaseDemo>
  </NuxtLayout>
</template>
