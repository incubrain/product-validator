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
  
const { isComplete, isAccessible, markComplete, initialize, getLatestUnlockedStep } = useMagnetProgress();

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

const latestUnlockedStep = computed(() => getLatestUnlockedStep());

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


const isNextStep = (path: string) => {
  return path === nextStepPath.value;
};

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

    <!-- Step List (stage index only) -->
    <template v-if="steps?.length">
      <USeparator />
      <div class="space-y-6">
        <h2 class="text-2xl font-bold">Steps in This Stage</h2>

        <div class="space-y-3">
          <div
            v-for="(step, i) in steps"
            :key="step.path"
            class="group relative flex items-start gap-4 p-4 rounded-xl border border-default bg-background/50 hover:bg-background transition-colors"
            :class="{
              'opacity-50': isStepLocked(step) && !isComplete(step.path),
            }"
          >
            <!-- Status Icon -->
            <div class="mt-1 shrink-0">
              <UIcon
                v-if="isComplete(step.path)"
                name="i-lucide-check-square"
                class="size-6 text-primary"
              />
              <UIcon
                v-else-if="isStepLocked(step)"
                name="i-lucide-lock"
                class="size-6 text-muted-foreground/50"
              />
              <UIcon
                v-else
                name="i-lucide-square"
                class="size-6 text-muted-foreground"
              />
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0 pt-0.5">
              <div class="flex items-center justify-between gap-4">
                <h3 class="font-semibold text-lg">
                  {{ step.title }}
                </h3>
              </div>
              
              <p v-if="step.description" class="text-sm text-muted mt-1">
                {{ step.description }}
              </p>
            </div>
            
            <!-- Full card link for accessibility (if accessible) -->
            <NuxtLink
              v-if="!isStepLocked(step)"
              :to="step.path"
              class="absolute inset-0 z-0"
              aria-label="Go to step"
            />
          </div>
        </div>

        <!-- Global Continue Button -->
        <div v-if="latestUnlockedStep" class="flex justify-end pt-4">
          <UButton
            :to="latestUnlockedStep"
            size="xl"
            color="primary"
            variant="solid"
            trailing-icon="i-lucide-arrow-right"
            class="w-full sm:w-auto min-w-48 shadow-lg hover:shadow-xl transition-all"
          >
            Continue Journey
          </UButton>
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
