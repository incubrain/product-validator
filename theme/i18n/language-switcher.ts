// theme/i18n/language-switcher.ts - FOLLOWS YOUR THEME PATTERN
import { tv } from '../../shared/utils/themev2'
import type { ExtractSlots, ExtractVariants } from '../../shared/utils/themev2'

export const languageSwitcherStyles = tv({
  slots: {
    root: [
      'inline-flex items-center transition-opacity duration-200',
      // ✅ Data attribute approach for switching state
      '[&[data-switching="true"]]:opacity-50',
      '[&[data-switching="true"]]:pointer-events-none',
    ],
    group: 'flex',
  },
  variants: {
    variant: {
      buttons: {
        root: '',
      },
      dropdown: {
        root: 'relative',
      },
      minimal: {
        root: '',
      },
      custom: {
        root: '',
      },
    },
    size: {
      xs: {
        group: 'gap-0.5',
      },
      sm: {
        group: 'gap-1',
      },
      md: {
        group: 'gap-1',
      },
      lg: {
        group: 'gap-2',
      },
      xl: {
        group: 'gap-2',
      },
    },
  },
  defaultVariants: {
    variant: 'buttons',
    size: 'md',
  },
})

export type LanguageSwitcherVariants = ExtractVariants<typeof languageSwitcherStyles>
export type LanguageSwitcherSlots = ExtractSlots<typeof languageSwitcherStyles>
export default languageSwitcherStyles
