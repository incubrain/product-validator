<script setup lang="ts">
const { trackEvent } = useEvents();

// Fetch all team members
const { data: members, pending: membersPending } = await useAsyncData(
  'team-index',
  () => queryCollection('team').all(),
);

// Fetch team intro page content
const { data: page, pending: pagePending } = await useAsyncData(
  'team-page-content',
  () => queryCollection('pages').path('/team').first(),
);

const isLoading = computed(() => membersPending.value || pagePending.value);

useHead({
  title: page.value?.title || 'Meet the Team',
  meta: page.value?.description
    ? [{ name: 'description', content: page.value.description }]
    : [],
});

onMounted(() => {
  trackEvent({
    id: 'team_index_view',
    type: 'page_view',
    location: 'team_index',
    action: 'view',
    target: '/team',
  });
});
</script>

<template>
  <div class="min-h-screen py-16">
    <UContainer>
      <!-- Intro Section -->
      <div v-if="page" class="max-w-3xl mx-auto mb-16 text-center">
        <h1 class="text-4xl font-bold mb-6">{{ page.title }}</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          {{ page.description }}
        </p>
      </div>

      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div v-for="i in 3" :key="i" class="space-y-4">
          <USkeleton class="h-96 rounded-lg w-full" />
        </div>
      </div>

      <!-- Team Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="member in members" :key="member.slug">
          <TeamProfile :member="member">
            <p
              class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-xs"
            >
              {{ member.bio }}
            </p>
            <template #footer>
              <UButton
                label="View Profile"
                :to="`/team/${member.slug}`"
                icon="i-heroicons-arrow-right"
                trailing
                size="xl"
                block
                color="primary"
                variant="soft"
              />
            </template>
          </TeamProfile>
        </div>
      </div>

      <ValuesAccordion title="Our Core Values" class="mt-24" />

      <!-- Working with us content -->
      <div v-if="page" class="max-w-3xl mx-auto mt-24">
        <article class="prose prose-lg dark:prose-invert mx-auto">
          <ContentRenderer :value="page" />
        </article>
      </div>
    </UContainer>
  </div>
</template>
