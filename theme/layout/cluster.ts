import { tv, extractTV } from '../../shared/utils/themev3'
import type { ExtractSlots, ExtractVariants } from '../../shared/utils/themev2'

const clusterStyles = tv({
  slots: {
    root: ['flex'],
  },
  variants: {
    variant: {
      'default': {
        root: 'flex-wrap gap-4 items-center justify-start',
      },
      'centered': {
        root: 'flex-wrap gap-4 items-center justify-center',
      },
      'between': {
        root: 'flex-wrap gap-4 items-center justify-between',
      },
      'end': {
        root: 'flex-wrap gap-4 items-center justify-end',
      },
      'tight': {
        root: 'flex-wrap gap-2 items-center justify-start',
      },
      'loose': {
        root: 'flex-wrap gap-6 items-center justify-start',
      },
      'no-wrap': {
        root: 'gap-4 items-center justify-start flex-nowrap',
      },
      'vertical': {
        root: 'flex-col gap-4 items-start justify-start',
      },
      'inline': {
        root: 'inline-flex gap-2 items-center justify-start',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const clusterData = extractTV(clusterStyles, {
  title: 'Flexible Cluster Layouts',
  description: 'Grouping layouts for navigation items, tags, buttons, and inline elements with smart wrapping',
  category: 'layout',
})
export type ClusterVariants = ExtractVariants<typeof clusterStyles>
export type ClusterSlots = ExtractSlots<typeof clusterStyles>
export default clusterStyles
