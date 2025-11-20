# Magnet Flow Audit Log

## REQUIRED READING

**Before starting any audit, read these documents:**
- [`/context/magnet/flow.md`](../../context/magnet/flow.md) - User journey and intended behavior
- [`/context/magnet/architecture.md`](../../context/magnet/architecture.md) - Component hierarchy and data flow

## INSTRUCTIONS

### Pre-Audit Setup
1. ✅ Confirm `npm run dev` is running
2. ✅ Check `.env` has `NUXT_PUBLIC_CONFIG_SOURCE=validator`
3. ✅ Clear browser `localStorage` for fresh state testing
4. ✅ Check for existing Chrome instance on port 9222 and terminate if needed
5. ✅ Open browser console to monitor `[MagnetProgress]` logs

### Testing Flow
1. Navigate to `localhost:3000/magnet` in browser window (visible, not headless)
2. Enter `test@domain.com` if prompted
3. Follow the natural user flow:
   - Welcome page → Click "Start Your Journey"
   - Stage overview → Click "Continue Journey"  
   - Individual step → Complete checklist → Click "Mark Complete & Continue"
4. Log any friction, bugs, or UX issues as you encounter them
5. Note console errors or warnings
6. Test navigation guard (try direct URL to locked step)

### What to Log
- **Issues:** Broken functionality, incorrect navigation, errors
- **Friction Points:** Confusing UX, unclear CTAs, unexpected behavior
- **Console Errors:** JavaScript errors, failed requests, warnings

### Critical Behaviors (NOT Bugs)

**These are intentional - do not report as bugs:**
- Step cards on overview pages are NOT clickable (informational only)
- Direct navigation to locked steps gets redirected (navigation guard working)
- "Continue Journey" button marks current page complete before navigating
- Checklist must be completed before "Mark Complete & Continue" appears
- Navigation is sequential - steps unlock one at a time

### Common Gotchas
- Route paths have trailing slashes (`/magnet/`) - must normalize before comparison
- `nextStepPath` (stage-local) vs `latestUnlockedStep` (global) serve different purposes
- Button visibility depends on `isValid || isCompleted` check
- Step validation defaults to `true` unless checklist component sets it

### Key Components & Files

**Pages:**
- `/app/pages/magnet/index.vue` - Welcome page
- `/app/pages/magnet/[stage]/index.vue` - Stage overview
- `/app/pages/magnet/[stage]/[step].vue` - Individual steps (dynamic)

**Components:**
- `/app/components/MagnetPage.vue` - Layout wrapper (has `<slot />`)
- `/app/components/magnet/CompleteButton.vue` - Smart progression button

**Logic:**
- `/app/composables/useMagnetProgress.ts` - State management
- `/app/middleware/magnet-guard.global.ts` - Access control

**Content:**
- `/examples/validator/content/magnet/` - All course content (when `configSource=validator`)

### Data-Testid Attributes (For Browser Testing)

Use these for easier element selection:
- `data-testid="dashboard-content-area"` - Main scrollable content panel
- `data-testid="magnet-progress-button"` - **THE** progress button (appears on all pages with different labels)
  - Welcome page: "Start Your Journey"
  - Stage overview: "Continue Journey"
  - Individual steps: "Mark Complete & Continue"
- `data-testid="steps-list"` - Step list container on stage overview pages
- `data-testid="step-item-${i}"` - Individual step items in the list

**Note:** There is only ONE progress button per page. It's a single component (`IMagnetCompleteButton`) that handles all progression logic. Always use `data-testid="magnet-progress-button"` to find and click it.

### Expected Console Logs

You should see these logs during normal flow:
```
[MagnetProgress] Initialized steps: [array of paths]
[MagnetProgress] isStepValid check: {path, result, ...}
[MagnetProgress] Marking complete: {path, ...}
[MagnetIndex] nextPath calculation: {currentIndex, ...}
[MagnetPage] latestUnlockedStep: {result, ...}
```

If these aren't appearing, there's an initialization issue.

---

## Latest Audit Cycle

**Date:** 2025-11-20  
**Status:** ✅ Flow working correctly

### What Was Tested
- ✅ Welcome page → Stage overview → First step
- ✅ Checklist completion and validation
- ✅ Button visibility and navigation
- ✅ Progress tracking and localStorage
- ✅ Navigation guard blocking locked steps
- ✅ Path normalization handling

### Known Working Features
- Sequential unlocking system
- Progress persistence in localStorage
- Confetti animations on completion
- "Continue Journey" button marking pages complete
- Step list display (non-clickable, informational)

### Areas Not Yet Tested
- [ ] Completing all steps in a stage
- [ ] Transitioning between stages
- [ ] Edge cases (last step, completing entire course)
- [ ] Multiple browser sessions / localStorage sync
- [ ] Back button behavior
- [ ] Direct URL access patterns

---

## Active Issues

*None currently - flow working as intended*

---

## Future Improvements to Consider

1. **UI/UX:**
   - Consider adding tooltips to locked steps explaining why they're locked
   - Progress indicator could show percentage completion
   - Back button might need explicit handling

2. **Code Quality:**
   - Extract `normalizePath` to shared utility
   - Add TypeScript types for navigation menu items (fix template errors)
   - Consider adding inline comments to complex computed properties

3. **Testing:**
   - Add E2E tests for critical flows
   - Test with different viewport sizes
   - Test accessibility (keyboard navigation, screen readers)

---

## Notes for Next Audit

- Start fresh with cleared localStorage
- Test a FULL stage completion (all steps → next stage)
- Verify milestone toasts appear at 50%, 75%, 100%
- Check console for any memory leaks or excessive re-renders
- Test error states (404s, network errors, etc.)
