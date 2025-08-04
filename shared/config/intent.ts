// shared/config/intent.ts
// https://tailwindcss.com/docs/colors
export interface IntentConfig {
  primary: 'trust' | 'authority' | 'urgency'
  secondary: 'trust' | 'authority' | 'urgency'
  warning: 'trust' | 'authority' | 'urgency'
  colorMap: Record<string, string>
}

export const defaultIntentConfig: IntentConfig = {
  primary: 'authority', // Uses 'primary' color slot
  secondary: 'trust', // Uses 'secondary' color slot
  warning: 'urgency',

  // Intent -> Tailwind color mapping
  colorMap: {
    trust: 'emerald',
    authority: 'sky',
    urgency: 'amber',
  },
}

// Helper to get colors based on intent
export const getIntentColors = (config: IntentConfig) => ({
  primary: config.colorMap[config.primary],
  secondary: config.colorMap[config.secondary],
})
