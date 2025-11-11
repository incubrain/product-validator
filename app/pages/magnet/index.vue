<!-- pages/magnet/index.vue -->
<script setup lang="ts">
definePageMeta({ layout: 'gated' });

const route = useRoute();
const { data: page } = await useAsyncData('magnet-overview', () => {
  return queryCollection('magnet').path(route.path).first();
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
  <IMagnetPage :page="page" />
</template>
