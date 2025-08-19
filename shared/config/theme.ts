// shared/config/theme.ts

// **IMPORTANT** - Restart dev server if you make changes to this file
export const THEME = {
  default: {
    spacing: 'md',
    gap: 'md',
    padding: 'md',
    height: 'auto',
  },

  // Base spacing definitions
  spacing: {
    'none': '',
    'xs': 'space-y-2',
    'sm': 'space-y-3',
    'md': 'space-y-6',
    'lg': 'space-y-8',
    'xl': 'space-y-12',
    '2xl': 'space-y-16',
  },

  gap: {
    'none': '',
    'xs': 'gap-2',
    'sm': 'gap-3',
    'md': 'gap-6',
    'lg': 'gap-8',
    'xl': 'gap-12',
    '2xl': 'gap-16',
  },

  padding: {
    'none': '',
    'xs': 'p-2',
    'sm': 'p-3',
    'md': 'p-6',
    'lg': 'p-8',
    'xl': 'p-12',
    '2xl': 'p-16',
  },

  height: {
    'none': '',
    'auto': 'h-auto',
    'xs': 'h-full max-h-[200px]',
    'sm': 'h-full max-h-[300px]',
    'md': 'h-full max-h-[400px]',
    'lg': 'h-full max-h-[500px]',
    'xl': 'h-full max-h-[600px]',
    '2xl': 'h-full max-h-[700px]',
    'screen': 'h-screen',
    'half': 'h-[50vh]',
    'section': 'h-[60vh]',
  },
} as const

export const createVariant = <T extends Record<string, string>>(
  variantName: string,
  values: T,
  slots: string | string[] = 'root',
) => {
  const slotArray = Array.isArray(slots) ? slots : [slots]

  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      Object.fromEntries(
        slotArray.map((slot) => [slot, value]),
      ),
    ]),
  )
}

// ✅ HELPER FUNCTIONS - Map to specific slots
// Refactor existing helpers to use createVariant
export const createSpacingVariants = (slot = 'root') =>
  createVariant('spacing', THEME.spacing, slot)

export const createGapVariants = (slot = 'root') =>
  createVariant('gap', THEME.gap, slot)

export const createPaddingVariants = (slot = 'root') =>
  createVariant('padding', THEME.padding, slot)

export const createHeightVariants = (slot = 'root') =>
  createVariant('height', THEME.height, slot)

// Keep gapVariant for backwards compatibility
export const gapVariant = (slots: string | string[] = 'root') =>
  createVariant('gap', THEME.gap, slots)

// Export for easy component usage
export const SPACING_VARIANTS = {
  spacing: createSpacingVariants('root'),
  gap: createGapVariants('root'),
  padding: createPaddingVariants('root'),
}

// Type helpers
export type SpacingSize = keyof typeof THEME.spacing
