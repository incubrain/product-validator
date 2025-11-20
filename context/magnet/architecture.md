# Magnet Architecture

## Component Hierarchy

```
┌─────────────────────────────────────────────────────┐
│ Navigation Middleware                                │
│ magnet-guard.global.ts                              │
│ - Checks step accessibility                         │
│ - Redirects to latest unlocked step if locked       │
└─────────────────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────┐
│ Page Routes                                          │
├─────────────────────────────────────────────────────┤
│ /magnet/index.vue                                   │
│ - Welcome page layout                                │
│ - Renders: IMagnetPage + custom slot content        │
│                                                      │
│ /magnet/[stage]/index.vue                           │
│ - Stage overview layout                              │
│ - Fetches steps for this stage                      │
│ - Passes steps prop to IMagnetPage                  │
│                                                      │
│ /magnet/[stage]/[step].vue                          │
│ - Individual step page (uses dynamic routing)       │
│ - Renders: IMagnetPage + surround navigation        │
└─────────────────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────┐
│ Shared Components                                    │
├─────────────────────────────────────────────────────┤
│ IMagnetPage.vue                                     │
│ - Layout wrapper for all magnet pages               │
│ - Displays: title, media, content, steps list       │
│ - Provides: default slot for custom content         │
│                                                      │
│ IMagnetCompleteButton.vue                           │
│ - Smart button for progression                      │
│ - Marks current page complete (localStorage)        │
│ - Plays confetti animation                          │
│ - Navigates to next path                            │
│ - Shows only when step is valid/complete            │
└─────────────────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────┐
│ State Management (Composable)                        │
│ useMagnetProgress.ts                                │
│ - Shared state for progress tracking                │
│ - Functions: markComplete, isComplete, isAccessible │
│ - Stores: completedSteps, stepValidation            │
└─────────────────────────────────────────────────────┘
```

---

## Data Flow

### 1. Initialization

```typescript
// On page load, navigation data fetched from Nuxt Content
const { data: navigation } = await useAsyncData('magnet-nav', 
  () => queryCollectionNavigation('magnet')
);

// useMagnetProgress composable initializes
initialize(navigation)
  → Flattens navigation tree into flatSteps array
  → flatSteps = ['/magnet', '/magnet/identity', '/magnet/identity/brain', ...]
```

### 2. Progress Tracking

```typescript
// When user completes a step:
IMagnetCompleteButton.handleComplete()
  → markComplete(currentPath)  // Adds path to localStorage Set
  → triggerConfetti()           // Visual feedback
  → navigateTo(nextPath)        // Vue Router navigation

// On navigation:
magnet-guard middleware runs
  → isAccessible(targetPath)
      → Checks if targetPath index <= maxCompletedIndex + 1
      → If not, redirects to getLatestUnlockedStep()
```

### 3. Button Visibility

```typescript
// IMagnetCompleteButton renders only when:
v-if="isValid || isCompleted"

// isValid comes from:
- Default: true (no validation required)
- With checklist: updates when all items checked
  → DefinitionOfDone component calls setStepValidity(path, allDone)
```

---

## Key Computed Properties

### In Page Components

#### `nextPath` (magnet/index.vue)
```typescript
// Finds next step after current in flatSteps array
const nextPath = computed(() => {
  const normalizedRoutePath = normalizePath(route.path);
  const currentIndex = flatSteps.value.indexOf(normalizedRoutePath);
  if (currentIndex === -1 || currentIndex === flatSteps.value.length - 1) {
    return undefined;
  }
  return flatSteps.value[currentIndex + 1];
});
```
**Use case:** Welcome page needs to know next step is `/magnet/identity`

#### `nextStepPath` (MagnetPage.vue)
```typescript
// Finds first incomplete step within current stage (from props.steps)
const nextStepPath = computed(() => {
  if (!props.steps) return null;
  for (const step of props.steps) {
    if (!isComplete(step.path)) {
      return step.path;
    }
  }
  return null;
});
```
**Use case:** Stage overview needs first step within that stage

### In useMagnetProgress Composable

#### `latestUnlockedStep`
```typescript
// Returns furthest accessible step globally
const getLatestUnlockedStep = () => {
  if (flatSteps.value.length === 0) return null;
  
  let maxCompletedIndex = -1;
  for (const step of completedSteps.value) {
    const stepIndex = flatSteps.value.indexOf(step);
    if (stepIndex > maxCompletedIndex) {
      maxCompletedIndex = stepIndex;
    }
  }
  
  const nextIndex = maxCompletedIndex + 1;
  return nextIndex >= flatSteps.value.length 
    ? flatSteps.value[flatSteps.value.length - 1]
    : flatSteps.value[nextIndex];
}
```
**Use case:** Navigation guard uses this for redirects

---

## Props & Slots

### IMagnetPage Component

