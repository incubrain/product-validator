// shared/utils/themev2.ts - SIMPLER PRETTIFY
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

export type ExtractSlots<T extends { slots?: Record<string, any> }> = T extends { slots: infer S }
  ? { [K in keyof S]?: string }
  : object

export type ExtractVariants<T extends (...args: any) => any> = VariantProps<T>
