<!-- app/components/section/faq/Trust.vue -->
<script setup lang="ts">
import type { FaqSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<FaqSection, 'type'>>()

const trustConfig: IntentConfig = {
  background: 'minimal',
  sectionVariant: 'generous',
  emphasis: 'expertise',
  colorScheme: 'success',
}
</script>

<template>
  <LayoutSection
    :variant="trustConfig.sectionVariant"
    :background="trustConfig.background"
    class="trust-faq"
  >
    <LayoutCenter variant="prose">
      <LayoutStack variant="spacious">
        <!-- Trust-focused header -->
        <LayoutStack variant="centered">
          <UBadge
            color="success"
            variant="soft"
            size="lg"
          >
            <UIcon
              name="i-lucide-shield-check"
              class="size-4 mr-2"
            />
            Transparent & Honest
          </UBadge>

          <LayoutHeading
            :text="title"
            variant="section"
          />

          <LayoutText
            v-if="description"
            :text="description"
            variant="subtitle"
          />
        </LayoutStack>

        <IAccordion
          intent="trust"
          variant="double"
          type="single"
          :collapsible="true"
          :categories="['trust', 'general']"
          :show-category-filter="true"
        />
      </LayoutStack>
    </LayoutCenter>
  </LayoutSection>
</template>

<style scoped>
.trust-faq {
  --section-emphasis: reassurance;
}
</style>
