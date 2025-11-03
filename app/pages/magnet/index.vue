<script setup lang="ts">
import { normalizeContentPath } from '#shared/utils/config-resolver';

definePageMeta({
  layout: 'gated',
});

// Fetch the index.md content
const { data: page } = await useAsyncData('magnet-overview', () => {
  return queryCollection('magnet').where('step', 'IS NULL').first();
});

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Overview page not found',
    fatal: true,
  });
}
</script>

<template>
  <div v-if="page" class="max-w-4xl mx-auto space-y-8">
    <!-- Header -->
    <div class="space-y-4">
      <h1 class="text-4xl font-bold">
        {{ page.title }}
      </h1>
      <p v-if="page.description" class="text-lg text-muted">
        {{ page.description }}
      </p>
    </div>

    <!-- Media -->
    <div
      v-if="page.media?.src"
      class="rounded-lg overflow-hidden border border-default"
    >
      <!-- Image -->
      <NuxtImg
        v-if="page.media.type === 'image'"
        :src="page.media.src"
        :alt="page.media.alt || page.title"
        class="w-full h-auto"
      />

      <!-- Video -->
      <IVideo v-else-if="page.media.type === 'video'" :src="page.media.src" />
    </div>

    <USeparator />

    <!-- Content -->
    <ContentRenderer
      v-if="page.body"
      :value="page"
      class="prose prose-primary dark:prose-invert max-w-none"
    />
  </div>
</template>
