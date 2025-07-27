<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
}

defineProps<Props>()
</script>

<template>
  <UContainer>
    <LayoutCenter variant="text-only">
      <LayoutStack variant="default">
        <LayoutHeading
          variant="hero"
          :text="title"
        />
        <LayoutText
          variant="subtitle"
          :text="subtitle"
        />
      </LayoutStack>
    </LayoutCenter>
  </UContainer>
</template>
