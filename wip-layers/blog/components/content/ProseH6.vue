<!-- components/content/ProseH2.vue - PASS TEXT AS PROP -->
<script setup lang="ts">
const props = defineProps<{ id: string }>()
const slots = useSlots()

// Extract text for heading prop
const headingText = computed(() => {
  const slotContent = slots.default?.()
  return (slotContent?.[0]?.children || props.id.replace(/-/g, ' ')) as string
})
</script>

<template>
  <IHeading
    :id="id"
    :text="headingText"
    :level="6"
    variant="content"
  />
</template>
