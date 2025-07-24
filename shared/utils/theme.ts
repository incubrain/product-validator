// shared/utils/theme.ts
import { tv } from 'tailwind-variants'
import type {VariantProps} from 'tailwind-variants';

export interface UIThemeConfig {
  transitions: boolean
  colors: string[]
  defaultVariants: {
    color: string
    size: string
  }
}

export const UI_THEME_CONFIG: UIThemeConfig = {
  transitions: true,
  colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
  defaultVariants: { color: 'primary', size: 'md' }
}

// shared/utils/theme.ts
export function withUIOverrides(baseStyles: any, ui?: any, additionalClass?: string) {
  if (!ui && !additionalClass) return baseStyles
  
  const enhanced = { ...baseStyles }
  Object.keys(baseStyles).forEach(slot => {
    enhanced[slot] = () => [
      baseStyles[slot](),
      ui?.[slot],
      slot === 'root' ? additionalClass : undefined
    ].filter(Boolean).join(' ')
  })
  
  return enhanced
}

// Process conditional classes at resolution time
function processSlots(slots: Record<string, any>, config: UIThemeConfig): Record<string, string> {
  const processed: Record<string, string> = {}
  
  console.log('🐛 processSlots input:', slots)
  
  for (const [key, value] of Object.entries(slots)) {
    if (Array.isArray(value)) {
      processed[key] = value.filter(Boolean).join(' ')
    } else if (typeof value === 'string') {
      processed[key] = value
    }
    console.log(`🐛 processSlots ${key}:`, value, '→', processed[key])
  }
  
  console.log('🐛 processSlots output:', processed)
  return processed
}

// shared/utils/theme.ts
export function createUIComponent<T extends Record<string, any>>(
  themeDefinition: (config: UIThemeConfig) => T
) {
  const rawTheme = themeDefinition(UI_THEME_CONFIG)
  
  if (rawTheme && typeof rawTheme === 'object' && 'slots' in rawTheme) {
    rawTheme.slots = processSlots(rawTheme.slots, UI_THEME_CONFIG)
  }
  
  const tvInstance = tv(rawTheme)
  
  type SlotKeys = keyof T['slots']
  type StylesFunction = () => string
  type StylesObject = Record<SlotKeys, StylesFunction>
  
  return function(
    // Handle both patterns:
    variantsOrProps?: VariantProps<typeof tvInstance> | (VariantProps<typeof tvInstance> & { ui?: Partial<Record<SlotKeys, string>>, class?: string }),
    explicitProps?: { ui?: Partial<Record<SlotKeys, string>>, class?: string }
  ): StylesObject {
    
    // Destructure variants and UI props
    const variants: VariantProps<typeof tvInstance> = {}
    let uiProps: { ui?: Partial<Record<SlotKeys, string>>, class?: string } = {}
    
    if (variantsOrProps) {
      // Extract known variant keys from the TV instance
      const variantKeys = new Set([
        ...Object.keys(rawTheme.variants || {}),
        ...Object.keys(rawTheme.defaultVariants || {})
      ])
      
      // Separate variants from UI props
      Object.entries(variantsOrProps).forEach(([key, value]) => {
        if (variantKeys.has(key)) {
          variants[key] = value
        } else if (key === 'ui' || key === 'class') {
          uiProps[key] = value
        }
      })
    }
    
    // Merge with explicit props if provided
    if (explicitProps) {
      uiProps = { ...uiProps, ...explicitProps }
    }
    
    const baseStylesRaw = tvInstance(variants)
    const baseStyles: StylesObject = Object.keys(baseStylesRaw).reduce((acc, key) => {
      const val = baseStylesRaw[key]
      acc[key as SlotKeys] = typeof val === 'function' ? val : () => val
      return acc
    }, {} as StylesObject)
    
    if (!uiProps.ui && !uiProps.class) return baseStyles
    
    const enhanced = withUIOverrides(baseStyles, uiProps.ui, uiProps.class)
    return enhanced as StylesObject
  }
}