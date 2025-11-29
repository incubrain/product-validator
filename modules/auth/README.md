# Auth Module

Self-contained authentication system using **Better-Auth**.

## What's Included

- ✅ State management (composables)
- ✅ Route protection (middleware)
- ✅ Stateless sessions (JWE cookies)
- ✅ OAuth (Google, GitHub)
- ✅ Magic Link (passwordless email)
- ✅ Email OTP (6-digit code)
- ✅ Default auth modal

## Quick Start

1. **Enable in `nuxt.config.ts`:**

```typescript
export default defineNuxtConfig({
  auth: {
    enabled: true,
    routes: [
      {
        pattern: '/dashboard/**',
        require: true,
        redirect: '/' // Redirects here if not authenticated
      }
    ]
  }
})
```

2. **Add `<AuthModal />` to your app layout:**

```vue
<template>
  <UApp>
    <AuthModal v-if="$config.public.auth?.enabled" />
    <NuxtPage />
  </UApp>
</template>
```

3. **Configure Environment Variables:**

```bash
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

## Usage in Components

```typescript
const { user, isAuthenticated, signOut } = useAuth()

// Check if user is logged in
if (isAuthenticated.value) {
  console.log('User:', user.value)
}

// Sign out
await signOut()
```

## Route Protection

The module uses global middleware to protect routes defined in `nuxt.config.ts`.

- **Client-side:** If a user visits a protected route without a session, the `AuthModal` is automatically triggered.
- **Server-side (SSR):** If a user visits a protected route without a session, they are redirected to the configured `redirect` path (default: `/`).

## Events

The module uses `useState` to manage the modal visibility:

```typescript
// Open modal manually
useState('auth-modal-open').value = true
```

## Architecture

- **Better-Auth:** Handles all authentication logic, sessions, and providers.
- **Composables:** `useAuth` wraps the Better-Auth client for easy access.
- **Middleware:** `auth.global.ts` handles route protection.
- **Server:** `/api/auth/[...all].ts` proxies requests to Better-Auth.
