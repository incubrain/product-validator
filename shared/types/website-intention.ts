// types/emotions.ts - EMOTIONAL TRIGGER SYSTEM
export type PrimaryEmotionalTrigger = 'trust' | 'authority' | 'urgency'

// Future expansion - commented for later implementation
export type SecondaryEmotionalTrigger = 'curiosity' // Discovery-driven buyers
  | 'aspiration' // Transformation-seekers
  | 'social' // Community-driven buyers
  | 'fear' // Risk-mitigation focused

export type EmotionalTrigger = PrimaryEmotionalTrigger
// TODO: Add SecondaryEmotionalTrigger when expanding system

export type WebsiteGoal = 'convert' | 'credibility' | 'awareness' | 'engage'

// Future: AI agent metadata structure will be added here
// for programmatic emotional profiling and buying pattern optimization

export interface IntentConfig {
  background: 'none' | 'minimal' | 'circuit' | 'cyber' | 'neural' | 'quantum'
  sectionVariant: 'compact' | 'default' | 'generous' | 'hero'
  emphasis: 'social-proof' | 'expertise' | 'action'
  colorScheme: 'default' | 'success' | 'primary' | 'amber'
}

export interface WebsiteIntentConfig {
  primaryIntent: EmotionalTrigger
  secondaryIntent: EmotionalTrigger
  primaryGoal: WebsiteGoal
  secondaryGoal: WebsiteGoal
}
