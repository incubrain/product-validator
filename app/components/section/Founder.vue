<script setup lang="ts">
defineProps<{
  data?: any;
}>();

// Fetch founder and config data
const { getFounder } = useContentCache();
const { data: founderData } = await getFounder();

const isBackgroundExpanded = ref(false);

const { showSection } = useSectionVisibility();
</script>

<template>
  <ISectionWrapper
    v-if="showSection('founder')"
    id="#founder"
    :intro="data.intro"
    :cta="data.cta"
    :class="`bg-muted/50 ${$attrs.class}`"
  >
    <div class="max-w-(--ui-container-sm) mx-auto space-y-8 sm:space-y-12 px-4">
      <!-- Merged Portrait + Quote Card -->
      <UPageCard
        variant="subtle"
        spotlight
        spotlight-color="primary"
        class="relative"
      >
        
          
          
          <!-- Content (with top padding for portrait) -->
            <!-- Name & Role -->
          

          <!-- Opening Quote -->
          <div
            class="absolute -top-3  left-4 text-4xl sm:text-5xl text-primary/40 font-serif leading-none select-none"
          >
            "
          </div>

          <!-- Mission Quote -->
          <div class="flex justify-center gap-4 shrink-0 items-center space-y-1 sm:space-y-2">
            <div>
              <NuxtImg
                    :src="founderData.profile.portrait.src"
                    :alt="founderData.profile.portrait.alt"
                    class="w-24 h-24 min-w-24 bg-default shrink-0 object-cover object-top rounded-full border-2 border-primary/20 shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div class="text-center">
                    <h3 class="text-lg font-bold text-highlighted">
                      {{ founderData?.profile.given_name }}
                    </h3>
                    <p class="text-xs sm:text-sm text-muted uppercase tracking-wider">
                      {{ founderData?.profile.role }}
                    </p>
                  </div>
            </div>    
                <p
                  class="text-lg sm:text-xl md:text-2xl font-semibold leading-relaxed text-left text-highlighted px-4 sm:px-6"
                >
                  {{ founderData?.story.mission }}
                </p>
              </div>

          <!-- Closing Quote -->
          <div
            class="absolute -bottom-3 right-4 text-4xl sm:text-5xl text-primary/40 font-serif leading-none rotate-180 select-none"
          >
            "
          </div>
      </UPageCard>


      <!-- Story Collapsible -->
      <div
        v-if="founderData?.story?.background?.length"
        class="space-y-6"
      >
        <UCollapsible
          v-model:open="isBackgroundExpanded"
          :unmount-on-hide="false"
        >
          <!-- Toggle Button -->
          <div class="flex justify-center">
            <UButton
              :label="
                isBackgroundExpanded ? 'Hide Full Story' : 'Read Full Story'
              "
              color="neutral"
              variant="outline"
              size="lg"
              :trailing-icon="
                isBackgroundExpanded
                  ? 'i-lucide-chevron-up'
                  : 'i-lucide-chevron-down'
              "
              class="group hover:border-primary/50 transition-colors"
              :ui="{
                trailingIcon: isBackgroundExpanded ? 'rotate-180' : '',
              }"
            />
          </div>

          <!-- Story Content -->
          <template #content>
            <div class="pt-6 sm:pt-8 space-y-6">
              <!-- Background Paragraphs -->
              <div class="space-y-4 sm:space-y-6">
                <p
                  v-for="(para, i) in founderData?.story.background"
                  :key="`background-${i}`"
                  class="text-base sm:text-lg leading-relaxed text-dimmed text-center max-w-2xl mx-auto"
                >
                  {{ para }}
                </p>
              </div>

              <!-- Challenge/CTA -->
              <div
                v-if="founderData?.story?.challenge"
                class="pt-4 sm:pt-6 border-t border-primary/20"
              >
                <p
                  class="text-lg sm:text-xl md:text-2xl font-bold text-center text-primary leading-relaxed"
                >
                  {{ founderData.story.challenge }}
                </p>
              </div>

              <!-- Email CTA -->
              <div class="flex justify-center pt-4">
                <UButton
                  :to="`mailto:${founderData?.profile.email}`"
                  label="Get in Touch"
                  icon="i-lucide-mail"
                  color="primary"
                  variant="soft"
                  size="lg"
                />
              </div>
            </div>
          </template>
        </UCollapsible>
      </div>
    </div>
  </ISectionWrapper>
</template>