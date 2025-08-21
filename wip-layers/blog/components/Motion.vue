<!-- components/layout/Motion.vue -->
<script setup lang="ts">
interface MotionVariant {
  container?: {
    initial: Record<string, any>
    visible: Record<string, any>
  }
  children?: Record<
    string,
    {
      initial: Record<string, any>
      visible: Record<string, any>
      delay: number
    }
  >
}

interface Props {
  /** Variant configuration name */
  variant?: 'simple' | 'staggered' | 'orchestrated' | 'hero' | 'card' | 'section' | 'none'
  /** Disable all motion */
  disabled?: boolean
  /** Custom delay in milliseconds */
  delay?: number
  /** Custom element to render */
  is?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'simple',
  disabled: false,
  delay: 0,
  is: 'div',
})

const container = ref<HTMLElement>()

// Combined variants - generic catch-all + specific animations
const variants: Record<string, MotionVariant> = {
  // Generic catch-all variants
  simple: {
    container: {
      initial: { opacity: 0 },
      visible: { opacity: 1 },
    },
    children: {
      ':scope > *': {
        initial: { opacity: 0, y: 20, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1 },
        delay: 0,
      },
    },
  },

  staggered: {
    container: {
      initial: { opacity: 0 },
      visible: { opacity: 1 },
    },
    children: {
      ':*': {
        initial: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 },
        delay: 0, // Will be staggered by index
      },
    },
  },

  // Specific semantic variants
  orchestrated: {
    container: {
      initial: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    children: {
      'h1, h2, h3, h4, h5, h6': {
        initial: { opacity: 0, x: -15 },
        visible: { opacity: 1, x: 0 },
        delay: 100,
      },
      'p, span:not(.iconify)': {
        initial: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
        delay: 200,
      },
      'button, a[role="button"], .button': {
        initial: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
        delay: 300,
      },
      'img, picture': {
        initial: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
        delay: 150,
      },
      '[class*="badge"], .badge': {
        initial: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
        delay: 250,
      },
    },
  },

  hero: {
    container: {
      initial: { opacity: 0 },
      visible: { opacity: 1 },
    },
    children: {
      'h1': {
        initial: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        delay: 200,
      },
      'h2, h3, p': {
        initial: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        delay: 400,
      },
      'button, .button': {
        initial: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
        delay: 600,
      },
    },
  },

  // Legacy simple variants for backwards compatibility
  card: {
    container: {
      initial: { opacity: 0, y: 20, scale: 0.98 },
      visible: { opacity: 1, y: 0, scale: 1 },
    },
  },

  section: {
    container: {
      initial: { opacity: 0, y: 15 },
      visible: { opacity: 1, y: 0 },
    },
  },

  none: {},
}

// Client-side only motion application
onMounted(() => {
  if (props.disabled || !container.value || props.variant === 'none') return

  const config = variants[props.variant]
  if (!config) return

  // Apply container motion if defined
  if (config.container) {
    useMotion(container, {
      initial: config.container.initial,
      visibleOnce: {
        ...config.container.visible,
        transition: {
          duration: 400,
          ease: 'easeOut',
          delay: props.delay,
        },
      },
    })
  }

  // Apply children motion if defined
  if (config.children) {
    Object.entries(config.children).forEach(([selector, motionConfig]) => {
      const elements = container.value!.querySelectorAll(selector)

      elements.forEach((element, index) => {
        // For catch-all selectors, use index for staggering
        const staggerDelay = selector === ':scope > *' && props.variant === 'staggered'
          ? index * 75
          : 0

        const totalDelay = props.delay + motionConfig.delay + staggerDelay

        useMotion(element as HTMLElement, {
          initial: motionConfig.initial,
          visibleOnce: {
            ...motionConfig.visible,
            transition: {
              duration: 400,
              ease: 'easeOut',
              delay: totalDelay,
            },
          },
        })
      })
    })
  }
})
</script>

<template>
  <component
    :is="is"
    ref="container"
    :class="$attrs.class"
    :style="disabled ? {} : { opacity: variant === 'none' ? 1 : 0 }"
  >
    <slot />
  </component>
</template>
