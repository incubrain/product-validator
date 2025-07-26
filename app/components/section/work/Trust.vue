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

// Get client testimonials/case studies for trust building
const { data: testimonials } = await useAsyncData('work-testimonials', () =>
  queryCollection('blog')
    .where('category', '=', 'case-study')
    .where('featured', '=', true)
    .order('date', 'DESC')
    .limit(3)
    .all(),
)
</script>

<template>
  <LayoutSection
    :variant="trustConfig.sectionVariant"
    :background="trustConfig.background"
    class="trust-work"
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
          </LayoutStack>
        </LayoutCenter>

        <!-- Client testimonials with social proof -->
        <LayoutGrid
          v-if="testimonials?.length"
          variant="thirds"
        >
          <UCard
            v-for="testimonial in testimonials"
            :key="testimonial.path"
            class="bg-success/5 border-success/20 hover:border-success/40 transition-all duration-200"
          >
            <LayoutStack variant="default">
              <!-- Trust indicator -->
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <UIcon
                    name="i-lucide-quote"
                    class="size-5 text-success-600"
                  />
                </div>
                <UBadge
                  color="success"
                  variant="soft"
                  size="sm"
                >
                  Verified Client
                </UBadge>
              </div>

              <!-- Testimonial content -->
              <LayoutStack variant="compact">
                <LayoutText
                  :text="testimonial.title"
                  variant="card"
                  class="font-semibold"
                />

                <LayoutText
                  v-if="testimonial.description"
                  :text="testimonial.description"
                  variant="small"
                  class="text-muted"
                />

                <!-- Client info -->
                <div class="flex items-center gap-2 mt-4 pt-4 border-t border-muted/30">
                  <div class="w-8 h-8 rounded-full bg-muted/20 flex items-center justify-center">
                    <UIcon
                      name="i-lucide-user"
                      class="size-4 text-muted"
                    />
                  </div>
                  <div class="text-sm text-muted">
                    {{ testimonial.client || 'Verified Client' }}
                  </div>
                </div>
              </LayoutStack>
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
.trust-work {
  --section-emphasis: social-proof;
}
</style>
