# 🎯 UTM + User Lifecycle Tracking Implementation Plan

## **Strategic Pivot: Umami-First Approach**

You're absolutely right. **Don't duplicate Umami's functionality.**

### **Current Misalignment:**
- ❌ Storing UTM data in KV → Creates parallel analytics system
- ❌ Building custom metrics endpoints → Reinventing Umami
- ❌ Manual CSV analysis → Umami already visualizes this

### **Correct Architecture:**
- ✅ Send UTM + User ID to Umami → Single source of truth
- ✅ Leverage Umami's dashboards → No custom UI needed
- ✅ Use Umami's reports → Funnel/retention built-in
- ✅ Store only what Umami can't track → Lead capture metadata

---

## **What to Store Where**

### **Umami Handles:**
- ✅ UTM parameters (auto-captured from URL)
- ✅ Page views, events, sessions
- ✅ Device, browser, location data
- ✅ User journey across sessions (via Distinct ID)
- ✅ Funnel analysis, retention, bounce rate
- ✅ Campaign performance visualization

### **KV Storage Handles:**
- ✅ Email addresses (PII - can't send to Umami)
- ✅ Lead metadata (form submissions, feedback)
- ✅ Gated content progress
- ✅ Link between User ID ↔ Email

---

## **High-Level Architecture**

```
User Journey:
┌─────────────────────────────────────────────────────────┐
│ 1. User lands with UTM parameters                       │
│    https://site.com?utm_source=twitter&utm_campaign=X   │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Umami auto-captures:                                 │
│    - UTM params (from URL)                              │
│    - Anonymous session (auto-generated UUID)            │
│    - Page views, events                                 │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 3. User submits email form                              │
│    → Generate persistent User ID (hash of email)        │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 4. Send User ID to Umami as "Distinct ID"              │
│    → Links all future events to this user               │
│    → Enables cross-session tracking                     │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 5. Store in KV:                                         │
│    {                                                    │
│      userId: "hash123",                                │
│      email: "encrypted",                               │
│      formId: "magnet",                                 │
│      capturedAt: timestamp                             │
│    }                                                    │
│    (No UTM data - Umami already has it)                │
└─────────────────────────────────────────────────────────┘
```

---

## **Implementation Plan**

### **Phase 1: User Identity System (1-2 hours)**

#### **Goal:** Generate persistent User ID on email capture

```ts
// composables/useUserIdentity.ts
import { hash } from 'ohash';

export const useUserIdentity = () => {
  const storageKey = 'user_id';
  
  /**
   * Generate deterministic user ID from email
   * Same email = same ID (enables cross-device tracking)
   */
  const generateUserId = (email: string): string => {
    return hash({ email, salt: useRuntimeConfig().public.userIdSalt });
  };
  
  /**
   * Store user ID in localStorage for persistence
   */
  const setUserId = (email: string) => {
    const userId = generateUserId(email);
    localStorage.setItem(storageKey, userId);
    return userId;
  };
  
  /**
   * Retrieve existing user ID
   */
  const getUserId = (): string | null => {
    return localStorage.getItem(storageKey);
  };
  
  return { generateUserId, setUserId, getUserId };
};
```

**Key Decisions:**
- ✅ Hash email → User ID (deterministic, privacy-preserving)
- ✅ Store in localStorage (persists across sessions)
- ✅ Max 50 chars (Umami limit)

---

### **Phase 2: Umami Integration (1 hour)**

#### **Goal:** Send User ID to Umami as Distinct ID

```ts
// composables/useAnalytics.ts (UPDATED)
export const useAnalytics = () => {
  const { getUserId } = useUserIdentity();
  const { $scripts } = useNuxtApp();
  
  /**
   * Track event with User ID
   */
  const trackEvent = (eventName: string, eventData?: any) => {
    const umamiScript = $scripts.umamiAnalytics;
    const userId = getUserId();
    
    if (umamiScript?.proxy?.track) {
      umamiScript.proxy.track(eventName, {
        ...eventData,
        // ✅ Send User ID as Distinct ID
        id: userId,
      });
    }
  };
  
  /**
   * Track page view with User ID
   */
  const trackPageView = () => {
    const umamiScript = $scripts.umamiAnalytics;
    const userId = getUserId();
    
    if (umamiScript?.proxy?.track) {
      // Umami auto-tracks page views, just update the ID
      umamiScript.proxy.identify(userId);
    }
  };
  
  return { trackEvent, trackPageView };
};
```

**What Umami Now Sees:**
```json
{
  "type": "event",
  "payload": {
    "hostname": "yoursite.com",
    "url": "/",
    "title": "Home",
    "website": "your-website-id",
    "id": "user_abc123xyz", // ✅ Persistent across sessions
    
    // ✅ UTM params auto-captured by Umami from URL
    "utm_source": "twitter",
    "utm_medium": "social",
    "utm_campaign": "launch_week"
  }
}
```

---

### **Phase 3: Link User ID on Email Capture (30 min)**

#### **Goal:** Set User ID when email is submitted

```ts
// composables/useFormSubmission.ts (UPDATED)
export const useFormSubmission = () => {
  const { setUserId } = useUserIdentity();
  const { trackEvent } = useAnalytics();
  
  const submit = async (formData) => {
    // ✅ Generate & store User ID
    const userId = setUserId(formData.email);
    
    // ✅ Track in Umami (with User ID)
    trackEvent('form_submitted', {
      formId: formData.formId,
      // User ID auto-included via trackEvent
    });
    
    // ✅ Store in KV (minimal data)
    await trackEvent({
      type: 'form_submitted',
      data: {
        userId, // Link to Umami user
        formId: formData.formId,
        email: formData.email, // Encrypted
        // NO UTM data stored here
      }
    });
  };
};
```

---

### **Phase 4: KV Schema Update (15 min)**

#### **Goal:** Store User ID linkage only

```ts
// server/utils/providers/kv.ts (UPDATED)
interface LeadRecord {
  userId: string;           // ✅ Links to Umami Distinct ID
  emailHash: string;        // For deduplication
  emailEncrypted: string;   // PII
  formId: string;
  customerStage: string;
  capturedAt: number;
  updatedAt: number;
  // ❌ NO UTM data (Umami has it)
}

export const kvProvider: StorageProvider = {
  async send({ data }) {
    const record: LeadRecord = {
      userId: data.userId,
      emailHash: hashEmail(data.email),
      emailEncrypted: encryptEmail(data.email),
      formId: data.formId,
      customerStage: data.customerStage,
      capturedAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    await storage.setItem(`leads:${record.userId}`, record);
  }
};
```

**Why store User ID in KV?**
- Enables lookup: "Show me email for User ID xyz"
- Required for admin panel: "Which email submitted this form?"
- Privacy-preserving: User ID ≠ Email (hashed)

---

### **Phase 5: Admin Panel Enhancement (30 min)**

#### **Goal:** Show User ID in leads list with Umami link

```ts
// server/api/v1/admin/leads.get.ts (UPDATED)
export default defineEventHandler(async (event) => {
  const records = await getAllLeads(true); // Decrypt emails
  
  return {
    count: records.length,
    records: records.map(record => ({
      userId: record.userId,
      email: decryptEmail(record.emailEncrypted),
      formId: record.formId,
      capturedAt: record.capturedAt,
      // ✅ Link to Umami user journey
      umamiLink: `https://your-umami.com/sessions?id=${record.userId}`
    }))
  };
});
```

**Admin View:**
```
┌─────────────────────────────────────────────────────────┐
│ Email               | Form   | Source      | Umami      │
├─────────────────────────────────────────────────────────┤
│ user@example.com    | magnet | [View] ──────────────►   │
│ (user_abc123)       |        |             | Full       │
│                     |        |             | Journey    │
└─────────────────────────────────────────────────────────┘
```

Clicking "View" opens Umami with:
- All sessions for this user
- UTM parameters per session
- Full event history
- Funnel progression

---

## **What This Architecture Gives You**

### **1. Full User Lifecycle in Umami**

**Anonymous Session:**
```
Session 1 (Jan 1):
- Source: twitter (utm_source=twitter)
- Campaign: launch_week
- Events: Viewed homepage, clicked CTA
- No conversion
```

**Email Captured:**
```
Session 2 (Jan 2):
- User ID: user_abc123xyz ✅ (links sessions)
- Source: Direct
- Events: Submitted email form
- Conversion! ✅
```

**Return Visit:**
```
Session 3 (Jan 5):
- User ID: user_abc123xyz ✅ (same user)
- Source: Direct
- Events: Completed magnet step 1
```

### **2. Campaign Attribution in Umami**

**Umami Dashboard Filters:**
```
1. Filter by: utm_source=twitter
   → See all traffic from Twitter

