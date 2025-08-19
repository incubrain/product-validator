<script setup lang="ts">
import { useIntersectionObserver, useMediaQuery } from '@vueuse/core'
import imageStyles from '#theme/image'

interface Props {
  // Image source
  src: string
  alt: string

  // Display
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'auto'
  objectFit?: 'cover' | 'contain' | 'fill' | 'none'

  // Optimization
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'avif' | 'jpeg' | 'jpg' | 'png' | 'gif'

  // Responsive
  sizes?: string
  densities?: string

  // Behavior
  loading?: 'lazy' | 'eager'
  placeholder?: boolean | string | number | number[]
  preload?: boolean

  // Theme
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  aspectRatio: 'auto',
  objectFit: 'cover',
  loading: 'lazy',
  placeholder: true,
  quality: 80,
  format: 'webp',
})

// Refs
const containerRef = ref<HTMLElement>()
const isLoaded = ref(false)
const hasError = ref(false)
const shouldLoad = ref(false)
const isUsingFallback = ref(false)
const isDev = computed(() => import.meta.dev)
// Media queries
const isMobile = useMediaQuery('(max-width: 768px)', { ssrWidth: 768 })
const isHighDPI = useMediaQuery('(min-resolution: 2dppx)')

// Generate dynamic fallback URL
const fallbackSrc = computed(() => {
  const width = props.width || 800
  const height = props.height || 400
  return `https://picsum.photos/${width}/${height}?random=1`
})

// Current image source (original or fallback)
const currentSrc = computed(() => {
  return isUsingFallback.value ? fallbackSrc.value : props.src
})

// Intersection Observer for lazy loading
const { stop } = useIntersectionObserver(
  containerRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting && props.loading === 'lazy' && !shouldLoad.value) {
      shouldLoad.value = true
      stop()
    }
  },
  {
    threshold: 0.1,
    rootMargin: '50px',
  },
)

// Load immediately if eager
watchEffect(() => {
  if (props.loading === 'eager') {
    shouldLoad.value = true
  }
})

// Responsive sizing optimization
const responsiveProps = computed(() => {
  const baseProps: any = {
    src: currentSrc.value,
    alt: props.alt,
    quality: props.quality,
    format: props.format,
    loading: props.loading,
    placeholder: props.placeholder,
    preload: props.preload,
  }

  // Add dimensions if provided
  if (props.width) baseProps.width = props.width
  if (props.height) baseProps.height = props.height

  // Add responsive props
  if (props.sizes) baseProps.sizes = props.sizes
  if (props.densities) baseProps.densities = props.densities

  // Mobile optimizations
  if (isMobile.value) {
    baseProps.quality = Math.max(60, (props.quality || 80) - 10)
    if (!props.densities && isHighDPI.value) {
      baseProps.densities = 'x1 x2'
    }
  }

  return baseProps
})

// Event handlers
const handleLoad = () => {
  isLoaded.value = true
  hasError.value = false
}

const handleError = (event: string | Event) => {
  if (!isUsingFallback.value) {
    // Try fallback image first
    isUsingFallback.value = true
    isLoaded.value = false
    hasError.value = false

    if (isDev.value) {
      console.warn('🖼️ Image failed, trying fallback:', {
        original: props.src,
        fallback: fallbackSrc.value,
        event,
      })
    }
  } else {
    // Fallback also failed
    isLoaded.value = false
    hasError.value = true

    if (isDev.value) {
      console.error('🚨 Both original and fallback images failed:', {
        original: props.src,
        fallback: fallbackSrc.value,
        event,
      })
    }
  }
}

// Computed styles with loading state
const computedStyles = computed(() => imageStyles({
  ...props,
  loading: !isLoaded.value && shouldLoad.value,
}))
</script>

<template>
  <div
    ref="containerRef"
    :class="[computedStyles.root(), $attrs.class]"
  >
    <!-- Actual Image (NuxtImg) -->
    <NuxtImg
      v-if="shouldLoad"
      v-bind="responsiveProps"
      :class="computedStyles.image()"
      @load="handleLoad"
      @error="handleError"
    />

    <!-- Error State (both original + fallback failed) -->
    <div
      v-if="hasError"
      :class="computedStyles.error()"
    >
      <!-- Development: Detailed error -->
      <template v-if="isDev">
        <UIcon
          name="i-lucide-image-off"
          class="size-8 mb-2 text-red-500"
        />
        <p class="text-sm font-medium text-red-600">
          Image Load Failed
        </p>
        <p class="text-xs mt-1 text-red-500 opacity-75 font-mono">
          Original: {{ src }}
        </p>
        <p class="text-xs text-red-500 opacity-75 font-mono">
          Fallback: {{ fallbackSrc }}
        </p>
      </template>

      <!-- Production: Subtle error -->
      <template v-else>
        <UIcon
          name="i-lucide-image"
          class="size-6 text-muted opacity-50"
        />
      </template>
    </div>

    <!-- Lazy Loading Placeholder -->
    <div
      v-if="!shouldLoad && loading === 'lazy'"
      :class="computedStyles.placeholder()"
    >
      <UIcon
        name="i-lucide-image"
        class="size-8 text-muted"
      />
    </div>
  </div>
</template>
