// theme/surround.ts
import type { ExtractVariants, ExtractSlots } from '#shared/utils/theme';

export const surroundStyles = {
  slots: {
    root: 'relative inline-block',
    content: '',
    positioned: 'whitespace-nowrap pointer-events-none absolute',
  },
  variants: {
    interactive: {
      true: { positioned: 'pointer-events-auto' },
      false: { positioned: 'pointer-events-none' },
    },
    wrap: {
      true: { positioned: 'whitespace-normal' },
      false: { positioned: 'whitespace-nowrap' },
    },
  },
  defaultVariants: {
    interactive: false,
    wrap: false,
  },
};

export type SurroundVariants = ExtractVariants<typeof surroundStyles.variants>;
export type SurroundSlots = ExtractSlots<typeof surroundStyles.slots>;
