<!-- app/components/section/work/Trust.vue -->
<script setup lang="ts">
import type { WorkSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<WorkSection, 'type'>>()

const trustConfig: IntentConfig = {
  background: 'minimal',
  sectionVariant: 'generous',
  emphasis: 'social-proof',
  colorScheme: 'success',
}
</script>

<template>
  <ISection
    :variant="trustConfig.sectionVariant"
    :background="trustConfig.background"
    class="trust-work"
  >
    <ILayoutCenter variant="prose">
      <ILayoutStack variant="spacious">
        <!-- Trust-focused header -->
        <ILayoutCenter variant="text-only">
          <ILayoutStack variant="default">
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
          </ILayoutStack>
        </ILayoutCenter>

        <!-- Trust-focused CTA -->
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
              color="success"
              size="lg"
              :to="action.link"
              trailing-icon="i-lucide-shield-check"
            />
          </ILayoutStack>
        </ILayoutCenter>
      </ILayoutStack>
    </ILayoutCenter>
  </ISection>
</template>

<style scoped>
.trust-work {
  --section-emphasis: social-proof;
}
</style>
