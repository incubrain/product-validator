<!-- pages/magnet/[stage]/index.vue -->
<script setup lang="ts">
definePageMeta({ layout: 'gated' });

const route = useRoute();
const stageSlug = route.params.stage as string;
const { isContentAccessible } = useContentAccess();

const { data: page } = await useAsyncData(
  `magnet-${stageSlug}-overview`,
  () => {
    return queryCollection('magnet').path(route.path).first();
  },
);

if (page.value && !isContentAccessible(page.value)) {
  throw createError({
    statusCode: 403,
    statusMessage: `This stage is ${page.value.status}.`,
    fatal: true,
  });
}

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Stage overview not found',
    fatal: true,
  });
}

const { data: steps } = await useAsyncData(`magnet-${stageSlug}-steps`, () => {
  return queryCollection('magnet')
    .where('path', 'LIKE', `${route.fullPath}/%`)
    .where('extension', '=', 'md')
    .select()
    .all();
});
</script>

<template>
  <IMagnetPage
    :page="page"
    :steps="steps"
    :back-button="{ to: '/magnet', label: 'Back to Dashboard' }"
  />
</template>
