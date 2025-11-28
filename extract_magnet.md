# 🎯 EXECUTIVE OVERVIEW: Gated Content Layer Extraction

## **THE CORE PROBLEM**

Current product is monolithic: **visitor → lead conversion** (core funnel) + **post-capture content delivery** (gated system) are tightly coupled.

This locks users into ONE post-capture strategy when they need flexibility for MULTIPLE use cases.

---

## **THE SOLUTION**

**Extract gated content delivery into optional Nuxt layer.**

**Core product becomes:**
- Pure funnel validation tool (visitor → lead/customer)
- Ends at lead capture
- Zero opinion on what happens after

**Layer becomes:**
- Optional post-capture strategy #1
- Progressive content delivery via email sequences
- Users opt-in via `extends: ['./layers/gated-content']`

---

## **POST-CAPTURE STRATEGIES (Beyond This Layer)**

After capturing a lead, users have different goals:

1. **Progressive Content Delivery** ← THIS LAYER
   - Email sequence magnet (current implementation)
   - Drip course content
   - Gated resources

2. **SaaS Onboarding** ← Future consideration
   - Trial account creation
   - Feature tours
   - Usage tracking

3. **Direct Booking** ← Future consideration
   - Calendar integration
   - Consultation scheduling
   - Payment collection

4. **Email List Only** ← No layer needed
   - Send to ConvertKit/Mailchimp
   - Exit after capture

5. **External Redirect** ← No layer needed
   - Pass to existing system
   - CRM integration

**Key insight:** Core shouldn't force strategy #1 when users might need #2-5.

---

## **TECHNICAL APPROACH**

**Event-driven decoupling:**
- Core emits `form_submitted` events (agnostic)
- Layer listens and handles if enabled
- Zero coupling: core works standalone

**Benefits:**
- Core = lightweight funnel tool
- Users choose post-capture path
- Maximum flexibility
- True "best part is no part" philosophy

---

## **DELIVERABLES**

1. Core product: Pure visitor→lead funnel (no gated content)
2. Optional layer: Progressive content delivery strategy
3. Clean architecture: Users can build additional strategies
4. Migration: Move existing magnet code → layer without breaking

# 🔧 REFINED IMPLEMENTATION PLAN: Gated Content Layer Extraction

## **NAMING: "Gated Content" vs "Magnet"**

**Recommended:** `layers/gated-content/`

**Rationale:**
- Generic enough for multiple use cases (courses, premium content, member areas, lead magnets)
- Describes **what it does** (gates content behind verification)
- Not locked to marketing/funnel terminology
- Aligns with layer's core purpose: progressive content delivery post-capture

---

## **LAYER ARCHITECTURE (Nuxt 4 Native Patterns)**

### **Directory Structure**

```
/layers/gated-content/
├── app/
│   ├── components/
│   │   ├── GatedPage.vue          # Was: MagnetPage.vue
│   │   ├── gated/
│   │   │   ├── CompleteButton.vue
│   │   │   └── ProgressIndicator.vue
│   │   └── content/
│   │       ├── DefinitionOfDone.vue
│   │       └── OutcomePreview.vue
│   ├── composables/
│   │   ├── useContentProgress.ts  # Was: useMagnetProgress.ts
│   │   ├── useGatedAccess.ts
│   │   └── useContentUnlock.ts    # Was: useContentAccess.ts
│   ├── layouts/
│   │   └── gated.vue
│   ├── middleware/
│   │   └── gated-guard.global.ts  # Was: magnet-guard.global.ts
│   ├── pages/
│   │   └── content/               # Was: /magnet
│   │       ├── index.vue
│   │       └── [stage]/
│   │           ├── index.vue
│   │           └── [step].vue
│   └── plugins/
│       └── gated-content.client.ts
├── content/
│   └── gated/                     # Example content structure
│       └── stages/
├── module.ts                       # Layer entry point
├── nuxt.config.ts                  # Layer defaults
└── README.md
```

