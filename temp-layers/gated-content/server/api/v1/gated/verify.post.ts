// layers/gated-content/server/api/verify.post.ts
import { authorizeEmail } from '~~/server/utils/storage.handler';

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);
  // We assume getStorageConfig is available globally or auto-imported in server context
  // If not, we might need to import it. It seems to be an auto-import in the core.
  // Checking if getStorageConfig is auto-imported. 
  // In the original file it wasn't imported, so it must be auto-imported.
  const { provider } = getStorageConfig(event);


  if (!email) {
    throw createError({
      statusCode: 400,
      message: 'Email required',
    });
  }

  try {
    // Use configured storage provider (defaults to KV)
    const result = await authorizeEmail(provider, email);

    return result;
  } catch (error) {
    console.error('[Auth Verify] Error:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to verify email',
    });
  }
});
