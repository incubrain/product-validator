# Auth Module Testing Plan

## 1. Environment Setup
- [ ] Ensure `.env` has `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`.
- [ ] Ensure `nuxt.config.ts` has `auth.enabled: true`.

## 2. Route Protection
- [ ] **Scenario:** Visit `/dashboard` (protected route) while logged out.
    - **Expected:**
        - Middleware logs "Route requires auth".
        - Middleware logs "No session".
        - **Client-side:** Auth Modal opens.
        - **SSR:** Redirects to `/`.

## 3. Authentication Flows
- [ ] **Magic Link:**
    - Enter email in "Magic Link" tab.
    - Click "Send Magic Link".
    - Check console for Ethereal email link.
    - Click link -> Verify redirection to `/dashboard`.
    - Verify `isAuthenticated` is true.

- [ ] **Email OTP:**
    - Enter email in "Email Code" tab.
    - Click "Send Code".
    - Check console for 6-digit code.
    - Enter code -> Click "Verify".
    - Verify modal closes and redirects to `/dashboard`.
    - Verify `isAuthenticated` is true.

- [ ] **OAuth (if configured):**
    - Click Google/GitHub button.
    - Complete flow.
    - Verify redirection to `/dashboard`.
    - Verify `isAuthenticated` is true.

## 4. Session Persistence
- [ ] Refresh page after login.
- [ ] Verify `isAuthenticated` remains true.
- [ ] Verify user data is present.

## 5. Sign Out
- [ ] Call `signOut()`.
- [ ] Verify `isAuthenticated` becomes false.
- [ ] Verify session cookie is removed.
