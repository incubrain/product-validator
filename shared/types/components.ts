// shared/types/components.ts
import type { BadgeProps, ButtonProps, ButtonGroupProps, SelectProps } from '@nuxt/ui'
import type { HeadingVariants, HeadingSlots, TextSlots, TextVariants, TitleSlots, TitleVariants, AnchorVariants, AnchorSlots, GridVariants, GridSlots, SplitVariants, SplitSlots, SectionVariants, SectionSlots, StackVariants, StackSlots, FloatSlots, FloatVariants, TransformVariants, TransformSlots, LanguageSwitcherVariants,
  LanguageSwitcherSlots, FrameVariants, FrameSlots, BackgroundVariants, BackgroundSlots, ClusterSlots, ClusterVariants, DividerVariants, DividerSlots, ScrollBoxSlots, ScrollBoxVariants, ColumnsVariants, ColumnsSlots, ImageVariants, ImageSlots, VideoVariants, VideoSlots, AccordionVariants, AccordionSlots, ContainerVariants, ContainerSlots } from '#theme/index'

interface BaseProps {
  trackingId?: string
}

export interface HeadingProps extends BaseProps {
  text?: string
  id?: string
  level?: HeadingVariants['level']
  variant?: HeadingVariants['variant']
  anchor?: boolean
  anchorIcon?: boolean
  highlight?: string
  ui?: HeadingSlots
}

export interface TextProps extends BaseProps {
  text?: string
  variant?: TextVariants['variant']
  size?: TextVariants['size']
  as?: string
  ui?: TextSlots
}

export interface TitleProps extends BaseProps {
  variant?: TitleVariants['variant']
  ui?: TitleSlots
  heading: HeadingProps
  subtitle?: TextProps
  badge?: BadgeProps
}

export interface AnchorProps extends BaseProps {
  id: string
  as?: AnchorVariants['element']
  showIcon?: AnchorVariants['showIcon']
  ui?: AnchorSlots
}

export interface GridProps extends BaseProps {
  variant?: GridVariants['variant']
  flow?: GridVariants['flow']
  gap?: GridVariants['gap']
  align?: GridVariants['align']
  as?: string
  ui?: GridSlots
}

export interface SplitProps extends BaseProps {
  ratio?: SplitVariants['ratio']
  gap?: SplitVariants['gap']
  responsiveReverse?: boolean
  as?: string
  ui?: SplitSlots
}

export interface StackProps extends BaseProps {
  variant?: StackVariants['variant']
  gap?: StackVariants['gap']
  as?: string
  ui?: StackSlots
}

export interface SectionProps extends BaseProps {
  variant?: SectionVariants['variant']
  height?: SectionVariants['height'] // ✅ ADDED
  background?: 'none' | 'circuit' | 'neural' | 'quantum' | 'cyber'
  as?: string
  ui?: SectionSlots
}

export interface FloatProps extends BaseProps {
  variant?: FloatVariants['variant']
  clear?: FloatVariants['clear']
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

export interface LanguageSwitcherProps extends BaseProps {
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

export interface FrameProps extends BaseProps {
  variant?: FrameVariants['variant']
  as?: string
  ui?: FrameSlots
}

export interface ClusterProps extends BaseProps {
  variant?: ClusterVariants['variant']
  as?: string
  ui?: ClusterSlots
}

export interface BackgroundProps extends BaseProps {
  preset?: BackgroundVariants['preset']
  pattern?: BackgroundVariants['pattern']
  intensity?: BackgroundVariants['intensity']
  gradient?: BackgroundVariants['gradient']
  motion?: BackgroundVariants['motion']
  as?: string
  ui?: BackgroundSlots
}

export interface DividerProps extends BaseProps {
  variant?: DividerVariants['variant']
  spacing?: DividerVariants['spacing']
  orientation?: DividerVariants['orientation']
  ui?: DividerSlots
}

export interface ScrollBoxProps extends BaseProps {
  variant?: ScrollBoxVariants['variant']
  behavior?: ScrollBoxVariants['behavior']
  overscroll?: ScrollBoxVariants['overscroll']
  height?: ScrollBoxVariants['height']
  as?: string
  ui?: ScrollBoxSlots
}

export interface ColumnsProps extends BaseProps {
  variant?: ColumnsVariants['variant']
  gap?: ColumnsVariants['gap']
  spacing?: ColumnsVariants['spacing']
  as?: string
  ui?: ColumnsSlots
}

export interface ImageProps extends BaseProps {
  src?: string
  alt?: string
  aspectRatio?: ImageVariants['aspectRatio']
  objectFit?: ImageVariants['objectFit']
  loading?: ImageVariants['loading']
  placeholder?: string
  errorMessage?: string
  as?: string
  ui?: ImageSlots
}

export interface VideoProps extends BaseProps {
  src?: string
  poster?: string
  aspectRatio?: VideoVariants['aspectRatio']
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  loading?: VideoVariants['loading']
  error?: VideoVariants['error']
  as?: string
  ui?: VideoSlots
}

export interface AccordionProps extends BaseProps {
  intent?: AccordionVariants['intent']
  variant?: AccordionVariants['variant']
  items?: Array<{
    label: string
    content: string
    icon?: string
  }>
  as?: string
  ui?: AccordionSlots
}

export interface ContainerProps extends BaseProps {
  variant?: ContainerVariants['variant']
  as?: string
  ui?: ContainerSlots
}
