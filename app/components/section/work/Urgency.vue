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
</script>

<template>
  <ISection
    :variant="urgencyConfig.sectionVariant"
    :background="urgencyConfig.background"
    class="urgency-work"
  >
    <ILayoutCenter variant="prose">
      <ILayoutStack variant="compact">
        <!-- Urgency-focused header -->
        <ILayoutCenter variant="text-only">
          <ILayoutStack variant="compact">
            <ILayoutCenter>
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
            </ILayoutCenter>

            <ContentHeading
              :text="title"
              variant="section"
              anchor
            />

            <ContentText
              v-if="subtitle"
              :text="subtitle"
              variant="subtitle"
            />
          </ILayoutStack>
        </ILayoutCenter>

        <!-- Urgency-focused CTA -->
        <ILayoutCenter v-if="action">
          <ILayoutStack variant="compact">
            <ContentText
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
          </ILayoutStack>
        </ILayoutCenter>
      </ILayoutStack>
    </ILayoutCenter>
  </ISection>
</template>

<style scoped>
.urgency-work {
  --section-emphasis: action;
}
</style>
