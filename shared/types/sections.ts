// types/sections.ts
import type { EmotionalTrigger, WebsiteGoal } from './website-intention'

interface MediaConfig {
  type: 'image' | 'video' | 'none'
  src?: string
  alt?: string
  poster?: string
}

interface ActionConfig {
  text: string
  link: string
  description?: string
}

export interface BaseSection {
  type: string
  title: string
  subtitle?: string
  description?: string

  // EMOTIONAL TRIGGER SYSTEM
  variant?: EmotionalTrigger // How visitor should feel
  goal?: WebsiteGoal // What we want them to do

  // UNIFIED CONFIGS
  action?: ActionConfig
  media?: MediaConfig
  items?: any[]
  // INTERNAL USAGE
  sectionIndex: number
}

// Individual sections with consistent naming
export interface HeroSection extends BaseSection {
  type: 'hero'
  variant?: EmotionalTrigger
}

export interface ResultsSection extends BaseSection {
  type: 'results'
  variant?: EmotionalTrigger
}

export interface WorkSection extends BaseSection {
  type: 'work'
  variant?: EmotionalTrigger
}

export interface AboutSection extends BaseSection {
  type: 'about'
  story: string
  image?: string
  variant?: EmotionalTrigger
}

export interface CtaSection extends BaseSection {
  type: 'cta'
  variant?: EmotionalTrigger
}

export interface FaqSection extends BaseSection {
  type: 'faq'
  categories: string[]
  variant?: EmotionalTrigger
}

export type Section = HeroSection
  | ResultsSection
  | WorkSection
  | AboutSection
  | CtaSection
  | FaqSection

export interface PageMeta {
  title: string
  description: string
  keywords?: string[]
}

export interface PageContent {
  meta: PageMeta
  sections: Section[]
}

export type SectionMap = {
  hero?: Omit<HeroSection, 'type'>
  results?: Omit<ResultsSection, 'type'>
  work?: Omit<WorkSection, 'type'>
  about?: Omit<AboutSection, 'type'>
  cta?: Omit<CtaSection, 'type'>
  faq?: Omit<FaqSection, 'type'>
}