---

## **PHASE 1: CORE API EXPOSURE (Nuxt Native Pattern)**

### **1.1 Core Exports Plugin**

Nuxt 4 layers consume composables/utilities from parent via auto-imports OR explicit plugin injection.

**Best Practice:** Use plugin injection for **guaranteed availability** across layer boundary.

```typescript
// core/plugins/public-api.ts
export default defineNuxtPlugin(() => {
  return {
    provide: {
      // Expose composables needed by layers
      coreComposables: {
        useFormSubmission,
        useEvents,
        useUserIdentity,
        useTrafficSource,
        useAppStorage,
        useDevTools
      },
      // Expose utility functions
      coreUtils: {
        trackEvent,
        identifyUser
      }
    }
  }
})
```

**Layer Consumption:**

```typescript
// layers/gated-content/app/composables/useContentProgress.ts
export const useContentProgress = () => {
  const { $coreComposables } = useNuxtApp()
  const { useEvents, useAppStorage } = $coreComposables
  
  const { trackEvent } = useEvents()
  const storage = useAppStorage()
  
  // ... layer logic
}
```

---

### **1.2 Type Safety (Nuxt Auto-Merge Pattern)**

```typescript
// core/types/plugin-api.d.ts
import type { useFormSubmission } from '~/composables/useFormSubmission'
import type { useEvents } from '~/composables/useEvents'
// ... other imports

export interface CoreComposables {
  useFormSubmission: typeof useFormSubmission
  useEvents: typeof useEvents
  useUserIdentity: typeof useUserIdentity
  useTrafficSource: typeof useTrafficSource
  useAppStorage: typeof useAppStorage
  useDevTools: typeof useDevTools
}

declare module '#app' {
  interface NuxtApp {
    $coreComposables: CoreComposables
    $coreUtils: {
      trackEvent: (event: any) => Promise<void>
      identifyUser: (data: any) => void
    }
  }
}
```

**Layer types:**

```typescript
// layers/gated-content/types/index.d.ts
declare module '#app' {
  interface RuntimeNuxtHooks {
    'gated:lead-captured': (payload: LeadCapturePayload) => void | Promise<void>
    'gated:access-granted': (email: string) => void | Promise<void>
    'gated:step-completed': (step: StepCompletionPayload) => void | Promise<void>
  }
}

export interface LeadCapturePayload {
  email: string
  formId: string
  metadata?: Record<string, any>
}

export interface StepCompletionPayload {
  path: string
  step: number
  total: number
}
```

---

## **PHASE 2: LAYER MODULE DEFINITION**

### **2.1 Module Entry Point**

```typescript
// layers/gated-content/module.ts
import { defineNuxtModule, createResolver, addPlugin, addImportsDir, addServerHandler } from '@nuxt/kit'

export interface GatedContentOptions {
  enabled: boolean
  formId: string              // Which form triggers gated access
  rootPath: string            // Default: '/content'
  
  auth: {
    strategy: 'custom' | 'storage'
    verify?: (email: string) => Promise<boolean>
  }
  
  content: {
    source: 'layer' | 'project'
    path?: string
  }
  
  navigation: {
    autoRedirect: boolean
    requireVerification: boolean
  }
}

export default defineNuxtModule<GatedContentOptions>({
  meta: {
    name: 'gated-content',
    configKey: 'gatedContent',
    compatibility: {
      nuxt: '^4.0.0'
    }
  },
  
  defaults: {
    enabled: false,
    formId: 'lead-magnet',
    rootPath: '/content',
    auth: {
      strategy: 'storage'
    },
    content: {
      source: 'layer'
    },
    navigation: {
      autoRedirect: true,
      requireVerification: true
    }
  },
  
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    
    // Skip setup if disabled
    if (!options.enabled) {
      return
    }
    
    // Register runtime config
    nuxt.options.runtimeConfig.public.gatedContent = options
    
    // Add composables directory for auto-import
    addImportsDir(resolver.resolve('./app/composables'))
    
    // Register client plugin for hooks
    addPlugin({
      src: resolver.resolve('./app/plugins/gated-content.client'),
      mode: 'client'
    })
    
    // Add optional server verification endpoint
    if (options.auth.strategy === 'storage') {
      addServerHandler({
        route: '/api/gated/verify',
        handler: resolver.resolve('./server/api/verify.post')
      })
    }
  }
})
```

