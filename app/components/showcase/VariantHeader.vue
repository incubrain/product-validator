<!-- app/components/showcase/VariantHeader.vue -->
<script setup lang="ts">
interface Props {
  name: string
  description: string
  badgeNumber?: number
}

defineProps<Props>()
</script>

<template>
  <ILayoutStack variant="compact">
    <div class="flex items-center gap-3">
      <UBadge
        v-if="badgeNumber"
        :label="String(badgeNumber)"
        color="primary"
        variant="solid"
      />

      <ContentHeading
        :text="name"
        :level="3"
        variant="card"
      />
    </div>
    <ContentText
      :text="description"
      variant="description"
    />
  </ILayoutStack>
</template>
