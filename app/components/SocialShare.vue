<script setup lang="ts">
interface Props {
  title: string
  url: string
  description?: string
}

const props = defineProps<Props>()

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
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <UButtonGroup
      size="sm"
      orientation="horizontal"
    >
      <UButton
        v-for="link in shareLinks"
        :key="link.label"
        variant="ghost"
        :icon="link.icon"
        :to="link.to"
        target="_blank"
        :aria-label="`Share on ${link.label}`"
      />

      <UButton
        variant="ghost"
        :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
        :aria-label="copied ? 'Copied!' : 'Copy link'"
        :class="copied ? 'text-success' : ''"
        @click="copyLink"
      />
    </UButtonGroup>
  </div>
</template>
