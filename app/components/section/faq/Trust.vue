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
  <ISection
    :variant="trustConfig.sectionVariant"
    :background="trustConfig.background"
    class="trust-faq"
  >
    <ILayoutCenter variant="prose">
      <ILayoutStack variant="spacious">
        <!-- Trust-focused header -->
        <ILayoutStack variant="centered">
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

          <ContentHeading
            :text="title"
            variant="section"
          />

          <ContentText
            v-if="description"
            :text="description"
            variant="subtitle"
          />
        </ILayoutStack>

        <IAccordion
          intent="trust"
          variant="double"
          type="single"
          :collapsible="true"
          :categories="['trust', 'general']"
          :show-category-filter="true"
        />
      </ILayoutStack>
    </ILayoutCenter>
  </ISection>
</template>

<style scoped>
.trust-faq {
  --section-emphasis: reassurance;
}
</style>
