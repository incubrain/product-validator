// types/index.ts - SIMPLIFIED
export type SupportedLocale = string // ✅ Keep generic

// ✅ MINIMAL interfaces for components only
export interface ILanguageSwitcherProps {
  variant?: 'buttons' | 'dropdown' | 'minimal'
  preserveRoute?: boolean
}

export interface IContentRendererProps {
  collection: string
  autoSEO?: boolean
}
