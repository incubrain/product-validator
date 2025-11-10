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
  return queryCollection('magnet')
    .where('path', 'LIKE', `${route.fullPath}/%`)
    .where('extension', '=', 'md')
    .select()
    .all();
});
</script>

<template>
  <div v-if="page" class="max-w-2xl mx-auto space-y-8">
    <!-- Back Button -->
    <UButton
      to="/magnet"
      icon="i-lucide-arrow-left"
      color="neutral"
      variant="ghost"
      size="sm"
    >
      Back to Dashboard
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
        :src="normalizeContentPath(page.media.src)"
        :alt="page.media.alt || page.title"
        class="w-full h-auto"
      />

      <!-- Video -->
      <IVideo
        v-else-if="page.media.type === 'video'"
        :src="normalizeContentPath(page.media.src)"
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
    <div v-if="steps.length" class="space-y-6">
      <h2 class="text-2xl font-bold">Steps in This Stage</h2>

      <UPageGrid class="lg:grid-cols-2">
        <UCard v-for="(step, i) in steps" :key="step.path" variant="outline">
          <template #header>
            <div class="flex items-center gap-3">
              <div
                class="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary font-bold shrink-0"
              >
                {{ i + 1 }}
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

          <template #footer>
            <div class="flex justify-end pt-2">
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
        </UCard>
      </UPageGrid>
    </div>
  </div>
</template>