---

### **2.2 Layer Configuration File**

```typescript
// layers/gated-content/nuxt.config.ts
export default defineNuxtConfig({
  // Layer-specific defaults (can be overridden by parent)
  runtimeConfig: {
    public: {
      gatedContent: {
        enabled: false
      }
    }
  }
})
```

---

## **PHASE 3: HOOK SYSTEM (Event-Driven Integration)**

### **3.1 Core Event Emission (NO changes needed)**

Core already emits generic events. Layer listens for specific ones.

```typescript
// app/composables/useFormSubmission.ts (EXISTING - no changes)
const handleSubmit = async () => {
  // ... validation
  
  await trackEvent({
    type: 'form_submitted',
    data: { 
      email: formData.email,
      formId: currentFormId.value,
      metadata: { /* ... */ }
    }
  })
  
  // Core doesn't know about gated content - layer handles it
}
```

---

### **3.2 Layer Hook Listener**

```typescript
// layers/gated-content/app/plugins/gated-content.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public.gatedContent
  
  if (!config.enabled) return
  
  const { grantAccess } = useGatedAccess()
  
  // Listen to core events
  nuxtApp.hook('events:emit', async (payload) => {
    // Only handle our specific form
    if (payload.type !== 'form_submitted') return
    if (payload.data?.formId !== config.formId) return
    
    const email = payload.data.email
    
    // Emit layer-specific hook
    await nuxtApp.callHook('gated:lead-captured', {
      email,
      formId: payload.data.formId,
      metadata: payload.data.metadata
    })
    
    // Handle access verification
    if (config.auth.strategy === 'custom' && config.auth.verify) {
      const verified = await config.auth.verify(email)
      if (verified) {
        grantAccess(email)
        await nuxtApp.callHook('gated:access-granted', email)
      }
    } else {
      // Use storage verification endpoint
      const { data } = await useFetch('/api/gated/verify', {
        method: 'POST',
        body: { email }
      })
      
      if (data.value?.exists) {
        grantAccess(email)
        await nuxtApp.callHook('gated:access-granted', email)
      }
    }
    
    // Auto-redirect if configured
    if (config.navigation.autoRedirect) {
      await navigateTo(config.rootPath)
    }
  })
})
```

---

### **3.3 User-Space Hook Handlers**

Users can extend behavior via hooks in their project config:

```typescript
// user's nuxt.config.ts
export default defineNuxtConfig({
  extends: ['./layers/gated-content'],
  
  gatedContent: {
    enabled: true,
    formId: 'lead-magnet',
    rootPath: '/course',
    
    auth: {
      strategy: 'custom',
      verify: async (email) => {
        // Custom Supabase verification
        const { data } = await $fetch('/api/my-auth-check', {
          body: { email }
        })
        return data?.isActive || false
      }
    }
  },
  
  hooks: {
    // User-defined custom logic
    'gated:lead-captured': async (payload) => {
      console.log('New lead captured:', payload)
      // Send to CRM, trigger welcome email, etc.
    },
    
    'gated:access-granted': async (email) => {
      console.log('Access granted:', email)
      // Analytics, notifications, etc.
    }
  }
})
```

---

## **PHASE 4: CRITICAL EDGE CASES & SOLUTIONS**

### **4.1 Layer Disabled, Form Still Submits**

**Problem:** User submits formId='lead-magnet', but layer not enabled.

**Solution:** Core gracefully ignores (no layer = no hook listeners).

