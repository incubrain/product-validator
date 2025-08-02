// theme/shared/spacing.ts - FLEXIBLE SLOT MAPPING
export const THEME = {
  default: {
    spacing: 'md',
    gap: 'md',
    padding: 'md',
  },
  
  // Base spacing definitions
  spacing: {
    'xs': 'space-y-2',
    'sm': 'space-y-3',
    'md': 'space-y-6',
    'lg': 'space-y-8',
    'xl': 'space-y-12',
    '2xl': 'space-y-16',
  },
  
  gap: {
    'xs': 'gap-2',
    'sm': 'gap-3',
    'md': 'gap-6',
    'lg': 'gap-8',
    'xl': 'gap-12',
    '2xl': 'gap-16',
  },
  
  padding: {
    'xs': 'p-2',
    'sm': 'p-3',
    'md': 'p-6',
    'lg': 'p-8',
    'xl': 'p-12',
    '2xl': 'p-16',
  },
} as const

// ✅ HELPER FUNCTIONS - Map to specific slots
export const createSpacingVariants = (slot: 'root' | 'row' = 'root') => ({
  spacing: Object.entries(THEME.spacing).reduce((acc, [key, value]) => {
    acc[key] = { [slot]: value }
    return acc
  }, {} as Record<string, any>),
})

export const createGapVariants = (slot: 'root' | 'row' = 'root') => ({
  gap: Object.entries(THEME.gap).reduce((acc, [key, value]) => {
    acc[key] = { [slot]: value }
    return acc
  }, {} as Record<string, any>),
})

export const createPaddingVariants = (slot: 'root' | 'row' = 'root') => ({
  padding: Object.entries(THEME.padding).reduce((acc, [key, value]) => {
    acc[key] = { [slot]: value }
    return acc
  }, {} as Record<string, any>),
})

// Export for easy component usage
export const SPACING_VARIANTS = {
  ...createSpacingVariants('root'),
  ...createGapVariants('root'), 
  ...createPaddingVariants('root'),
}

// Type helpers
export type SpacingSize = keyof typeof THEME.spacing