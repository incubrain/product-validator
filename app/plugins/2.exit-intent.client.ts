// plugins/exit-intent.client.ts
import { LazyIModalFullscreen } from '#components';
import { CONVERSION } from '~~/shared/config/navigation';

export default defineNuxtPlugin(() => {
  const storagePrefix = useRuntimeConfig().public.configSource;

  // Only run on client
  if (typeof window === 'undefined') return;

  const createExitIntent = (
    options: {
      offerId: OfferID;
      cooldownDays?: number;
      disabled?: boolean;
      minTimeOnPage?: number;
      requireInteraction?: boolean;
    } = {
      offerId: 'magnet',
    },
  ) => {
    const { trackEvent } = useAction();
    const overlay = useOverlay();
    const isShowing = ref(false);
    const storageKey = `${storagePrefix}_exit_intent_triggered`;

    const { hasInteracted, interactionTime, setup, cleanup } =
      useUserInteraction({
        trackTiming: true,
        autoSetup: false,
      });

    // Manual setup since we're in plugin context
    setup();

    const exitModal = overlay.create(LazyIModalFullscreen);

    const openModal = async (source: 'natural' | 'direct' = 'natural') => {
      if (!exitModal || isShowing.value) return;

      try {
        trackEvent({
          id: source === 'direct' ? 'exit_intent_direct' : 'exit_intent',
          action: 'triggered',
          location: source === 'direct' ? 'dev-shortcut' : 'page',
          type: 'exit_intent',
          target: 'exit_modal',
        });

        isShowing.value = true;
        const result = await exitModal.open({
          offerId: options.offerId,
          location: 'exit-intent',
        });
        isShowing.value = false;
        return result;
      } catch (error) {
        isShowing.value = false;
        throw error;
      }
    };

    const fire = async (directTrigger: boolean = false) => {
      if (directTrigger) {
        await openModal('direct');
        return;
      }

      const engagementTime = interactionTime.value
        ? (Date.now() - interactionTime.value) / 1000
        : 0;

      if (options.disabled) return;
      if (engagementTime < (options.minTimeOnPage || 10)) return;
      if (options.requireInteraction && !hasInteracted.value) return;

      const lastTriggered = localStorage.getItem(storageKey);
      if (lastTriggered) {
        const now = Date.now();
        const daysSince =
          (now - parseInt(lastTriggered)) / (1000 * 60 * 60 * 24);
        if (daysSince < (options.cooldownDays || 7)) return;
      }

      localStorage.setItem(storageKey, Date.now().toString());
      await openModal('natural');
    };

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        fire();
      }
    };

    setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 2000);

    return {
      isShowing: readonly(isShowing),
      fire,
      openModal,
      cleanup: () => {
        cleanup(); // Cleanup user interaction
        document.removeEventListener('mouseleave', handleMouseLeave);
      },
    };
  };

  const exitIntent = createExitIntent({
    offerId: CONVERSION.secondary,
    cooldownDays: 7,
    disabled: false,
    minTimeOnPage: 10,
    requireInteraction: true,
  });

  return {
    provide: {
      exitIntent,
    },
  };
});
