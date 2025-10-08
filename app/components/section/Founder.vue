<script setup lang="ts">
const data = useFlowSection('founder');

const story = data.story;
const profile = data.profile;
</script>

<template>
  <ISectionWrapper
    id="#founder"
    :intro="data.intro"
    :bridge="data.bridge"
    class="bg-muted/50"
  >
    <!-- Hook + Mission Quote (merged in quote box) -->
    <div class="mb-12 max-w-(--ui-container-sm) mx-auto">
      <div class="flex flex-col items-center gap-4 mb-8">
        <p class="font-written text-xl text-center">
          {{ story.greeting }}
        </p>
      </div>
      <div v-if="profile.portrait?.src" class="flex justify-center">
        <NuxtImg
          :src="profile.portrait.src"
          :alt="profile.portrait.alt"
          class="w-54 object-cover border-primary/20 shadow-xl rounded-lg"
        />
      </div>
      <UPageCard
        variant="subtle"
        spotlight
        spotlight-color="primary"
        class="relative"
      >
        <div
          class="absolute -top-4 left-4 text-6xl text-primary/30 font-serif leading-none"
        >
          "
        </div>
        <div class="px-6 space-y-4">
          <p
            class="text-xl md:text-2xl font-bold leading-tight text-highlighted"
          >
            {{ story.mission }}
          </p>
        </div>
        <div
          class="absolute -bottom-4 right-4 text-6xl text-primary/30 font-serif leading-none rotate-180"
        >
          "
        </div>
      </UPageCard>
    </div>

    <div
      v-if="story?.background?.length"
      class="max-w-(--ui-container-sm) mx-auto font-written text-lg md:text-xl leading-relaxed space-y-6 md:space-y-8"
    >
      <p v-for="(para, i) in story.background" :key="i" class="text-center">
        {{ para }}
      </p>
      <p
        class="text-center text-lg md:text-xl font-written font-semibold text-primary leading-relaxed"
      >
        {{ story.challenge }}
      </p>
    </div>

    <!-- FOOTER: Challenge -->
    <div v-if="story?.challenge" class="max-w-3xl mx-auto text-center"></div>
  </ISectionWrapper>
</template>
