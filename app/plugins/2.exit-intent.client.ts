// plugins/exit-intent.client.ts
import { STAGE_CONFIG } from '#stage-config';

export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return;

  const env = useRuntimeConfig().public;

  const createExitIntent = (
    options: {
      productId: ProductId;
      cooldownDays?: number;
      disabled?: boolean;
      minTimeOnPage?: number;
      requireInteraction?: boolean;
    } = {
      productId: 'waitlist',
    },
  ) => {
    const { trackEvent } = useEvents();
    const route = useRoute();
    const { local } = useAppStorage();
    const isShowing = ref(false);
    const STORAGE_KEY = 'exit_intent_triggered';

    const { hasInteracted, interactionTime, setup, cleanup } =
      useUserInteraction({
        trackTiming: true,
        autoSetup: false,
      });

    // Manual setup since we're in plugin context
    setup();

    const fire = async (directTrigger: boolean = false) => {
      if (isShowing.value) return;

      if (!directTrigger) {
        const engagementTime = interactionTime.value
          ? (Date.now() - interactionTime.value) / 1000
          : 0;

        if (options.disabled) return;
        if (engagementTime < (options.minTimeOnPage || 10)) return;
        if (options.requireInteraction && !hasInteracted.value) return;

        const lastTriggered = local.get(STORAGE_KEY);
        if (lastTriggered) {
          const now = Date.now();
          const daysSince =
            (now - parseInt(lastTriggered)) / (1000 * 60 * 60 * 24);
          if (daysSince < (options.cooldownDays || 7)) return;
        }

        local.set(STORAGE_KEY, Date.now().toString());
      }

      isShowing.value = true;

      try {
        // Open modal directly
        await trackEvent({
          id: `modal_open_${options.productId}`,
          type: 'modal_open',
          location: route.path,
          action: 'fullscreen_modal',
          target: 'exit_modal',
          data: {
            productId: options.productId,
          },
        });
      } finally {
        // Reset after modal closes
        setTimeout(() => {
          isShowing.value = false;
        }, 1000);
      }
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
      cleanup: () => {
        cleanup(); // Cleanup user interaction
        document.removeEventListener('mouseleave', handleMouseLeave);
      },
    };
  };

  const exitIntent = createExitIntent({
    productId: STAGE_CONFIG.products.secondary,
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