2. Filter by: utm_campaign=launch_week
   → See specific campaign performance

3. Filter by: Event="form_submitted"
   → See which sources converted

4. Build Custom UTM Report:
   → Breakdown by source, campaign, content
   → Conversion rate per UTM combination
```

### **3. User Journey Tracking**

**Umami Sessions View:**
```
Search: user_abc123xyz

Results:
┌─────────────────────────────────────────────────────────┐
│ Jan 1  | twitter  | launch_week | 5 pages | No convert │
│ Jan 2  | direct   | -           | 2 pages | Converted! │
│ Jan 5  | direct   | -           | 8 pages | Engaged    │
└─────────────────────────────────────────────────────────┘
```

### **4. Retention Analysis**

**Umami Retention Report:**
```
Question: "Do users from Twitter return more than newsletter users?"

Filter:
- Cohort 1: utm_source=twitter
- Cohort 2: utm_source=newsletter

Result:
- Twitter: 45% return within 7 days
- Newsletter: 68% return within 7 days
→ Newsletter drives more engaged users
```

---

## **Implementation Checklist**

### **Phase 1: User Identity (1-2 hours)**
- [ ] Create `useUserIdentity` composable
- [ ] Generate deterministic User ID from email
- [ ] Store in localStorage for persistence
- [ ] Add salt to runtime config

### **Phase 2: Umami Integration (1 hour)**
- [ ] Update `useAnalytics` to send User ID
- [ ] Add `identify()` call on page views
- [ ] Include User ID in all events
- [ ] Test Umami receives Distinct ID

### **Phase 3: Email Capture (30 min)**
- [ ] Update form submission to set User ID
- [ ] Link User ID to KV record
- [ ] Remove UTM storage from KV

### **Phase 4: KV Schema (15 min)**
- [ ] Update LeadRecord interface
- [ ] Remove UTM fields
- [ ] Add userId field
- [ ] Migration script (if existing data)

### **Phase 5: Admin Panel (30 min)**
- [ ] Show User ID in leads list
- [ ] Add "View in Umami" link
- [ ] Test deep link to Umami sessions

---

## **What NOT to Build**

❌ **Custom UTM dashboard** → Umami has this
❌ **Campaign metrics endpoint** → Umami reports
❌ **User journey visualization** → Umami sessions
❌ **Retention charts** → Umami retention report
❌ **Funnel analysis** → Umami funnel report
❌ **CSV export with UTMs** → Umami has CSV export

---

## **Final Architecture**

```
┌─────────────────────────────────────────────────────────┐
│                        UMAMI                            │
│ ─────────────────────────────────────────────────────── │
│ • UTM parameters (auto-captured)                        │
│ • User journeys (via Distinct ID)                       │
│ • Events, page views, sessions                          │
│ • Campaign performance                                  │
│ • Retention, funnels, reports                           │
│ • Visualizations & dashboards                           │
└─────────────────────────────────────────────────────────┘
                         ↕
                    [User ID]
                         ↕
