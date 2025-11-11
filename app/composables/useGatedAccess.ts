// composables/useGatedAccess.ts - SSR-SAFE
import { useStorage } from '@vueuse/core';

export const useGatedAccess = () => {
  const { configSource: storagePrefix } = useDevTools();
  const storageKey = `${storagePrefix.value}_magnet_email`;

  // ✅ Only use useStorage on client, fallback to ref on server
  const email = import.meta.client
    ? useStorage<string | null>(storageKey, null, localStorage, {
        listenToStorageChanges: true,
        writeDefaults: false,
      })
    : ref<string | null>(null);

  const isVerifying = useState<boolean>('magnet_isVerifying', () => false);
  const isVerified = useState<boolean>('magnet_isVerified', () => false);

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
      const data = await $fetch('/api/v1/auth/verify', {
        method: 'POST',
        body: { email: email.value },
      });

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
