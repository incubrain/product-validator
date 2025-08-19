import { tv, extractTV } from '#shared/utils/theme'
import type { ExtractSlots, ExtractVariants } from '#shared/utils/theme'

export const prosePreStyles = tv({
  slots: {
    root: 'rounded-lg border border-muted overflow-hidden',
    header: 'flex items-center justify-between px-4 py-2 bg-elevated border-b border-muted',
    controls: 'flex space-x-1.5',
    controlDot: 'w-3 h-3 rounded-full',
    metadata: 'flex items-center space-x-2',
    filename: 'text-sm font-mono text-toned',
    languageBadge: '',
    copyButton: 'inline-flex items-center justify-center w-8 h-8 rounded-md border border-muted bg-elevated hover:bg-accented transition-all duration-200',
    content: 'relative overflow-x-auto px-4 py-3',
    code: 'font-mono text-sm leading-relaxed m-0 p-0',
  },
  variants: {
    variant: {
      default: {
        root: 'my-6',
        copyButton: 'text-toned hover:text-highlighted',
      },
      compact: {
        root: 'my-3',
        header: 'px-3 py-1.5',
        content: 'px-3 py-2',
        code: 'text-sm',
        filename: 'text-xs',
      },
    },
    theme: {
      mac: {
        controlDot: 'bg-red-500 first:bg-red-500 nth-2:bg-yellow-500 last:bg-green-500',
      },
      minimal: {
        controls: 'hidden',
      },
    },
    copied: {
      true: {
        copyButton: 'text-primary border-primary',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    theme: 'mac',
    copied: false,
  },
})

export const prosePreData = extractTV(prosePreStyles)
export type ProsePreVariants = ExtractVariants<typeof prosePreStyles>
export type ProsePreSlots = ExtractSlots<typeof prosePreStyles>
export default prosePreStyles
