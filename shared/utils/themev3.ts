// shared/utils/themev2.ts - CLEAN API EXTRACTION (NO DESCRIPTIONS)
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

export interface TVData {
  sourceCode: string
  variants: Record<string, string[]>
  slots: Array<{ name: string, classes: string }>
  defaults: Record<string, any>
}

export function extractTV(tvInstance: any): TVData {
  // Extract all the data in one pass
  const data: TVData = {
    sourceCode: '',
    variants: {},
    slots: [],
    defaults: {},
  }

  try {
    // 1. Build source code representation
    const lines: string[] = []
    lines.push('export const componentStyles = tv({')

    if (tvInstance.slots) {
      lines.push('  slots: {')
      Object.entries(tvInstance.slots).forEach(([name, classes]) => {
        if (name !== 'base') {
          lines.push(`    ${name}: '${classes}',`)
          // Also populate slots array for API docs
          data.slots.push({ name, classes: classes as string })
        }
      })
      lines.push('  },')
    }

    if (tvInstance.variants) {
      lines.push('  variants: {')
      Object.entries(tvInstance.variants).forEach(([variantName, options]) => {
        lines.push(`    ${variantName}: {`)
        // Populate variants for API docs
        data.variants[variantName] = Object.keys(options as Record<string, any>)

        Object.entries(options as Record<string, any>).forEach(([optionName, value]) => {
          if (typeof value === 'object') {
            lines.push(`      '${optionName}': {`)
            Object.entries(value).forEach(([slotName, classes]) => {
              lines.push(`        ${slotName}: '${classes}',`)
            })
            lines.push('      },')
          } else {
            lines.push(`      '${optionName}': '${value}',`)
          }
        })
        lines.push('    },')
      })
      lines.push('  },')
    }

    if (tvInstance.defaultVariants) {
      lines.push('  defaultVariants: {')
      Object.entries(tvInstance.defaultVariants).forEach(([key, value]) => {
        lines.push(`    ${key}: '${value}',`)
      })
      lines.push('  },')
      data.defaults = { ...tvInstance.defaultVariants }
    }

    lines.push('})')
    data.sourceCode = lines.join('\n')
  } catch (error) {
    console.warn('Could not extract TV data:', error)
    data.sourceCode = '// Error extracting source code'
  }

  return data
}

export type ExtractSlots<T extends { slots?: Record<string, any> }> = T extends { slots: infer S }
  ? { [K in keyof S]?: string }
  : object

export type ExtractVariants<T extends (...args: any) => any> = VariantProps<T>
