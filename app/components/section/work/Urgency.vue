<!-- app/components/section/work/Urgency.vue -->
<script setup lang="ts">
import type { WorkSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<WorkSection, 'type'>>()

const urgencyConfig: IntentConfig = {
  background: 'cyber',
  sectionVariant: 'compact',
  emphasis: 'action',
  colorScheme: 'amber',
}

// Get recent work showing availability/urgency
const { data: recentWork } = await useAsyncData('recent-work', () =>
  queryCollection('blog')
    .where('category', '=', 'project')
    .order('date', 'DESC')
    .limit(4)
    .all(),
)
</script>

<template>
  <LayoutSection
    :variant="urgencyConfig.sectionVariant"
    :background="urgencyConfig.background"
    class="urgency-work"
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
                  name="i-lucide-calendar"
                  class="size-4 mr-2"
                />
                Limited Availability
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

        <!-- Recent projects with urgency emphasis -->
        <LayoutGrid
          v-if="recentWork?.length"
          variant="halves"
        >
          <UCard
            v-for="project in recentWork.slice(0, 4)"
            :key="project.path"
            class="bg-warning/5 border-warning/30 hover:border-warning/50 transition-all duration-200 relative overflow-hidden"
          >
            <div class="absolute inset-0 bg-warning/5 animate-pulse" />

            <LayoutStack
              variant="default"
              class="relative z-10"
            >
              <!-- Urgency indicator -->
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                  <UIcon
                    name="i-lucide-zap"
                    class="size-5 text-warning-600"
                  />
                </div>
                <UBadge
                  color="warning"
                  variant="solid"
                  size="sm"
                >
                  Recent Project
                </UBadge>
              </div>

              <!-- Project info -->
              <LayoutStack variant="compact">
                <LayoutText
                  :text="project.title"
                  variant="card"
                  class="font-semibold"
                />

                <LayoutText
                  v-if="project.description"
                  :text="project.description"
                  variant="small"
                  class="text-muted"
                />

                <!-- Booking urgency -->
                <div class="mt-4 pt-4 border-t border-warning/30">
                  <div class="text-sm text-warning-700 font-medium">
                    📅 Next available slot: {{ new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString() }}
                  </div>
                </div>
              </LayoutStack>
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
              trailing-icon="i-lucide-calendar-check"
              class="animate-pulse"
            />
          </LayoutStack>
        </LayoutCenter>
      </LayoutStack>
    </LayoutCenter>
  </LayoutSection>
</template>

<style scoped>
.urgency-work {
  --section-emphasis: action;
}
</style>
