<!-- components/content/ProseA.vue -->
<script setup lang="ts">
interface Props {
  href?: string
  target?: '_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined
}

const props = defineProps<Props>()

// Auto-detect external URLs and set target="_blank"
const isExternal = computed(() => {
  if (!props.href) return false
  return props.href.startsWith('http://') || 
         props.href.startsWith('https://') ||
         props.href.startsWith('mailto:') ||
         props.href.startsWith('tel:')
})

const linkTarget = computed(() => {
  // If target is explicitly set, use it
  if (props.target !== undefined) return props.target
  
  // Auto-set target="_blank" for external links
  return isExternal.value ? '_blank' : undefined
})
</script>

<template>
  <ULink
    :href="props.href"
    :target="linkTarget"
    :external="isExternal"
    class="decoration-1 underline underline-offset-4 decoration-secondary-800"
  >
    <slot />
  </ULink>
</template>