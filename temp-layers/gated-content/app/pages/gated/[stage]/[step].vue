<!-- pages/gated/[stage]/[step].vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'gated',
});

const route = useRoute();
const { isContentAccessible, getContentLabel } = useContentUnlock();

// Fetch current page
const { data: page } = await useAsyncData(`gated-${route.params.step}`, () => {
  return queryCollection('gated').path(route.path).first();
});

// Check access immediately
if (page.value && !isContentAccessible(page.value)) {
  const statusLabel = getContentLabel(page.value) || 'unavailable';

  throw createError({
    statusCode: 403,
    statusMessage: `This step is ${statusLabel}.`,
    fatal: true,
  });
}

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Step not found',
    fatal: true,
  });
}

// Fetch navigation
const { data: surround } = await useAsyncData(
  `${route.params.step}-surround`,
  () => {
    if (!page.value?.path) return null;
    return queryCollectionItemSurroundings('gated', page.value.path, {
      fields: ['title', 'path', 'status'],
    });
  },
);

const normalizedSurround = computed(() => surround.value ?? []);
</script>

<template>
  <GatedPage :page="page" :surround="normalizedSurround" />
</template>
