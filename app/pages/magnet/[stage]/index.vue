<script setup lang="ts">
import { normalizeContentPath } from '#shared/utils/config-resolver';

definePageMeta({
  layout: 'gated',
});

const route = useRoute();
const stageSlug = route.params.stage as string;

const { isStageAccessible } = useStageAccess();

// Fetch stage index.md
const { data: page } = await useAsyncData(
  `magnet-${stageSlug}-overview`,
  () => {
    return queryCollection('magnet').path(route.path).first();
  },
);

if (page.value && !isStageAccessible(page.value)) {
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

// Query step docs for this stage only
const { data: steps } = await useAsyncData(`magnet-${stageSlug}-steps`, () => {
  // Extract stage key from slug (e.g., "0.identity" -> "identity")
  const stageKey = stageSlug.replace(/^\d+\./, '');

  return queryCollection('magnet')
    .where('stage', '=', stageKey)
    .where('step', 'IS NOT NULL')
    .order('step', 'ASC')
    .all();
});

const normalizedSteps = computed(() => {
  return (
    steps.value?.map((step) => ({
      ...step,
      path: normalizeContentPath(step.path),
    })) || []
  );
});
</script>

<template>
  <div v-if="page" class="max-w-4xl mx-auto space-y-8">
    <!-- Back Button -->
    <UButton
      to="/magnet"
      icon="i-lucide-arrow-left"
      color="neutral"
      variant="ghost"
      size="sm"
    >
      Back to Overview
    </UButton>

    <!-- Stage Header -->
    <div class="space-y-4">
      <h1 class="text-4xl font-bold">
        {{ page.title }}
      </h1>
      <p v-if="page.description" class="text-lg text-muted">
        {{ page.description }}
      </p>
    </div>

    <!-- Media -->
    <div
      v-if="page.media?.src"
      class="rounded-lg overflow-hidden border border-default"
    >
      <!-- Image -->
      <NuxtImg
        v-if="page.media.type === 'image'"
        :src="page.media.src"
        :alt="page.media.alt || page.title"
        class="w-full h-auto"
      />

      <!-- Video -->
      <IVideo
        v-else-if="page.media.type === 'video'"
        :src="page.media.src"
        :alt="page.media.alt"
      />
    </div>

    <USeparator />

    <!-- Content -->
    <ContentRenderer
      v-if="page.body"
      :value="page"
      class="prose prose-primary dark:prose-invert max-w-none"
    />

    <USeparator />

    <!-- Step Cards -->
    <div v-if="normalizedSteps.length" class="space-y-6">
      <h2 class="text-2xl font-bold">Steps in This Stage</h2>

      <UPageGrid :cols="3">
        <UCard
          v-for="step in normalizedSteps"
          :key="step.path"
          variant="outline"
        >
          <template #header>
            <div class="flex items-center gap-3">
              <div
                class="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary font-bold shrink-0"
              >
                {{ step.step }}
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-base">
                  {{ step.title }}
                </h3>
              </div>
            </div>
          </template>

          <p v-if="step.description" class="text-sm text-muted">
            {{ step.description }}
          </p>

          <div class="flex justify-between pt-2">
            <div v-if="step.duration" class="text-sm text-muted">
              ⏱️ {{ step.duration }}
            </div>
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

          <template #footer>
            <div v-if="step.metrics?.length" class="space-y-2">
              <p
                class="text-xs font-medium text-dimmed uppercase tracking-wide"
              >
                Success Metrics
              </p>
              <div class="space-y-3">
                <IMetric
                  v-for="(metric, idx) in step.metrics"
                  :key="idx"
                  :level="metric.level"
                  :range="metric.range"
                  :meaning="metric.meaning"
                />
              </div>
            </div>
          </template>
        </UCard>
      </UPageGrid>
    </div>
  </div>
</template>
