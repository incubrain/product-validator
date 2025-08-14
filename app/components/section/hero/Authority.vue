<!-- components/section/hero/Authority.vue - EXPERT CREDENTIALS & THOUGHT LEADERSHIP -->
<script setup lang="ts">
import type { HeroSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<HeroSection, 'type'>>()

const authorityConfig: IntentConfig = {
  background: 'circuit',
  sectionVariant: 'hero',
  emphasis: 'expertise',
  colorScheme: 'primary',
}
</script>

<template>
  <ISection
    :variant="authorityConfig.sectionVariant"
    :background="authorityConfig.background"
    class="authority-hero"
  >
    <ILayoutCenter variant="full">
      <ILayoutSplit variant="default">
        <template #primary>
          <ILayoutStack variant="spacious">
            <!-- Authority-focused headlines -->
            <ILayoutStack variant="default">
              <IHeading
                :text="title"
                variant="hero"
                anchor
              />

              <IText
                v-if="subtitle"
                :text="subtitle"
                variant="hero-subtitle"
              />

              <IText
                v-if="description"
                :text="description"
                variant="description"
              />
            </ILayoutStack>

            <!-- Authority CTA -->
            <ILayoutStack
              v-if="action"
              variant="compact"
            >
              <IText
                v-if="action.description"
                variant="caption"
                :text="action.description"
              />

              <ILayoutCluster variant="default">
                <UButton
                  :label="action.text"
                  color="primary"
                  size="xl"
                  :to="action.link"
                  trailing-icon="i-lucide-award"
                />
              </ILayoutCluster>
            </ILayoutStack>
          </ILayoutStack>
        </template>

        <template #secondary>
          <!-- Authority indicators - credentials/achievements -->
          <ILayoutStack
            v-if="items?.length"
            variant="default"
          >
            <ILayoutCenter variant="narrow">
              <ILayoutStack variant="compact">
                <UCard
                  v-for="(item, index) in items"
                  :key="item.title"
                  class="bg-elevated/70 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-200"
                >
                  <ILayoutCluster variant="no-wrap">
                    <!-- Authority icon with bold styling -->
                    <div class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <UIcon
                        :name="item.icon || 'i-lucide-award'"
                        class="size-6 text-primary"
                      />
                    </div>

                    <ILayoutStack variant="compact">
                      <IHeading
                        :text="item.title"
                        variant="card"
                      />
                      <IText
                        :text="item.description"
                        variant="small"
                      />
                    </ILayoutStack>
                  </ILayoutCluster>
                </UCard>
              </ILayoutStack>
            </ILayoutCenter>
          </ILayoutStack>
        </template>
      </ILayoutSplit>
    </ILayoutCenter>
  </ISection>
</template>

<style scoped>
.authority-hero {
  /* Authority-specific styling - bold, confident */
  --section-emphasis: expertise;
}
</style>
