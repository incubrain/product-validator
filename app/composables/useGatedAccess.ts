// composables/useGatedAccess.ts - SSR-SAFE
import { useStorage } from '@vueuse/core';

export const useGatedAccess = () => {
  const storagePrefix = useRuntimeConfig().public.configSource;
  const storageKey = `${storagePrefix}_magnet_email`;

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
    console.log('[useGatedAccess] hasAccess computed:', {
      email: email.value,
      isVerified: isVerified.value,
      hasAccess: access,
    });
    return access;
  });

  const verifyAccess = async () => {
    // Skip if already verified
    if (isVerified.value && email.value) {
      console.log('[useGatedAccess] Already verified, skipping');
      return;
    }

    if (!email.value) {
      console.log('[useGatedAccess] No email, setting verified = false');
      isVerified.value = false;
      return;
    }

    console.log('[useGatedAccess] Verifying email:', email.value);
    isVerifying.value = true;

    try {
      const data = await $fetch('/api/v1/auth/verify', {
        method: 'POST',
        body: { email: email.value },
      });

      isVerified.value = data?.exists || false;
      console.log('[useGatedAccess] Verification result:', isVerified.value);

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
    console.log('[useGatedAccess] ✅ GRANTING ACCESS:', userEmail);
    email.value = userEmail;
    isVerified.value = true;
  };

  const revokeAccess = () => {
    console.log('[useGatedAccess] ❌ REVOKING ACCESS');
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
