// composables/useUserIdentity.ts
/**
 * Anonymous user identity management
 * Generates and persists user ID before email capture
 */
export const useUserIdentity = () => {
  const { local } = useAppStorage();
  const USER_ID_KEY = 'userId';

  /**
   * Generate anonymous User ID using crypto.randomUUID
   * Format: user_{uuid}
   */
  const generateUserId = (): string => {
    if (import.meta.server) return '';
    return `user_${crypto.randomUUID()}`;
  };

  /**
   * Get existing User ID or create new one
   * Persists in localStorage for cross-session tracking
   */
  const getUserId = (): string => {
    if (import.meta.server) return '';
    
    let userId = local.get(USER_ID_KEY);

    if (!userId) {
      userId = generateUserId();
      local.set(USER_ID_KEY, userId);
    }

    return userId;
  };

  return { getUserId };
};
