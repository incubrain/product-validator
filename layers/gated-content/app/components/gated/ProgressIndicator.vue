<script setup lang="ts">
const props = defineProps<{
  currentStep: number;
  totalSteps: number;
  stageTitle?: string;
}>();

const { getProgressPercentage, getCompletedCount } = useContentProgress();

const percentage = computed(() => getProgressPercentage(props.totalSteps));
</script>

<template>
  <div class="flex items-center gap-4 w-full">
    <!-- Step Counter and Label -->
    <div class="flex items-center gap-2 text-sm whitespace-nowrap">
      <span class="font-medium text-foreground">
        {{ stageTitle || 'Progress' }}
      </span>
      <span class="text-muted">
        {{ getCompletedCount() }} / {{ totalSteps }}
      </span>
    </div>

    <!-- Progress Bar -->
    <div class="relative h-2 flex-1 overflow-hidden rounded-full bg-muted">
      <div
        class="h-full bg-primary transition-all duration-500 ease-out"
        :style="{ width: `${percentage}%` }"
      />
    </div>

    <!-- Percentage -->
    <div class="text-sm text-muted whitespace-nowrap">
      {{ percentage }}%
    </div>
  </div>
</template>
