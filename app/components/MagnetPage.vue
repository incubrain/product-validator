<!-- components/MagnetPage.vue -->
<script setup lang="ts">

interface Props {
  page: any; // Your page type
  backButton?: { to: string; label: string };
  surround?: any[];
  steps?: any[];
}

const props = defineProps<Props>();

// Calculate total steps from navigation
const { data: navigation } = await useAsyncData('magnet-nav-steps', () => {
  return queryCollectionNavigation('magnet');
});

const totalSteps = computed(() => {
  if (!navigation.value) return 0;
});
  
  const countLeafNodes = (items: any[]): number => {
    let count = 0;
    for (const item of items) {
      if (!item.children || item.children.length === 0) {
        count++;
      } else {
        count += countLeafNodes(item.children);
      }
    }
    return count;
  };
  
const { isComplete, isAccessible, initialize } = useMagnetProgress();

// Initialize progress with navigation data
if (navigation.value) {
  initialize(navigation.value);
}

// Watch for navigation changes
watch(() => navigation.value, (newNav) => {
  if (newNav) {
    initialize(newNav);
  }
}, { immediate: true });

// Find the first incomplete step in the current list to show the "Start" button
const nextStepPath = computed(() => {
  if (!props.steps) return null;
  
  for (const step of props.steps) {
    if (!isComplete(step.path)) {
      return step.path;
    }
  }
  return null;
});

const isStepLocked = (step: any) => {
  return !isAccessible(step.path);
};

</script>

<template>
  <div v-if="page" class="space-y-8">
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

    <!-- Default Slot for custom content (e.g., custom buttons) -->
    <slot />

    <!-- Step List (stage index only) - Simple list for progress tracking -->
    <template v-if="steps?.length">
      <USeparator />
      <div class="space-y-6" data-testid="stage-steps-section">
        <h2 class="text-2xl font-bold">Steps in This Stage</h2>

        <ul class="space-y-2" data-testid="steps-list">
          <li
            v-for="(step, i) in steps"
            :key="step.path"
            class="flex items-start gap-3 py-2"
            :class="{
              'opacity-50': isStepLocked(step) && !isComplete(step.path),
            }"
            :data-testid="`step-item-${i}`"
            :data-step-path="step.path"
          >
            <!-- Status Icon -->
            <div class="mt-0.5 shrink-0">
              <UIcon
                v-if="isComplete(step.path)"
                name="i-lucide-check-circle-2"
                class="size-5 text-success"
                :data-testid="`step-icon-complete-${i}`"
              />
              <UIcon
                v-else-if="isStepLocked(step)"
                name="i-lucide-lock"
                class="size-5 text-muted-foreground/50"
                :data-testid="`step-icon-locked-${i}`"
              />
              <UIcon
                v-else
                name="i-lucide-circle"
                class="size-5 text-muted-foreground"
                :data-testid="`step-icon-unlocked-${i}`"
              />
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-base" :data-testid="`step-title-${i}`">
                {{ step.title }}
              </h3>
              <p v-if="step.description" class="text-sm text-muted mt-0.5">
                {{ step.description }}
              </p>
            </div>
          </li>
        </ul>

        <!-- Continue Journey Button -->
        <div v-if="nextStepPath" class="flex justify-end pt-4">
          <IMagnetCompleteButton
            :current-path="page.path"
            :next-path="nextStepPath"
            :total-steps="totalSteps"
            label="Continue Journey"
          />
        </div>
      </div>
    </template>

    <!-- Custom Navigation with Mark Complete -->
    <template v-if="surround?.length">
      <USeparator class="!my-12" />
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <!-- Previous -->
        <UButton
          v-if="surround[0]"
          :to="surround[0].path"
          variant="outline"
          color="neutral"
          icon="i-lucide-arrow-left"
          size="lg"
          class="justify-start sm:justify-center"
        >
          <span class="truncate">{{ surround[0].title }}</span>
        </UButton>
        <div v-else class="hidden sm:block" />

        <!-- Next / Complete -->
        <IMagnetCompleteButton
          v-if="surround[1]"
          :current-path="page.path"
          :next-path="surround[1].path"
          :total-steps="totalSteps"
        />
        <IMagnetCompleteButton
          v-else
          :current-path="page.path"
          :total-steps="totalSteps"
          label="Finish Stage"
        />
      </div>
    </template>

    <USeparator class="!my-12" />

    <!-- Founder Reply -->
    <IFeedbackFounderReply location="page-footer" />
  </div>
</template>
