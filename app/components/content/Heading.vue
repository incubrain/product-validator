<script setup lang="ts">
import headingStyles from '#theme/heading'
import type { HeadingProps } from '#shared/types/components'

const props = withDefaults(defineProps<HeadingProps>(), {
  level: 2,
  variant: 'default',
  anchor: false,
  anchorIcon: true,
  text: undefined,
})

defineOptions({ inheritAttrs: false })

// ✅ USE MOCK COMPOSABLE
const { processMockText } = useMock()

const htmlElement = computed(() => `h${props.level}`)

const ui = tvComputed(() => headingStyles({
  level: props.level,
  variant: props.variant,
}))

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
  // ✅ PROCESS MOCK TEXT FIRST
  const processedText = processMockText(props.text)
  if (processedText) return processedText

  // Extract text from slot (for Nuxt Content)
  const slotContent = slots.default?.()?.[0]
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
  <!-- Template stays the same -->
  <div>
    <INavAnchor
      v-if="anchor"
      :id="headingId"
      :as="htmlElement"
      :show-icon="anchorIcon"
      :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })"
    >
      <template v-if="highlight">
        {{ headingText.replace(highlight, '') }}<span class="text-primary">{{ highlight }}</span>
      </template>
      <template v-else>
        {{ headingText }}
      </template>
    </INavAnchor>

    <component
      :is="htmlElement"
      v-else
      :id="headingId"
      :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })"
      v-bind="$attrs"
    >
      <template v-if="highlight">
        {{ headingText.replace(highlight, '') }}<span class="text-primary">{{ highlight }}</span>
      </template>
      <template v-else>
        {{ headingText }}
      </template>
    </component>
  </div>
</template>
