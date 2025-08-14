<!-- components/content/Carousel.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import type { CarouselProps } from '@nuxt/ui'

const detectItemType = (item: any): string => {
  // Early returns for explicit types
  if (item.type) return item.type
  if (item.component) return 'slot'
  if (!item.src) return 'unknown'

  const src = item.src.toLowerCase()
  const url = new URL(item.src, 'https://example.com') // Safe URL parsing
  const pathname = url.pathname.toLowerCase()

  // 1. Extension-based detection
  if (pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/)) {
    return 'image'
  }

  if (pathname.match(/\.(mp4|webm|ogg|avi|mov|wmv|flv|mkv)$/)) {
    return 'video'
  }

  if (pathname.match(/\.(mp3|wav|ogg|aac|flac|m4a)$/)) {
    return 'audio'
  }

  // 2. URL keyword detection
  if (src.includes('youtube.com') || src.includes('youtu.be')) {
    return 'video'
  }

  if (src.includes('vimeo.com')) {
    return 'video'
  }

  if (src.includes('soundcloud.com') || src.includes('spotify.com')) {
    return 'audio'
  }

  // Image services (picsum, unsplash, etc.)
  if (src.includes('picsum.photos')
    || src.includes('unsplash.com')
    || src.includes('images.unsplash.com')
    || src.includes('source.unsplash.com')) {
    return 'image'
  }

  // 3. Query parameter hints
  if (url.searchParams.has('format')) {
    const format = url.searchParams.get('format')!
    if (['jpg', 'jpeg', 'png', 'webp'].includes(format)) return 'image'
    if (['mp4', 'webm'].includes(format)) return 'video'
  }

  // 4. Fallback assumptions
  if (src.includes('/images/') || src.includes('/img/') || src.includes('/photos/')) {
    return 'image'
  }

  if (src.includes('/videos/') || src.includes('/video/')) {
    return 'video'
  }

  // 5. Final fallback - assume image for most unknown URLs
  return 'image'
}

interface Props {
  variant?: 'gallery' | 'hero' | 'thumbnail'
  items?: any[]
  autoplay?: boolean | { delay: number }
  loop?: boolean
  arrows?: boolean
  dots?: boolean
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'gallery',
  autoplay: false,
  loop: true,
  arrows: true,
  dots: false,
})

const carouselProps = computed<CarouselProps>(() => ({
  items: props.items
    ? props.items.map((item, index) => ({
        ...item,
        id: `${detectItemType(item)}-${index}`,
        detectedType: detectItemType(item), // Store detected type
      }))
    : [],
  variant: props.variant,
  autoplay: props.autoplay,
  loop: props.loop,
  arrows: props.arrows,
  dots: props.dots,
  ui: props.ui,
}))
// Debug the detection
console.log('🔍 Type Detection:', carouselProps.value)
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    v-bind="carouselProps"
  >
    <div class="h-full flex flex-col min-h-[200px]">
      <component
        :is="item.component"
        v-if="item.detectedType === 'slot'"
        class="flex-1"
      />

      <IImage
        v-if="item.detectedType === 'image'"
        :src="item.src"
        :alt="item.alt || 'Carousel image'"
        class="flex-1 w-full h-full"
        aspect-ratio="auto"
        object-fit="cover"
        loading="lazy"
        :ui="{ root: 'rounded-lg' }"
      />

      <video
        v-else-if="item.detectedType === 'video'"
        :src="item.src"
        class="flex-1 w-full h-full object-cover rounded-lg"
        controls
        preload="metadata"
        :poster="item.poster"
      />

      <audio
        v-else-if="item.detectedType === 'audio'"
        :src="item.src"
        controls
        class="w-full"
      />

      <div
        v-else
        class="flex-1 flex items-center justify-center bg-elevated/30 text-muted rounded-lg border border-muted/20"
      >
        <div class="text-center p-4">
          <UIcon
            name="i-lucide-image-off"
            class="size-8 mx-auto mb-2 opacity-50"
          />
          <span class="text-sm">Content unavailable ({{ item.detectedType }})</span>
        </div>
      </div>
    </div>
  </UCarousel>
</template>
