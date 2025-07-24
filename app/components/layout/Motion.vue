<!-- components/motion/MotionGroup.vue -->
<script setup lang="ts">
interface MotionPreset {
  container?: {
    initial: Record<string, any>
    visible: Record<string, any>
  }
  children: Record<
    string,
    {
      initial: Record<string, any>
      visible: Record<string, any>
      delay?: number
    }
  >
  stagger?: number
}

interface Props {
  /** Preset configuration name */
  preset?: 'blog-card' | 'hero-section' | 'feature-grid' | 'none'
  /** Disable all motion */
  disabled?: boolean
  /** Override stagger timing */
  stagger?: number
  /** Custom element to render */
  is?: string
}

const props = withDefaults(defineProps<Props>(), {
  preset: 'blog-card',
  disabled: false,
  stagger: 50,
  is: 'div',
})

const container = ref<HTMLElement>()

// Preset configurations
const presets: Record<string, MotionPreset> = {
  'blog-card': {
    container: {
      initial: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } },
    },
    children: {
      'h1, h2, h3, h4, h5, h6': {
        initial: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
        delay: 100,
      },
      'p, span:not(.iconify)': {
        initial: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 },
        delay: 200,
      },
      'button, a[role="button"], .button': {
        initial: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
        delay: 300,
      },
      'img, picture': {
        initial: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
        delay: 150,
      },
      '.badge, [class*="badge"]': {
        initial: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
        delay: 250,
      },
    },
    stagger: 75,
  },
  'hero-section': {
    container: {
      initial: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 800 } },
    },
    children: {
      'h1': {
        initial: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        delay: 200,
      },
      'p': {
        initial: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        delay: 400,
      },
      'button, a[role="button"]': {
        initial: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
        delay: 600,
      },
      'img': {
        initial: { opacity: 0, scale: 0.8, rotateX: -15 },
        visible: { opacity: 1, scale: 1, rotateX: 0 },
        delay: 0,
      },
    },
    stagger: 100,
  },
  'feature-grid': {
    container: {
      initial: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 600 } },
    },
    children: {
      ':scope > *': {
        initial: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        delay: 0,
      },
    },
    stagger: 150,
  },
  'none': {
    children: {},
  },
}

// Client-side only motion application
onMounted(() => {
  if (props.disabled || !container.value || props.preset === 'none') return

  const config = presets[props.preset]
  if (!config) return

  // Apply container motion if defined
  if (config.container) {
    useMotion(container, {
      initial: config.container.initial,
      visibleOnce: config.container.visible,
    })
  }

  // Apply motion to child elements
  Object.entries(config.children).forEach(([selector, motionConfig]) => {
    const elements = container.value!.querySelectorAll(selector)

    elements.forEach((element, index) => {
      const staggerDelay = index * (props.stagger || config.stagger || 50)
      const totalDelay = (motionConfig.delay || 0) + staggerDelay

      // Create motion instance for each element
      useMotion(element as HTMLElement, {
        initial: motionConfig.initial,
        visibleOnce: {
          ...motionConfig.visible,
          transition: {
            duration: 600,
            ease: 'easeOut',
            delay: totalDelay,
            ...motionConfig.visible.transition,
          },
        },
      })
    })
  })
})
</script>

<template>
  <!-- Server-side render without motion, client-side gets motion -->
  <component
    :is="is"
    ref="container"
    :style="disabled ? {} : { opacity: preset === 'none' ? 1 : 0 }"
  >
    <slot />
  </component>
</template>
