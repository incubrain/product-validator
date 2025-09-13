// #theme/wrapper/page-columns.ts
import type { ExtractVariants, ExtractSlots } from '#shared/utils/theme'

export const pageColumnsWrapperStyles = {
  slots: {
    root: '',
  },
  variants: {
    preset: {
      // Standard masonry layout (similar to UPageColumns default)
      default: {
        root: 'columns-1 md:columns-2 lg:columns-3 gap-8 space-y-0 [&>*]:break-inside-avoid column-fill-balance [&>*]:mb-8 column-fill-balance',

      },

      // Dense testimonial grid
      testimonials: {
        root: 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 [&>*]:break-inside-avoid column-fill-balance [&>*]:will-change-transform',
      },

      // Feature showcase - wider spacing
      features: {
        root: 'columns-1 lg:columns-2 xl:columns-3 gap-12 space-y-12 [&>*]:break-inside-avoid column-fill-balance [&>*]:will-change-transform',
      },

      // Blog/article layout
      articles: {
        root: 'columns-1 md:columns-2 gap-8 space-y-8 [&>*]:break-inside-avoid column-fill-balance [&>*]:will-change-transform',
      },

      // Portfolio/gallery grid
      portfolio: {
        root: 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 [&>*]:break-inside-avoid column-fill-balance [&>*]:will-change-transform',
      },

      // Single column for mobile-first
      stacked: {
        root: 'columns-1 xl:columns-2 gap-16 space-y-16 [&>*]:break-inside-avoid column-fill-balance [&>*]:will-change-transform',
      },

      // Minimal spacing
      compact: {
        root: 'columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4 [&>*]:break-inside-avoid column-fill-balance [&>*]:will-change-transform',
      },

      // Wide cards layout
      showcase: {
        root: 'columns-1 lg:columns-2 gap-10 space-y-10 [&>*]:break-inside-avoid column-fill-balance [&>*]:will-change-transform',
      },
    },

    // Additional size variants that can combine with presets
    spacing: {
      tight: { root: 'gap-4 space-y-4' },
      normal: { root: 'gap-8 space-y-8' },
      loose: { root: 'gap-12 space-y-12' },
      relaxed: { root: 'gap-16 space-y-16' },
    },
  },

  defaultVariants: {
    preset: 'default',
    spacing: 'normal',
  },
}

export type PageColumnsWrapperVariants = ExtractVariants<typeof pageColumnsWrapperStyles.variants>
export type PageColumnsWrapperSlots = ExtractSlots<typeof pageColumnsWrapperStyles.slots>

export default pageColumnsWrapperStyles
