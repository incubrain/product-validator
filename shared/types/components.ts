// shared/types/components.ts
import type { BadgeProps } from '@nuxt/ui'
import type { HeadingVariants, HeadingSlots, TextSlots, TextVariants, SectionTitleSlots, SectionTitleVariants, AnchorVariants, AnchorSlots } from '~~/theme/index'

export interface HeadingProps {
  text?: string
  id?: string
  level?: HeadingVariants['level']
  variant?: HeadingVariants['variant']
  anchor?: boolean
  anchorIcon?: boolean
  highlight?: string
  ui?: HeadingSlots
}

export interface TextProps {
  text?: string
  variant?: TextVariants['variant']
  size?: TextVariants['size']
  as?: string
  ui?: TextSlots
}

export interface SectionTitleProps {
  variant?: SectionTitleVariants['variant']
  ui?: SectionTitleSlots
  heading: HeadingProps
  subtitle?: TextProps
  badge?: BadgeProps
}

export interface AnchorProps {
  id: string
  as?: AnchorVariants['element']
  showIcon?: AnchorVariants['showIcon']
  ui?: AnchorSlots
}
