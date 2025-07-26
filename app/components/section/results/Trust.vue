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
  <LayoutSection
    :variant="trustConfig.sectionVariant"
    :background="trustConfig.background"
    class="trust-results"
  >
    <LayoutCenter variant="prose">
      <LayoutStack variant="spacious">
        <!-- Trust-focused header -->
        <LayoutCenter variant="text-only">
          <LayoutStack variant="default">
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

            <LayoutText
              v-if="description"
              :text="description"
              variant="description"
            />
          </LayoutStack>
        </LayoutCenter>

        <!-- Trust-focused metrics with social proof emphasis -->
        <LayoutGrid
          v-if="items?.length"
          variant="quarters"
        >
          <UCard
            v-for="(item, index) in items"
            :key="item.title"
            class="bg-success/5 border-success/20 hover:border-success/40 transition-all duration-200"
          >
            <LayoutStack variant="centered">
              <!-- Success/trust indicator -->
              <div class="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <UIcon
                  :name="item.icon || 'i-lucide-trending-up'"
                  class="size-6 text-success-600"
                />
              </div>

              <LayoutStack variant="centered">
                <!-- Large metric with trust styling -->
                <LayoutHeading
                  :text="item.value || item.title"
                  variant="metric"
                  class="text-success-700 font-bold"
                />

                <LayoutText
                  :text="item.title"
                  variant="card"
                  class="font-medium"
                />

                <LayoutText
                  v-if="item.description"
                  :text="item.description"
                  variant="small"
                  class="text-muted text-center"
                />
              </LayoutStack>

              <!-- Trust badge -->
              <UBadge
                color="success"
                variant="soft"
                size="sm"
              >
                Verified Results
              </UBadge>
            </LayoutStack>
          </UCard>
        </LayoutGrid>

        <!-- Trust-focused CTA -->
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
              color="success"
              size="lg"
              :to="action.link"
              trailing-icon="i-lucide-shield-check"
            />
          </LayoutStack>
        </LayoutCenter>
      </LayoutStack>
    </LayoutCenter>
  </LayoutSection>
</template>

<style scoped>
.trust-results {
  /* Trust-specific styling - verified metrics */
  --section-emphasis: social-proof;
}
</style>
