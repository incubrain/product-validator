<script setup lang="ts">
import { useIntersectionObserver, useMediaControls } from '@vueuse/core';
import { videoStyles } from '#theme';
import type { VideoVariants } from '#theme';
import { useUserInteraction } from '~/composables/useUserInteraction';

export interface VideoProps {
  src: string;
  poster?: string;
  aspectRatio?: VideoVariants['aspectRatio'];
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  loading?: 'eager' | 'lazy';
}

const props = withDefaults(defineProps<VideoProps>(), {
  aspectRatio: 'video',
  autoplay: false,
  muted: true,
  loop: false,
  controls: false,
  loading: 'lazy',
  poster: undefined
});

// Refs
const containerRef = ref<HTMLElement>();
const videoRef = ref<HTMLVideoElement>();

// State
const isLoading = ref(true);
const hasError = ref(false);
const shouldLoad = ref(props.loading === 'eager');
const showControls = ref(false);

// VueUse Media Controls
const { playing, waiting, muted } = useMediaControls(videoRef, {
  src: computed(() => (shouldLoad.value ? props.src : '')),
});

// Intersection Observer for lazy loading
if (props.loading === 'lazy') {
  useIntersectionObserver(
    containerRef,
    ([{ isIntersecting }]) => {
      if (isIntersecting && !shouldLoad.value) {
        shouldLoad.value = true;
      }
    },
    { threshold: 0.1 },
  );
}

// Event handlers
const handleLoadedData = () => {
  isLoading.value = false;
  hasError.value = false;
};

const handleError = () => {
  isLoading.value = false;
  hasError.value = true;
};

const togglePlay = () => {
  playing.value = !playing.value;
};

const toggleMute = () => {
  muted.value = !muted.value;
};

// Autoplay logic
const { hasInteracted, waitForInteraction } = useUserInteraction();
const autoplayAttempted = ref(false);

watchEffect(async () => {
  if (
    videoRef.value &&
    props.autoplay &&
    props.muted &&
    shouldLoad.value &&
    !hasError.value &&
    !autoplayAttempted.value // Prevent multiple attempts
  ) {
    if (hasInteracted.value) {
      // User has already interacted - try autoplay immediately
      try {
        playing.value = true;
        autoplayAttempted.value = true;
      } catch (error) {
        console.warn('Autoplay failed:', error.message);
      }
    } else {
      // Wait for first interaction
      autoplayAttempted.value = true;
      waitForInteraction().then(() => {
        if (
          videoRef.value &&
          props.autoplay &&
          props.muted &&
          !hasError.value &&
          shouldLoad.value
        ) {
          playing.value = true;
        }
      });
    }
  }
});

// Reset autoplay attempt when src changes
watch(
  () => props.src,
  () => {
    autoplayAttempted.value = false;
  },
);

// Set initial muted state
watchEffect(() => {
  if (videoRef.value) {
    muted.value = props.muted;
  }
});

// Show/hide controls on hover
const handleMouseEnter = () => {
  showControls.value = true;
};

const handleMouseLeave = () => {
  showControls.value = false;
};

// Computed styles - fix the loading state issue
const computedStyles = useTV(videoStyles, {
  ...props,
  loading: isLoading.value && shouldLoad.value, // Only show loading when actually loading
  error: hasError.value,
});
</script>

<template>
  <div
    ref="containerRef"
    :class="computedStyles.root()"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Video Element -->
    <video
      v-if="shouldLoad"
      ref="videoRef"
      :class="computedStyles.video()"
      :poster="poster"
      :muted="muted"
      :loop="loop"
      :controls="controls"
      preload="metadata"
      playsinline
      @loadeddata="handleLoadedData"
      @error="handleError"
    >
      <source :src="src" type="video/mp4" />
      <p>Your browser doesn't support video playback.</p>
    </video>

    <!-- Custom Controls Overlay (only show on hover) -->
    <div
      v-if="!controls && !hasError && shouldLoad && showControls"
      :class="computedStyles.controls()"
      class="opacity-100 transition-opacity duration-200"
    >
      <div class="flex items-center gap-4">
        <!-- Play/Pause Button -->
        <button
          class="p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors flex cursor-pointer"
          @click="togglePlay"
        >
          <UIcon
            :name="playing ? 'i-lucide-pause' : 'i-lucide-play'"
            class="size-8 text-white"
          />
        </button>

        <!-- Volume Control -->
        <button
          class="p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors flex cursor-pointer"
          @click="toggleMute"
        >
          <UIcon
            :name="muted ? 'i-lucide-volume-x' : 'i-lucide-volume-2'"
            class="size-6 text-white"
          />
        </button>
      </div>
    </div>

    <!-- Loading State (only when actually loading) -->
    <div v-if="isLoading && shouldLoad" :class="computedStyles.overlay()">
      <div :class="computedStyles.loadingState()">
        <UIcon name="i-lucide-loader" class="size-8 animate-spin text-white" />
      </div>
    </div>

    <!-- Error State -->
    <div v-if="hasError" :class="computedStyles.overlay()">
      <div :class="computedStyles.errorState()">
        <UIcon name="i-lucide-video-off" class="size-12 mb-2" />
        <p class="text-sm mb-3">Failed to load video</p>
        <p class="text-xs opacity-75">{{ src }}</p>
      </div>
    </div>

    <!-- Lazy Loading Placeholder -->
    <div v-if="!shouldLoad" :class="computedStyles.overlay()">
      <div :class="computedStyles.loadingState()">
        <UIcon name="i-lucide-video" class="size-8 text-white" />
      </div>
    </div>

    <!-- Buffering Indicator -->
    <div
      v-if="waiting && !hasError && !isLoading"
      :class="computedStyles.overlay()"
    >
      <div :class="computedStyles.loadingState()">
        <UIcon name="i-lucide-loader" class="size-6 animate-spin text-white" />
      </div>
    </div>
  </div>
</template>
