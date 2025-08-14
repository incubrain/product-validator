<!-- app/components/media/Video.vue -->
<script setup lang="ts">
import { useIntersectionObserver, useMediaQuery, useMediaControls } from '@vueuse/core'
import mediaStyles from '~~/theme/video'

interface Props {
  // Video source (from public directory)
  src: string
  poster?: string

  // Display
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'auto'

  // Behavior
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean

  // Loading
  loading?: 'lazy' | 'eager'

  // Theme
  ui?: any
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  aspectRatio: 'video',
  autoplay: false,
  muted: true,
  loop: false,
  controls: false, // We'll handle custom controls
  loading: 'lazy',
})

const styles = computed(() => mediaStyles(props))

// Refs
const containerRef = ref<HTMLElement>()
const videoRef = ref<HTMLVideoElement>()

// State
const isLoading = ref(true)
const hasError = ref(false)
const shouldLoad = ref(false)
const showControls = ref(false)

// Media queries for responsive behavior
const isMobile = useMediaQuery('(max-width: 768px)', { ssrWidth: 768 })
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

// VueUse Media Controls
const {
  playing,
  currentTime,
  duration,
  waiting,
  muted,
  volume,
  ended,
} = useMediaControls(videoRef, {
  src: computed(() => shouldLoad.value ? props.src : ''),
})

// Intersection Observer for lazy loading
const { stop } = useIntersectionObserver(
  containerRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting && props.loading === 'lazy' && !shouldLoad.value) {
      shouldLoad.value = true
      stop() // Stop observing once loaded
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

// Auto-hide controls on mobile after interaction
let controlsTimeout: ReturnType<typeof setTimeout>
const handleInteraction = () => {
  if (isMobile.value) {
    showControls.value = true
    clearTimeout(controlsTimeout)
    controlsTimeout = setTimeout(() => {
      showControls.value = false
    }, 3000)
  }
}

// Video event handlers
const handleLoadedData = () => {
  isLoading.value = false
  hasError.value = false
}

const handleError = () => {
  isLoading.value = false
  hasError.value = true
}

// Play/pause toggle
const togglePlay = () => {
  playing.value = !playing.value
  handleInteraction()
}

// Responsive autoplay behavior
const shouldAutoplay = computed(() => {
  return props.autoplay
    && !isMobile.value
    && !prefersReducedMotion.value
    && props.muted
})

// Set initial muted state
watchEffect(() => {
  if (videoRef.value && props.muted !== undefined) {
    muted.value = props.muted
  }
})

// Auto-play when video is ready (respecting user preferences)
watch([videoRef, shouldAutoplay], () => {
  if (videoRef.value && shouldAutoplay.value && !playing.value) {
    playing.value = true
  }
})

// Computed styles with state
const computedStyles = computed(() => mediaStyles({
  ...props,
  loading: isLoading.value,
  error: hasError.value,
}))

// Format time for display
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Progress percentage
const progressPercent = computed(() => {
  if (!duration.value) return 0
  return (currentTime.value / duration.value) * 100
})
</script>

<template>
  <div
    ref="containerRef"
    :class="computedStyles.root()"
    @click="togglePlay"
    @touchstart="handleInteraction"
  >
    <!-- Video Element -->
    <video
      v-if="shouldLoad"
      ref="videoRef"
      :class="computedStyles.video()"
      :poster="poster"
      :muted="muted"
      :loop="loop"
      :controls="controls && !isMobile"
      preload="metadata"
      playsinline
      @loadeddata="handleLoadedData"
      @error="handleError"
    >
      <source
        :src="src"
        type="video/mp4"
      >
      <p>Your browser doesn't support video playback.</p>
    </video>

    <!-- Custom Controls Overlay (Mobile) -->
    <div
      v-if="!controls && !hasError && shouldLoad"
      :class="computedStyles.controls()"
      class="opacity-0 hover:opacity-100"
      :style="{
        opacity: isMobile && showControls ? 1 : undefined,
      }"
    >
      <!-- Play/Pause Button -->
      <div class="flex flex-col items-center gap-2">
        <UIcon
          :name="playing ? 'i-lucide-pause' : 'i-lucide-play'"
          class="size-12 text-white drop-shadow-lg"
        />

        <!-- Progress Bar (Mobile only) -->
        <div
          v-if="isMobile && duration > 0"
          class="w-32 h-1 bg-white/30 rounded-full overflow-hidden"
        >
          <div
            class="h-full bg-white transition-all duration-200"
            :style="{ width: `${progressPercent}%` }"
          />
        </div>

        <!-- Time Display (Mobile only) -->
        <div
          v-if="isMobile && duration > 0"
          class="text-xs text-white/80 font-mono"
        >
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="isLoading && shouldLoad"
      :class="computedStyles.overlay()"
    >
      <div :class="computedStyles.loadingState()">
        <UIcon
          name="i-lucide-loader"
          class="size-8 animate-spin"
        />
      </div>
    </div>

    <!-- Error State -->
    <div
      v-if="hasError"
      :class="computedStyles.overlay()"
    >
      <div :class="computedStyles.errorState()">
        <UIcon
          name="i-lucide-video-off"
          class="size-12 mb-2"
        />
        <p class="text-sm mb-3">
          Failed to load video
        </p>
        <p class="text-xs opacity-75">
          {{ src }}
        </p>
      </div>
    </div>

    <!-- Lazy Loading Placeholder -->
    <div
      v-if="!shouldLoad && loading === 'lazy'"
      :class="computedStyles.overlay()"
    >
      <div :class="computedStyles.loadingState()">
        <UIcon
          name="i-lucide-video"
          class="size-8"
        />
      </div>
    </div>

    <!-- Waiting/Buffering Indicator -->
    <div
      v-if="waiting && !hasError"
      :class="computedStyles.overlay()"
    >
      <div :class="computedStyles.loadingState()">
        <UIcon
          name="i-lucide-loader"
          class="size-6 animate-spin"
        />
      </div>
    </div>
  </div>
</template>
