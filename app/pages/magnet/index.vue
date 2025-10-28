<!-- pages/magnet/index.vue - FIXED -->
<script setup lang="ts">
import { normalizeContentPath } from '#shared/utils/config-resolver';

definePageMeta({
  layout: 'gated',
});

// Fetch all steps (items with step field)
const { data: steps } = await useAsyncData('magnet-steps', () => {
  return queryCollection('magnet')
    .where('step', 'IS NOT NULL')
    .order('step', 'ASC')
    .all();
});

console.log(
  '[Magnet Index] Raw steps:',
  steps.value?.map((s) => ({
    title: s.title,
    path: s.path,
    step: s.step,
  })),
);

// Normalize paths for navigation
const normalizedSteps = computed(() => {
  const result =
    steps.value?.map((step) => ({
      ...step,
      path: normalizeContentPath(step.path),
    })) || [];

  return result;
});

// Fetch overview (index.md - no step field)
const { data: overview } = await useAsyncData('magnet-overview', () => {
  return queryCollection('magnet').where('step', 'IS NULL').first();
});

console.log('[Magnet Index] Overview:', overview.value?.title);
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-8">
    <!-- Welcome Section -->
    <div v-if="overview" class="space-y-4">
      <div>
        <h1 class="text-4xl font-bold">
          {{ overview.title }}
        </h1>
        <p class="text-lg text-muted mt-2">
          {{ overview.description }}
        </p>
      </div>

      <USeparator />
    </div>

    <!-- Steps Grid -->
    <div v-if="normalizedSteps.length">
      <h2 class="text-xl font-semibold mb-4">Your Steps</h2>

      <UPageGrid :cols="2">
        <UPageCard
          v-for="step in normalizedSteps"
          :key="step.path"
          :title="step.title"
          :description="step.description"
          :ui="{
            footer: 'w-full',
          }"
        >
          <template #icon>
            <div
              class="flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary font-bold text-xl"
            >
              {{ step.step }}
            </div>
          </template>

          <template #footer>
            <div class="flex items-center justify-between w-full">
              <p v-if="step.duration" class="text-sm text-muted">
                {{ step.duration }}
              </p>
              <UButton
                :to="step.path"
                color="primary"
                variant="subtle"
                trailing-icon="i-lucide-arrow-right"
                size="sm"
              >
                Start
              </UButton>
            </div>
          </template>
        </UPageCard>
      </UPageGrid>
    </div>
  </div>
</template>
