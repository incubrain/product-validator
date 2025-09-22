<!-- components/Bridge.vue -->
<script setup lang="ts">
import type { Cta } from '#shared/config/overview';

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
  <div
    class="mt-12 p-6 sm:p-8 bg-secondary/5 border border-secondary/20 rounded-2xl max-w-3xl mx-auto backdrop-blur-sm"
  >
    <div class="text-center space-y-4">
      <p class="text-base sm:text-lg text-muted leading-relaxed">
        <strong class="text-secondary font-semibold">
          {{ bridge.headline }}
        </strong>
        {{ bridge.message }}
      </p>

      <UButton
        :to="bridge.cta.to"
        variant="ghost"
        color="primary"
        :trailing-icon="bridge.cta.icon"
        size="md"
        class="font-medium"
      >
        {{ bridge.cta.label }}
      </UButton>
    </div>
  </div>
</template>
