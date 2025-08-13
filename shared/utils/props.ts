// shared/utils/props.ts

import { mergeProps, toValue, computed } from 'vue'
import type { ComputedRef, MaybeRefOrGetter } from 'vue'

/**
 * Simple prop merging using Vue's built-in mergeProps
 * Covers 80% of real-world use cases with minimal complexity
 */

// ✅ OVERLOAD 1: Simple merging (most common)
export function useMergeProps<TBase extends Record<string, any>>(
  baseProps: MaybeRefOrGetter<Partial<TBase>>,
  overrides: MaybeRefOrGetter<Partial<TBase>>
): ComputedRef<TBase>

// ✅ OVERLOAD 2: Factory function (for dynamic per-item props)
export function useMergeProps<TBase extends Record<string, any>, TInput>(
  baseProps: MaybeRefOrGetter<TBase>,
  factory: (input: TInput) => Partial<TBase>
): (input: TInput) => ComputedRef<TBase>

// ✅ IMPLEMENTATION - KISS
export function useMergeProps<TBase extends Record<string, any>, TInput>(
  baseProps: MaybeRefOrGetter<TBase>,
  overridesOrFactory: MaybeRefOrGetter<Partial<TBase>> | ((input: TInput) => Partial<TBase>),
): any {
  // Factory function case
  if (typeof overridesOrFactory === 'function') {
    const factory = overridesOrFactory as (input: TInput) => Partial<TBase>

    return (input: TInput) => computed(() =>
      mergeProps(toValue(baseProps), factory(input)),
    )
  }

  // Simple case
  return computed(() =>
    mergeProps(toValue(baseProps), toValue(overridesOrFactory as MaybeRefOrGetter<Partial<TBase>>)),
  )
}

// =======================================================
// COMPONENT USAGE ANALYSIS - 80% COVERAGE

/**
 * CURRENT COMPONENT NEEDS (from your project):
 *
 * 1. LanguageSwitcher ✅
 *    - Button group props merging
 *    - Dynamic button props per locale
 *    - Select props with current state
 *
 * 2. Layout Components ✅
 *    - Grid/Stack/Split props merging
 *    - Container size variations
 *    - Frame aspect ratio handling
 *
 * 3. Modal/Slideover Components ✅
 *    - Base modal props + state
 *    - Close button configuration
 *    - Content slot props
 *
 * 4. Future Form Components ✅
 *    - Input props per field
 *    - Validation state handling
 *    - Group configuration
 *
 * 5. Navigation Components ✅
 *    - Menu item props per route
 *    - Active state handling
 *    - Badge/icon configuration
 */

// =======================================================
// SIMPLIFIED LANGUAGE SWITCHER IMPLEMENTATION
