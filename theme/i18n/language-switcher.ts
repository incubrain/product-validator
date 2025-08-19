// theme/i18n/language-switcher.ts - MIGRATED TO THEMEV3
import { tv, extractTV } from '#shared/utils/theme'
import type { ExtractSlots, ExtractVariants } from '#shared/utils/theme'

export const languageSwitcherStyles = tv({
  slots: {
    root: [
      'inline-flex items-center transition-opacity duration-200',
      '[&[data-switching="true"]]:opacity-50',
      '[&[data-switching="true"]]:pointer-events-none',
    ],
    group: 'flex',
  },
  variants: {
    variant: {
      buttons: { root: '' },
      dropdown: { root: 'relative' },
      minimal: { root: '' },
      custom: { root: '' },
    },
    size: {
      xs: { group: 'gap-0.5' },
      sm: { group: 'gap-1' },
      md: { group: 'gap-1' },
      lg: { group: 'gap-2' },
      xl: { group: 'gap-2' },
    },
  },
  defaultVariants: {
    variant: 'buttons',
    size: 'md',
  },
})

export const languageSwitcherData = extractTV(languageSwitcherStyles)
export type LanguageSwitcherVariants = ExtractVariants<typeof languageSwitcherStyles>
export type LanguageSwitcherSlots = ExtractSlots<typeof languageSwitcherStyles>
export default languageSwitcherStyles