┌─────────────────────────────────────────────────────────┐
│                    KV STORAGE                           │
│ ─────────────────────────────────────────────────────── │
│ • User ID ↔ Email mapping                              │
│ • Lead metadata (form, stage)                           │
│ • PII (encrypted emails)                                │
│ • Gated content progress                                │
└─────────────────────────────────────────────────────────┘
```

---

## **Total Implementation Time**

- Phase 1: 1-2 hours
- Phase 2: 1 hour
- Phase 3: 30 min
- Phase 4: 15 min
- Phase 5: 30 min

**Total: ~3-4 hours**

---

## **Next Steps**

1. ✅ Confirm architecture approach
2. Add `NUXT_PUBLIC_USER_ID_SALT` to `.env`
3. Implement Phase 1 (User Identity)
4. Test Umami receives Distinct ID
5. Complete remaining phases

**Ship this approach?**

---

Ok a few concerns.

Hash email → User ID (deterministic, privacy-preserving) - we may never capture the email from the user... this is not a viable option IMO, use the best option that is available when a user lands on our website for the first time
We are not using our events system, this is where we pipe the events to then store in our analytics platform, check out the useEvents.ts and events.client.ts files for full context (attached to project in the 'src code' file)
no need for admin panel considerations at this stage, STAY FOCUSSED ON THE MISSION
we should be using this as a prefix for all of the localStorage data typescript useRuntimeConfig().public.configSource  in fact I think we should probably create a reusable function that does this for all of our data storage, thing of this like a storage wrapper, in the future when we implement persisted DB storage we should be able to make one change here and everything would work.
also I am wondering if we need to make any changes to our analytics handler or if this is good?
I think I would like you to clearly state back to me the objectives, what functionality we require, and then a high level overview of the system.

then provide the basic code examples of what needs to be done

---

# 🎯 UTM + User Lifecycle Tracking - Clarified Plan

## **Objectives**

1. **Track user identity across sessions** - Even before email capture
2. **Send user identity to Umami** - Enable cross-session journey tracking
3. **Capture UTM parameters** - Attribute traffic sources to conversions
4. **Send UTM data to Umami** - Leverage Umami's visualization (no custom dashboards)
5. **Use existing event system** - Pipe through `useEvents` → `analyticsHandler`
6. **Centralize storage management** - Config-aware storage wrapper for future flexibility

---

## **Required Functionality**

### **1. Anonymous User ID Generation**
- Generate unique ID on first visit (before email capture)
- Persist across sessions via localStorage
- Send to Umami as "Distinct ID"

### **2. UTM Parameter Capture**
- Extract UTM params from URL on landing
- Store in sessionStorage (session-scoped)
- Include in all events sent to Umami

### **3. Event System Integration**
- All tracking flows through `useEvents.trackEvent()`
- `analyticsHandler` sends to Umami with User ID + UTM
- No direct Umami calls outside event system

### **4. Storage Abstraction**
- Centralized storage wrapper with config prefix
- Easy migration path to DB storage later
- Single change point for storage backend

---

## **High-Level System Overview**

```
┌─────────────────────────────────────────────────────────┐
│ 1. User lands with UTM params                           │
│    https://site.com?utm_source=twitter                  │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 2. useUserIdentity composable:                          │
│    - Check localStorage for existing User ID            │
│    - If none: Generate anonymous UUID                   │
│    - Store in localStorage (config-prefixed)            │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 3. useTrafficSource composable:                         │
│    - Extract UTM params from URL                        │
│    - Store in sessionStorage (config-prefixed)          │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 4. Every event → useEvents.trackEvent():                │
│    - Auto-inject User ID                                │
│    - Auto-inject UTM params                             │
│    - Emit via 'events:emit' hook                        │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 5. analyticsHandler receives event:                     │
│    - Extracts User ID from payload                      │
│    - Extracts UTM params from payload                   │
│    - Sends to Umami with `id` field                     │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 6. Umami receives:                                      │
│    {                                                    │
│      id: "user_abc123",                                │
│      utm_source: "twitter",                            │
│      utm_campaign: "launch"                            │
│    }                                                    │
│    → Tracks full user journey                          │
└─────────────────────────────────────────────────────────┘
```

---

## **Implementation**

### **1. Storage Wrapper**

```typescript
// composables/useStorage.ts
export const useStorage = () => {
  const config = useRuntimeConfig();
  const prefix = config.public.configSource;
  
  /**
   * Get prefixed storage key
   */
  const getKey = (key: string): string => {
    return `${prefix}_${key}`;
  };
  
  /**
   * localStorage operations
   */
  const local = {
    get: (key: string): string | null => {
      if (import.meta.server) return null;
      return localStorage.getItem(getKey(key));
    },
    
    set: (key: string, value: string): void => {
      if (import.meta.server) return;
      localStorage.setItem(getKey(key), value);
    },
    
    remove: (key: string): void => {
      if (import.meta.server) return;
      localStorage.removeItem(getKey(key));
    }
  };
  
  /**
   * sessionStorage operations
   */
  const session = {
    get: (key: string): string | null => {
      if (import.meta.server) return null;
      return sessionStorage.getItem(getKey(key));
    },
    
    set: (key: string, value: string): void => {
      if (import.meta.server) return;
      sessionStorage.setItem(getKey(key), value);
    },
    
    remove: (key: string): void => {
      if (import.meta.server) return;
      sessionStorage.removeItem(getKey(key));
    }
  };
  
  return { local, session, getKey };
};
```

---

### **2. User Identity Composable**

```typescript
// composables/useUserIdentity.ts
export const useUserIdentity = () => {
  const { local } = useStorage();
  const USER_ID_KEY = 'user_id';
  
  /**
   * Generate anonymous User ID
   */
  const generateUserId = (): string => {
    return `user_${crypto.randomUUID()}`;
  };
  
  /**
   * Get or create User ID
   */
  const getUserId = (): string => {
    let userId = local.get(USER_ID_KEY);
    
    if (!userId) {
      userId = generateUserId();
      local.set(USER_ID_KEY, userId);
    }
    
    return userId;
  };
  
  return { getUserId };
};
```

---

### **3. Traffic Source Composable**

```typescript
// composables/useTrafficSource.ts
export const useTrafficSource = () => {
  const route = useRoute();
  const { session } = useStorage();
  const TRAFFIC_SOURCE_KEY = 'traffic_source';
  
  /**
   * Extract UTM params from URL
   */
  const captureSource = () => {
    const source = {
      utm_source: route.query.utm_source as string || null,
      utm_medium: route.query.utm_medium as string || null,
      utm_campaign: route.query.utm_campaign as string || null,
      utm_content: route.query.utm_content as string || null,
      utm_term: route.query.utm_term as string || null,
      referrer: import.meta.client ? document.referrer : null,
      landing_page: route.path,
    };
    
    // Only store if at least one UTM param exists
    if (Object.values(source).some(v => v)) {
      session.set(TRAFFIC_SOURCE_KEY, JSON.stringify(source));
    }
  };
  
  /**
   * Get stored traffic source
   */
  const getSource = () => {
    const stored = session.get(TRAFFIC_SOURCE_KEY);
    return stored ? JSON.parse(stored) : null;
  };
  
  return { captureSource, getSource };
};
```

---

### **4. Auto-Capture Plugin**

```typescript
// plugins/1.traffic-capture.client.ts
export default defineNuxtPlugin(() => {
  const { captureSource } = useTrafficSource();
  const { getUserId } = useUserIdentity();
  
  // Ensure User ID exists
  getUserId();
  
  // Capture UTM on mount
  onMounted(() => {
    captureSource();
  });
});
```

---

### **5. Update useEvents Composable**

```typescript
// composables/useEvents.ts (UPDATED)
export const useEvents = () => {
  const nuxtApp = useNuxtApp();
  const { getUserId } = useUserIdentity();
  const { getSource } = useTrafficSource();
  
  const trackEvent = async (event: EventPayload) => {
    const userId = getUserId();
    const trafficSource = getSource();
    
    const payload = {
      ...event,
      timestamp: Date.now(),
      data: {
        ...event.data,
        // ✅ Auto-inject User ID
        userId,
        // ✅ Auto-inject UTM params
        traffic_source: trafficSource,
      }
    } satisfies EventPayload;

    await nuxtApp.callHook('events:emit', payload);

    return payload.response;
  };

  // ... rest of composable
  
  return { trackEvent };
};
```

---

### **6. Update Analytics Handler**

```typescript
// app/utils/analytics.handler.ts (UPDATED)
import type { EventPayload } from '#shared/types/events';

