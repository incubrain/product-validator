<!-- app/components/layout/Heading.vue - PROPS-BASED -->
<script setup lang="ts">
import headingStyles from '~~/theme/heading'

interface Props {
  text?: string
  id?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  variant?: 'default' | 'section' | 'hero' | 'hero-subtitle' | 'card' | 'muted' | 'accent' | 'content'
  anchor?: boolean
  anchorIcon?: boolean
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  level: 2,
  variant: 'default',
  anchor: false,
  anchorIcon: true,
})

const htmlElement = computed(() => `h${props.level}`)
const styles = computed(() => headingStyles(props))

// Simple slug creation
const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim()
}

const slots = useSlots()

const headingText = computed(() => {
  if (props.text) return props.text

  // Extract text from slot (for Nuxt Content)
  const slotContent = slots.default?.()?.[0]
  console.log('slotContent', slotContent)
  if (typeof slotContent?.children === 'string') {
    return slotContent.children
  }
  return 'Untitled'
})

const headingId = computed(() => {
  return props.id || createSlug(headingText.value)
})
</script>

<template>
  <!-- With anchor wrapper -->
  <NavAnchor
    v-if="anchor"
    :id="headingId"
    :as="htmlElement"
    :show-icon="anchorIcon"
    :class="[styles.root(), $attrs.class]"
  >
    {{ headingText }}
  </NavAnchor>

  <!-- Plain heading -->
  <component
    :is="htmlElement"
    v-else
    :id="headingId"
    :class="[styles.root(), $attrs.class]"
    v-bind="$attrs"
  >
    {{ headingText }}
  </component>
</template>
