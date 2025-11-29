import { toWebRequest } from "h3";

/**
 * Better Auth API handler
 * Handles all /api/auth/* requests
 */
export default defineEventHandler(async (event) => {
  const request = toWebRequest(event);
  return auth.handler(request);
});
