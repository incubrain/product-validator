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
  <ISection
    :variant="trustConfig.sectionVariant"
    :background="trustConfig.background"
    class="trust-hero"
  >
    <ILayoutCenter variant="prose">
      <ILayoutStack variant="spacious">
        <!-- Trust-focused content layout -->
        <ILayoutCenter variant="text-only">
          <ILayoutStack variant="default">
            <IHeading
              :text="title"
              variant="hero"
              anchor
            />

            <IText
              v-if="subtitle"
              :text="subtitle"
              variant="hero-subtitle"
            />

            <IText
              v-if="description"
              :text="description"
              variant="description"
            />
          </ILayoutStack>
        </ILayoutCenter>

        <!-- Trust indicators - testimonials/social proof -->
        <ILayoutGrid
          v-if="items?.length"
          variant="thirds"
        >
          <UCard
            v-for="(item, index) in items"
            :key="item.title"
            class="bg-elevated/30 border-muted hover:border-default transition-all duration-200"
          >
            <ILayoutStack variant="centered">
              <!-- Trust icon with soft styling -->
              <div class="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <UIcon
                  :name="item.icon || 'i-lucide-shield-check'"
                  class="size-5 text-success-600"
                />
              </div>

              <ILayoutStack variant="centered">
                <IHeading
                  :text="item.title"
                  variant="card"
                />
                <IText
                  :text="item.description"
                  variant="small"
                  class="text-muted text-center"
                />
              </ILayoutStack>
            </ILayoutStack>
          </UCard>
        </ILayoutGrid>

        <!-- Trust-focused CTA -->
        <ILayoutCenter v-if="action">
          <ILayoutStack variant="centered">
            <IText
              v-if="action.description"
              variant="caption"
              :text="action.description"
              class="text-muted"
            />

            <ILayoutCluster variant="centered">
              <UButton
                :label="action.text"
                color="primary"
                size="lg"
                :to="action.link"
                trailing-icon="i-lucide-shield-check"
              />
            </ILayoutCluster>
          </ILayoutStack>
        </ILayoutCenter>
      </ILayoutStack>
    </ILayoutCenter>
  </ISection>
</template>

<style scoped>
.trust-hero {
  /* Trust-specific styling - soft, reassuring */
  --section-emphasis: social-proof;
}
</style>
