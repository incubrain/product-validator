import { createSharedComposable } from '@vueuse/core';
import { ref, watch } from 'vue'; // Added ref and watch imports

const _useMagnetProgress = () => {
  const { local } = useAppStorage();
  
  const COMPLETED_KEY = 'magnet-progress';
  const MILESTONES_KEY = 'magnet-milestones';

  // Initialize Sets from storage
  const completedSteps = ref<Set<string>>(new Set());
  const shownMilestones = ref<Set<string>>(new Set());

  if (import.meta.client) {
    // Load completed steps
    const storedCompleted = local.get(COMPLETED_KEY);
    if (storedCompleted) {
      try {
        completedSteps.value = new Set(JSON.parse(storedCompleted));
      } catch (e) {
        completedSteps.value = new Set();
      }
    }

    // Load shown milestones
    const storedMilestones = local.get(MILESTONES_KEY);
    if (storedMilestones) {
      try {
        shownMilestones.value = new Set(JSON.parse(storedMilestones));
      } catch (e) {
        shownMilestones.value = new Set();
      }
    }

    // Watch for changes and persist
    watch(completedSteps, (newValue) => {
      local.set(COMPLETED_KEY, JSON.stringify(Array.from(newValue)));
    }, { deep: true });

    watch(shownMilestones, (newValue) => {
      local.set(MILESTONES_KEY, JSON.stringify(Array.from(newValue)));
    }, { deep: true });
  }

  // Track validation status of steps (e.g. Definition of Done)
  // Key: path, Value: boolean (true = valid/ready to complete)
  const stepValidation = useState<Record<string, boolean>>('magnet-step-validation', () => ({}));

  const setStepValidity = (path: string, isValid: boolean) => {
    const normalized = normalizePath(path);
    stepValidation.value[normalized] = isValid;
  };

  const isStepValid = (path: string) => {
    const normalized = normalizePath(path);
    const validationValue = stepValidation.value[normalized];
    const result = validationValue ?? true;
    console.log('[MagnetProgress] isStepValid check:', { 
      path, 
      normalized, 
      validationValue, 
      result,
      allValidations: stepValidation.value 
    });
    // Default to true if no validation is registered for this step
    return result;
  };

  // Normalize path by removing trailing slashes and query params
  const normalizePath = (path: string) => {
    return path.split('?')[0].split('#')[0].replace(/\/$/, '');
  };

  const markComplete = (path: string) => {
    const normalized = normalizePath(path);
    console.log('[MagnetProgress] Marking complete:', { original: path, normalized });
    completedSteps.value.add(normalized);
  };

  const isComplete = (link: any) => {
    const path = link.path ?? link;
    const normalized = normalizePath(path);
    
    // Direct match
    if (completedSteps.value.has(normalized)) return true;
    
    // Implicit match: If any child step is complete, the parent is considered complete (started)
    // This is useful for stage overview pages
    for (const step of completedSteps.value) {
      if (step.startsWith(normalized + '/')) {
        return true;
      }
    }
    
    return false;
  };

  const getCompletedCount = () => {
    return completedSteps.value.size;
  };

  const getProgressPercentage = (totalSteps: number) => {
    if (totalSteps === 0) return 0;
    return Math.round((completedSteps.value.size / totalSteps) * 100);
  };

  const checkAndShowMilestone = (totalSteps: number) => {
    const toast = useToast();
    const completed = completedSteps.value.size;
    const percentage = getProgressPercentage(totalSteps);

    // Halfway milestone
    const halfwayKey = 'halfway';
    if (percentage >= 50 && !shownMilestones.value.has(halfwayKey)) {
      shownMilestones.value.add(halfwayKey);
      toast.add({
        title: "You're halfway there! 🎉",
        description: `${completed} of ${totalSteps} steps completed. Keep going!`,
        color: 'primary',
      });
    }

    // 75% milestone
    const threeFourthsKey = '75percent';
    if (percentage >= 75 && !shownMilestones.value.has(threeFourthsKey)) {
      shownMilestones.value.add(threeFourthsKey);
      toast.add({
        title: "Almost there! 💪",
        description: `Only ${totalSteps - completed} steps left!`,
        color: 'success',
      });
    }

    // Completion milestone
    const completionKey = 'complete';
    if (completed === totalSteps && totalSteps > 0 && !shownMilestones.value.has(completionKey)) {
      shownMilestones.value.add(completionKey);
      toast.add({
        title: "Congratulations! 🎊",
        description: "You've completed all steps!",
        color: 'success',
      });
    }
  };

  const reset = () => {
    completedSteps.value.clear();
    shownMilestones.value.clear();
  };

  // State for navigation structure
  const flatSteps = ref<string[]>([]);

  const initialize = (navigation: any[]) => {
    const flatten = (items: any[]): string[] => {
      let paths: string[] = [];
      for (const item of items) {
        // If it's a page (has a path), add it
        // We include parent pages (like /magnet) if they have a path
        const path = item.path;
        if (path) {
          paths.push(normalizePath(path));
        }
        if (item.children) {
          paths = paths.concat(flatten(item.children));
        }
      }
      return paths;
    };
    
    // Deduplicate paths just in case
    flatSteps.value = Array.from(new Set(flatten(navigation)));
    console.log('[MagnetProgress] Initialized steps:', flatSteps.value);
  };

  const isAccessible = (path: string) => {
    // If not initialized, assume closed (strict mode)
    if (flatSteps.value.length === 0) return false;

    const normalized = normalizePath(path);
    const index = flatSteps.value.indexOf(normalized);

    // If path not found in our list, it might be a utility page, allow access
    if (index === -1) return true;

    // First step is always accessible
    if (index === 0) return true;

    // Find the furthest step that has been completed
    let maxCompletedIndex = -1;
    for (const step of completedSteps.value) {
      const stepIndex = flatSteps.value.indexOf(step);
      if (stepIndex > maxCompletedIndex) {
        maxCompletedIndex = stepIndex;
      }
    }

    // Allow access to any step up to the next one after the furthest completed
    return index <= maxCompletedIndex + 1;
  };

  const getLatestUnlockedStep = () => {
    if (flatSteps.value.length === 0) return null;
    
    // Find the furthest step that has been completed
    let maxCompletedIndex = -1;
    for (const step of completedSteps.value) {
      const stepIndex = flatSteps.value.indexOf(step);
      if (stepIndex > maxCompletedIndex) {
        maxCompletedIndex = stepIndex;
      }
    }
    
    // The latest unlocked step is the one after the max completed
    const nextIndex = maxCompletedIndex + 1;
    
    // If we've completed everything, return the last step
    if (nextIndex >= flatSteps.value.length) {
      return flatSteps.value[flatSteps.value.length - 1];
    }
    
    return flatSteps.value[nextIndex];
  };

  return {
    completedSteps,
    markComplete,
    isComplete,
    getCompletedCount,
    getProgressPercentage,
    checkAndShowMilestone,
    initialize,
    flatSteps,
    isAccessible,
    getLatestUnlockedStep,
    reset,
    setStepValidity,
    isStepValid,
  };
};

export const useMagnetProgress = createSharedComposable(_useMagnetProgress);
