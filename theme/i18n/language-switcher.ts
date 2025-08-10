// theme/i18n/language-switcher.ts - FOLLOWS YOUR THEME PATTERN
import { tv } from '../../shared/utils/themev2'
import type { ExtractSlots, ExtractVariants } from '../../shared/utils/themev2'

export const languageSwitcherStyles = tv({
  slots: {
    root: [
      'inline-flex items-center',
      '[&[data-switching="true"]]:opacity-50 [&[data-switching="true"]]:pointer-events-none',
    ],
    buttonGroup: 'flex gap-1',
    minimalGroup: 'flex gap-0.5',
  },
  variants: {
    variant: {
      buttons: {
        root: 'gap-1',
      },
      dropdown: {
        root: 'relative',
      },
      minimal: {
        root: 'gap-0.5',
        minimalGroup: 'flex gap-0.5',
      },
    },
    size: {
      xs: {
        buttonGroup: 'gap-0.5',
        minimalGroup: 'gap-0.5',
      },
      sm: {
        buttonGroup: 'gap-1',
        minimalGroup: 'gap-0.5',
      },
      md: {
        buttonGroup: 'gap-1',
        minimalGroup: 'gap-1',
      },
      lg: {
        buttonGroup: 'gap-2',
        minimalGroup: 'gap-1',
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
