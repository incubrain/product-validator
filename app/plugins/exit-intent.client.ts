// plugins/exit-intent.client.ts - REFACTORED WITH DIRECT TRIGGER & CLEANUP
import { LazyIExitIntentModal } from '#components';

export default defineNuxtPlugin(() => {
  const STORAGE_PREFIX = 'validator';

  // Only run on client
  if (typeof window === 'undefined') return;

  const createExitIntent = (
    options: {
      cooldownDays?: number;
      disabled?: boolean;
      minTimeOnPage?: number;
      requireInteraction?: boolean;
    } = {},
  ) => {
    const { trackEvent } = useAction();
    const overlay = useOverlay();
    const isShowing = ref(false);
    const storageKey = `${STORAGE_PREFIX}_exit_intent_triggered`;

    // User engagement tracking
    const interactionStartTime = ref<number | null>(null);
    const hasInteracted = ref(false);

    // Create modal instance
    const exitModal = overlay.create(LazyIExitIntentModal);

    // Consolidated modal opening with tracking
    const openModal = async (source: 'natural' | 'direct' = 'natural') => {
      if (!exitModal || isShowing.value) return;

      try {
        // Track event before opening
        trackEvent({
          id: source === 'direct' ? 'exit_intent_direct' : 'exit_intent',
          action: 'triggered',
          location: source === 'direct' ? 'dev-shortcut' : 'page',
          type: 'exit_intent',
          target: 'exit_modal',
        });

        isShowing.value = true;
        const result = await exitModal.open();
        isShowing.value = false;
        return result;
      } catch (error) {
        isShowing.value = false;
        throw error;
      }
    };

    const fire = async (directTrigger: boolean = false) => {
      // Direct trigger bypasses all checks
      if (directTrigger) {
        console.log('Direct trigger: opening modal immediately');
        await openModal('direct');
        return;
      }

      // Normal validation logic
      const now = Date.now();
      const engagementTime = interactionStartTime.value
        ? (now - interactionStartTime.value) / 1000
        : 0;

      if (options.disabled) return;
      if (engagementTime < (options.minTimeOnPage || 10)) return;
      if (options.requireInteraction && !hasInteracted.value) return;

      // Check cooldown
      const lastTriggered = localStorage.getItem(storageKey);
      if (lastTriggered) {
        const daysSince =
          (now - parseInt(lastTriggered)) / (1000 * 60 * 60 * 24);
        if (daysSince < (options.cooldownDays || 7)) return;
      }

      // Set cooldown for natural triggers only
      localStorage.setItem(storageKey, now.toString());

      // Open modal with tracking
      await openModal('natural');
    };

    // Event listener references for cleanup
    let trackInteraction: () => void;
    let handleMouseLeave: (e: MouseEvent) => void;

    // Setup event listeners with cleanup
    const setupListeners = () => {
      trackInteraction = () => {
        if (!hasInteracted.value) {
          hasInteracted.value = true;
          interactionStartTime.value = Date.now();
        }
      };

      handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          fire();
        }
      };

      document.addEventListener('click', trackInteraction, { once: true });
      document.addEventListener('keydown', trackInteraction, { once: true });
      document.addEventListener('touchstart', trackInteraction, { once: true });
      document.addEventListener('scroll', trackInteraction, { once: true });
      document.addEventListener('mousemove', trackInteraction, { once: true });
      document.addEventListener('wheel', trackInteraction, { once: true });
      document.addEventListener('touchmove', trackInteraction, { once: true });

      // Add exit intent listener after delay
      setTimeout(() => {
        document.addEventListener('mouseleave', handleMouseLeave);
      }, 2000);
    };

    // Cleanup function
    const cleanup = () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('click', trackInteraction);
        document.removeEventListener('keydown', trackInteraction);
        document.removeEventListener('touchstart', trackInteraction);
        document.removeEventListener('scroll', trackInteraction);
        document.removeEventListener('mousemove', trackInteraction);
        document.removeEventListener('wheel', trackInteraction);
        document.removeEventListener('touchmove', trackInteraction);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    // Initialize listeners
    setupListeners();

    // Cleanup on page navigation/unmount
    onUnmounted(cleanup);

    return {
      isShowing: readonly(isShowing),
      fire,
      openModal,
      cleanup,
    };
  };

  // Auto-initialize with default options
  const exitIntent = createExitIntent({
    cooldownDays: 7,
    disabled: false,
    minTimeOnPage: 10,
    requireInteraction: true,
  });

  // Provide global access
  return {
    provide: {
      exitIntent,
    },
  };
});
