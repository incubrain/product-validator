// shared/types/components.ts
import type { BadgeProps, ButtonProps, ButtonGroupProps, SelectProps } from '@nuxt/ui'
import type { HeadingVariants, HeadingSlots, TextSlots, TextVariants, SectionTitleSlots, SectionTitleVariants, AnchorVariants, AnchorSlots, GridVariants, GridSlots, GridRowVariants, GridRowSlots, SplitVariants, SplitSlots, CenterVariants, CenterSlots, SectionVariants, SectionSlots, StackVariants, StackSlots, FloatSlots, FloatVariants, TransformVariants, TransformSlots, LanguageSwitcherVariants,
  LanguageSwitcherSlots } from '~~/theme/index'

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

export interface GridProps {
  variant?: GridVariants['variant']
  gap?: GridVariants['gap']
  as?: string
  ui?: GridSlots
}

export interface GridRowProps {
  rows: number[] // [2, 3] = 2 items first row, 3 items second row
  spacing?: GridRowVariants['spacing']
  gap?: GridRowVariants['gap']
  alignRows?: GridRowVariants['alignRows']
  responsive?: boolean
  as?: string
  ui?: GridRowSlots
}

export interface SplitProps {
  trackingId?: string
  ratio?: SplitVariants['ratio']
  gap?: SplitVariants['gap']
  responsiveReverse?: boolean
  as?: string
  ui?: SplitSlots
}

export interface StackProps {
  trackingId?: string 
  variant?: StackVariants['variant']
  gap?: StackVariants['gap']
  as?: string
  ui?: StackSlots
}

// shared/types/components.ts - ADD CenterProps
export interface CenterProps {
  variant?: CenterVariants['variant']
  padding?: CenterVariants['padding']
  as?: string
  ui?: CenterSlots
}

export interface SectionProps {
  variant?: SectionVariants['variant']
  height?: SectionVariants['height'] // ✅ ADDED
  background?: 'none' | 'circuit' | 'neural' | 'quantum' | 'cyber'
  as?: string
  ui?: SectionSlots
}

export interface FloatProps {
  variant?: FloatVariants['variant']
  clear?: FloatVariants['clear']
  spacing?: FloatVariants['spacing']
  responsive?: FloatVariants['responsive']
  as?: string
  ui?: FloatSlots
}

export interface TransformProps {
  variant?: TransformVariants['variant']
  timing?: TransformVariants['timing']
  origin?: TransformVariants['origin']
  as?: string
  ui?: TransformSlots
}

export interface LanguageSwitcherProps {
  variant?: LanguageSwitcherVariants['variant']
  size?: LanguageSwitcherVariants['size']
  showFlags?: boolean
  smart?: boolean
  preserveRoute?: boolean
  trackAnalytics?: boolean
  ubutton?: ButtonProps
  ubuttonGroup?: ButtonGroupProps
  uselect?: SelectProps
  ui?: LanguageSwitcherSlots
}
