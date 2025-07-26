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
  <LayoutSection
    :variant="authorityConfig.sectionVariant"
    :background="authorityConfig.background"
    class="authority-results"
  >
    <LayoutCenter variant="prose">
      <LayoutStack variant="spacious">
        <!-- Authority-focused header -->
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

        <!-- Authority-focused metrics with expertise emphasis -->
        <LayoutGrid
          v-if="items?.length"
          variant="thirds"
        >
          <UCard
            v-for="(item, index) in items"
            :key="item.title"
            class="bg-primary/5 border-primary/20 hover:border-primary/40 transition-all duration-200"
          >
            <LayoutStack variant="centered">
              <!-- Authority/expertise indicator -->
              <div class="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                <UIcon
                  :name="item.icon || 'i-lucide-award'"
                  class="size-7 text-primary-600"
                />
              </div>

              <LayoutStack variant="centered">
                <!-- Professional metric display -->
                <LayoutHeading
                  :text="item.value || item.title"
                  variant="metric"
                  class="text-primary-700 font-bold"
                />

                <LayoutText
                  :text="item.title"
                  variant="card"
                  class="font-semibold"
                />

                <LayoutText
                  v-if="item.description"
                  :text="item.description"
                  variant="small"
                  class="text-muted text-center"
                />
              </LayoutStack>

              <!-- Authority badge -->
              <UBadge
                color="primary"
                variant="solid"
                size="sm"
              >
                Expert Level
              </UBadge>
            </LayoutStack>
          </UCard>
        </LayoutGrid>

        <!-- Authority-focused CTA -->
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
              color="primary"
              size="lg"
              :to="action.link"
              trailing-icon="i-lucide-award"
            />
          </LayoutStack>
        </LayoutCenter>
      </LayoutStack>
    </LayoutCenter>
  </LayoutSection>
</template>

<style scoped>
.authority-results {
  /* Authority-specific styling - professional metrics */
  --section-emphasis: expertise;
}
</style>
