<script setup lang="ts">
import confetti from 'canvas-confetti';

const props = defineProps<{
  currentPath: string;
  nextPath?: string;
  label?: string;
  totalSteps?: number;
}>();

const { markComplete, isComplete, checkAndShowMilestone } = useMagnetProgress();
const router = useRouter();

const isCompleted = computed(() => isComplete(props.currentPath));

const handleComplete = async () => {
  if (!isCompleted.value) {
    markComplete(props.currentPath);
    
    // Check for milestone toasts
    if (props.totalSteps) {
      checkAndShowMilestone(props.totalSteps);
    }
    
    triggerConfetti();
    
    // Small delay for effect before navigation
    await new Promise(resolve => setTimeout(resolve, 800));
  }

  if (props.nextPath) {
    await navigateTo(props.nextPath);
    // Scroll to top of the dashboard panel body
    await nextTick();
    const scrollContainer = document.querySelector('[data-dashboard-panel-body], .overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};

const triggerConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio: number, opts: any) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
</script>

<template>
  <UButton
    size="xl"
    :color="isCompleted ? 'success' : 'primary'"
    :variant="isCompleted ? 'soft' : 'solid'"
    :icon="isCompleted ? 'i-lucide-check-circle-2' : 'i-lucide-circle-check'"
    trailing-icon="i-lucide-arrow-right"
    class="w-full sm:w-auto min-w-64 group transition-all duration-300 shadow-lg hover:shadow-xl"
    :class="{ 'animate-pulse': isCompleted }"
    @click="handleComplete"
  >
    <span class="font-semibold">
      {{ label || (isCompleted ? 'Continue' : 'Mark Complete & Continue') }}
    </span>
  </UButton>
</template>
