// shared/utils/theme.ts - CLEAN API EXTRACTION (NO DESCRIPTIONS)
import type { TV, VariantProps } from 'tailwind-variants'
import { tv as tvBase } from 'tailwind-variants'

const twMergeConfig = {
  theme: {
    spacing: ['section', 'container', 'stack'],
    borderRadius: ['card', 'button', 'input'],
  },
  classGroups: {
    'font-size': [{ text: ['hero', 'subtitle', 'caption'] }],
    'text-color': [{ text: ['highlighted', 'muted', 'accent'] }],
  },
}

// 🔥 CLEAN TV API DATA INTERFACE
export interface TVAPIData {
  variants: Record<string, string[]>
  slots: Array<{
    name: string
    classes: string
  }>
  defaults: Record<string, any>
}

// 🔥 TV WRAPPER (UNCHANGED)
export const tv: TV = (options: any, config?: any) => tvBase(options, {
  ...config,
  twMerge: config?.twMerge ?? true,
  twMergeConfig: {
    ...config?.twMergeConfig,
    theme: {
      ...config?.twMergeConfig?.theme,
      ...twMergeConfig.theme,
    },
    classGroups: {
      ...config?.twMergeConfig?.classGroups,
      ...twMergeConfig.classGroups,
    },
  },
})

type CoreData = {
  title?: string
  description?: string
  category?: string
  propMappings?: Record<string, string[]>

}

export interface TVData {
  slots: Record<string, any>
  variants: Record<string, any>
  defaultVariants: Record<string, any>
  compoundVariants: Array<{ [key: string]: any }>
  compoundSlots: Array<{ [key: string]: any }>
  variantKeys: Array<string>
  coreData: CoreData
}

export function extractTV(tvInstance: any, coreData?: CoreData): TVData {
  return {
    slots: tvInstance.slots || {},
    variants: tvInstance.variants || {},
    defaultVariants: tvInstance.defaultVariants || {},
    compoundVariants: tvInstance.compoundVariants || [],
    compoundSlots: tvInstance.compoundSlots || [],
    variantKeys: tvInstance.variantKeys || [],

    // ✅ EXPLICIT CORE DATA STORED WITH COMPONENT
    coreData: coreData || {},
  }
}

export type ExtractSlots<T extends { slots?: Record<string, any> }> = T extends { slots: infer S }
  ? { [K in keyof S]?: string }
  : object

export type ExtractVariants<T extends (...args: any) => any> = VariantProps<T>
