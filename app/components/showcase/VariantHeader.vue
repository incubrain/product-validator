<script setup lang="ts">
interface Props {
  name: string
  description: string
  emotional: 'trust' | 'authority' | 'urgency'
}

defineProps<Props>()

const getEmotionalColor = (emotional: string) => {
  switch (emotional) {
    case 'trust': return 'primary'
    case 'authority': return 'secondary'
    case 'urgency': return 'warning'
    default: return 'secondary'
  }
}
</script>

<template>
  <UContainer>
    <ILayoutStack variant="compact">
      <div class="flex flex-col items-start gap-3">
        <UBadge
          :label="emotional.toUpperCase()"
          :color="getEmotionalColor(emotional)"
          variant="soft"
          size="lg"
        />
        <IHeading
          :text="name"
          variant="card"
        />
      </div>
      <IText
        :text="description"
        variant="description"
      />
    </ILayoutStack>
  </UContainer>
</template>
