// theme/hero.ts - FIXED VERSION
import { createUIComponent } from '../../shared/utils/theme'

export default createUIComponent((config) => ({
  slots: {
    root: [
      'relative',
      config.transitions && 'transition-all duration-300',
    ],
    container: 'w-full',
    content: 'w-full space-y-12',

    // Text content slots
    textSection: 'space-y-6',
    title: 'font-bold text-highlighted leading-tight',
    subtitle: 'text-muted leading-relaxed',
    description: 'text-dimmed leading-relaxed',

    // Media/Data section slots
    mediaSection: 'flex items-center justify-center',
    imageContainer: 'relative overflow-hidden aspect-video w-full mx-auto',

    // CTA section
    ctaSection: 'space-y-4',
    ctaDescription: 'text-sm text-dimmed',
  },
  variants: {
    layout: {
      // Traditional 2-column: text left, media right
      split: {
        root: 'py-16 lg:py-24',
        textSection: 'space-y-6 text-left',
        title: 'text-4xl lg:text-5xl',
        subtitle: 'text-xl',
        description: 'text-lg',
        mediaSection: 'w-full',
      },

      // Center-aligned with media below
      centered: {
        root: 'py-20 lg:py-32',
        content: 'max-w-4xl mx-auto text-center space-y-12',
        textSection: 'space-y-6 text-center',
        title: 'text-5xl lg:text-6xl',
        subtitle: 'text-2xl max-w-3xl mx-auto',
        description: 'text-xl max-w-2xl mx-auto',
        mediaSection: 'w-full',
        ctaSection: 'space-y-4 text-center',
      },

      // Minimal center with CTA focus
      minimal: {
        root: 'py-16 lg:py-20',
        content: 'max-w-3xl mx-auto text-center space-y-8',
        textSection: 'space-y-4 text-center',
        title: 'text-4xl lg:text-5xl',
        subtitle: 'text-lg',
        description: 'text-base',
        ctaSection: 'space-y-3 text-center',
      },

      // Full-width with background image/video
      fullscreen: {
        root: 'min-h-screen flex items-center justify-center py-20',
        content: 'max-w-4xl mx-auto text-center space-y-8',
        textSection: 'space-y-6 text-center',
        title: 'text-6xl lg:text-7xl font-black',
        subtitle: 'text-2xl lg:text-3xl',
        description: 'text-xl',
        ctaSection: 'space-y-4 text-center',
      },

      // Compact for secondary pages
      compact: {
        root: 'py-12 lg:py-16',
        content: 'max-w-3xl mx-auto text-center space-y-6',
        textSection: 'space-y-4 text-center',
        title: 'text-3xl lg:text-4xl',
        subtitle: 'text-lg',
        description: 'text-base',
        ctaSection: 'space-y-3 text-center',
      },
    },

    hasBackground: {
      true: { root: 'relative overflow-hidden' },
      false: { root: 'bg-transparent' },
    },
  },

  defaultVariants: {
    layout: 'centered',
    hasBackground: true,
  },
}))
