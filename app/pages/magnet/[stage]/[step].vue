<script setup lang="ts">
import { normalizeContentPath } from '#shared/utils/config-resolver';

definePageMeta({
  layout: 'gated',
});

const route = useRoute();

// Fetch current page - query by step pattern
const { data: page } = await useAsyncData(`magnet-${route.params.step}`, () => {
  return queryCollection('magnet')
    .where('path', 'LIKE', `%/${route.params.step}`)
    .first();
});

console.log('[Magnet Step] Found page:', page.value?.path);

// Fetch navigation using the FULL path (before normalization)
const { data: surround } = await useAsyncData(
  `${route.params.step}-surround`,
  () => {
    if (!page.value?.path) return null;

    return queryCollectionItemSurroundings('magnet', page.value.path, {
      fields: ['title', 'step', 'path'], // ← Use 'path' not '_path'
    });
  },
);

console.log(
  '[Magnet Step] Surround:',
  surround.value?.map((s) => s?.path),
);

// Normalize surround paths for display
const normalizedSurround = computed(() => {
  if (!surround.value) return [];

  return surround.value.map((item) => {
    if (!item) return null;
    return {
      ...item,
      path: normalizeContentPath(item.path), // Normalize for navigation
    };
  });
});

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Step not found',
    fatal: true,
  });
}
</script>

<template>
  <div v-if="page" class="max-w-4xl mx-auto space-y-8">
    <!-- Header -->
    <div class="space-y-4">
      <div class="flex items-center gap-3">
        <UButton
          to="/magnet"
          icon="i-lucide-arrow-left"
          color="neutral"
          variant="ghost"
          size="sm"
        />
        <UBadge v-if="page.step" color="primary" variant="subtle">
          Step {{ page.step }} of 4
        </UBadge>
      </div>

      <div>
        <h1 class="text-4xl font-bold">
          {{ page.title }}
        </h1>
        <p v-if="page.description" class="text-lg text-muted mt-2">
          {{ page.description }}
        </p>
        <p v-if="page.duration" class="text-sm text-dimmed mt-1">
          ⏱️ {{ page.duration }}
        </p>
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
