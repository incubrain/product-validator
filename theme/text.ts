// theme/text.ts - MIGRATED TO THEMEV3
import { tv, extractTV } from '#shared/utils/theme'
import type { ExtractSlots, ExtractVariants } from '#shared/utils/theme'

const textStyles = tv({
  slots: {
    root: [
      'leading-relaxed',
      'transition-colors duration-200',
    ],
  },
  variants: {
    variant: {
      'default': { root: 'text-toned' },
      'subtitle': { root: 'text-muted text-lg' },
      'hero-subtitle': { root: 'text-muted text-xl lg:text-2xl font-medium' },
      'description': { root: 'text-dimmed' },
      'caption': { root: 'text-dimmed text-sm' },
      'small': { root: 'text-dimmed text-sm' },
      'muted': { root: 'text-muted' },
      'highlighted': { root: 'text-highlighted font-medium' },
      'justified': {
        root: 'text-foreground text-justify hyphens-auto',
      },
    },
    size: {
      'xs': { root: 'text-xs' },
      'sm': { root: 'text-sm' },
      'base': { root: 'text-base' },
      'lg': { root: 'text-lg' },
      'xl': { root: 'text-xl' },
      '2xl': { root: 'text-2xl' },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'base',
  },
} as const)

export const textData = extractTV(textStyles)
export type TextVariants = ExtractVariants<typeof textStyles>
export type TextSlots = ExtractSlots<typeof textStyles>
export default textStyles
