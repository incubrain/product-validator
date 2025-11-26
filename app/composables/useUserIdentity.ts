// composables/useUserIdentity.ts
import { v4 as uuidv4 } from 'uuid';
/**
 * Anonymous user identity management
 * Generates and persists user ID before email capture
 */
export const useUserIdentity = () => {
  const { local } = useAppStorage();
  const USER_ID_KEY = 'userId';

  /**
   * Generate anonymous User ID using uuidv4
   * Format: user_{uuid}
   */
  const generateUserId = (): string => {
    if (import.meta.server) return '';
    return `user_${uuidv4()}`;
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
