<!-- components/section/hero/Trust.vue - SOCIAL PROOF & TESTIMONIALS -->
<script setup lang="ts">
import type { HeroSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<HeroSection, 'type'>>()

// Trust-specific background and styling
const trustConfig: IntentConfig = {
  background: 'minimal',
  sectionVariant: 'hero',
  emphasis: 'social-proof',
  colorScheme: 'success',
}
</script>

<template>
  <LayoutSection
    :variant="trustConfig.sectionVariant"
    :background="trustConfig.background"
    class="trust-hero"
  >
    <LayoutCenter variant="prose">
      <LayoutStack variant="spacious">
        <!-- Trust-focused content layout -->
        <LayoutCenter variant="text-only">
          <LayoutStack variant="default">
            <LayoutHeading
              :text="title"
              variant="hero"
              anchor
            />

            <LayoutText
              v-if="subtitle"
              :text="subtitle"
              variant="hero-subtitle"
            />

            <LayoutText
              v-if="description"
              :text="description"
              variant="description"
            />
          </LayoutStack>
        </LayoutCenter>

        <!-- Trust indicators - testimonials/social proof -->
        <LayoutGrid
          v-if="items?.length"
          variant="thirds"
        >
          <UCard
            v-for="(item, index) in items"
            :key="item.title"
            class="bg-elevated/30 border-muted hover:border-default transition-all duration-200"
          >
            <LayoutStack variant="centered">
              <!-- Trust icon with soft styling -->
              <div class="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <UIcon
                  :name="item.icon || 'i-lucide-shield-check'"
                  class="size-5 text-success-600"
                />
              </div>

              <LayoutStack variant="centered">
                <LayoutHeading
                  :text="item.title"
                  variant="card"
                />
                <LayoutText
                  :text="item.description"
                  variant="small"
                  class="text-muted text-center"
                />
              </LayoutStack>
            </LayoutStack>
          </UCard>
        </LayoutGrid>

        <!-- Trust-focused CTA -->
        <LayoutCenter v-if="action">
          <LayoutStack variant="centered">
            <LayoutText
              v-if="action.description"
              variant="caption"
              :text="action.description"
              class="text-muted"
            />

            <LayoutCluster variant="centered">
              <UButton
                :label="action.text"
                color="primary"
                size="lg"
                :to="action.link"
                trailing-icon="i-lucide-shield-check"
              />
            </LayoutCluster>
          </LayoutStack>
        </LayoutCenter>
      </LayoutStack>
    </LayoutCenter>
  </LayoutSection>
</template>

<style scoped>
.trust-hero {
  /* Trust-specific styling - soft, reassuring */
  --section-emphasis: social-proof;
}
</style>
