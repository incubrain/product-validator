// theme/layout/frame.ts
import { createUIComponent } from '../../shared/utils/theme'

export default createUIComponent((config) => ({
  slots: {
    root: ['relative overflow-hidden'],
  },
  variants: {
    variant: {
      video: {
        root: 'aspect-video',
      },
      square: {
        root: 'aspect-square',
      },
      portrait: {
        root: 'aspect-[3/4]',
      },
      wide: {
        root: 'aspect-[21/9]',
      },
      golden: {
        root: 'aspect-[1.618/1]',
      },
      tall: {
        root: 'aspect-[9/16]',
      },
      cinema: {
        root: 'aspect-[2.35/1]',
      },
      card: {
        root: 'aspect-[4/3]',
      },
    },
  },
  defaultVariants: {
    variant: 'video',
  },
}))
