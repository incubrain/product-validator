<script setup lang="ts">
import type { AboutSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<AboutSection, 'type'>>()

const trustConfig: IntentConfig = {
  background: 'minimal',
  sectionVariant: 'generous',
  emphasis: 'social-proof',
  colorScheme: 'success',
}
</script>

<template>
  <ISection
    :variant="trustConfig.sectionVariant"
    :background="trustConfig.background"
    class="trust-about"
  >
    <ILayoutCenter variant="prose">
      <ILayoutSplit variant="default">
        <!-- Image with trust indicators -->
        <template #secondary>
          <div
            v-if="image"
            class="relative"
          >
            <IImage
              :src="image"
              :alt="title"
              class="relative w-full shadow-lg border-2 border-success/20"
              aspect-ratio="square"
              object-fit="cover"
              loading="lazy"
              format="webp"
              :ui="{ root: 'rounded-2xl' }"
            />

            <!-- Floating stats with trust styling -->
            <div
              v-if="items?.length"
              class="absolute -bottom-6 -right-6 bg-success/10 border border-success/20 rounded-xl p-4 shadow-lg"
            >
              <div class="grid grid-cols-2 gap-6">
                <div
                  v-for="stat in items.slice(0, 2)"
                  :key="stat.label"
                  class="text-center"
                >
                  <div class="text-2xl font-bold text-success-700">
                    {{ stat.value }}
                  </div>
                  <div class="text-sm text-muted uppercase tracking-wide">
                    {{ stat.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Content with trust focus -->
        <template #primary>
          <ILayoutStack variant="spacious">
            <ContentHeading
              :text="title"
              variant="section"
              anchor
            />

            <div
              class="prose prose-lg prose-zinc dark:prose-invert max-w-none"
              v-html="story"
            />

            <!-- Additional stats with trust styling -->
            <div
              v-if="items && items.length > 2"
              class="grid grid-cols-2 gap-6 mt-8"
            >
              <div
                v-for="stat in items.slice(2)"
                :key="stat.label"
                class="text-center p-4 bg-success/5 border border-success/20 rounded-lg"
              >
                <div class="text-2xl font-bold text-success-700">
                  {{ stat.value }}
                </div>
                <div class="text-sm text-muted uppercase tracking-wide">
                  {{ stat.label }}
                </div>
              </div>
            </div>
          </ILayoutStack>
        </template>
      </ILayoutSplit>
    </ILayoutCenter>
  </ISection>
</template>

<style scoped>
.trust-about {
  --section-emphasis: social-proof;
}
</style>
