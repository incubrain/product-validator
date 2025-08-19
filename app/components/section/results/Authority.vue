<!-- app/components/section/results/Authority.vue -->
<script setup lang="ts">
import type { ResultsSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<ResultsSection, 'type'>>()

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
    class="authority-results"
  >
    <ILayoutCenter variant="prose">
      <ILayoutStack variant="spacious">
        <!-- Authority-focused header -->
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

        <!-- Authority-focused metrics with expertise emphasis -->
        <ILayoutGrid
          v-if="items?.length"
          variant="thirds"
        >
          <UCard
            v-for="(item, index) in items"
            :key="item.title"
            class="bg-primary/5 border-primary/20 hover:border-primary/40 transition-all duration-200"
          >
            <ILayoutStack variant="centered">
              <!-- Authority/expertise indicator -->
              <div class="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                <UIcon
                  :name="item.icon || 'i-lucide-award'"
                  class="size-7 text-primary-600"
                />
              </div>

              <ILayoutStack variant="centered">
                <!-- Professional metric display -->
                <ContentHeading
                  :text="item.value || item.title"
                  variant="metric"
                  class="text-primary-700 font-bold"
                />

                <ContentText
                  :text="item.title"
                  variant="card"
                  class="font-semibold"
                />

                <ContentText
                  v-if="item.description"
                  :text="item.description"
                  variant="small"
                  class="text-muted text-center"
                />
              </ILayoutStack>

              <!-- Authority badge -->
              <UBadge
                color="primary"
                variant="solid"
                size="sm"
              >
                Expert Level
              </UBadge>
            </ILayoutStack>
          </UCard>
        </ILayoutGrid>

        <!-- Authority-focused CTA -->
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
              color="primary"
              size="lg"
              :to="action.link"
              trailing-icon="i-lucide-award"
            />
          </ILayoutStack>
        </ILayoutCenter>
      </ILayoutStack>
    </ILayoutCenter>
  </ISection>
</template>

<style scoped>
.authority-results {
  /* Authority-specific styling - professional metrics */
  --section-emphasis: expertise;
}
</style>
