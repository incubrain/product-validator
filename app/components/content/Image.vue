<script setup lang="ts">
import imageStyles from '#theme/content/image'
import type { ImageVariants, ImageSlots } from '#theme/content/image'

interface Props {
  src: string
  alt: string
  variant?: ImageVariants['variant']
  objectFit?: ImageVariants['objectFit']
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'avif' | 'jpeg' | 'jpg' | 'png' | 'gif'
  loading?: 'lazy' | 'eager'
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'auto',
  objectFit: 'cover',
  loading: 'lazy',
  quality: 80,
  format: 'webp',
})

const isLoaded = ref(false)
const hasError = ref(false)
const imgSrc = ref(props.src)

const handleLoad = () => {
  isLoaded.value = true
}

const handleError = () => {
  if (!hasError.value) {
    imgSrc.value = `/images/demo/demo-1.jpg`
    hasError.value = true
  }
}

const computedStyles = computed(() => imageStyles({
  variant: props.variant,
  objectFit: props.objectFit,
}))
</script>

<template>
  <NuxtImg
    :src="imgSrc"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    :quality="props.quality"
    :format="props.format"
    :loading="props.loading"
    :class="computedStyles.root({ class: [props.ui?.root, $attrs.class] })"
    @load="handleLoad"
    @error="handleError"
  />
</template>