**Props:**
```typescript
interface Props {
  page: any;              // Content page data (title, description, body, media)
  backButton?: {          // Optional back navigation
    to: string;
    label: string;
  };
  surround?: any[];       // Previous/next step links for step pages
  steps?: any[];          // List of steps for stage overview pages
}
```

**Slots:**
```vue
<!-- Default slot for custom content -->
<slot />
```

**Usage Examples:**

```vue
<!-- Welcome page: uses slot for custom button -->
<IMagnetPage :page="page">
  <div class="mt-8 flex justify-end">
    <IMagnetCompleteButton 
      :current-path="route.path"
      :next-path="nextPath"
      label="Start Your Journey"
    />
  </div>
</IMagnetPage>

<!-- Stage overview: passes steps prop -->
<IMagnetPage
  :page="page"
  :steps="steps"
  :back-button="{ to: '/magnet', label: 'Back to Dashboard' }"
/>

<!-- Step page: passes surround for prev/next navigation -->
<IMagnetPage
  :page="page"
  :surround="surround"
/>
```

---

### IMagnetCompleteButton Component

**Props:**
```typescript
interface Props {
  currentPath: string;    // Path to mark complete
  nextPath?: string;      // Where to navigate after completion
  label?: string;         // Button text (default: "Mark Complete & Continue")
  totalSteps?: number;    // For milestone toasts
}
```

**Behavior:**
- Only renders when `isValid || isCompleted`
- `isValid` defaults to `true`, can be set to `false` by validation components
- When clicked: marks complete → confetti → waits 800ms → navigates

---

## State Shape

### completedSteps (localStorage)
```typescript
// Key: `${configSource}-magnet-progress`
// Value: Set<string>
Set([
  '/magnet',
  '/magnet/identity',
  '/magnet/identity/brain',
  '/magnet/identity/suffering'
])
```

### stepValidation (useState)
```typescript
// Key: 'magnet-step-validation'
// Value: Record<string, boolean>
{
  '/magnet/identity/brain': true,      // All checklist items completed
  '/magnet/identity/suffering': false, // Checklist not complete yet
}
```

### flatSteps (ref)
```typescript
// Flattened array of all paths in navigation order
[
  '/magnet',
  '/magnet/identity',
  '/magnet/identity/brain',
  '/magnet/identity/suffering',
  '/magnet/identity/time',
  '/magnet/identity/tomorrow',
  '/magnet/identity/today',
  '/magnet/attention',
  '/magnet/attention/scars',
  // ... etc
]
```

---

## File Locations

```
app/
├── components/
│   ├── MagnetPage.vue              # Layout wrapper
│   └── magnet/
│       └── CompleteButton.vue       # Progress button
├── composables/
│   └── useMagnetProgress.ts         # State management
├── middleware/
│   └── magnet-guard.global.ts       # Access control
└── pages/
    └── magnet/
        ├── index.vue                # Welcome page
        └── [stage]/
            ├── index.vue            # Stage overview
            └── [step].vue           # Individual step

content/ (or examples/validator/content/)
└── magnet/
    ├── 0.index.md                   # Welcome content
    └── 1.identity/
        ├── .navigation.yml          # Stage metadata
        ├── 0.index.md              # Stage overview content
        ├── 1.brain.md              # Step content
        ├── 2.suffering.md
        └── ...
```

---

## Common Patterns

### Adding a New Step
1. Create `.md` file in appropriate stage directory (e.g., `7.new-step.md`)
2. Numeric prefix determines order
3. File name (without prefix) becomes URL slug
4. Add checklist using `::definition-of-done` component if needed
5. Navigation automatically includes it in `flatSteps`

### Adding a New Stage
1. Create new directory: `content/magnet/N.stage-name/`
2. Add `.navigation.yml` with title, icon, status
3. Create `0.index.md` for stage overview
4. Add individual step files
5. Create corresponding page template if custom layout needed

### Debugging Navigation Issues
1. Check browser console for `[MagnetProgress]` logs
2. Inspect `localStorage` for `validator-magnet-progress`
3. Verify `flatSteps` array in console: `useMagnetProgress().flatSteps.value`
4. Check navigation guard isn't redirecting: add log to `magnet-guard.global.ts`
5. Ensure path normalization (no trailing slashes in comparisons)

---

## When to Use Each Pattern

### Use `nextPath` (page-level computed)
- When you need the next step in the global sequence
- Welcome page → first stage
- Last step of stage → first step of next stage

### Use `nextStepPath` (component-level computed)
- When you need first incomplete step within a list
- Stage overview → first step in that stage
- Scoped to `props.steps` array

### Use `latestUnlockedStep` (composable function)
- When you need furthest accessible step globally
- Navigation guard redirects
- "Continue from where you left off" functionality

### Use `IMagnetCompleteButton`
- Any button that needs to mark progress AND navigate
- Handles completion, validation, confetti, navigation
- Replaces manual `UButton` + `markComplete` calls

### Use `<slot />` in IMagnetPage
- When page needs custom content beyond standard layout
- Welcome page (custom button placement)
- Special layouts or interactive elements
