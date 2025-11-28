<!-- pages/gated/index.vue -->
<script setup lang="ts">
definePageMeta({ layout: 'gated' });

const route = useRoute();
const { data: page } = await useAsyncData('gated-overview', () => {
  return queryCollection('gated').path(route.path).first();
});

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Overview page not found',
    fatal: true,
  });
}

// Helper to normalize paths (remove trailing slash and query params)
const normalizePath = (path: string) => {
  return path.split('?')[0].split('#')[0].replace(/\/$/, '');
};

const { flatSteps, isStepValid } = useContentProgress();
const nextPath = computed(() => {
  const normalizedRoutePath = normalizePath(route.path);
  const currentIndex = flatSteps.value.indexOf(normalizedRoutePath);

  
  if (flatSteps.value.length === 0) return undefined;
  if (currentIndex === -1 || currentIndex === flatSteps.value.length - 1) return undefined;
  return flatSteps.value[currentIndex + 1];
});


</script>

<template>
  <GatedPage :page="page">
    <div class="mt-8 flex justify-end">
      <GatedCompleteButton 
        :current-path="route.path"
        :next-path="nextPath"
        label="Start Your Journey"
      />
    </div>
  </GatedPage>
</template>
