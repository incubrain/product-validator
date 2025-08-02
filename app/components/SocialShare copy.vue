<script setup lang="ts">
import type { ButtonProps, ButtonGroupProps } from '#ui/types'

interface Props {
  title: string
  url: string
  description?: string

  // Exact Nuxt UI prop mapping (optional with smart defaults)
  buttonProps?: Partial<ButtonProps>
  buttonGroupProps?: Partial<ButtonGroupProps>

  // Simple behavior flags
  showLabels?: boolean
  layout?: 'horizontal' | 'vertical' | 'compact'
}

const props = withDefaults(defineProps<Props>(), {
  showLabels: false,
  layout: 'horizontal',
  buttonGroupProps: undefined,
  buttonProps: undefined,
})

// Smart defaults
const defaultButtonProps = computed(() => ({
  something: 'error',
  ...props.buttonProps,
}) satisfies Partial<ButtonGroupProps>)

const defaultButtonGroupProps = computed(() => ({
  orientation: props.layout === 'vertical' ? 'vertical' : 'horizontal' as const,
  size: 'sm' as const,
  ...props.buttonGroupProps,
}))

const shareLinks = computed(() => [
  {
    icon: 'i-lucide-twitter',
    label: 'Twitter',
    to: `https://twitter.com/intent/tweet?text=${encodeURIComponent(props.title)}&url=${encodeURIComponent(props.url)}`,
  },
  {
    icon: 'i-lucide-linkedin',
    label: 'LinkedIn',
    to: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(props.url)}`,
  },
  {
    icon: 'i-lucide-facebook',
    label: 'Facebook',
    to: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(props.url)}`,
  },
  {
    icon: 'i-lucide-mail',
    label: 'Email',
    to: `mailto:?subject=${encodeURIComponent(props.title)}&body=${encodeURIComponent(props.description || '')}\n\n${encodeURIComponent(props.url)}`,
  },
])

const copied = ref(false)

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(props.url)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}

// Computed styles for layout variants
const containerClass = computed(() => {
  const baseClass = 'flex gap-4'

  switch (props.layout) {
    case 'vertical':
      return `${baseClass} flex-col`
    case 'compact':
      return `${baseClass} flex-wrap`
    default:
      return `${baseClass} flex-col sm:flex-row sm:items-center sm:justify-between`
  }
})

// Copy button color logic
const copyButtonColor = computed(() => {
  return copied.value ? 'success' : props.color
})
</script>

<template>
  <div :class="containerClass">
    <UButtonGroup
      v-bind="defaultButtonGroupProps"
    >
      <UButton
        v-for="link in shareLinks"
        :key="link.label"
        :variant="variant"
        :color="color"
        :size="size"
        :icon="link.icon"
        :to="link.to"
        :ui="ui?.button"
        target="_blank"
        :aria-label="`Share on ${link.label}`"
      >
        <!-- Optional labels -->
        <span
          v-if="showLabels"
          class="hidden sm:inline"
        >
          {{ link.label }}
        </span>
      </UButton>

      <UButton
        :variant="variant"
        :color="copyButtonColor"
        :size="size"
        :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
        :ui="ui?.copyButton"
        :aria-label="copied ? 'Copied!' : 'Copy link'"
        @click="copyLink"
      >
        <span
          v-if="showLabels"
          class="hidden sm:inline"
        >
          {{ copied ? 'Copied!' : 'Copy' }}
        </span>
      </UButton>
    </UButtonGroup>
  </div>
</template>
