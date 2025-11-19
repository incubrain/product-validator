<!-- components/MagnetPage.vue -->
<script setup lang="ts">

interface Props {
  page: any; // Your page type
  backButton?: { to: string; label: string };
  surround?: any[];
  steps?: any[];
}

defineProps<Props>();
</script>

<template>
  <div v-if="page" class="max-w-2xl mx-auto space-y-8">
    <!-- Back Button (optional) -->
    <UButton
      v-if="backButton"
      :to="backButton.to"
      icon="i-lucide-arrow-left"
      color="neutral"
      variant="ghost"
      size="sm"
    >
      {{ backButton.label }}
    </UButton>

    <!-- Header -->
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
      <NuxtImg
        v-if="page.media.type === 'image'"
        :src="page.media.src"
        :alt="page.media.alt || page.title"
        class="w-full h-full aspect-3/2 invert"
      />

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

    <!-- Step Cards (stage index only) -->
    <template v-if="steps?.length">
      <USeparator />
      <div class="space-y-6">
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
    </template>

    <!-- Navigation (step detail only) -->
    <template v-if="surround?.filter(Boolean).length">
      <USeparator />
      <UContentSurround
        :surround="surround as any"
        prev-icon="i-lucide-arrow-left"
        next-icon="i-lucide-arrow-right"
      />
    </template>
  </div>
</template>
