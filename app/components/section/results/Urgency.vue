<!-- app/components/section/results/Urgency.vue -->
<script setup lang="ts">
import type { ResultsSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<ResultsSection, 'type'>>()

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
    class="urgency-results"
  >
    <LayoutCenter variant="prose">
      <LayoutStack variant="compact">
        <!-- Urgency-focused header -->
        <LayoutCenter variant="text-only">
          <LayoutStack variant="compact">
            <!-- Urgency indicator -->
            <LayoutCenter>
              <UBadge
                color="warning"
                variant="solid"
                size="lg"
                class="animate-pulse"
              >
                <UIcon
                  name="i-lucide-clock"
                  class="size-4 mr-2"
                />
                Time-Sensitive Results
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

            <LayoutText
              v-if="description"
              :text="description"
              variant="description"
            />
          </LayoutStack>
        </LayoutCenter>

        <!-- Urgency-focused metrics with action emphasis -->
        <LayoutGrid
          v-if="items?.length"
          variant="halves"
        >
          <UCard
            v-for="(item, index) in items"
            :key="item.title"
            class="bg-warning/5 border-warning/30 hover:border-warning/50 transition-all duration-200 relative overflow-hidden"
          >
            <!-- Urgency pulse animation -->
            <div class="absolute inset-0 bg-warning/5 animate-pulse" />

            <LayoutStack
              variant="centered"
              class="relative z-10"
            >
              <!-- Time-sensitive indicator -->
              <div class="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center">
                <UIcon
                  :name="item.icon || 'i-lucide-zap'"
                  class="size-6 text-warning-600"
                />
              </div>

              <LayoutStack variant="centered">
                <!-- Urgent metric display -->
                <LayoutHeading
                  :text="item.value || item.title"
                  variant="metric"
                  class="text-warning-700 font-bold"
                />

                <LayoutText
                  :text="item.title"
                  variant="card"
                  class="font-medium"
                />

                <LayoutText
                  v-if="item.description"
                  :text="item.description"
                  variant="small"
                  class="text-muted text-center"
                />
              </LayoutStack>

              <!-- Urgency badge -->
              <UBadge
                color="warning"
                variant="solid"
                size="sm"
              >
                Act Now
              </UBadge>
            </LayoutStack>
          </UCard>
        </LayoutGrid>

        <!-- Urgency-focused CTA -->
        <LayoutCenter v-if="action">
          <LayoutStack variant="compact">
            <LayoutText
              v-if="action.description"
              :text="action.description"
              variant="caption"
              class="text-muted text-center"
            />

            <UButton
              :label="action.text"
              color="warning"
              size="lg"
              :to="action.link"
              trailing-icon="i-lucide-timer"
              class="animate-pulse"
            />
          </LayoutStack>
        </LayoutCenter>
      </LayoutStack>
    </LayoutCenter>
  </LayoutSection>
</template>

<style scoped>
.urgency-results {
  /* Urgency-specific styling - time-sensitive metrics */
  --section-emphasis: action;
}
</style>
