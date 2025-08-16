import { computed } from 'vue'
import type { ComputedRef } from 'vue'

/**
 * Flattens a type to make it more readable in IntelliSense.
 */
type Prettify<T> = { [K in keyof T]: T[K] } & {}

/**
 * Converts a union type (e.g., A | B) into an intersection type (e.g., A & B).
 */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

/**
 * Extracts the props type from a function union.
 * e.g., GetFunctionProps<((props: A) => any) | ((props: B) => any)> will result in A | B
 */
type GetFunctionProps<T> = T extends (props?: infer P) => any ? P : never

/**
 * Takes a union of variant functions and returns a single, clean function signature
 * with all props merged.
 */
type FlattenSlot<T> = T extends (...args: any[]) => string
  ? (
      props?: Prettify<UnionToIntersection<GetFunctionProps<T>> & { class?: any }>
    ) => string
  : T

/**
 * Applies the flattening logic to all slots in a tailwind-variants object.
 */
type FlattenVariants<T> = Prettify<{
  [K in keyof T]: FlattenSlot<T[K]>
}>

/**
 * A reactive wrapper for `tv` that returns a flattened and developer-friendly
 * type for IntelliSense.
 */
export function tvComputed<T>(fn: () => T, trackingId?: string): ComputedRef<FlattenVariants<T>> {
  return computed(() => {
    const result = fn()

    if (import.meta.dev && useRuntimeConfig().public.incubrain.debug && trackingId) {
      const { captureComponentCSS } = useComponentDebug()
      const instance = getCurrentInstance()
      captureComponentCSS(trackingId, result, instance)
    }

    return result as FlattenVariants<T>
  })
}
