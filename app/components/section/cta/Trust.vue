<!-- app/components/section/cta/Trust.vue -->
<script setup lang="ts">
import type { CtaSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<CtaSection, 'type'>>()

const trustConfig: IntentConfig = {
  background: 'minimal',
  sectionVariant: 'generous',
  emphasis: 'social-proof',
  colorScheme: 'success',
}
</script>

<template>
  <LayoutSection
    :variant="trustConfig.sectionVariant"
    :background="trustConfig.background"
    class="trust-cta"
  >
    <LayoutCenter variant="prose">
      <LayoutStack variant="spacious">
        <!-- Trust-focused header -->
        <LayoutCenter variant="text-only">
          <LayoutStack variant="default">
            <LayoutHeading
              :text="title"
              variant="section"
              anchor
            />

            <LayoutText
              v-if="subtitle"
              :text="subtitle"
              variant="subtitle"
            />
          </LayoutStack>
        </LayoutCenter>

        <!-- Risk-free offers with trust emphasis -->
        <div
          v-if="items?.length"
          class="max-w-4xl mx-auto"
        >
          <LayoutGrid variant="halves">
            <UCard
              v-for="card in items"
              :key="card.title"
              class="bg-success/5 border-success/20 hover:border-success/40 transition-all duration-200"
            >
              <LayoutStack variant="default">
                <!-- Trust indicator -->
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                    <UIcon
                      name="i-lucide-shield-check"
                      class="size-6 text-success-600"
                    />
                  </div>
                  <UBadge
                    color="success"
                    variant="soft"
                    size="sm"
                  >
                    Risk-Free
                  </UBadge>
                </div>

                <LayoutStack variant="default">
                  <LayoutHeading
                    :text="card.title"
                    variant="card"
                  />

                  <LayoutText
                    v-if="card.subtitle"
                    :text="card.subtitle"
                    variant="description"
                  />

                  <!-- Trust guarantees -->
                  <div class="bg-success/5 border border-success/20 rounded-lg p-4 mt-4">
                    <div class="flex items-center gap-2 mb-2">
                      <UIcon
                        name="i-lucide-check-circle"
                        class="size-4 text-success-600"
                      />
                      <span class="text-sm font-medium text-success-700">100% Satisfaction Guarantee</span>
                    </div>
                    <div class="flex items-center gap-2 mb-2">
                      <UIcon
                        name="i-lucide-clock"
                        class="size-4 text-success-600"
                      />
                      <span class="text-sm font-medium text-success-700">Free Consultation</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <UIcon
                        name="i-lucide-users"
                        class="size-4 text-success-600"
                      />
                      <span class="text-sm font-medium text-success-700">50+ Happy Clients</span>
                    </div>
                  </div>

                  <UButton
                    v-if="card.action"
                    :label="card.action.text"
                    :to="card.action.link"
                    color="success"
                    size="lg"
                    block
                    trailing-icon="i-lucide-shield-check"
                    class="mt-6"
                  />
                </LayoutStack>
              </LayoutStack>
            </UCard>
          </LayoutGrid>
        </div>
      </LayoutStack>
    </LayoutCenter>
  </LayoutSection>
</template>

<style scoped>
.trust-cta {
  --section-emphasis: social-proof;
}
</style>