export const analyticsHandler = (payload: EventPayload) => {
  if (import.meta.server) return;

  try {
    const { $scripts } = useNuxtApp();
    const umamiScript = $scripts.umamiAnalytics;

    if (umamiScript?.proxy?.track) {
      sendToAnalytics(payload, umamiScript.proxy);
    }
  } catch (error) {
    console.error('Analytics handler failed:', error);
  }
};

function sendToAnalytics(payload: EventPayload, analyticsProxy: any) {
  const eventName = `${payload.type}`;
  
  // ✅ Extract User ID and UTM from payload
  const userId = payload.data?.userId;
  const trafficSource = payload.data?.traffic_source;
  
  const eventData = {
    event_id: payload.id,
    location: payload.location,
    action: payload.action,
    target: payload.target,
    timestamp: payload.timestamp,
    // ✅ Include User ID as Distinct ID
    id: userId,
    // ✅ Include UTM params
    ...trafficSource,
  };

  switch (payload.type) {
    case 'element_clicked':
      if (payload.id.includes('paid') || payload.id.includes('purchase')) {
        analyticsProxy.track('conversion', {
          ...eventData,
          offer_type: 'paid',
          conversion_location: payload.location,
        });
      }
      analyticsProxy.track(eventName, eventData);
      break;

    case 'exit_intent':
      analyticsProxy.track('exit_intent', {
        ...eventData,
        trigger_location: payload.location,
      });
      break;

    case 'form_submitted':
      analyticsProxy.track('form_submitted', eventData);
      break;

    case 'form_error':
      analyticsProxy.track('form_error', eventData);
      break;

    default:
      analyticsProxy.track(eventName, eventData);
  }
}
```

---

### **7. Update EventPayload Type**

```typescript
// shared/types/events.d.ts (UPDATED)
export interface EventPayload {
  id: string;
  type: TrackedEvents;
  action: TrackedActions;
  location: string;
  target?: string;
  timestamp?: number;
  data?: {
    formId?: string;
    recordId?: string;
    email?: string;
    offerId?: string;
    customerStage?: string;
    currentStage?: StageKey;
    feedback?: string;
    // ✅ NEW: User identity and attribution
    userId?: string;
    traffic_source?: {
      utm_source?: string | null;
      utm_medium?: string | null;
      utm_campaign?: string | null;
      utm_content?: string | null;
      utm_term?: string | null;
      referrer?: string | null;
      landing_page?: string;
    } | null;
    metadata?: Record<string, any>;
  };
  response?: Record<string, any>;
  triggersEvent?: string[];
  _devToolsTriggered?: boolean;
  error?: any;
}
```

---

## **What Data Flows Where**

### **Example: User Journey**

**1. First Visit (Anonymous):**
```typescript
// User lands: https://site.com?utm_source=twitter&utm_campaign=launch

