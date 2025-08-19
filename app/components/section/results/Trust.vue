<!-- app/components/section/results/Trust.vue -->
<script setup lang="ts">
import type { ResultsSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<ResultsSection, 'type'>>()

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
    class="trust-results"
  >
    <ILayoutCenter variant="prose">
      <ILayoutStack variant="spacious">
        <!-- Trust-focused header -->
        <ILayoutCenter variant="text-only">
          <ILayoutStack variant="default">
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

            <ContentText
              v-if="description"
              :text="description"
              variant="description"
            />
          </ILayoutStack>
        </ILayoutCenter>

        <!-- Trust-focused metrics with social proof emphasis -->
        <ILayoutGrid
          v-if="items?.length"
          variant="quarters"
        >
          <UCard
            v-for="(item, index) in items"
            :key="item.title"
            class="bg-success/5 border-success/20 hover:border-success/40 transition-all duration-200"
          >
            <ILayoutStack variant="centered">
              <!-- Success/trust indicator -->
              <div class="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <UIcon
                  :name="item.icon || 'i-lucide-trending-up'"
                  class="size-6 text-success-600"
                />
              </div>

              <ILayoutStack variant="centered">
                <!-- Large metric with trust styling -->
                <ContentHeading
                  :text="item.value || item.title"
                  variant="metric"
                  class="text-success-700 font-bold"
                />

                <ContentText
                  :text="item.title"
                  variant="card"
                  class="font-medium"
                />

                <ContentText
                  v-if="item.description"
                  :text="item.description"
                  variant="small"
                  class="text-muted text-center"
                />
              </ILayoutStack>

              <!-- Trust badge -->
              <UBadge
                color="success"
                variant="soft"
                size="sm"
              >
                Verified Results
              </UBadge>
            </ILayoutStack>
          </UCard>
        </ILayoutGrid>

        <!-- Trust-focused CTA -->
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
.trust-results {
  /* Trust-specific styling - verified metrics */
  --section-emphasis: social-proof;
}
</style>
