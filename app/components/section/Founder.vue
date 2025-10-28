<script setup lang="ts">
const data = useFlowSection('founder');
const isBackgroundExpanded = ref(false);
</script>

<template>
  <ISectionWrapper
    id="#founder"
    :intro="data.intro"
    :bridge="data.bridge"
    class="bg-muted/50"
  >
    <!-- Hook + Mission Quote (merged in quote box) -->
    <div class="mb-12 max-w-(--ui-container-sm) mx-auto flex flex-col">
      <div class="flex flex-col items-center gap-4 mb-8">
        <p class="font-written text-xl text-center">
          {{ data.story.greeting }}
        </p>
      </div>
      <div v-if="data.profile.portrait?.src" class="flex justify-center">
        <NuxtImg
          :src="data.profile.portrait.src"
          :alt="data.profile.portrait.alt"
          class="w-54 object-cover border-primary/20 shadow-xl rounded-lg"
        />
      </div>
      <UPageCard
        variant="subtle"
        spotlight
        spotlight-color="primary"
        class="relative text-center"
      >
        <div
          class="absolute -top-4 left-4 text-6xl text-primary/30 font-serif leading-none"
        >
          "
        </div>
        <div class="px-6 space-y-4 text-center">
          <p
            class="text-xl md:text-2xl font-bold leading-tight text-highlighted"
          >
            {{ data.story.mission }}
          </p>
        </div>
        <div
          class="absolute -bottom-4 right-4 text-6xl text-primary/30 font-serif leading-none rotate-180"
        >
          "
        </div>
      </UPageCard>
      <div
        v-if="data.story?.background?.length"
        class="max-w-(--ui-container-sm) mx-auto pt-8"
      >
        <UCollapsible
          v-model:open="isBackgroundExpanded"
          class="flex flex-col justify-center items-center gap-4"
        >
          <UButton
            :label="isBackgroundExpanded ? 'Hide My Story' : 'Read My Full Story'"
            color="neutral"
            variant="subtle"
            :trailing-icon="
              isBackgroundExpanded
                ? 'i-lucide-chevron-up'
                : 'i-lucide-chevron-down'
            "
            :ui="{
              trailingIcon: 'transition-transform duration-200',
            }"
            class="group"
          />
  
          <template #content>
            <div
              class="font-written text-lg md:text-xl leading-relaxed space-y-6 md:space-y-8 pt-4"
            >
              <p
                v-for="(para, i) in data.story.background"
                :key="i"
                class="text-center"
              >
                {{ para }}
              </p>
              <p
                v-if="data.story?.challenge"
                class="text-center text-lg md:text-xl font-written font-semibold text-primary leading-relaxed"
              >
                {{ data.story.challenge }}
              </p>
            </div>
          </template>
        </UCollapsible>
      </div>
    </div>

    <!-- Collapsible Background Story -->
  </ISectionWrapper>
</template>
