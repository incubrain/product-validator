<script setup lang="ts">
/*
PURPOSE:
- Public-facing founder story built from `flowConfig.personal`.
- Mirrors your old layout but maps to the current data keys.

DATA (from flowConfig.personal):
- name (combine as display heading)
- role
- avatarUrl
- bioLong
- promise
- expertise? (you have `highlights` strings; we’ll render those as badges)
- links[]: { label, url } (old component had icons; we’ll render simple buttons w/ text)

NOTES:
- If you later want icons in links, extend personal.links to include `icon` and wire to UIcon.
*/

const personal = useFlowSection('founder');
const fullName = personal.name;
</script>

<template>
  <UPageSection orientation="horizontal" icon="i-lucide-bolt" class="bg-muted">
    <!-- LEFT: Profile + Links + Highlights -->
    <template #header>
      <div class="flex flex-col items-start gap-4 mb-6">
        <UUser
          :name="fullName || personal.name"
          :description="personal.role"
          :avatar="{ src: personal.avatarUrl, alt: fullName || personal.name }"
          size="lg"
        />

        <!-- Social / Links (text buttons for now) -->
        <div class="flex items-center gap-2 mt-1" v-if="personal.links?.length">
          <UButton
            v-for="l in personal.links"
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
      <div v-if="personal.highlights?.length" class="flex flex-wrap gap-2 mb-6">
        <UBadge
          v-for="(h, i) in personal.highlights"
          :key="i"
          variant="subtle"
          color="primary"
          size="sm"
        >
          {{ h }}
        </UBadge>
      </div>
    </template>

    <!-- BODY: Long story + (optional) background -->
    <template #body>
      <div class="prose prose-invert max-w-none mb-6" v-if="personal.bioLong">
        <!-- If you store markdown, keep MDC; if plain text, a <p> is fine -->
        <MDC :value="personal.bioLong" />
      </div>

      <div
        class="mt-4 text-muted leading-relaxed"
        v-if="personal.backgroundStory"
      >
        <MDC :value="personal.backgroundStory" />
      </div>
    </template>

    <!-- RIGHT: Promise callout -->
    <div class="space-y-4">
      <div class="flex justify-end items-start pb-12">
        <UBadge color="secondary">
          Hi, I'm {{ personal.name.split(' ')[0] }}
        </UBadge>
      </div>

      <div
        v-if="personal.portraitUrl"
        class="hidden md:block order-2 lg:order-1"
      >
        <div class="relative">
          <NuxtImg
            :src="personal.portraitUrl"
            :alt="`Portrait of ${fullName || personal.name}`"
            class="w-full max-w-xs mx-auto rounded-2xl shadow-lg"
          />
        </div>
      </div>

      <blockquote class="relative" v-if="personal.promise">
        <div class="absolute -top-4 left-2 text-7xl text-primary font-serif">
          "
        </div>
        <UCard class="border-2 border-dashed border-primary/30">
          <p class="text-xl leading-relaxed">
            {{ personal.promise }}
          </p>
        </UCard>
        <div
          class="absolute -bottom-4 right-2 text-7xl text-primary font-serif rotate-180"
        >
          "
        </div>
      </blockquote>
    </div>
  </UPageSection>
</template>
