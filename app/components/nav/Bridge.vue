<!-- components/nav/Bridge.vue -->
<script setup lang="ts">
interface BridgeData {
  headline: string;
  message: string;
  cta: Cta;
}

interface Props {
  bridge: BridgeData;
}

defineProps<Props>();
</script>

<template>
  <UPageCard spotlight spotlight-color="secondary">
    <div class="text-center space-y-6">
      <div class="space-y-2">
        <h4
          class="text-base sm:text-xl text-secondary font-bold leading-relaxed"
        >
          {{ bridge.headline }}
        </h4>
        <p class="text-sm sm:text-base text-muted leading-relaxed">
          {{ bridge.message }}
        </p>
      </div>

      <UButton
        :to="bridge.cta.to"
        variant="subtle"
        color="primary"
        :trailing-icon="bridge.cta.icon"
        size="md"
        class="font-medium"
      >
        {{ bridge.cta.label }}
      </UButton>
    </div>
  </UPageCard>
</template>
