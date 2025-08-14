<!-- app/components/section/cta/Authority.vue -->
<script setup lang="ts">
import type { CtaSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<CtaSection, 'type'>>()

const authorityConfig: IntentConfig = {
  background: 'circuit',
  sectionVariant: 'default',
  emphasis: 'expertise',
  colorScheme: 'primary',
}
</script>

<template>
  <ISection
    :variant="authorityConfig.sectionVariant"
    :background="authorityConfig.background"
    class="authority-cta"
  >
    <ILayoutCenter variant="prose">
      <ILayoutStack variant="spacious">
        <!-- Authority-focused header -->
        <ILayoutCenter variant="text-only">
          <ILayoutStack variant="default">
            <IHeading
              :text="title"
              variant="section"
              anchor
            />

            <IText
              v-if="subtitle"
              :text="subtitle"
              variant="subtitle"
            />
          </ILayoutStack>
        </ILayoutCenter>

        <!-- Expert consultation offers -->
        <div
          v-if="items?.length"
          class="max-w-4xl mx-auto"
        >
          <ILayoutGrid variant="halves">
            <UCard
              v-for="card in items"
              :key="card.title"
              class="bg-primary/5 border-primary/20 hover:border-primary/40 transition-all duration-200"
            >
              <ILayoutStack variant="default">
                <!-- Authority indicator -->
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <UIcon
                      name="i-lucide-award"
                      class="size-6 text-primary-600"
                    />
                  </div>
                  <UBadge
                    color="primary"
                    variant="solid"
                    size="sm"
                  >
                    Expert Service
                  </UBadge>
                </div>

                <ILayoutStack variant="default">
                  <IHeading
                    :text="card.title"
                    variant="card"
                  />

                  <IText
                    v-if="card.subtitle"
                    :text="card.subtitle"
                    variant="description"
                  />

                  <!-- Expertise credentials -->
                  <div class="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
                    <div class="flex items-center gap-2 mb-2">
                      <UIcon
                        name="i-lucide-brain"
                        class="size-4 text-primary-600"
                      />
                      <span class="text-sm font-medium text-primary-700">10+ Years Experience</span>
                    </div>
                    <div class="flex items-center gap-2 mb-2">
                      <UIcon
                        name="i-lucide-trophy"
                        class="size-4 text-primary-600"
                      />
                      <span class="text-sm font-medium text-primary-700">Industry Recognition</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <UIcon
                        name="i-lucide-star"
                        class="size-4 text-primary-600"
                      />
                      <span class="text-sm font-medium text-primary-700">Proven Track Record</span>
                    </div>
                  </div>

                  <UButton
                    v-if="card.action"
                    :label="card.action.text"
                    :to="card.action.link"
                    color="primary"
                    size="lg"
                    block
                    trailing-icon="i-lucide-award"
                    class="mt-6"
                  />
                </ILayoutStack>
              </ILayoutStack>
            </UCard>
          </ILayoutGrid>
        </div>
      </ILayoutStack>
    </ILayoutCenter>
  </ISection>
</template>

<style scoped>
.authority-cta {
  --section-emphasis: expertise;
}
</style>
