// theme/image.ts
import { createUIComponent } from '../shared/utils/theme'

export default createUIComponent((config) => ({
  slots: {
    root: [
      'relative overflow-hidden',
      config.transitions && 'transition-all duration-300',
    ],
    image: 'w-full h-full object-cover',
    placeholder: 'absolute inset-0 flex items-center justify-center bg-muted',
    error: 'absolute inset-0 flex flex-col items-center justify-center bg-red-50 text-red-600',
  },
  variants: {
    aspectRatio: {
      square: { root: 'aspect-square' },
      video: { root: 'aspect-video' },
      portrait: { root: 'aspect-[3/4]' },
      wide: { root: 'aspect-[21/9]' },
      auto: { root: 'aspect-auto' },
    },
    objectFit: {
      cover: { image: 'object-cover' },
      contain: { image: 'object-contain' },
      fill: { image: 'object-fill' },
      none: { image: 'object-none' },
    },
    loading: {
      true: { root: 'animate-pulse bg-muted' },
      false: { root: '' },
    },
  },
  defaultVariants: {
    aspectRatio: 'auto',
    objectFit: 'cover',
    loading: false,
  },
}))
