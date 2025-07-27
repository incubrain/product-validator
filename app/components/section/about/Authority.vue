<!-- app/components/section/about/Authority.vue -->
<script setup lang="ts">
import type { AboutSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<AboutSection, 'type'>>()

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
    class="authority-about"
  >
    <LayoutCenter variant="prose">
      <LayoutSplit variant="default">
        <!-- Professional image with credentials -->
        <template #secondary>
          <div
            v-if="image"
            class="relative"
          >
            <MediaImage
              :src="image"
              :alt="title"
              class="w-full shadow-lg border-2 border-primary/20"
              aspect-ratio="square"
              object-fit="cover"
              loading="lazy"
              :ui="{ root: 'rounded-2xl' }"
            />

            <!-- Professional credentials overlay -->
            <div
              v-if="items?.length"
              class="absolute -bottom-6 -right-6 bg-primary/10 border border-primary/30 rounded-xl p-4 shadow-lg"
            >
              <div class="grid grid-cols-2 gap-6">
                <div
                  v-for="credential in items.slice(0, 2)"
                  :key="credential.label"
                  class="text-center"
                >
                  <div class="text-2xl font-bold text-primary-700">
                    {{ credential.value }}
                  </div>
                  <div class="text-sm text-muted uppercase tracking-wide">
                    {{ credential.label }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Authority badge -->
            <div class="absolute top-4 left-4">
              <UBadge
                color="primary"
                variant="solid"
                size="lg"
              >
                <UIcon
                  name="i-lucide-award"
                  class="size-4 mr-2"
                />
                Expert
              </UBadge>
            </div>
          </div>
        </template>

        <!-- Professional content -->
        <template #primary>
          <LayoutStack variant="spacious">
            <LayoutStack variant="compact">
              <LayoutHeading
                :text="title"
                variant="section"
                anchor
              />

              <!-- Professional subtitle -->
              <LayoutText
                text="Technical Leader & Innovation Expert"
                variant="subtitle"
                class="text-primary-600"
              />
            </LayoutStack>

            <div
              class="prose prose-lg prose-zinc dark:prose-invert max-w-none"
              v-html="story"
            />

            <!-- Professional achievements -->
            <div
              v-if="items && items.length > 2"
              class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
            >
              <div
                v-for="achievement in items.slice(2)"
                :key="achievement.label"
                class="p-6 bg-primary/5 border border-primary/20 rounded-lg"
              >
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <UIcon
                      name="i-lucide-trophy"
                      class="size-4 text-primary-600"
                    />
                  </div>
                  <div class="text-xl font-bold text-primary-700">
                    {{ achievement.value }}
                  </div>
                </div>
                <div class="text-sm text-muted uppercase tracking-wide">
                  {{ achievement.label }}
                </div>
              </div>
            </div>

            <!-- Professional certifications -->
            <div class="flex flex-wrap gap-2 mt-6">
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
          </LayoutStack>
        </template>
      </LayoutSplit>
    </LayoutCenter>
  </LayoutSection>
</template>

<style scoped>
.authority-about {
  --section-emphasis: expertise;
}
</style>
