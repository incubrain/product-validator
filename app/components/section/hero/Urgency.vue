<!-- components/section/hero/Urgency.vue - SCARCITY & LIMITED TIME -->
<script setup lang="ts">
import type { HeroSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<HeroSection, 'type'>>()

const urgencyConfig: IntentConfig = {
  background: 'cyber',
  sectionVariant: 'hero',
  emphasis: 'action',
  colorScheme: 'warning',
}
</script>

<template>
  <ISection
    :variant="urgencyConfig.sectionVariant"
    :background="urgencyConfig.background"
    class="urgency-hero"
  >
    <ILayoutCenter variant="prose">
      <ILayoutStack variant="compact">
        <!-- Urgency-focused content layout -->
        <ILayoutCenter variant="text-only">
          <ILayoutStack variant="compact">
            <!-- Urgency badge/indicator -->
            <ILayoutCenter>
              <UBadge
                color="warning"
                variant="solid"
                size="lg"
                class="animate-pulse"
              >
                <UIcon
                  name="i-lucide-timer"
                  class="size-4 mr-2"
                />
                Limited Time
              </UBadge>
            </ILayoutCenter>

            <ContentHeading
              :text="title"
              variant="hero"
              anchor
              class="text-center"
            />

            <ContentText
              v-if="subtitle"
              :text="subtitle"
              variant="hero-subtitle"
              class="text-center"
            />

            <ContentText
              v-if="description"
              :text="description"
              variant="description"
              class="text-center"
            />
          </ILayoutStack>
        </ILayoutCenter>

        <!-- Urgency indicators -->
        <ILayoutGrid
          v-if="items?.length"
          variant="auto"
          class="mx-auto"
        >
          <div
            v-for="(item, index) in items"
            :key="item.title"
            class="text-center p-4 rounded-lg bg-amber-500/10 border border-amber-500/20"
          >
            <UIcon
              :name="item.icon || 'i-lucide-clock'"
              class="size-8 text-amber-500 mx-auto mb-2"
            />
            <ContentHeading
              :text="item.title"
              variant="small"
              class="text-amber-600"
            />
            <ContentText
              :text="item.description"
              variant="small"
              class="text-muted"
            />
          </div>
        </ILayoutGrid>

        <!-- Urgent CTA -->
        <ILayoutCenter v-if="action">
          <ILayoutStack variant="centered">
            <ContentText
              v-if="action.description"
              variant="caption"
              :text="action.description"
              class="text-center text-muted"
            />

            <ILayoutCluster variant="centered">
              <UButton
                :label="action.text"
                color="warning"
                size="xl"
                :to="action.link"
                trailing-icon="i-lucide-arrow-right"
                class="animate-pulse hover:animate-none"
              />
            </ILayoutCluster>
          </ILayoutStack>
        </ILayoutCenter>
      </ILayoutStack>
    </ILayoutCenter>
  </ISection>
</template>

<style scoped>
.urgency-hero {
  /* Urgency-specific styling - vibrant, action-oriented */
  --section-emphasis: action;
}
</style>
