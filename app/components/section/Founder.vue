<script setup lang="ts">
const founder = useFlowSection('founder');
const sections = useFlowSection('founder').sections;
const fullName = founder.name;
</script>

<template>
  <UPageSection
    :icon="sections?.intro?.icon"
    :headline="sections?.intro?.headline"
    :title="sections?.intro?.title"
    :description="sections?.intro?.description"
    orientation="horizontal"
    class="bg-muted"
  >
    <!-- LEFT: Profile + Links + Highlights -->
    <template #header>
      <div class="flex flex-col items-start gap-4 mb-6">
        <UUser
          :name="fullName || founder.name"
          :description="founder.role"
          :avatar="{ src: founder.avatar.src, alt: founder.avatar.alt }"
          size="lg"
        />

        <!-- Social / Links (text buttons for now) -->
        <div class="flex items-center gap-2 mt-1" v-if="founder.links?.length">
          <UButton
            v-for="l in founder.links"
            :key="l.label"
            variant="ghost"
            color="neutral"
            :icon="`i-lucide-${l.platform}`"
            size="sm"
            :to="l.url"
            target="_blank"
          />
        </div>
      </div>

      <!-- Highlights as badges -->
      <div v-if="founder.highlights?.length" class="flex flex-wrap gap-2 mb-6">
        <UBadge
          v-for="(h, i) in founder.highlights"
          :key="i"
          variant="subtle"
          color="info"
          size="sm"
        >
          {{ h }}
        </UBadge>
      </div>
    </template>

    <!-- BODY: Long story + (optional) background -->
    <template #body>
      <div class="prose prose-invert max-w-none mb-6" v-if="founder.bioLong">
        <!-- If you store markdown, keep MDC; if plain text, a <p> is fine -->
        <MDC :value="founder.bioLong" />
      </div>

      <div
        class="mt-4 text-muted leading-relaxed"
        v-if="founder.backgroundStory"
      >
        <MDC :value="founder.backgroundStory" />
      </div>
    </template>

    <!-- RIGHT: Promise callout -->
    <div>
      <div class="flex justify-center items-start pb-4">
        <UBadge color="neutral">
          Hi, I'm {{ founder.name.split(' ')[0] }}
        </UBadge>
      </div>

      <div
        v-if="founder.portrait.src"
        class="hidden md:block order-2 lg:order-1"
      >
        <div class="relative">
          <NuxtImg
            :src="founder.portrait.src"
            :alt="founder.portrait.alt"
            class="w-full max-w-xs mx-auto rounded-2xl"
          />
        </div>
      </div>

      <blockquote class="relative" v-if="founder.promise">
        <UPageCard
          class="border-2 border-dashed border-secondary/30"
          spotlight
          spotlight-color="secondary"
        >
          <p class="text-xl leading-relaxed">
            {{ founder.promise }}
          </p>
        </UPageCard>
        <div class="absolute -top-4 left-2 text-7xl text-secondary font-serif">
          "
        </div>
        <div
          class="absolute -bottom-4 right-2 text-7xl text-secondary font-serif rotate-180"
        >
          "
        </div>
      </blockquote>
    </div>
  </UPageSection>
</template>
