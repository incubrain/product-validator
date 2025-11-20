# Magnet Flow Documentation

## Overview
The magnet flow is a sequential, guided course that enforces step-by-step progression. Users must complete each step in order before accessing the next one.

## User Journey

### 1. Welcome Page (`/magnet`)
**Purpose:** Introduce the framework and get user commitment to start

**Elements:**
- Framework introduction content
- Embedded video
- **"Start Your Journey" button** (marks welcome page complete, navigates to first stage)

**Behavior:**
- User reads the content
- Clicks "Start Your Journey"
- `/magnet` is marked as complete in `localStorage`
- Navigates to `/magnet/identity` (first stage overview)

---

### 2. Stage Overview Page (`/magnet/[stage]`)
**Purpose:** Introduce the stage and list its steps

**Elements:**
- Stage title and description
- List of steps in this stage (informational, NOT clickable)
- **"Continue Journey" button** (marks stage overview complete, navigates to first step)

**Behavior:**
- User reads stage introduction
- Reviews the list of steps they'll complete
- Clicks "Continue Journey"
- Stage overview is marked as complete
- Navigates to first step in the stage (e.g., `/magnet/identity/brain`)

**Important:** Step items are displayed as a simple list for progress tracking. They are NOT clickable.

---

### 3. Step Page (`/magnet/[stage]/[step]`)
**Purpose:** Complete a specific learning step with actionable tasks

**Elements:**
- Step content (markdown)
- "Definition of Done" checklist (optional)
- **"Mark Complete & Continue" button** (appears after checklist is complete)

**Behavior:**
- User reads step content
- Completes all checklist items (if present)
- "Mark Complete & Continue" button appears
- Clicks button → confetti animation plays
- Step is marked as complete
- Navigates to next step (or next stage if this was the last step)

---

## Navigation & Access Control

### Sequential Locking (Navigation Guard)
**File:** `app/middleware/magnet-guard.global.ts`

**Rules:**
1. First step (`/magnet`) is always accessible
2. Each subsequent step is locked until the previous step is completed
3. Users attempting to access locked steps are redirected to their latest unlocked step

**Why This Exists:**
- Prevents users from skipping ahead
- Ensures they build knowledge incrementally
- Maintains course integrity

### Direct URL Navigation
**Behavior:** Blocked by navigation guard

**Example:**
- User tries to navigate to `/magnet/identity/brain` directly
- Guard checks if all previous steps are complete
- If not, redirects to latest unlocked step (e.g., `/magnet/identity`)

**This is intentional** - not a bug!

---

## Progress Tracking

### Storage
**Location:** `localStorage`

**Keys:**
- `${configSource}-magnet-progress` - Set of completed step paths
- `${configSource}-magnet-milestones` - Set of milestone toasts shown

### Composable
**File:** `app/composables/useMagnetProgress.ts`

**Key Functions:**
- `markComplete(path)` - Marks a step as complete
- `isComplete(path)` - Checks if step is complete
- `isAccessible(path)` - Checks if step can be accessed
- `getLatestUnlockedStep()` - Returns furthest accessible step

---

## Button Types & Their Purposes

### "Start Your Journey"
- **Location:** Welcome page (`/magnet`)
- **Component:** `IMagnetCompleteButton`
- **Action:** Marks `/magnet` complete → navigates to `/magnet/identity`

### "Continue Journey"
- **Location:** Stage overview pages (`/magnet/[stage]`)
- **Component:** `IMagnetCompleteButton`
- **Action:** Marks stage overview complete → navigates to first step in stage
- **Uses:** `nextStepPath` (first incomplete step within current stage)

### "Mark Complete & Continue"
- **Location:** Individual step pages (`/magnet/[stage]/[step]`)
- **Component:** `IMagnetCompleteButton`
- **Action:** Marks current step complete → navigates to next step
- **Validation:** Only appears after required tasks (checklist) are complete

---

## Common Questions

### Why can't I click on step cards on the overview page?
Step cards are informational only. They show you what steps exist in the stage, but you must use the "Continue Journey" button to proceed sequentially.

### Why do I get redirected when trying to access a step directly?
The navigation guard enforces sequential progression. You must complete steps in order.

### What's the difference between stage overview and individual steps?
- **Stage overview** (`/magnet/identity`) - Introduces the stage, lists steps
- **Individual step** (`/magnet/identity/brain`) - Contains actual learning content and tasks

### How do I know which step I'm on?
Check `localStorage` for `validator-magnet-progress` (assuming `configSource=validator`), or look at the navigation - completed steps are marked with checkmarks.

---

## File Structure

```
/magnet                           # Welcome page
/magnet/identity                  # Stage 1: Identity overview
/magnet/identity/brain            # Step 1.1
/magnet/identity/suffering        # Step 1.2
/magnet/identity/time             # Step 1.3
/magnet/identity/tomorrow         # Step 1.4
/magnet/identity/today            # Step 1.5
/magnet/attention                 # Stage 2: Attention overview
/magnet/attention/scars           # Step 2.1
... (and so on)
```

---

## Testing Checklist

When auditing the magnet flow:
- [ ] Start from `/magnet` (clear `localStorage` first for fresh state)
- [ ] Verify "Start Your Journey" button appears and works
- [ ] Navigate to stage overview, verify steps list is displayed
- [ ] Verify "Continue Journey" button works
- [ ] Complete checklist on first step
- [ ] Verify "Mark Complete & Continue" appears and works
- [ ] Verify confetti animation plays
- [ ] Verify navigation to next step works
- [ ] Check console for `[MagnetProgress]` logs
- [ ] Test navigation guard blocks direct access to locked steps
