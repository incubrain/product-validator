# Architecture Overview

## Simplified Event-Driven Modules

### Core Principle

Modules are **self-contained** with:
- State management (composables)
- Business logic (plugins)
- UI components (default implementations)
- API integration (server routes)

### Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USER ACTION                                              │
│    (clicks button, visits protected route, etc)             │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. MODULE COMPOSABLE                                        │
│    (useAuth(), usePayments())                               │
│    - Emits module-specific event                            │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. MODULE PLUGIN                                            │
│    (listens to its own events)                              │
│    - Handles API calls                                      │
│    - Updates module state                                   │
│    - Triggers side effects                                  │
│    - Emits additional events if needed                      │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. CROSS-MODULE COMMUNICATION (optional)                    │
│    (other modules listen to events)                         │
│    Example: Payments module listens to auth:login           │
└─────────────────────────────────────────────────────────────┘
```

### Event System

Events are used for:
1. **Module internal communication** (composable → plugin)
2. **Cross-module communication** (auth → payments)
3. **Analytics tracking** (any event → analytics)

Events are NOT used for:
- App-level business logic (moved to modules)
- Complex event chains (simplified)

### File Structure

```
modules/
  auth/
    runtime/
      components/      # UI (AuthGate, AuthModal)
      composables/     # State (useAuth)
      plugins/         # Logic (event listeners, API calls)
    index.ts           # Module registration
    types.ts           # TypeScript definitions
    README.md          # Module documentation
  
  payments/
    runtime/
      components/      # UI (PaymentGate, CheckoutButton)
      composables/     # State (usePayments)
      plugins/         # Logic (event listeners, API calls)
    index.ts           # Module registration
    types.ts           # TypeScript definitions
    README.md          # Module documentation

shared/
  handlers/
    events.ts          # App-level event handlers only
  config/
    events.ts          # App-level event chains only

app/
  plugins/
    1.events.client.ts # Event system orchestration
```

## Module Design Pattern

### Auth Module Example

**Composable** (`useAuth.ts`):
- Manages state (user, isAuthenticated)
- Provides methods (logout, requireAuth)
- Does NOT handle business logic
- Does NOT make API calls directly

**Plugin** (`auth.client.ts`):
- Listens to auth:* events
- Handles API calls (verify, login)
- Updates module state
- Triggers side effects (analytics, storage)
- Manages middleware registration

**Component** (`AuthModal.vue`):
- Default UI implementation
- Calls composable methods
- Emits events on user actions
- Can be customized by users

### Event Flow Example: Protected Route

```typescript
// 1. User visits /dashboard
// 2. Middleware runs (in plugin)
addRouteMiddleware('auth-guard', async (to) => {
  if (!isAuthenticated.value) {
    // 3. Plugin emits event
    await nuxtApp.callHook('auth:required', {
      route: to,
      metadata: { formId: 'email-gate' }
    })
  }
})

// 4. Plugin listens to its own event
nuxtApp.hook('auth:required', async ({ route, metadata }) => {
  // 5. Show modal
  useState('auth-modal-open').value = true
})

// 6. User enters email in AuthModal
// 7. Modal emits auth:login event
await useNuxtApp().callHook('auth:login', {
  user: { id, email },
  timestamp: Date.now()
})

// 8. Plugin listens and updates state
nuxtApp.hook('auth:login', async ({ user }) => {
  // Update state
  const userState = useState('auth:user')
  userState.value = user
  
  // Save to storage
  localStorage.setItem('auth:user', JSON.stringify(user))
  
  // Close modal
  useState('auth-modal-open').value = false
  
  // Track analytics
  scripts.umamiAnalytics.proxy.track('user_authenticated', { ... })
})
```

## Benefits of This Architecture

### 1. Self-Contained Modules
- All auth logic in `modules/auth/`
- All payment logic in `modules/payments/`
- Easy to understand and maintain
- Can be extracted to separate packages

### 2. Clear Separation of Concerns
- Composables: State management
- Plugins: Business logic
- Components: UI
- Events: Communication

### 3. Easy Customization
- Edit module files directly
- Override components
- Extend composables
- Add event listeners

### 4. Simple Event System
- No complex chains for module logic
- Events only for cross-module communication
- Clear data flow

### 5. Type Safety
- Full TypeScript support
- Event payloads typed
- Module configs typed

## Customization Guide

### Customizing Auth Modal

Edit `modules/auth/runtime/components/AuthModal.vue`:

```vue
<script setup>
// Add social login
const handleGoogleLogin = async () => {
  await navigateTo('/api/auth/google')
}
</script>

<template>
  <UModal v-model="isOpen">
    <!-- Your custom UI -->
    <button @click="handleGoogleLogin">
      Sign in with Google
    </button>
  </UModal>
</template>
```

### Adding Custom Event Listener

Listen to module events in your app:

```typescript
// app/plugins/custom.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('auth:login', ({ user }) => {
    // Send to your CRM
    await $fetch('/api/crm/update', {
      body: { email: user.email }
    })
  })
})
```

### Extending Composable

Create a wrapper composable:

```typescript
// composables/useMyAuth.ts
export const useMyAuth = () => {
  const auth = useAuth()
  
  const loginWithGoogle = async () => {
    // Your custom logic
  }
  
  return {
    ...auth,
    loginWithGoogle
  }
}
```

## Migration from Old Architecture

### Before (Event Chains):
```typescript
// Complex event chain
'auth:verify' → 'auth:login' → handler updates state

// Shared handler file
shared/handlers/auth.ts  // All logic here
```

### After (Self-Contained):
```typescript
// Module handles its own events
nuxtApp.hook('auth:verify', async () => {
  // Verify in plugin
  // Update own state
})

// No shared handler needed
modules/auth/runtime/plugins/auth.client.ts  // All logic here
```

## Testing Strategy

### Unit Tests
```typescript
// Test composable
const { user, setUser } = useAuth()
setUser({ id: '1', email: 'test@test.com' })
expect(user.value).toEqual({ id: '1', email: 'test@test.com' })
```

### Integration Tests
```typescript
// Test event flow
await nuxtApp.callHook('auth:login', {
  user: { id: '1', email: 'test@test.com' }
})
expect(useState('auth:user').value).toBeTruthy()
```

### E2E Tests
```typescript
// Test full flow
await page.goto('/dashboard')
await page.fill('[type="email"]', 'test@test.com')
await page.click('button[type="submit"]')
await expect(page).toHaveURL('/dashboard')
```
