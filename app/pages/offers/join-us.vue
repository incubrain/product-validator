<!-- offers/join-us.vue -->
<script setup lang="ts">
const { getSiteConfig } = useContentCache();
const { data: configData } = await getSiteConfig();
const business = computed(() => configData.value?.business);

// Fetch join page content
const { data: page } = await useAsyncData('offers-join-us', () =>
  queryCollection('pages').path('/offers/join-us').first(),
);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  });
}

definePageMeta({ layout: false });

defineOgImage({
  component: 'Frame',
  props: {
    title: page.value.title,
    description: page.value.description,
    image: business.value?.logo,
  },
});

const { trackEvent } = useEvents();
onMounted(() => {
  trackEvent({
    id: 'join_team_view',
    type: 'page_view',
    location: 'join-team-page',
    action: 'view',
    target: '/offers/join-us',
  });
});
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center relative overflow-hidden py-16 sm:py-20 lg:py-24"
  >
    <!-- Background Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent"
      />
      <div
        class="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
      />
    </div>

    <!-- Navigation -->
    <div
      class="absolute top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div class="pointer-events-auto">
        <NuxtLink to="/"><Logo /></NuxtLink>
      </div>
    </div>

    <!-- Content -->
    <UContainer class="relative z-10">
      <div class="max-w-3xl mx-auto">
        <div class="space-y-6 text-center mb-12 lg:mb-16">
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]"
          >
            {{ page.title }}
          </h1>

          <p
            class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            {{ page.description }}
          </p>
        </div>

        <div
          class="mb-12 lg:mb-16 prose prose-lg dark:prose-invert max-w-none mx-auto"
        >
          <ContentRenderer :value="page" />
        </div>

        <!-- Call to Action -->
        <div class="max-w-md mx-auto">
          <div
            class="bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 lg:p-8 backdrop-blur-sm space-y-6 text-center"
          >
            <h3 class="text-xl font-semibold">Ready to apply?</h3>
            <UButton
              to="mailto:hello@incubrain.org"
              label="Apply Now"
              icon="i-heroicons-envelope"
              size="xl"
              block
              color="primary"
            />
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
