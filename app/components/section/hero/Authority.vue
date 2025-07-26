<!-- components/section/hero/Authority.vue - EXPERT CREDENTIALS & THOUGHT LEADERSHIP -->
<script setup lang="ts">
import type { HeroSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<HeroSection, 'type'>>()

const authorityConfig: IntentConfig = {
  background: 'circuit',
  sectionVariant: 'hero',
  emphasis: 'expertise', 
  colorScheme: 'primary'
}
</script>

<template>
  <LayoutSection
    :variant="authorityConfig.sectionVariant"
    :background="authorityConfig.background"
    class="authority-hero"
  >
    <LayoutCenter variant="full">
      <LayoutSplit variant="default">
        <template #primary>
          <LayoutStack variant="spacious">
            <!-- Authority-focused headlines -->
            <LayoutStack variant="default">
              <LayoutHeading
                :text="title"
                variant="hero"
                anchor
              />

              <LayoutText
                v-if="subtitle"
                :text="subtitle"
                variant="hero-subtitle"
              />

              <LayoutText
                v-if="description"
                :text="description"
                variant="description"
              />
            </LayoutStack>

            <!-- Authority CTA -->
            <LayoutStack
              v-if="action"
              variant="compact"
            >
              <LayoutText
                v-if="action.description"
                variant="caption"
                :text="action.description"
              />

              <LayoutCluster variant="default">
                <UButton
                  :label="action.text"
                  color="primary"
                  size="xl"
                  :to="action.link"
                  trailing-icon="i-lucide-award"
                />
              </LayoutCluster>
            </LayoutStack>
          </LayoutStack>
        </template>

        <template #secondary>
          <!-- Authority indicators - credentials/achievements -->
          <LayoutStack
            v-if="items?.length"
            variant="default"
          >
            <LayoutCenter variant="narrow">
              <LayoutStack variant="compact">
                <UCard
                  v-for="(item, index) in items"
                  :key="item.title"
                  class="bg-elevated/70 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-200"
                >
                  <LayoutCluster variant="no-wrap">
                    <!-- Authority icon with bold styling -->
                    <div class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <UIcon
                        :name="item.icon || 'i-lucide-award'"
                        class="size-6 text-primary"
                      />
                    </div>

                    <LayoutStack variant="compact">
                      <LayoutHeading
                        :text="item.title"
                        variant="card"
                      />
                      <LayoutText
                        :text="item.description"
                        variant="small"
                      />
                    </LayoutStack>
                  </LayoutCluster>
                </UCard>
              </LayoutStack>
            </LayoutCenter>
          </LayoutStack>
        </template>
      </LayoutSplit>
    </LayoutCenter>
  </LayoutSection>
</template>

<style scoped>
.authority-hero {
  /* Authority-specific styling - bold, confident */
  --section-emphasis: expertise;
}
</style>
