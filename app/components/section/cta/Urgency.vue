<!-- app/components/section/cta/Urgency.vue -->
<!-- MOVED FROM: app/components/section/Cta.vue -->
<script setup lang="ts">
import type { CtaSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<CtaSection, 'type'>>()

const urgencyConfig: IntentConfig = {
  background: 'cyber',
  sectionVariant: 'compact',
  emphasis: 'action',
  colorScheme: 'amber',
}
</script>

<template>
  <LayoutSection
    :variant="urgencyConfig.sectionVariant"
    :background="urgencyConfig.background"
    class="urgency-cta"
  >
    <LayoutCenter variant="prose">
      <LayoutStack variant="compact">
        <!-- Urgency-focused header -->
        <LayoutCenter variant="text-only">
          <LayoutStack variant="compact">
            <LayoutCenter>
              <UBadge
                color="warning"
                variant="solid"
                size="lg"
                class="animate-pulse"
              >
                <UIcon
                  name="i-lucide-timer"
                  class="size-4 mr-2"
                />
                Limited Time Offer
              </UBadge>
            </LayoutCenter>

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

        <!-- Time-sensitive offers -->
        <div
          v-if="items?.length"
          class="max-w-4xl mx-auto"
        >
          <LayoutGrid variant="halves">
            <UCard
              v-for="card in items"
              :key="card.title"
              class="bg-warning/5 border-warning/30 hover:border-warning/50 transition-all duration-200 relative overflow-hidden"
            >
              <div class="absolute inset-0 bg-warning/5 animate-pulse" />

              <LayoutStack
                variant="default"
                class="relative z-10"
              >
                <!-- Urgency indicator -->
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center">
                    <UIcon
                      name="i-lucide-zap"
                      class="size-6 text-warning-600"
                    />
                  </div>
                  <UBadge
                    color="warning"
                    variant="solid"
                    size="sm"
                    class="animate-pulse"
                  >
                    Act Fast
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

                  <!-- Urgency countdown/scarcity -->
                  <div class="bg-warning/10 border border-warning/30 rounded-lg p-4 mt-4">
                    <div class="flex items-center gap-2 mb-2">
                      <UIcon
                        name="i-lucide-clock"
                        class="size-4 text-warning-600"
                      />
                      <span class="text-sm font-medium text-warning-700">Offer expires soon</span>
                    </div>
                    <div class="flex items-center gap-2 mb-2">
                      <UIcon
                        name="i-lucide-users"
                        class="size-4 text-warning-600"
                      />
                      <span class="text-sm font-medium text-warning-700">Only 3 spots left</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <UIcon
                        name="i-lucide-gift"
                        class="size-4 text-warning-600"
                      />
                      <span class="text-sm font-medium text-warning-700">Exclusive launch bonus</span>
                    </div>
                  </div>

                  <UButton
                    v-if="card.action"
                    :label="card.action.text"
                    :to="card.action.link"
                    color="warning"
                    size="lg"
                    block
                    trailing-icon="i-lucide-timer"
                    class="mt-6 animate-pulse"
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
.urgency-cta {
  --section-emphasis: action;
}
</style>
