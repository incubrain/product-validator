<!-- app/components/section/faq/Urgency.vue -->
<script setup lang="ts">
import type { FaqSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<FaqSection, 'type'>>()

const urgencyConfig: IntentConfig = {
  background: 'none',
  sectionVariant: 'compact',
  emphasis: 'action',
  colorScheme: 'amber',
}
</script>

<template>
  <LayoutSection
    :variant="urgencyConfig.sectionVariant"
    :background="urgencyConfig.background"
    class="urgency-faq"
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
                  name="i-lucide-zap"
                  class="size-4 mr-2"
                />
                Fast Answers
              </UBadge>
            </LayoutCenter>

            <LayoutHeading
              :text="title"
              variant="section"
              anchor
            />

            <LayoutText
              v-if="description"
              :text="description"
              variant="subtitle"
            />
          </LayoutStack>
        </LayoutCenter>

        <IAccordion
          intent="urgency"
          variant="double"
          type="single"
          :collapsible="true"
          :categories="['urgency', 'general']"
          :show-category-filter="true"
        />

        <!-- Urgency CTA -->
        <LayoutCenter class="mt-8">
          <div class="bg-warning/10 border border-warning/30 rounded-lg p-6 text-center">
            <div class="flex justify-center items-center gap-3 mb-4">
              <UIcon
                name="i-lucide-phone"
                class="size-5 text-warning-600"
              />
              <LayoutText
                text="Need immediate answers? Get instant response within 24 hours"
                variant="card"
                class="text-warning-700 font-medium"
              />
            </div>

            <UButton
              label="Contact Now"
              color="warning"
              size="lg"
              trailing-icon="i-lucide-message-circle"
              to="/contact"
              class="animate-pulse"
            />
          </div>
        </LayoutCenter>
      </LayoutStack>
    </LayoutCenter>
  </LayoutSection>
</template>

<style scoped>
.urgency-faq {
  --section-emphasis: action;
}
</style>
