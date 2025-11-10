<script setup lang="ts">
import { normalizeContentPath } from '#shared/utils/config-resolver';
definePageMeta({
  layout: 'gated',
});

const route = useRoute();
const { isStageAccessible, getStageLabel } = useStageAccess();

// Fetch current page
const { data: page } = await useAsyncData(`magnet-${route.params.step}`, () => {
  return queryCollection('magnet').path(route.path).first();
});

// Check access immediately
if (page.value && !isStageAccessible(page.value)) {
  const statusLabel = getStageLabel(page.value) || 'unavailable';

  throw createError({
    statusCode: 403,
    statusMessage: `This step is ${statusLabel}.`,
    fatal: true,
  });
}

// Fetch navigation
const { data: surround } = await useAsyncData(
  `${route.params.step}-surround`,
  () => {
    if (!page.value?.path) return null;
    return queryCollectionItemSurroundings('magnet', page.value.path, {
      fields: ['title', 'path', 'status'],
    });
  },
);

const normalizedSurround = computed(() => surround.value ?? []);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Step not found',
    fatal: true,
  });
}
</script>

<template>
  <div v-if="page" class="max-w-2xl mx-auto space-y-8">
    <!-- Header -->
    <div class="space-y-4">
      <div>
        <h1 class="text-4xl font-bold">
          {{ page.title }}
        </h1>
        <p v-if="page.description" class="text-lg text-muted mt-2">
          {{ page.description }}
        </p>
      </div>

      <div
        v-if="page.media?.src"
        class="rounded-lg overflow-hidden border border-default"
      >
        <!-- Image -->
        <NuxtImg
          v-if="page.media.type === 'image'"
          :src="normalizeContentPath(page.media.src)"
          :alt="page.media.alt || page.title"
          class="w-full h-auto"
        />

        <!-- Video -->
        <IVideo
          v-else-if="page.media.type === 'video'"
          :src="normalizeContentPath(page.media.src)"
          :alt="page.media.alt"
        />
      </div>

      <USeparator />
    </div>

    <!-- Content -->
    <ContentRenderer
      v-if="page.body"
      :value="page"
      class="prose prose-primary dark:prose-invert max-w-none"
    />

    <!-- Navigation -->
    <template v-if="normalizedSurround?.filter(Boolean).length">
      <USeparator />
      <UContentSurround
        :surround="normalizedSurround as any"
        prev-icon="i-lucide-arrow-left"
        next-icon="i-lucide-arrow-right"
      />
    </template>
  </div>
</template>