```typescript
// core/composables/useFormSubmission.ts
const handleSubmit = async () => {
  await trackEvent({
    type: 'form_submitted',
    data: { email, formId, metadata }
  })
  
  // Core shows generic success
  isSuccess.value = true
  
  // If layer enabled, it handles navigation
  // If layer disabled, user stays on page
}
```

**No changes needed in core.** Layer absence = graceful no-op.

---

### **4.2 Middleware Naming & Order**

**Problem:** Global middleware execution order matters. Layer guard must run **after** core middleware.

**Solution:** Use Nuxt naming convention.

```typescript
// layers/gated-content/app/middleware/z-gated-guard.global.ts
// "z-" prefix ensures it runs AFTER core middleware (alphabetical order)

export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig().public.gatedContent
  
  // Only apply to gated routes
  if (!to.path.startsWith(config.rootPath)) return
  
  // Check if layer enabled
  if (!config.enabled) {
    return navigateTo('/')
  }
  
  const { isVerified } = useGatedAccess()
  
  if (!isVerified.value && config.navigation.requireVerification) {
    return navigateTo('/')
  }
})
```

---

### **4.3 Content Collection Conflicts**

**Problem:** Both core and layer define content collections.

**Solution:** Nuxt Content auto-merges if paths are unique.

```typescript
// core/nuxt.config.ts
export default defineNuxtConfig({
  content: {
    sources: {
      pages: {
        driver: 'fs',
        prefix: '/pages',
        base: resolve('./content/pages')
      },
      offers: {
        driver: 'fs',
        prefix: '/offers',
        base: resolve('./content/offers')
      }
    }
  }
})

// layers/gated-content/nuxt.config.ts
export default defineNuxtConfig({
  content: {
    sources: {
      gated: {
        driver: 'fs',
        prefix: '/gated',  // Unique prefix - no conflict
        base: resolve('./content/gated')
      }
    }
  }
})
```

**User override:**

```typescript
// user's nuxt.config.ts
export default defineNuxtConfig({
  gatedContent: {
    content: {
      source: 'project',
      path: './content/my-course'
    }
  },
  
  content: {
    sources: {
      // Override layer default
      gated: {
        driver: 'fs',
        prefix: '/course',
        base: resolve('./content/my-course')
      }
    }
  }
})
```

---

### **4.4 Storage Provider Abstraction**

**Solution:** Layer provides default, users override via config.

```typescript
// layers/gated-content/app/composables/useGatedAccess.ts
export const useGatedAccess = () => {
  const config = useRuntimeConfig().public.gatedContent
  const { $coreComposables } = useNuxtApp()
  const { useAppStorage } = $coreComposables
  
  const storage = useAppStorage()
  const email = ref(storage.get('gated_email'))
  const isVerified = ref(false)
  
  const verifyAccess = async () => {
    if (config.auth.strategy === 'custom' && config.auth.verify) {
      // User-provided verification
      isVerified.value = await config.auth.verify(email.value)
    } else {
      // Layer default: storage endpoint
      const { data } = await $fetch('/api/gated/verify', {
        method: 'POST',
        body: { email: email.value }
      })
      isVerified.value = data?.exists || false
    }
  }
  
  const grantAccess = (userEmail: string) => {
    email.value = userEmail
    storage.set('gated_email', userEmail)
    isVerified.value = true
  }
  
  const revokeAccess = () => {
    storage.remove('gated_email')
    email.value = null
    isVerified.value = false
  }
  
  return {
    email: readonly(email),
    isVerified: readonly(isVerified),
    verifyAccess,
    grantAccess,
    revokeAccess
  }
}
```

---

## **PHASE 5: MIGRATION EXECUTION**

### **Step 1: Create Layer Structure**

```bash
mkdir -p layers/gated-content/{app,server,content}
mkdir -p layers/gated-content/app/{components,composables,layouts,middleware,pages,plugins}
mkdir -p layers/gated-content/server/api
```

