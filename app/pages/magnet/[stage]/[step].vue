<!-- pages/magnet/[stage]/[step].vue -->
<script setup lang="ts">
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
    return queryCollectionItemSurroundings('magnet', page.value.path, {
      fields: ['title', 'path', 'status'],
    });
  },
);

const normalizedSurround = computed(() => surround.value ?? []);
</script>

<template>
  <IMagnetPage :page="page" :surround="normalizedSurround" />
</template>
