<!-- pages/gated/[stage]/index.vue -->
<script setup lang="ts">
definePageMeta({ layout: 'gated' });

const route = useRoute();
const stageSlug = route.params.stage as string;
const { isContentAccessible } = useContentUnlock();

const { data: page } = await useAsyncData(
  `gated-${stageSlug}-overview`,
  () => {
    return queryCollection('gated').path(route.path).first();
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

const { data: steps } = await useAsyncData(`gated-${stageSlug}-steps`, () => {
  return queryCollection('gated')
    .where('path', 'LIKE', `${route.fullPath}/%`)
    .where('extension', '=', 'md')
    .select()
    .all();
});
</script>

<template>
  <GatedPage
    :page="page"
    :steps="steps"
    :back-button="{ to: '/gated', label: 'Back to Dashboard' }"
  />
</template>