### **Step 2: Move Files with Renaming**

```bash
# Components
mv app/components/MagnetPage.vue layers/gated-content/app/components/GatedPage.vue
mv app/components/magnet layers/gated-content/app/components/gated
mv app/components/content/{DefinitionOfDone,OutcomePreview}.vue layers/gated-content/app/components/content/

# Composables (rename during move)
mv app/composables/useMagnetProgress.ts layers/gated-content/app/composables/useContentProgress.ts
mv app/composables/useGatedAccess.ts layers/gated-content/app/composables/
mv app/composables/useContentAccess.ts layers/gated-content/app/composables/useContentUnlock.ts

# Pages (rename directory)
mv app/pages/magnet layers/gated-content/app/pages/content

# Layouts
mv app/layouts/gated.vue layers/gated-content/app/layouts/

# Middleware (rename)
mv app/middleware/magnet-guard.global.ts layers/gated-content/app/middleware/z-gated-guard.global.ts

# Content (rename directory)
mv content/magnet layers/gated-content/content/gated
```

### **Step 3: Create Module Entry**

```typescript
// layers/gated-content/module.ts
// (See Phase 2.1 above)
```

### **Step 4: Update Core Plugin**

```typescript
// core/plugins/public-api.ts
// (See Phase 1.1 above)
```

### **Step 5: Fix Layer Imports**

```bash
# Find and replace in layer files
find layers/gated-content -type f -name "*.ts" -o -name "*.vue" | xargs sed -i '' \
  's/useMagnetProgress/useContentProgress/g' \
  's/\/magnet/\/content/g' \
  's/magnet-/gated-/g'
```

### **Step 6: Update Core References**

```bash
# Remove magnet references from core
# Nothing needed - core doesn't import from layer
```

---

## **VALIDATION CHECKLIST**

```bash
# ✅ Test 1: Core builds without layer
pnpm build
# Expect: Success, no /content routes

# ✅ Test 2: Layer auto-registered (./layers/ pattern)
mv layers/gated-content ./layers/
pnpm dev
# Expect: /content routes available automatically

# ✅ Test 3: Layer via extends
# nuxt.config.ts: extends: ['./path/to/layer']
pnpm dev
# Expect: /content routes available

# ✅ Test 4: Custom auth verification
# nuxt.config.ts: gatedContent.auth.verify = async (email) => { /* custom */ }
# Submit form → Should call custom function

# ✅ Test 5: Custom content path
# nuxt.config.ts: gatedContent.content.path = './content/course'
# Visit /content → Should load from custom path

# ✅ Test 6: Layer disabled
# nuxt.config.ts: gatedContent.enabled = false
pnpm build
# Expect: No /content routes, no errors
```

---

## **FINAL ARCHITECTURE DIAGRAM**

```
┌─────────────────────────────────────────────────┐
│             USER PROJECT (Highest Priority)      │
│  - nuxt.config.ts (extends layer, config)       │
│  - app/* (overrides layer if paths match)       │
│  - hooks: { 'gated:*': customLogic }            │
└──────────────────┬──────────────────────────────┘
                   │ extends
┌──────────────────▼──────────────────────────────┐
│           GATED CONTENT LAYER                    │
│  - module.ts (registration)                      │
│  - app/* (components, pages, composables)        │
│  - plugins/gated-content.client.ts (hooks)       │
│  - Listens to: 'form_submitted' events          │
│  - Emits: 'gated:lead-captured', etc.           │
└──────────────────┬──────────────────────────────┘
                   │ imports via $coreComposables
┌──────────────────▼──────────────────────────────┐
│              CORE PRODUCT                        │
│  - plugins/public-api.ts (exposes composables)   │
│  - Emits: 'form_submitted' events               │
│  - Provides: useFormSubmission, useEvents, etc.  │
│  - Unaware of layer existence                    │
└──────────────────────────────────────────────────┘
```
