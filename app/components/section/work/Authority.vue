<!-- app/components/section/work/Authority.vue -->
<!-- MOVED FROM: app/components/section/Work.vue -->
<script setup lang="ts">
import type { WorkSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<WorkSection, 'type'>>()

const authorityConfig: IntentConfig = {
  background: 'circuit',
  sectionVariant: 'default',
  emphasis: 'expertise',
  colorScheme: 'primary',
}
</script>

<template>
  <ISection
    :variant="authorityConfig.sectionVariant"
    :background="authorityConfig.background"
    class="authority-work"
  >
    <ILayoutCenter variant="prose">
      <ILayoutStack variant="spacious">
        <!-- Authority-focused header -->
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
      </ILayoutStack>
    </ILayoutCenter>
  </ISection>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.authority-work {
  --section-emphasis: expertise;
}

.authority-card {
  @apply border-primary/20 hover:border-primary/40;
}
</style>
