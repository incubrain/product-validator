import { computed } from 'vue';
import { tv } from 'tailwind-variants';

export function useTV<T extends { slots?: Record<string, any> }>(
  tvDefinition: T,
  allProps: Record<string, any>,
) {
  return computed(() => {
    const variantKeys = Object.keys(tvDefinition.variants || {});
    const tvProps = Object.fromEntries(
      variantKeys
        .map((key) => [key, allProps[key]])
        .filter(([_, value]) => value !== undefined),
    );

    return tv(tvDefinition)(tvProps);
  }) as ComputedRef<
    T extends { slots: infer S }
      ? { [K in keyof S]: (slotProps?: Record<string, any>) => string }
      : string
  >;
}
