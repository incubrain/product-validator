// theme/video.ts - MIGRATED TO THEMEV3

export const videoStyles = {
  slots: {
    root: [
      'relative overflow-hidden bg-black',
      'transition-all duration-300',
    ],
    video: 'w-full h-full object-cover',
    overlay: 'absolute inset-0 flex items-center justify-center',
    controls: [
      'absolute inset-0 flex items-center justify-center',
      'bg-black/20 hover:bg-black/40 cursor-pointer',
      'transition-colors duration-200',
    ],
    loadingState: 'flex items-center justify-center text-white',
    errorState: 'flex flex-col items-center justify-center text-center p-6 text-white',
  },
  variants: {
    aspectRatio: {
      square: { root: 'aspect-square' },
      video: { root: 'aspect-video' },
      portrait: { root: 'aspect-[3/4]' },
      wide: { root: 'aspect-[21/9]' },
      auto: { root: 'aspect-auto' },
    },
    loading: {
      true: { root: 'animate-pulse' },
      false: { root: '' },
    },
    error: {
      true: { root: 'bg-red-900/50' },
      false: { root: '' },
    },
  },
  defaultVariants: {
    aspectRatio: 'video',
    loading: false,
    error: false,
  },
}

export type VideoVariants = ExtractVariants<typeof videoStyles.variants>
export type VideoSlots = ExtractSlots<typeof videoStyles.slots>
export default videoStyles
