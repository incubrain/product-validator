// composables/useExitIntent.ts
import { LazyIExitIntentModal } from '#components';

const STORAGE_PREFIX = 'nuxt_launch_kit';

export const useExitIntent = (
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
  const exitModal = overlay.create(LazyIExitIntentModal);

  const fire = () => {
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
      const daysSince = (now - parseInt(lastTriggered)) / (1000 * 60 * 60 * 24);
      if (daysSince < (options.cooldownDays || 7)) return;
    }

    isShowing.value = true;
    localStorage.setItem(storageKey, now.toString());

    if (exitModal) {
      openModal();
    }

    trackEvent({
      id: 'exit_intent',
      action: 'triggered',
      location: 'page',
      type: 'exit_intent',
      target: 'exit_modal',
    });
  };

  const openModal = async () => {
    if (!exitModal) return;

    try {
      const result = await exitModal.open();
      close();
      return result;
    } catch (error) {
      close();
      throw error;
    }
  };

  const close = () => {
    isShowing.value = false;
  };

  onMounted(() => {
    // Track user interactions
    const trackInteraction = (event: Event) => {
      if (!hasInteracted.value) {
        hasInteracted.value = true;
        interactionStartTime.value = Date.now();
      }
    };

    // Mouse leave detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        fire();
      }
    };

    // Add interaction listeners
    document.addEventListener('click', trackInteraction, { once: true });
    document.addEventListener('keydown', trackInteraction, { once: true });
    document.addEventListener('touchstart', trackInteraction, { once: true });
    document.addEventListener('scroll', trackInteraction, { once: true });
    document.addEventListener('mousemove', trackInteraction, { once: true });
    document.addEventListener('wheel', trackInteraction, { once: true });
    document.addEventListener('touchmove', trackInteraction, { once: true });

    // Add exit intent listener after delay to avoid immediate triggers
    setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 2000);

    onUnmounted(() => {
      document.removeEventListener('click', trackInteraction);
      document.removeEventListener('keydown', trackInteraction);
      document.removeEventListener('touchstart', trackInteraction);
      document.removeEventListener('scroll', trackInteraction);
      document.removeEventListener('mousemove', trackInteraction);
      document.removeEventListener('wheel', trackInteraction);
      document.removeEventListener('touchmove', trackInteraction);
      document.removeEventListener('mouseleave', handleMouseLeave);
    });
  });

  return {
    isShowing,
    close,
    openModal,
    fire,
  };
};
