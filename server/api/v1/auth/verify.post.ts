// server/api/v1/auth/verify.post.ts
import { authorizeEmail } from '~~/server/utils/storage.handler';

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);
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
