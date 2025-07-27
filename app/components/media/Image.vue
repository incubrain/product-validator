<!-- app/components/media/Image.vue -->
<script setup lang="ts">
import { useIntersectionObserver, useMediaQuery } from '@vueuse/core'
import imageStyles from '~~/theme/image'

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

// Media queries
const isMobile = useMediaQuery('(max-width: 768px)', { ssrWidth: 768 })
const isHighDPI = useMediaQuery('(min-resolution: 2dppx)')

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
    src: props.src,
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
    // Reduce quality slightly on mobile to save bandwidth
    baseProps.quality = Math.max(60, (props.quality || 80) - 10)

    // Add mobile-optimized densities if not specified
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
  isLoaded.value = false
  hasError.value = true
  console.warn('Failed to load image:', props.src, event)
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

    <!-- Error State -->
    <div
      v-if="hasError"
      :class="computedStyles.error()"
    >
      <UIcon
        name="i-lucide-image-off"
        class="size-8 mb-2"
      />
      <p class="text-sm font-medium">
        Failed to load image
      </p>
      <p class="text-xs mt-1 opacity-75">
        {{ src }}
      </p>
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
