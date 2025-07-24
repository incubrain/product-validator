<!-- app/components/layout/Heading.vue - PROPS-BASED -->
<script setup lang="ts">
import headingStyles from '~~/theme/heading'

interface Props {
  text: string  // Required - the heading text
  id?: string   // Optional - custom ID, defaults to slugified text
  level?: 1 | 2 | 3 | 4 | 5 | 6
  variant?: 'default' | 'section' | 'hero' | 'hero-subtitle' | 'card' | 'muted' | 'accent'
  align?: 'left' | 'center' | 'right'
  anchor?: boolean
  anchorIcon?: boolean
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  level: 2,
  variant: 'default',
  align: 'left',
  anchor: false,
  anchorIcon: true
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

// Use provided ID or generate from text
const headingId = computed(() => {
  return props.id || createSlug(props.text)
})
</script>

<template>
  <!-- With anchor wrapper -->
  <NavAnchor
    v-if="anchor"
    :id="headingId"
    :as="htmlElement"
    :show-icon="anchorIcon"
    :class="styles.root()"
  >
    {{ text }}
  </NavAnchor>
  
  <!-- Plain heading -->
  <component 
    :is="htmlElement"
    v-else
    :id="headingId"
    :class="[styles.root(), $attrs.class]"
    v-bind="$attrs"
  >
    {{ text }}
  </component>
</template>