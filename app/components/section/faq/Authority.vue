<!-- app/components/section/faq/Authority.vue -->
<script setup lang="ts">
import type { FaqSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<FaqSection, 'type'>>()

const authorityConfig: IntentConfig = {
  background: 'none',
  sectionVariant: 'default',
  emphasis: 'expertise',
  colorScheme: 'primary',
}
</script>

<template>
  <ISection
    :variant="authorityConfig.sectionVariant"
    :background="authorityConfig.background"
    class="authority-faq"
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
              v-if="description"
              :text="description"
              variant="subtitle"
            />

            <!-- Authority indicator -->
            <div class="flex justify-center">
              <UBadge
                color="primary"
                variant="solid"
                size="lg"
              >
                <UIcon
                  name="i-lucide-brain"
                  class="size-4 mr-2"
                />
                Expert Knowledge Base
              </UBadge>
            </div>
          </ILayoutStack>
        </ILayoutCenter>

        <IAccordion
          intent="authority"
          variant="double"
          type="single"
          :collapsible="true"
          :categories="['authority', 'general']"
          :show-category-filter="true"
        />

        <!-- Expert credentials footer -->
        <div class="text-center mt-12 p-6 bg-primary/5 border border-primary/20 rounded-lg">
          <div class="flex justify-center items-center gap-4 mb-4">
            <UIcon
              name="i-lucide-award"
              class="size-6 text-primary-600"
            />
            <ContentText
              text="Technical expertise backed by 10+ years of industry experience"
              variant="caption"
              class="text-primary-700 font-medium"
            />
          </div>

          <div class="flex justify-center gap-4">
            <UBadge
              v-for="cert in ['AWS Certified', 'TypeScript Expert', 'Automation Specialist']"
              :key="cert"
              color="primary"
              variant="outline"
              size="sm"
            >
              {{ cert }}
            </UBadge>
          </div>
        </div>
      </ILayoutStack>
    </ILayoutCenter>
  </ISection>
</template>

<style scoped>
.authority-faq {
 --section-emphasis: expertise;
}
</style>
