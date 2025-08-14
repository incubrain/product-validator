<!-- components/content/ProseImg.vue -->
<script setup lang="ts">
import { computed, useRoute } from '#imports'

interface Props {
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
  title?: string
  class?: string
  style?: string
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  class: '',
  style: '',
})

const route = useRoute()

// Auto-detect category from URL structure
const getImageSrc = computed(() => {
  console.log('getImageSrc PROPS', props)
  if (!props.src) return ''

  // If already a full path, use as-is
  if (props.src.startsWith('/') || props.src.startsWith('http')) {
    return props.src
  }

  // Extract category from current route
  // Route patterns: /blog/[category]/[slug] or /blog/[category]
  const pathSegments = route.path.split('/').filter(Boolean)
  let category = ''

  if (pathSegments[0] === 'blog' && pathSegments.length >= 2) {
    category = pathSegments[1]
    // Don't use 'index' as category
    if (category === 'index') category = 'general'
  } else {
    category = 'general'
  }

  // Build path: /images/blog/{category}/{filename}
  return `images/blog/${category}/${props.src}`
})

// Enhanced alt text for better accessibility
const enhancedAlt = computed(() => {
  if (props.alt) return props.alt
  if (props.title) return props.title

  // Extract filename without extension for fallback alt
  const filename = props.src?.split('/').pop()?.split('.')[0] || ''
  return filename ? `Blog image: ${filename.replace(/[-_]/g, ' ')}` : 'Blog image'
})

const isLoaded = ref(false)
const hasError = ref(false)
</script>

<template>
  <figure class="blog-image-container my-8">
    <!-- Loading overlay -->
    <div
      v-if="!isLoaded && !hasError"
      class="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-lg z-10"
    >
      <UIcon
        name="i-lucide-image"
        class="w-8 h-8 text-zinc-400"
      />
    </div>

    <!-- Error overlay -->
    <div
      v-if="hasError"
      class="absolute inset-0 flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-8 text-center z-10"
    >
      <UIcon
        name="i-lucide-exclamation-triangle"
        class="w-8 h-8 text-amber-500 mb-2"
      />
      <p class="text-sm text-zinc-600 dark:text-zinc-400">
        Image failed to load: {{ props.src }}
      </p>
    </div>

    <!-- Main image (always rendered) -->
    <IImage
      :src="getImageSrc"
      :alt="enhancedAlt"
      :width="width"
      :height="height"
      :class="[
        'blog-image relative',
        'rounded-lg shadow-lg',
        'transition-all duration-300 ease-in-out',
        'hover:shadow-xl hover:scale-[1.02]',
        'max-w-full h-auto',
        'border border-zinc-200 dark:border-zinc-700',
        props.class,
      ]"
      :style="props.style"
      loading="lazy"
      aspect-ratio="auto"
      object-fit="cover"
    />

    <!-- Caption -->
    <figcaption
      v-if="title && isLoaded"
      class="mt-3 text-sm text-center text-zinc-600 dark:text-zinc-400 italic"
    >
      {{ title }}
    </figcaption>
  </figure>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.blog-image-container {
  @apply mx-auto relative;
  max-width: min(100%, 800px);
  min-height: 200px;
}

.blog-image {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.dark .blog-image {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.3),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.blog-image:hover {
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
