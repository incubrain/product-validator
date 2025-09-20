// composables/useUserInteraction.ts - FIXED FOR PLUGINS
export interface UserInteractionOptions {
  events?: string[];
  trackTiming?: boolean;
  resetOnNavigation?: boolean;
  clientOnly?: boolean;
  debounceMs?: number;
  autoSetup?: boolean; // NEW: control automatic setup
}

export interface UserInteractionState {
  hasInteracted: ComputedRef<boolean>;
  interactionTime: ComputedRef<number | null>;
  interactionType: ComputedRef<string | null>;
  timeSinceInteraction: ComputedRef<number>;
  waitForInteraction: () => Promise<Event>;
  markAsInteracted: (eventType?: string) => void;
  reset: () => void;
  setup: () => void; // NEW: manual setup
  cleanup: () => void; // NEW: manual cleanup
}

export const useUserInteraction = (
  options: UserInteractionOptions = {},
): UserInteractionState => {
  const {
    events = [
      'click',
      'keydown',
      'touchstart',
      'scroll',
      'mousemove',
      'wheel',
      'touchmove',
    ],
    trackTiming = true,
    resetOnNavigation = false,
    clientOnly = true,
    debounceMs = 100,
    autoSetup = true, // Auto-setup by default for components
  } = options;

  // Core state
  const hasInteractedRef = ref(false);
  const interactionTimeRef = ref<number | null>(null);
  const interactionTypeRef = ref<string | null>(null);
  const lastInteractionTime = ref<number>(0);
  const interactionResolvers = ref<Array<(event: Event) => void>>([]);
  const isSetup = ref(false);

  // Debounced interaction handler
  const handleInteraction = (event: Event) => {
    const now = Date.now();

    if (now - lastInteractionTime.value < debounceMs) {
      return;
    }

    lastInteractionTime.value = now;

    if (!hasInteractedRef.value) {
      hasInteractedRef.value = true;

      if (trackTiming) {
        interactionTimeRef.value = now;
      }

      interactionTypeRef.value = event.type;
      interactionResolvers.value.forEach((resolve) => resolve(event));
      interactionResolvers.value = [];
    }
  };

  // Manual setup (works in plugins)
  const setup = () => {
    if (clientOnly && (import.meta.server || typeof document === 'undefined')) {
      return;
    }

    if (isSetup.value) return; // Prevent double setup

    events.forEach((eventType) => {
      document.addEventListener(eventType, handleInteraction, {
        once: false,
        passive: true,
        capture: false,
      });
    });

    isSetup.value = true;
  };

  // Manual cleanup
  const cleanup = () => {
    if (typeof document !== 'undefined' && isSetup.value) {
      events.forEach((eventType) => {
        document.removeEventListener(eventType, handleInteraction);
      });
      isSetup.value = false;
    }
  };

  // Auto-setup for components (when lifecycle is available)
  if (autoSetup) {
    // Check if we're in a component context
    try {
      onMounted(() => {
        setup();
      });

      onUnmounted(() => {
        cleanup();
      });
    } catch {
      // Not in component context - manual setup required
      console.log(
        'useUserInteraction: No component context, manual setup required',
      );
    }
  }

  // Reset on navigation if enabled
  if (resetOnNavigation) {
    try {
      const router = useRouter();
      router.afterEach(() => {
        reset();
        nextTick(() => {
          if (autoSetup) setup();
        });
      });
    } catch {
      // Router not available
    }
  }

  // Computed properties
  const hasInteracted = computed(() => hasInteractedRef.value);
  const interactionTime = computed(() => interactionTimeRef.value);
  const interactionType = computed(() => interactionTypeRef.value);
  const timeSinceInteraction = computed(() => {
    if (!interactionTimeRef.value) return 0;
    return Date.now() - interactionTimeRef.value;
  });

  // Methods
  const waitForInteraction = (): Promise<Event> => {
    return new Promise((resolve) => {
      if (hasInteractedRef.value) {
        resolve(new Event(interactionTypeRef.value || 'synthetic'));
      } else {
        interactionResolvers.value.push(resolve);
      }
    });
  };

  const markAsInteracted = (eventType: string = 'manual') => {
    if (!hasInteractedRef.value) {
      hasInteractedRef.value = true;

      if (trackTiming) {
        interactionTimeRef.value = Date.now();
      }

      interactionTypeRef.value = eventType;
      const syntheticEvent = new Event(eventType);
      interactionResolvers.value.forEach((resolve) => resolve(syntheticEvent));
      interactionResolvers.value = [];
    }
  };

  const reset = () => {
    hasInteractedRef.value = false;
    interactionTimeRef.value = null;
    interactionTypeRef.value = null;
    lastInteractionTime.value = 0;
    interactionResolvers.value = [];
  };

  return {
    hasInteracted,
    interactionTime,
    interactionType,
    timeSinceInteraction,
    waitForInteraction,
    markAsInteracted,
    reset,
    setup,
    cleanup,
  };
};