// Generated automatically:
userId = "user_abc123xyz"
traffic_source = {
  utm_source: "twitter",
  utm_campaign: "launch",
  landing_page: "/"
}

// Event sent to Umami:
{
  type: "element_viewed",
  id: "user_abc123xyz",
  utm_source: "twitter",
  utm_campaign: "launch"
}
```

**2. Form Submission:**
```typescript
// User submits email form

trackEvent({
  type: 'form_submitted',
  data: {
    email: 'user@example.com',
    formId: 'magnet'
    // userId and traffic_source auto-injected
  }
});

// Sent to Umami:
{
  type: "form_submitted",
  id: "user_abc123xyz",
  utm_source: "twitter",
  utm_campaign: "launch",
  formId: "magnet"
}

// Sent to KV:
{
  userId: "user_abc123xyz",
  email: "encrypted",
  formId: "magnet",
  capturedAt: timestamp
}
```

**3. Return Visit:**
```typescript
// User returns (localStorage persists User ID)

// Event sent to Umami:
{
  type: "element_clicked",
  id: "user_abc123xyz", // ✅ Same user
  utm_source: null, // No UTM on return visit
  utm_campaign: null
}
```

---

## **Testing Checklist**

- [ ] User ID generated on first visit
- [ ] User ID persists across sessions (check localStorage)
- [ ] UTM params captured from URL
- [ ] UTM params stored in sessionStorage
- [ ] Events include `userId` in payload
- [ ] Events include `traffic_source` in payload
- [ ] Umami receives `id` field with User ID
- [ ] Umami receives UTM params
- [ ] Storage keys are config-prefixed
- [ ] Works with existing event system

---

## **Migration Path**

**Current:** localStorage/sessionStorage
```typescript
local.get('user_id') // → "validator_user_id"
```

**Future:** Database storage
```typescript
// Change one line in useStorage composable:
const local = {
  get: async (key: string) => {
    // return localStorage.getItem(getKey(key));
    return await db.get(getKey(key)); // ✅ Single change
  }
}
```

---

## **Files to Create/Update**

### **New Files:**
1. `composables/useStorage.ts` - Storage wrapper
2. `composables/useUserIdentity.ts` - User ID management
3. `composables/useTrafficSource.ts` - UTM capture
4. `plugins/1.traffic-capture.client.ts` - Auto-capture

### **Updated Files:**
1. `composables/useEvents.ts` - Auto-inject User ID + UTM
2. `app/utils/analytics.handler.ts` - Send to Umami
3. `shared/types/events.d.ts` - Add userId + traffic_source fields

---

**Total Implementation: ~2-3 hours**

**Ready to proceed?**