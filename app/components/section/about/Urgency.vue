<!-- app/components/section/about/Urgency.vue -->
<script setup lang="ts">
import type { AboutSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<AboutSection, 'type'>>()

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
    class="urgency-about"
  >
    <ILayoutCenter variant="prose">
      <ILayoutSplit variant="default">
        <!-- Image with availability emphasis -->
        <template #secondary>
          <div
            v-if="image"
            class="relative"
          >
            <div class="absolute inset-0 bg-warning/10 animate-pulse rounded-2xl" />

            <IImage
              :src="image"
              :alt="title"
              class="relative w-full shadow-lg border-2 border-warning/30"
              aspect-ratio="square"
              object-fit="cover"
              loading="lazy"
              format="webp"
              :ui="{ root: 'rounded-2xl' }"
            />

            <!-- Availability indicator -->
            <div class="absolute top-4 left-4">
              <UBadge
                color="warning"
                variant="solid"
                size="lg"
                class="animate-pulse"
              >
                <UIcon
                  name="i-lucide-calendar-check"
                  class="size-4 mr-2"
                />
                Available Now
              </UBadge>
            </div>

            <!-- Time-sensitive stats -->
            <div
              v-if="items?.length"
              class="absolute -bottom-6 -right-6 bg-warning/10 border border-warning/30 rounded-xl p-4 shadow-lg"
            >
              <div class="grid grid-cols-2 gap-6">
                <div
                  v-for="stat in items.slice(0, 2)"
                  :key="stat.label"
                  class="text-center"
                >
                  <div class="text-2xl font-bold text-warning-700">
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

        <!-- Availability-focused content -->
        <template #primary>
          <ILayoutStack variant="compact">
            <ILayoutStack variant="compact">
              <IHeading
                :text="title"
                variant="section"
                anchor
              />

              <!-- Availability subtitle -->
              <IText
                text="Ready to Start Your Project Today"
                variant="subtitle"
                class="text-warning-600"
              />
            </ILayoutStack>

            <div
              class="prose prose-lg prose-zinc dark:prose-invert max-w-none"
              v-html="story"
            />

            <!-- Current availability -->
            <div class="bg-warning/10 border border-warning/30 rounded-lg p-6 mt-6">
              <div class="flex items-center gap-3 mb-4">
                <UIcon
                  name="i-lucide-clock"
                  class="size-6 text-warning-600"
                />
                <IHeading
                  text="Current Availability"
                  variant="card"
                  class="text-warning-700"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="text-center p-4 bg-warning/5 rounded-lg">
                  <div class="text-lg font-bold text-warning-700">
                    Next Slot
                  </div>
                  <div class="text-sm text-muted">
                    {{ new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString() }}
                  </div>
                </div>
                <div class="text-center p-4 bg-warning/5 rounded-lg">
                  <div class="text-lg font-bold text-warning-700">
                    Response Time
                  </div>
                  <div class="text-sm text-muted">
                    Within 24 hours
                  </div>
                </div>
              </div>
            </div>

            <!-- Urgency metrics -->
            <div
              v-if="items && items.length > 2"
              class="grid grid-cols-2 gap-4 mt-6"
            >
              <div
                v-for="metric in items.slice(2)"
                :key="metric.label"
                class="text-center p-4 bg-warning/5 border border-warning/20 rounded-lg"
              >
                <div class="text-2xl font-bold text-warning-700">
                  {{ metric.value }}
                </div>
                <div class="text-sm text-muted uppercase tracking-wide">
                  {{ metric.label }}
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
.urgency-about {
  --section-emphasis: action;
}
</style>
