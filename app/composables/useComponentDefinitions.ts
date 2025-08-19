// composables/useComponentDefinitions.ts
import stackStyles from '#theme/layout/stack'

export interface ComponentDefinition {
  name: string
  themeStyles?: any
  defaultProps?: Record<string, any>
  manualProps?: APIProp[]
  manualSlots?: APISlot[]
  manualEmits?: APIEmit[]
}

export interface APIProp {
  name: string
  type: string
  default?: string
  description?: string
  required?: boolean
  options?: string[]
}

export interface APISlot {
  name: string
  type: string
  description?: string
}

export interface APIEmit {
  name: string
  type: string
  description?: string
}

export function useComponentDefinitions() {
  // 🔥 LAYOUT STACK DEFINITION
  const layoutStackDefinition: ComponentDefinition = {
    name: 'ILayoutStack',
    themeStyles: stackStyles,
    defaultProps: {
      variant: 'default',
      gap: 'md',
      as: 'div',
    },
  }

  // 🔥 LAYOUT GRID DEFINITION (example for future)
  const layoutGridDefinition: ComponentDefinition = {
    name: 'ILayoutGrid',
    // Would import gridStyles here
    defaultProps: {
      variant: 'auto',
      gap: 'md',
      as: 'div',
    },
  }

  // 🔥 LAYOUT SPLIT DEFINITION (example for future)
  const layoutSplitDefinition: ComponentDefinition = {
    name: 'ILayoutSplit',
    // Would import splitStyles here
    defaultProps: {
      variant: 'default',
      gap: 'md',
      as: 'div',
    },
  }

  return {
    layoutStack: layoutStackDefinition,
    layoutGrid: layoutGridDefinition,
    layoutSplit: layoutSplitDefinition,
  }
}
