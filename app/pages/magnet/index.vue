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

// Helper to normalize paths (remove trailing slash and query params)
const normalizePath = (path: string) => {
  return path.split('?')[0].split('#')[0].replace(/\/$/, '');
};

const { flatSteps, isStepValid } = useMagnetProgress();
const nextPath = computed(() => {
  const normalizedRoutePath = normalizePath(route.path);
  const currentIndex = flatSteps.value.indexOf(normalizedRoutePath);
  console.log('[MagnetIndex] nextPath calculation:', {
    routePath: route.path,
    normalizedRoutePath,
    flatSteps: flatSteps.value,
    currentIndex,
    isLast: currentIndex === flatSteps.value.length - 1,
  });
  
  if (flatSteps.value.length === 0) return undefined;
  if (currentIndex === -1 || currentIndex === flatSteps.value.length - 1) return undefined;
  return flatSteps.value[currentIndex + 1];
});

console.log('[MagnetIndex] Page setup:', {
  routePath: route.path,
  flatStepsCount: flatSteps.value.length,
  flatSteps: flatSteps.value,
  nextPath: nextPath.value,
  isValid: isStepValid(route.path),
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
