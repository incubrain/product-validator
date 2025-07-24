<!-- components/content/Carousel.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import type { CarouselProps } from '@nuxt/ui'

// Define internal presets with all configurations
const presets = {
  gallery: {
    ui: {
      item: 'basis-full md:basis-1/2 lg:basis-1/3 transition-all duration-300 [&:last-child]:mr-4',
      container: 'flex items-center gap-4',
    },
    autoplay: { delay: 5000 },
    loop: true,
    arrows: true,
    dots: false,
    align: 'center',
    classNames: true,
    containScroll: 'trimSnaps',
  },
  hero: {
    ui: {
      item: 'basis-full transition-all duration-300 [&:last-child]:mr-4',
      container: 'flex items-center gap-4',
    },
    autoplay: { delay: 7000 },
    loop: true,
    arrows: true,
    dots: false,
    align: 'center',
    classNames: true,
    containScroll: 'trimSnaps',
  },
  thumbnail: {
    ui: {
      item: 'basis-1/4 md:basis-1/6 transition-all duration-300 [&:last-child]:mr-2',
      container: 'flex items-center gap-2',
    },
    autoplay: false,
    loop: false,
    arrows: false,
    dots: true,
    align: 'start',
    classNames: false,
    containScroll: 'trimSnaps',
  },
}

// Define minimal props
interface Props {
  variant?: 'gallery' | 'hero' | 'thumbnail'
  items: any[]
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'gallery',
})

// Compute UI by merging preset with app.config.ts base styles
const appConfig = useAppConfig()
const ui = computed(() => {
  if (!appConfig.ui.carousel) {
    return presets[props.variant].ui
  }
  console.log('Using app config:', appConfig)
  const presetUi = presets[props.variant].ui
  const baseSlots = appConfig.ui.carousel?.slots || {}
  return {
    ...baseSlots,
    ...presetUi,
  }
})

// Prepare carousel items
const carouselItems = computed(() => props.items.map((item, index) => ({
  ...item,
  id: `${item.type || 'item'}-${index}`,
})))

// Compute final carousel props based on preset
const carouselProps = computed<CarouselProps>(() => {
  const preset = presets[props.variant]
  return {
    ui: ui.value,
    items: carouselItems.value,
    autoplay: preset.autoplay,
    loop: preset.loop,
    arrows: preset.arrows,
    dots: preset.dots,
    align: preset.align,
    classNames: preset.classNames,
    containScroll: preset.containScroll,
  }
})

const getComponentName = (item: any): string | null => {
  return item.component || null
}
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    v-bind="carouselProps"
  >
    <div class="h-full flex flex-col min-h-[200px]">
      <component
        :is="item.component"
        v-if="item.type === 'slot' && item.component"
        class="flex-1"
      />
      <component
        :is="getComponentName(item)"
        v-else-if="item.type === 'custom' && getComponentName(item)"
        :items="[item]"
        :variant="item.variant"
        v-bind="item.componentProps || {}"
        class="flex-1 h-full"
      />
      <NuxtImg
        v-else-if="item.type === 'image' && item.src"
        :src="item.src"
        :alt="item.alt || 'Carousel image'"
        class="flex-1 w-full h-full object-cover rounded-lg"
        draggable="false"
        loading="lazy"
      />
      <video
        v-else-if="item.type === 'video' && item.src"
        :src="item.src"
        class="flex-1 w-full h-full object-cover rounded-lg"
        controls
        preload="metadata"
        :poster="item.poster"
      >
        <track
          v-if="item.subtitle"
          kind="subtitles"
          :src="item.subtitle"
          :srclang="item.subtitleLang || 'en'"
          :label="item.subtitleLabel || 'English'"
        >
        Your browser does not support the video tag.
      </video>
      <div
        v-else
        class="flex-1 flex items-center justify-center bg-gray-100 text-gray-500 rounded-lg border-2 border-dashed border-gray-300"
      >
        <div class="text-center p-4">
          Unsupported Content: {{ item.type }}
        </div>
      </div>
    </div>
  </UCarousel>
</template>
