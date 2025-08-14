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
  <ISection
    :variant="urgencyConfig.sectionVariant"
    :background="urgencyConfig.background"
    class="urgency-results"
  >
    <ILayoutCenter variant="prose">
      <ILayoutStack variant="compact">
        <!-- Urgency-focused header -->
        <ILayoutCenter variant="text-only">
          <ILayoutStack variant="compact">
            <!-- Urgency indicator -->
            <ILayoutCenter>
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
            </ILayoutCenter>

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

            <IText
              v-if="description"
              :text="description"
              variant="description"
            />
          </ILayoutStack>
        </ILayoutCenter>

        <!-- Urgency-focused metrics with action emphasis -->
        <ILayoutGrid
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

            <ILayoutStack
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

              <ILayoutStack variant="centered">
                <!-- Urgent metric display -->
                <IHeading
                  :text="item.value || item.title"
                  variant="metric"
                  class="text-warning-700 font-bold"
                />

                <IText
                  :text="item.title"
                  variant="card"
                  class="font-medium"
                />

                <IText
                  v-if="item.description"
                  :text="item.description"
                  variant="small"
                  class="text-muted text-center"
                />
              </ILayoutStack>

              <!-- Urgency badge -->
              <UBadge
                color="warning"
                variant="solid"
                size="sm"
              >
                Act Now
              </UBadge>
            </ILayoutStack>
          </UCard>
        </ILayoutGrid>

        <!-- Urgency-focused CTA -->
        <ILayoutCenter v-if="action">
          <ILayoutStack variant="compact">
            <IText
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
          </ILayoutStack>
        </ILayoutCenter>
      </ILayoutStack>
    </ILayoutCenter>
  </ISection>
</template>

<style scoped>
.urgency-results {
  /* Urgency-specific styling - time-sensitive metrics */
  --section-emphasis: action;
}
</style>
