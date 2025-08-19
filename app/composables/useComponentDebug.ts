// composables/useComponentDebug.ts
interface ComponentDebugOutput {
  // Basic data
  componentName: string
  appliedClasses: Record<string, string>
  variants: Record<string, any>
  timestamp: number

  // Enhanced data
  allProps: Record<string, any>
  inheritedAttrs: Record<string, any>
  contextData: {
    parentComponent?: string
    depth: number
    slotUsage: string[]
  }
  responsiveData: {
    currentBreakpoint: string
    responsiveClasses: string[]
  }
  renderTime: number
  rerenderCount: number
  a11yData?: {
    ariaAttributes: Record<string, any>
    hasTabIndex: boolean
    hasRole: boolean
  }
}

function inferComponentName(instance: any): string {
  return instance?.type?.name
    || instance?.type?.__name
    || instance?.type?.__file?.split('/').pop()?.replace('.vue', '')
    || 'Unknown'
}

function hashProps(props: Record<string, any>): string {
  const sortedEntries = Object.entries(props)
    .filter(([_, value]) => value !== undefined && value !== null)
    .sort(([a], [b]) => a.localeCompare(b)) // Consistent ordering

  const propsString = sortedEntries
    .map(([key, value]) => `${key}:${value}`)
    .join('|')

  // Simple hash function (or use crypto.subtle.digest for real hash)
  let hash = 0
  for (let i = 0; i < propsString.length; i++) {
    const char = propsString.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }

  return Math.abs(hash).toString(36) // Base36 for shorter string
}

function extractAppliedClasses(tvResult: any, instance: any): Record<string, string> {
  const classes: Record<string, string> = {}

  if (typeof tvResult === 'object' && tvResult !== null) {
    Object.entries(tvResult).forEach(([slotName, slotFn]) => {
      if (typeof slotFn === 'function') {
        try {
          // Get the base classes from TV
          const baseResult = slotFn()

          // Add inherited classes if this is the root slot and has class prop/attr
          let finalResult = baseResult
          if (slotName === 'root') {
            const inheritedClass = instance.props?.class || instance.attrs?.class
            if (inheritedClass) {
              finalResult = `${baseResult} ${inheritedClass}`.trim()
            }
          }

          classes[slotName] = finalResult
        } catch (error) {
          classes[slotName] = 'Error evaluating'
        }
      }
    })
  }

  return classes
}

function inferVariants(props: any): Record<string, any> {
  const variantKeys = ['variant', 'size', 'color', 'gap', 'spacing', 'padding']
  const variants: Record<string, any> = {}

  if (props) {
    variantKeys.forEach((key) => {
      if (props[key] !== undefined) {
        variants[key] = props[key]
      }
    })
  }

  return variants
}

function analyzeContext(instance: any) {
  // Get used slots
  const slotUsage: string[] = []
  if (instance.slots) {
    Object.keys(instance.slots).forEach((slotName) => {
      if (instance.slots[slotName]) slotUsage.push(slotName)
    })
  }

  // Calculate depth
  let depth = 0
  let parent = instance.parent
  while (parent) {
    depth++
    parent = parent.parent
  }

  return {
    parentComponent: instance.parent?.type?.name || instance.parent?.type?.__name || 'Unknown',
    depth,
    slotUsage,
  }
}

function analyzeResponsive(appliedClasses: Record<string, string>) {
  // Get current breakpoint using window size
  const width = import.meta.client ? window.innerWidth : 1024

  let currentBreakpoint = 'xs'
  if (width >= 1536) currentBreakpoint = '2xl'
  else if (width >= 1280) currentBreakpoint = 'xl'
  else if (width >= 1024) currentBreakpoint = 'lg'
  else if (width >= 768) currentBreakpoint = 'md'
  else if (width >= 640) currentBreakpoint = 'sm'

  // Extract responsive classes
  const responsiveClasses: string[] = []
  Object.values(appliedClasses).forEach((classString) => {
    if (classString && typeof classString === 'string') {
      const classes = classString.split(' ')
      classes.forEach((cls) => {
        if (cls.match(/^(sm|md|lg|xl|2xl):/)) {
          responsiveClasses.push(cls)
        }
      })
    }
  })

  return {
    currentBreakpoint,
    responsiveClasses,
  }
}

function captureA11yData(instance: any): ComponentDebugOutput['a11yData'] {
  const attrs = { ...instance.attrs, ...instance.props }

  const ariaAttributes: Record<string, any> = {}
  Object.entries(attrs).forEach(([key, value]) => {
    if (key.startsWith('aria-') || key === 'role') {
      ariaAttributes[key] = value
    }
  })

  return {
    ariaAttributes,
    hasTabIndex: 'tabindex' in attrs || 'tabIndex' in attrs,
    hasRole: 'role' in attrs,
  }
}

const componentDebugMap = ref<Map<string, ComponentDebugOutput>>(new Map())
const rerenderCounts = ref<Map<string, number>>(new Map())
const showcaseDebugExpanded = ref(false)

export function useComponentDebug() {
  const toggleShowcaseDebug = () => {
    showcaseDebugExpanded.value = !showcaseDebugExpanded.value
  }

  const generateTrackingId = (baseId: string, componentName: string, props: Record<string, any>) => {
    const propHash = hashProps(props)
    return `${baseId}-${componentName}-${propHash}`
  }

  const captureComponentCSS = (baseId: string, tvResult: any, instance: any) => {
    if (!import.meta.dev || !useRuntimeConfig().public.incubrain.debug) {
      console.log('🔴 captureComponentCSS: debug disabled')
      return
    }

    const startTime = performance.now()

    // Basic capture
    const componentName = inferComponentName(instance)
    const appliedClasses = extractAppliedClasses(tvResult, instance)
    const variants = inferVariants(instance.props)
    const fullTrackingId = generateTrackingId(baseId, variants.variant, variants)

    // Enhanced capture
    const allProps = { ...instance.props }
    const inheritedAttrs = { ...instance.attrs }
    const contextData = analyzeContext(instance)
    const responsiveData = analyzeResponsive(appliedClasses)
    const a11yData = captureA11yData(instance)

    // Track rerenders
    const currentCount = rerenderCounts.value.get(fullTrackingId) || 0
    rerenderCounts.value.set(fullTrackingId, currentCount + 1)

    const renderTime = performance.now() - startTime

    const debugOutput: ComponentDebugOutput = {
      componentName,
      appliedClasses,
      variants,
      timestamp: Date.now(),
      allProps,
      inheritedAttrs,
      contextData,
      responsiveData,
      renderTime,
      rerenderCount: rerenderCounts.value.get(fullTrackingId) || 1,
      a11yData,
    }

    componentDebugMap.value.set(fullTrackingId, debugOutput)
  }

  const getComponentCSS = (trackingId: string) => {
    const result = componentDebugMap.value.get(trackingId)
    return result
  }

  const clearDebugData = () => {
    componentDebugMap.value.clear()
    rerenderCounts.value.clear()
  }

  return {
    captureComponentCSS,
    getComponentCSS,
    generateTrackingId,
    clearDebugData,
    showcaseDebugExpanded: readonly(showcaseDebugExpanded),
    toggleShowcaseDebug,
  }
}
