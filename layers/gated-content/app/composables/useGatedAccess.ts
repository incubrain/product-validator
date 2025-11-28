// composables/useGatedAccess.ts - SSR-SAFE
export const useGatedAccess = () => {
  const { $coreComposables } = useNuxtApp();
  const { useAppStorage } = $coreComposables;
  const { local } = useAppStorage();

  // Use reactive ref with custom getters/setters backed by localStorage
  const email = import.meta.client
    ? ref<string | null>(local.get('gated_email'))
    : ref<string | null>(null);

  // Watch for changes and persist to localStorage
  if (import.meta.client) {
    watch(email, (newValue) => {
      if (newValue) {
        local.set('gated_email', newValue);
      } else {
        local.remove('gated_email');
      }
    });
  }

  const isVerifying = useState<boolean>('gated_isVerifying', () => false);
  const isVerified = useState<boolean>('gated_isVerified', () => false);

  const hasAccess = computed(() => {
    const access = !!email.value && isVerified.value;
    return access;
  });

  const verifyAccess = async () => {
    // Skip if already verified
    if (isVerified.value && email.value) {
      return;
    }

    if (!email.value) {
      isVerified.value = false;
      return;
    }

    isVerifying.value = true;

    try {
      const data = await $fetch('/api/v1/gated/verify', {
        method: 'POST',
        body: { email: email.value },
      }) as any;

      isVerified.value = data?.exists || false;

      if (!isVerified.value) {
        email.value = null;
      }
    } catch (e) {
      console.error('[useGatedAccess] Verification failed:', e);
      isVerified.value = false;
      email.value = null;
    } finally {
      isVerifying.value = false;
    }
  };

  const grantAccess = (userEmail: string) => {
    email.value = userEmail;
    isVerified.value = true;
  };

  const revokeAccess = () => {
    email.value = null;
    isVerified.value = false;
    navigateTo('/');
  };

  return {
    email: readonly(email),
    isVerifying: readonly(isVerifying),
    isVerified: readonly(isVerified),
    hasAccess,
    grantAccess,
    revokeAccess,
    verifyAccess,
  };
};
