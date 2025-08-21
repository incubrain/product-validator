// theme/layout/scroll-box.ts - FIXED VERSION
import { tv, extractTV } from '#shared/utils/theme'
import type { ExtractSlots, ExtractVariants } from '#shared/utils/theme'

const scrollBoxStyles = tv({
  slots: {
    root: ['relative'],
    content: ['flex', 'flex-nowrap'],
  },
  variants: {
    direction: {
      both: {
        root: 'overflow-auto',
        content: 'flex-wrap',
      },
      x: {
        root: 'overflow-x-auto overflow-y-hidden',
      },
      y: {
        root: 'overflow-y-auto overflow-x-hidden',
        content: 'flex-col',
      },
    },
    height: {
      auto: { root: 'h-auto' },
      sm: { root: 'h-[300px]' },
      md: { root: 'h-[400px]' },
      lg: { root: 'h-[500px]' },
      xl: { root: 'h-[600px]' },
    },
    snap: {
      'none': { root: '' },
      'x-proximity': { root: 'snap-x snap-proximity' },
      'x-mandatory': { root: 'snap-x snap-mandatory' },
      'y-proximity': { root: 'snap-y snap-proximity' },
      'y-mandatory': { root: 'snap-y snap-mandatory' },
    },
    padding: {
      none: {
        root: 'p-0',
        content: 'pr-0',
      },
      xs: {
        root: 'px-2',
        content: 'pr-2',
      },
      sm: {
        root: 'px-4',
        content: 'pr-4',
      },
      md: {
        root: 'px-6',
        content: 'pr-6',
      },
      lg: {
        root: 'px-8',
        content: 'after:content-[""] after:w-8 after:flex-shrink-0',
      },
    },
    gap: {
      none: { content: 'gap-0' },
      xs: { content: 'gap-2' },
      sm: { content: 'gap-3' },
      md: { content: 'gap-6' },
      lg: { content: 'gap-8' },
    },
  },
  defaultVariants: {
    direction: 'both',
    height: 'md',
    snap: 'none',
    padding: 'md',
    gap: 'md',
  },
})

export const scrollBoxData = extractTV(scrollBoxStyles, {
  title: 'Scroll Container Utilities',
  description: 'Scroll containers with overflow control, snap behavior, and smooth scrolling',
  category: 'layout',
})

export type ScrollBoxVariants = ExtractVariants<typeof scrollBoxStyles>
export type ScrollBoxSlots = ExtractSlots<typeof scrollBoxStyles>
export default scrollBoxStyles
