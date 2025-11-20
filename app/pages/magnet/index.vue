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

const { flatSteps } = useMagnetProgress();
const nextPath = computed(() => {
  if (flatSteps.value.length === 0) return undefined;
  const currentIndex = flatSteps.value.indexOf(route.path);
  if (currentIndex === -1 || currentIndex === flatSteps.value.length - 1) return undefined;
  return flatSteps.value[currentIndex + 1];
});
</script>

<template>
  <IMagnetPage :page="page">
    <div class="mt-8 flex justify-end">
      <IMagnetCompleteButton 
        :current-path="route.path"
        :next-path="nextPath"
        label="Start Your Journey"
      />
    </div>
  </IMagnetPage>
</template>
