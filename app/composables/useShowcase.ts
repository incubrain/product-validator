// composables/useShowcase.ts - BACK TO SIMPLE
interface ShowcaseConfig {
  componentName: string
  title: string
  description: string
  variants: any[]
  presets?: any[]
  useCases?: any[]
  guidelines?: any
  componentData?: any
  cleanName?: string // Cleaned component name without prefix
  variantDescriptions?: Record<string, string>

}

interface ShowcaseData {
  title?: string
  subtitle?: string
  description?: string
  config?: ShowcaseConfig
  debugEnabled?: boolean
  showDebugVariants?: boolean
}

const showcaseData = ref<ShowcaseData>({})

const stripComponentPrefix = (componentName: string): string => {
  // Find the second uppercase letter to strip prefix
  const match = componentName.match(/^[A-Z][a-z]*([A-Z])/)
  if (match) {
    const secondUpperIndex = componentName.indexOf(match[1])
    return componentName.slice(secondUpperIndex)
  }
  return componentName
}

export const useShowcase = () => {
  const setShowcaseData = (data: ShowcaseData) => {
    showcaseData.value = data
  }

  const clearShowcaseData = () => {
    showcaseData.value = {}
  }

  const toggleDebugVariants = () => {
    showcaseData.value.showDebugVariants = !showcaseData.value.showDebugVariants
  }

  const getVariantDescription = (variantName: string) => {
    const descriptions = {
      variant: 'Component variant',
      size: 'Component size',
      color: 'Component color',
      clear: 'Clear floating elements',
      responsive: 'Responsive behavior',
      spacing: 'Spacing control',
      align: 'Alignment options',
      position: 'Position settings',
    }
    return descriptions[variantName] || `${variantName.charAt(0).toUpperCase() + variantName.slice(1)} options`
  }

  const generateVariantsFromTV = (tvData: any, descriptions?: Record<string, string>) => {
    return Object.entries(tvData.variants || {}).map(([name, options]) => {
      // ✅ FIXED - Get the actual variant option keys, not the variant name
      const variantOptions = options as Record<string, any>
      const optionKeys = Object.keys(variantOptions)
      const defaultValue = tvData.defaultVariants?.[name] || optionKeys[0]

      // ✅ DETECT TYPE FROM DEFAULT VALUE OR OPTIONS
      const type = typeof defaultValue === 'boolean' ? 'boolean' : 'select'

      return {
        name,
        type,
        ...(type === 'select' && { options: optionKeys }),
        default: defaultValue,
        description: descriptions?.[name] || getVariantDescription(name),
      }
    })
  }

  const createShowcaseConfig = (
    componentImport: any,
    tvData: any,
    overrides: Partial<ShowcaseConfig> = {},
  ): ShowcaseConfig => {
    const rawComponentName = componentImport.__name || componentImport.name || 'Component'
    const cleanComponentName = stripComponentPrefix(rawComponentName)

    if (!tvData.coreData?.title || !tvData.coreData?.description) {
      throw new Error(`Missing required core data for ${rawComponentName}. Add title and description to extractTV().`)
    }

    return {
      title: tvData.coreData.title,
      description: tvData.coreData.description,
      componentName: rawComponentName,
      cleanName: cleanComponentName,
      componentData: tvData,
      variants: generateVariantsFromTV(tvData, overrides.variantDescriptions),
      // ✅ MANUAL OVERRIDES
      ...overrides,
    }
  }

  const generateShowcaseData = (config: ShowcaseConfig) => ({
    title: config.title,
    subtitle: `${config.cleanName} utilities with variants and responsive behavior`,
    config,
  })

  // Reactive getters
  const title = computed(() => showcaseData.value.title)
  const subtitle = computed(() => showcaseData.value.subtitle)
  const description = computed(() => showcaseData.value.description)
  const config = computed(() => showcaseData.value.config)
  const debugEnabled = computed(() => showcaseData.value.debugEnabled ?? true)
  const showDebugVariants = computed(() => showcaseData.value.showDebugVariants ?? false)

  return {
    setShowcaseData,
    clearShowcaseData,
    toggleDebugVariants,
    // Reactive getters
    title,
    subtitle,
    description,
    config,
    debugEnabled,
    showDebugVariants,
    showcaseData: readonly(showcaseData),
    generateVariantsFromTV,
    getVariantDescription,
    createShowcaseConfig,
    generateShowcaseData,
  }
}

export type { ShowcaseConfig, ShowcaseData }
