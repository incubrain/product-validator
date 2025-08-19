import { tv, extractTV } from '#shared/utils/theme'
import type { ExtractSlots, ExtractVariants } from '#shared/utils/theme'

const frameStyles = tv({
  slots: {
    root: ['relative', 'overflow-hidden'],
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
})

export const frameData = extractTV(frameStyles, {
  title: 'Aspect Ratio Frames',
  description: 'Responsive aspect ratio containers for media, images, and content frames',
  category: 'layout',
})
export type FrameVariants = ExtractVariants<typeof frameStyles>
export type FrameSlots = ExtractSlots<typeof frameStyles>
export default frameStyles
